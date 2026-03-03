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
  onEnterCompareMode: () => void
  onExitCompareMode: () => void
  isCompareModeActive: () => boolean
}

export function initControls(config: ControlsConfig) {
  const { map, transitLayer, riverLayer, poiToggle, poiCategories, onCompare, compareCount, onEnterCompareMode, onExitCompareMode, isCompareModeActive } = config

  const wrapper = document.createElement('div')
  wrapper.id = 'map-controls-wrapper'
  document.body.appendChild(wrapper)

  // Layers button + popover
  const layersContainer = document.createElement('div')
  layersContainer.style.position = 'relative'
  const layersBtn = document.createElement('button')
  layersBtn.className = 'ctrl-btn'
  layersBtn.setAttribute('aria-label', 'Filtres')
  layersBtn.innerHTML = '<span class="ctrl-icon">🗺️</span><span class="ctrl-label">Filtres</span>'

  const popover = document.createElement('div')
  popover.className = 'layers-popover'

  const layers: { key: string; emoji: string; label: string; checked: boolean; toggle: (show: boolean) => void }[] = [
    { key: 'transit', emoji: '🚆', label: 'Transit', checked: true, toggle: (show) => show ? transitLayer.addTo(map) : map.removeLayer(transitLayer) },
    { key: 'river', emoji: '🌊', label: 'Fleuve', checked: true, toggle: (show) => show ? riverLayer.addTo(map) : map.removeLayer(riverLayer) },
    ...poiCategories.map(cat => ({
      key: cat, emoji: poiEmojis[cat], label: poiLabels[cat], checked: false,
      toggle: (show: boolean) => poiToggle(cat, show),
    })),
  ]

  layers.forEach(l => {
    const label = document.createElement('label')
    const cb = document.createElement('input')
    cb.type = 'checkbox'
    cb.checked = l.checked
    cb.addEventListener('change', () => l.toggle(cb.checked))
    label.appendChild(cb)
    label.append(` ${l.emoji} ${l.label}`)
    popover.appendChild(label)
  })

  layersBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    popover.classList.toggle('open')
  })
  document.addEventListener('click', () => popover.classList.remove('open'))
  popover.addEventListener('click', (e) => e.stopPropagation())

  layersContainer.appendChild(layersBtn)
  layersContainer.appendChild(popover)

  // Compare button
  const compareBtn = document.createElement('button')
  compareBtn.className = 'ctrl-btn'
  compareBtn.setAttribute('aria-label', 'Comparer')
  compareBtn.innerHTML = '<span class="ctrl-icon">⚖️</span><span class="ctrl-label">Comparer</span><span class="compare-badge" id="compare-badge">0</span>'
  compareBtn.addEventListener('click', () => {
    if (!isCompareModeActive()) {
      onEnterCompareMode()
    } else if (compareCount() >= 2) {
      onCompare()
    } else {
      onExitCompareMode()
    }
  })

  wrapper.appendChild(layersContainer)
  wrapper.appendChild(compareBtn)

  return {
    updateBadge() {
      const badge = document.getElementById('compare-badge')
      const count = compareCount()
      if (badge) {
        badge.textContent = String(count)
        badge.classList.toggle('visible', count > 0)
      }
    },
    setCompareActive(active: boolean) {
      compareBtn.classList.toggle('active', active)
    }
  }
}
