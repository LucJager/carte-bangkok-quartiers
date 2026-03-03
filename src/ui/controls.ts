import L from 'leaflet'
import type { PoiCategory } from '../types'
import { poiEmojis, poiLabels } from '../data/pois'

interface ControlsConfig {
  map: L.Map
  transitLayer: L.LayerGroup
  riverLayer: L.LayerGroup
  poiToggle: (cat: string, show: boolean) => void
  poiCategories: PoiCategory[]
  onCompare: () => void
  compareCount: () => number
}

export function initControls(config: ControlsConfig) {
  const { map, transitLayer, riverLayer, poiToggle, poiCategories, onCompare, compareCount } = config

  const Control = L.Control.extend({
    onAdd() {
      const container = L.DomUtil.create('div', 'map-controls')

      const layerBtns = `
        <button class="control-btn active" data-layer="transit" title="Transit" aria-pressed="true">🚆</button>
        <button class="control-btn active" data-layer="river" title="Fleuve" aria-pressed="true">🌊</button>
      `
      const poiBtns = poiCategories.map(cat =>
        `<button class="control-btn control-poi" data-poi="${cat}" title="${poiLabels[cat]}" aria-pressed="false">${poiEmojis[cat]}</button>`
      ).join('')

      container.innerHTML = `
        <button class="control-btn controls-collapse-btn" id="controls-toggle" title="Replier" aria-expanded="true">—</button>
        <div id="controls-body" class="controls-body">
          <div class="controls-group">${layerBtns}</div>
          <div class="controls-sep"></div>
          <div class="controls-group controls-poi-group">${poiBtns}</div>
          <div class="controls-sep"></div>
          <button class="control-btn control-compare" id="btn-compare" title="Comparer" aria-label="Comparer les quartiers">
            ⚖️<span class="compare-badge" id="compare-badge">0</span>
          </button>
        </div>
      `

      L.DomEvent.disableClickPropagation(container)

      const toggleBtn = container.querySelector('#controls-toggle')!
      const body = container.querySelector('#controls-body')!
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        const collapsed = body.classList.toggle('collapsed')
        toggleBtn.setAttribute('aria-expanded', String(!collapsed))
        toggleBtn.textContent = collapsed ? '+' : '—'
      })

      const layers: Record<string, L.LayerGroup> = { transit: transitLayer, river: riverLayer }

      container.addEventListener('click', e => {
        const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.control-btn')
        if (!btn || btn.id === 'controls-toggle') return

        // Layer toggle
        if (btn.dataset.layer) {
          const layer = layers[btn.dataset.layer]
          if (!layer) return
          const active = map.hasLayer(layer)
          if (active) { map.removeLayer(layer) } else { layer.addTo(map) }
          btn.classList.toggle('active', !active)
          btn.setAttribute('aria-pressed', String(!active))
        }

        // POI toggle
        if (btn.dataset.poi) {
          const active = btn.classList.toggle('active')
          btn.setAttribute('aria-pressed', String(active))
          poiToggle(btn.dataset.poi, active)
        }

        // Compare
        if (btn.classList.contains('control-compare')) {
          onCompare()
        }
      })

      return container
    },
  })

  new Control({ position: 'topleft' }).addTo(map)

  return {
    updateBadge() {
      const badge = document.getElementById('compare-badge')
      const count = compareCount()
      if (badge) {
        badge.textContent = String(count)
        badge.classList.toggle('visible', count > 0)
      }
    }
  }
}
