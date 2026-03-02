import L from 'leaflet'
import { riverCoords } from '../data/river'

export function initRiverLayer(map: L.Map): L.LayerGroup {
  const group = L.layerGroup()
  L.polyline(riverCoords, {
    color: 'rgba(70, 150, 220, 0.3)',
    weight: 8,
    lineJoin: 'round',
    lineCap: 'round',
    interactive: false,
  }).addTo(group)
  group.addTo(map)
  return group
}
