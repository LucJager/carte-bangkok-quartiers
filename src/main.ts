import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './styles/main.css'
import './styles/map.css'
import './styles/panel.css'
import './styles/legend.css'
import './styles/mobile.css'

import { initDistrictsLayer } from './layers/districts'
import { initTransitLayer } from './layers/transit'
import { initRiverLayer } from './layers/river'
import { initPanel, hidePanel } from './ui/panel'
import { initLegend, setActive } from './ui/legend'
import { initControls } from './ui/controls'

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

// Layers
const { layer: districtsLayer, select, deselect } = initDistrictsLayer(map, (id) => setActive(id))
districtsLayer.addTo(map)

const transitLayer = initTransitLayer(map)
const riverLayer = initRiverLayer(map)

// Controls
initControls(map, transitLayer, riverLayer)

// Legend → district selection
initLegend((id) => { select(id); setActive(id) })

// Panel close → reset
document.getElementById('panel-close')!.addEventListener('click', () => {
  deselect()
  setActive(null)
})

// Map background click → reset
map.on('click', () => {
  hidePanel()
  deselect()
  setActive(null)
})
