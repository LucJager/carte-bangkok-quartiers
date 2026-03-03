import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './styles/main.css'
import './styles/map.css'
import './styles/panel.css'
import './styles/mobile.css'
import './styles/search.css'
import './styles/compare.css'
import './styles/feedback.css'

import { districts } from './data/districts'
import { initDistrictsLayer } from './layers/districts'
import { initTransitLayer } from './layers/transit'
import { initRiverLayer } from './layers/river'
import { initPoiLayer } from './layers/pois'
import { initPanel, hidePanel } from './ui/panel'
import { initControls } from './ui/controls'
import { initSearch } from './ui/search'
import { initFeedback } from './ui/feedback'
import { initTheme } from './ui/theme'
import { initCategoryBar } from './ui/category-bar'
import { initCompare, addToCompare, showCompare, hideCompare, clearCompare, getCompareCount, getCompareIds, isCompareOpen, setCompareToast } from './ui/compare'

const map = L.map('map', {
  center: [13.745, 100.523],
  zoom: 12,
  zoomControl: false,
  attributionControl: false,
})

const initialTheme = localStorage.getItem('theme') || 'light'
const tileUrl = initialTheme === 'light'
  ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
  : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

const tileLayer = L.tileLayer(tileUrl, { maxZoom: 19 }).addTo(map)

L.control.zoom({ position: 'bottomright' }).addTo(map)
L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map).addAttribution(
  '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
)

// UI
initPanel()
initCompare({
  onClose: () => { clearCompare(); controls.updateBadge(); deselect() },
  onRemove: (remaining) => {
    controls.updateBadge()
    if (remaining < 2) deselect()
    else selectMulti(getCompareIds())
  },
  onAdd: () => { controls.updateBadge(); selectMulti(getCompareIds()) },
  allDistricts: districts,
})

// Compare mode state
let compareModeActive = false

function enterCompareMode() {
  compareModeActive = true
  hidePanel()
  deselect()
  controls.setCompareActive(true)
  document.body.classList.add('compare-mode-active')
  updateCompareToast()
}

function exitCompareMode() {
  compareModeActive = false
  clearCompare()
  controls.setCompareActive(false)
  controls.updateBadge()
  setCompareToast(null)
  document.body.classList.remove('compare-mode-active')
  deselect()
}

function triggerShowCompare() {
  compareModeActive = false
  controls.setCompareActive(false)
  setCompareToast(null)
  document.body.classList.remove('compare-mode-active')
  hidePanel()
  showCompare()
}

function updateCompareToast() {
  const count = getCompareCount()
  if (count === 0) setCompareToast('Clique sur 2 quartiers à comparer')
  else setCompareToast('1 ajouté · encore 1 minimum')
}

// Layers
const { layer: districtsLayer, select, deselect, highlightFiltered, selectMulti } = initDistrictsLayer(
  map,
  undefined,
  (id) => {
    if (compareModeActive) {
      const d = districts.find(x => x.id === id)!
      if (addToCompare(d)) {
        controls.updateBadge()
        selectMulti(getCompareIds())
        updateCompareToast()
        if (getCompareCount() === 2) triggerShowCompare()
      }
    } else {
      select(id)
    }
  }
)
districtsLayer.addTo(map)

const transitLayer = initTransitLayer(map)
const riverLayer = initRiverLayer(map)
const { toggleCategory, categories: poiCategories } = initPoiLayer(map)

// Controls
const controls = initControls({
  map,
  transitLayer,
  riverLayer,
  poiToggle: toggleCategory,
  poiCategories,
  onCompare: () => triggerShowCompare(),
  compareCount: getCompareCount,
  onEnterCompareMode: () => enterCompareMode(),
  onExitCompareMode: () => exitCompareMode(),
  isCompareModeActive: () => compareModeActive,
})

// Search
initSearch(map, {
  onSelectDistrict: (id) => { select(id) },
})

// Category bar
initCategoryBar((ids) => highlightFiltered(ids))

// Feedback
initFeedback()

// Theme
initTheme()
document.addEventListener('theme-change', ((e: CustomEvent) => {
  const url = e.detail.theme === 'light'
    ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
  tileLayer.setUrl(url)
}) as EventListener)

// Panel close
document.getElementById('panel-close')!.addEventListener('click', () => {
  deselect()
})

// Escape key
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return
  if (compareModeActive) exitCompareMode()
  else if (isCompareOpen()) { hideCompare(); clearCompare(); controls.updateBadge(); deselect() }
})

// Map background click
map.on('click', () => {
  if (compareModeActive) {
    exitCompareMode()
    return
  }
  hidePanel()
  if (isCompareOpen()) {
    hideCompare()
    clearCompare()
    controls.updateBadge()
  }
  deselect()
})
