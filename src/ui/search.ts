import L from 'leaflet'
import { districts } from '../data/districts'
import { fuzzyMatch } from '../utils/fuzzy'
import { pointInPolygon } from '../utils/geo'
import { escapeHtml } from '../utils/sanitize'

interface SearchCallbacks {
  onSelectDistrict: (id: string) => void
}

let geocodeMarker: L.Marker | null = null
let debounceTimer: ReturnType<typeof setTimeout>

export function initSearch(map: L.Map, callbacks: SearchCallbacks) {
  const wrapper = document.createElement('div')
  wrapper.id = 'search-wrapper'
  wrapper.innerHTML = `
    <div class="search-bar">
      <input id="search-input" type="text" placeholder="Rechercher un quartier ou lieu..." autocomplete="off" aria-label="Rechercher" />
      <div id="search-dropdown" class="search-dropdown" role="listbox" aria-label="Résultats"></div>
    </div>
  `
  document.body.appendChild(wrapper)

  const input = document.getElementById('search-input') as HTMLInputElement
  const dropdown = document.getElementById('search-dropdown')!

  function showAllDistricts() {
    dropdown.innerHTML = districts.map(d =>
      `<div class="dropdown-item" data-district="${d.id}" role="option"><span class="dropdown-dot" style="background:${d.color}"></span>${d.name} <span class="dropdown-thai">${d.nameThai}</span></div>`
    ).join('')
    dropdown.classList.add('open')
  }

  input.addEventListener('focus', () => {
    if (!input.value.trim()) showAllDistricts()
  })

  // Search input
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer)
    const q = input.value.trim()
    if (!q) { showAllDistricts(); return }
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
