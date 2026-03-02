import L from 'leaflet'
import { transitLines } from '../data/transit-lines'

export function initTransitLayer(map: L.Map): L.LayerGroup {
  const group = L.layerGroup()

  for (const line of transitLines) {
    const latlngs = line.stations.map(s => s.coords as L.LatLngTuple)
    L.polyline(latlngs, { color: line.color, weight: 3, opacity: 0.8 }).addTo(group)

    for (const station of line.stations) {
      L.circleMarker(station.coords as L.LatLngTuple, {
        radius: 4,
        fillColor: line.color,
        fillOpacity: 1,
        weight: 1,
        color: '#fff',
      })
        .bindTooltip(station.name)
        .addTo(group)
    }
  }

  group.addTo(map)
  return group
}
