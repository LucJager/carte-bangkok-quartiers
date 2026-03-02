import L from 'leaflet'
import type { PoiCategory } from '../types'
import { pois, poiEmojis } from '../data/pois'

export function initPoiLayer(map: L.Map) {
  const groups: Record<string, L.LayerGroup> = {}
  const categories = [...new Set(pois.map(p => p.category))] as PoiCategory[]

  categories.forEach(cat => {
    const group = L.layerGroup()
    pois.filter(p => p.category === cat).forEach(p => {
      const emoji = poiEmojis[p.category] || '📍'
      L.marker(p.coords, {
        icon: L.divIcon({
          className: 'poi-marker',
          html: `<span class="poi-icon">${emoji}</span>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        }),
      }).bindTooltip(`<strong>${p.name}</strong>${p.address ? `<br><span style="opacity:0.7">${p.address}</span>` : ''}`, {
        direction: 'top', offset: [0, -14],
      }).addTo(group)
    })
    groups[cat] = group
  })

  function toggleCategory(cat: string, show: boolean) {
    const g = groups[cat]
    if (!g) return
    if (show) g.addTo(map); else map.removeLayer(g)
  }

  function showAll() { Object.values(groups).forEach(g => g.addTo(map)) }
  function hideAll() { Object.values(groups).forEach(g => map.removeLayer(g)) }

  return { groups, toggleCategory, showAll, hideAll, categories }
}
