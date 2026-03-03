import L from 'leaflet'
import { districts } from '../data/districts'
import { showPanel } from '../ui/panel'

let selectedId: string | null = null
let filteredIds: string[] | null = null
const polygonMap = new Map<string, L.Polygon>()

export function initDistrictsLayer(map: L.Map, onSelect?: (id: string) => void, onClick?: (id: string) => void) {
  const layer = L.layerGroup()

  districts.forEach(d => {
    const main = L.polygon(d.polygon, {
      color: d.color, weight: 2.5, fillColor: d.color, fillOpacity: 0.25,
      className: 'district-polygon', bubblingMouseEvents: false
    }).addTo(layer)

    main.on('mouseover', () => {
      if (selectedId === d.id) return
      main.setStyle({ weight: 3.5, fillOpacity: 0.4 })
    })

    main.on('mouseout', () => {
      if (selectedId === d.id) return
      const dimmed = filteredIds && !filteredIds.includes(d.id)
      main.setStyle({ weight: 2.5, fillOpacity: dimmed ? 0.05 : (selectedId ? 0.08 : 0.25) })
    })

    main.on('click', () => {
      onClick ? onClick(d.id) : select(d.id)
    })

    L.marker(d.center, {
      icon: L.divIcon({
        className: 'district-label',
        html: `<span>${d.name}</span>`,
        iconSize: [160, 30],
        iconAnchor: [80, 15]
      }),
      interactive: false
    }).addTo(layer)

    polygonMap.set(d.id, main)
  })

  function select(id: string) {
    selectedId = id
    const d = districts.find(x => x.id === id)!
    polygonMap.forEach((main, pid) => {
      if (pid === id) {
        main.setStyle({ weight: 3.5, fillOpacity: 0.45 })
      } else {
        main.setStyle({ weight: 1.5, fillOpacity: 0.08 })
      }
    })
    map.flyToBounds(L.latLngBounds(d.polygon), { duration: 0.8, padding: [50, 50] })
    showPanel(d)
    onSelect?.(id)
  }

  function deselect() {
    selectedId = null
    applyFilter()
  }

  function highlightFiltered(ids: string[] | null) {
    filteredIds = ids
    if (selectedId) return
    applyFilter()
  }

  function applyFilter() {
    polygonMap.forEach((main, pid) => {
      if (filteredIds && !filteredIds.includes(pid)) {
        main.setStyle({ weight: 1, fillOpacity: 0.05 })
      } else {
        main.setStyle({ weight: 2.5, fillOpacity: 0.25 })
      }
    })
  }

  function selectMulti(ids: string[]) {
    selectedId = null
    polygonMap.forEach((main, pid) => {
      if (ids.includes(pid)) {
        main.setStyle({ weight: 3.5, fillOpacity: 0.4 })
      } else {
        main.setStyle({ weight: 1.5, fillOpacity: 0.06 })
      }
    })
  }

  return { layer, select, deselect, highlightFiltered, selectMulti }
}
