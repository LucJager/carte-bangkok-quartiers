import L from 'leaflet'
import type { TagFilter, BudgetFilter } from '../types'
import { districts } from '../data/districts'
import { fuzzyMatch } from '../utils/fuzzy'
import { pointInPolygon } from '../utils/geo'
import { escapeHtml } from '../utils/sanitize'

const TAGS: TagFilter[] = ['nightlife', 'expat-friendly', 'culture', 'budget-friendly', 'foodie', 'hipster', 'family']
const BUDGETS: BudgetFilter[] = ['฿', '฿฿', '฿฿฿', '฿฿฿฿']

interface SearchCallbacks {
  onSelectDistrict: (id: string) => void
  onFilter: (ids: string[] | null) => void
}

let geocodeMarker: L.Marker | null = null
let debounceTimer: ReturnType<typeof setTimeout>

export function initSearch(map: L.Map, callbacks: SearchCallbacks) {
  const wrapper = document.createElement('div')
  wrapper.id = 'search-wrapper'
  wrapper.innerHTML = `
    <div class="search-bar">
      <input id="search-input" type="text" placeholder="Rechercher un quartier ou lieu..." autocomplete="off" aria-label="Rechercher" />
      <button id="filter-toggle" class="filter-toggle" aria-expanded="false" aria-label="Filtres" title="Filtres">▾</button>
      <div id="search-dropdown" class="search-dropdown" role="listbox" aria-label="Résultats"></div>
    </div>
    <div id="filter-pills" class="filter-pills collapsed" role="group" aria-label="Filtres">
      <div class="pills-row">
        ${BUDGETS.map(b => `<button class="pill pill-budget" data-budget="${b}" aria-pressed="false">${b}</button>`).join('')}
      </div>
      <div class="pills-row">
        ${TAGS.map(t => `<button class="pill pill-tag" data-tag="${t}" aria-pressed="false">${t}</button>`).join('')}
      </div>
    </div>
  `
  document.getElementById('top-bar')!.appendChild(wrapper)

  const input = document.getElementById('search-input') as HTMLInputElement
  const dropdown = document.getElementById('search-dropdown')!
  const pillsContainer = document.getElementById('filter-pills')!
  const filterToggle = document.getElementById('filter-toggle')!

  filterToggle.addEventListener('click', () => {
    const expanded = pillsContainer.classList.toggle('collapsed')
    filterToggle.setAttribute('aria-expanded', String(!expanded))
    filterToggle.textContent = expanded ? '▾' : '▴'
  })

  input.addEventListener('focus', () => {
    pillsContainer.classList.remove('collapsed')
    filterToggle.setAttribute('aria-expanded', 'true')
    filterToggle.textContent = '▴'
  })

  const activeFilters = { tags: new Set<TagFilter>(), budgets: new Set<BudgetFilter>() }

  // Search input
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer)
    const q = input.value.trim()
    if (!q) { dropdown.innerHTML = ''; dropdown.classList.remove('open'); return }
    // District fuzzy match
    const matches = districts
      .map(d => ({ d, score: Math.max(fuzzyMatch(q, d.name), fuzzyMatch(q, d.nameThai), fuzzyMatch(q, d.id)) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)

    let html = matches.map(({ d }) =>
      `<div class="dropdown-item" data-district="${d.id}" role="option"><span class="dropdown-dot" style="background:${d.color}"></span>${d.name} <span class="dropdown-thai">${d.nameThai}</span></div>`
    ).join('')

    // Nominatim geocoding (debounced)
    if (q.length >= 3) {
      debounceTimer = setTimeout(() => geocode(q, html, matches.length), 500)
    }

    dropdown.innerHTML = html || '<div class="dropdown-empty">Aucun résultat</div>'
    dropdown.classList.add('open')
  })

  async function geocode(q: string, existingHtml: string, districtCount: number) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=3&viewbox=100.35,13.55,100.80,13.95&bounded=1`
      const res = await fetch(url, { headers: { 'Accept-Language': 'en' } })
      const data = await res.json() as Array<{ display_name: string, lat: string, lon: string }>
      if (!data.length) return
      const geoHtml = data.map((r: { display_name: string, lat: string, lon: string }) =>
        `<div class="dropdown-item dropdown-geo" data-lat="${escapeHtml(r.lat)}" data-lng="${escapeHtml(r.lon)}" role="option"><span class="dropdown-pin">📍</span>${escapeHtml(r.display_name.split(',').slice(0, 2).join(','))}</div>`
      ).join('')
      if (districtCount > 0) {
        dropdown.innerHTML = existingHtml + '<div class="dropdown-sep"></div>' + geoHtml
      } else {
        dropdown.innerHTML = geoHtml
      }
    } catch { /* ignore */ }
  }

  // Dropdown click
  dropdown.addEventListener('click', (e) => {
    const item = (e.target as HTMLElement).closest('.dropdown-item') as HTMLElement | null
    if (!item) return
    if (item.dataset.district) {
      callbacks.onSelectDistrict(item.dataset.district)
    } else if (item.dataset.lat && item.dataset.lng) {
      const lat = parseFloat(item.dataset.lat), lng = parseFloat(item.dataset.lng)
      placeGeoMarker(map, [lat, lng])
      const found = districts.find(d => pointInPolygon([lat, lng], d.polygon))
      if (found) callbacks.onSelectDistrict(found.id)
    }
    dropdown.classList.remove('open')
    input.value = ''
  })

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target as Node)) dropdown.classList.remove('open')
  })

  // Filter pills
  pillsContainer.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.pill') as HTMLButtonElement | null
    if (!btn) return
    const pressed = btn.getAttribute('aria-pressed') === 'true'
    btn.setAttribute('aria-pressed', String(!pressed))
    btn.classList.toggle('active')

    if (btn.dataset.tag) {
      const tag = btn.dataset.tag as TagFilter
      if (pressed) activeFilters.tags.delete(tag); else activeFilters.tags.add(tag)
    }
    if (btn.dataset.budget) {
      const budget = btn.dataset.budget as BudgetFilter
      if (pressed) activeFilters.budgets.delete(budget); else activeFilters.budgets.add(budget)
    }
    applyFilters()
  })

  function applyFilters() {
    if (!activeFilters.tags.size && !activeFilters.budgets.size) {
      callbacks.onFilter(null)
      return
    }
    const ids = districts.filter(d => {
      const tagOk = !activeFilters.tags.size || d.tags.some(t => activeFilters.tags.has(t))
      const budgetOk = !activeFilters.budgets.size || activeFilters.budgets.has(d.priceRange as BudgetFilter)
      return tagOk && budgetOk
    }).map(d => d.id)
    callbacks.onFilter(ids)
  }
}

function placeGeoMarker(map: L.Map, coords: [number, number]) {
  if (geocodeMarker) map.removeLayer(geocodeMarker)
  geocodeMarker = L.marker(coords, {
    icon: L.divIcon({
      className: 'geo-marker',
      html: '<div class="geo-marker-pin"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    }),
  }).addTo(map)
  map.flyTo(coords, 15, { duration: 0.8 })
  setTimeout(() => { if (geocodeMarker) { map.removeLayer(geocodeMarker); geocodeMarker = null } }, 8000)
}
