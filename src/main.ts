import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './styles/main.css'
import './styles/map.css'
import './styles/panel.css'
import './styles/legend.css'
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
import { initLegend, setActive } from './ui/legend'
import { initControls } from './ui/controls'
import { initSearch } from './ui/search'
import { initFeedback } from './ui/feedback'
import { initCompare, addToCompare, showCompare, hideCompare, clearCompare, getCompareCount, getCompareIds, isCompareOpen } from './ui/compare'

const map = L.map('map', {
  center: [13.745, 100.523],
  zoom: 12,
  zoomControl: false,
  attributionControl: false,
})

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  maxZoom: 19,
}).addTo(map)

L.control.zoom({ position: 'topright' }).addTo(map)
L.control.attribution({ position: 'bottomright' }).addTo(map).addAttribution(
  '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
)

// UI
initPanel()
initCompare()

// Layers
const { layer: districtsLayer, select, deselect, highlightFiltered, selectMulti } = initDistrictsLayer(
  map,
  (id) => setActive(id),
  (id) => {
    // Shift+click → compare
    const d = districts.find(x => x.id === id)
    if (!d) return
    if (addToCompare(d)) {
      controls.updateBadge()
      selectMulti(getCompareIds())
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
  onCompare: () => {
    if (getCompareCount() >= 2) {
      hidePanel()
      showCompare()
    }
  },
  compareCount: getCompareCount,
})

// Search
initSearch(map, {
  onSelectDistrict: (id) => { select(id); setActive(id) },
  onFilter: (ids) => highlightFiltered(ids),
})

// Legend
initLegend((id) => { select(id); setActive(id) })

// Feedback
initFeedback()

// Panel close
document.getElementById('panel-close')!.addEventListener('click', () => {
  deselect()
  setActive(null)
})

// Map background click
map.on('click', () => {
  hidePanel()
  if (isCompareOpen()) {
    hideCompare()
    clearCompare()
    controls.updateBadge()
  }
  deselect()
  setActive(null)
})
