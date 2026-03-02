import L from 'leaflet'
import { districts } from '../data/districts'
import { showPanel } from '../ui/panel'

let selectedId: string | null = null
const polygonMap = new Map<string, { shadow: L.Polygon, main: L.Polygon }>()

export function initDistrictsLayer(map: L.Map, onSelect?: (id: string) => void) {
  const layer = L.layerGroup()

  districts.forEach(d => {
    const shadow = L.polygon(d.polygon, {
      color: d.color, weight: 8, fillOpacity: 0, opacity: 0.15,
      className: 'district-shadow', interactive: false
    }).addTo(layer)

    const main = L.polygon(d.polygon, {
      color: d.color, weight: 2, fillColor: d.color, fillOpacity: 0.2,
      className: 'district-polygon', bubblingMouseEvents: false
    }).addTo(layer)

    main.on('mouseover', () => {
      if (selectedId === d.id) return
      shadow.setStyle({ opacity: 0.3 })
      main.setStyle({ weight: 3, fillOpacity: 0.3 })
    })

    main.on('mouseout', () => {
      if (selectedId === d.id) return
      shadow.setStyle({ opacity: 0.15 })
      main.setStyle({ weight: 2, fillOpacity: selectedId ? 0.08 : 0.2 })
    })

    main.on('click', () => select(d.id))

    L.marker(d.center, {
      icon: L.divIcon({
        className: 'district-label',
        html: `<span>${d.name}</span>`,
        iconSize: [120, 24],
        iconAnchor: [60, 12]
      }),
      interactive: false
    }).addTo(layer)

    polygonMap.set(d.id, { shadow, main })
  })

  function select(id: string) {
    selectedId = id
    const d = districts.find(x => x.id === id)!
    polygonMap.forEach(({ shadow, main }, pid) => {
      if (pid === id) {
        shadow.setStyle({ opacity: 0.3 })
        main.setStyle({ weight: 3, fillOpacity: 0.35 })
      } else {
        shadow.setStyle({ opacity: 0.1 })
        main.setStyle({ weight: 1, fillOpacity: 0.08 })
      }
    })
    map.flyToBounds(L.latLngBounds(d.polygon), { duration: 0.8, padding: [50, 50] })
    showPanel(d)
    onSelect?.(id)
  }

  function deselect() {
    selectedId = null
    polygonMap.forEach(({ shadow, main }) => {
      shadow.setStyle({ opacity: 0.15 })
      main.setStyle({ weight: 2, fillOpacity: 0.2 })
    })
  }

  return { layer, select, deselect }
}
