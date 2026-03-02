import L from 'leaflet'

export function initControls(
  map: L.Map,
  transitLayer: L.LayerGroup,
  riverLayer: L.LayerGroup,
): void {
  const Control = L.Control.extend({
    onAdd() {
      const container = L.DomUtil.create('div', 'map-controls')
      container.innerHTML = `
        <button class="control-btn active" data-layer="transit" title="Transit">🚆</button>
        <button class="control-btn active" data-layer="river" title="Fleuve">🌊</button>
      `
      Object.assign(container.style, {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      })
      container.querySelectorAll<HTMLButtonElement>('.control-btn').forEach(btn => {
        Object.assign(btn.style, {
          width: '34px',
          height: '34px',
          border: '2px solid rgba(255,255,255,0.2)',
          borderRadius: '6px',
          background: 'rgba(30,30,40,0.85)',
          color: '#fff',
          fontSize: '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s',
        })
      })
      const layers: Record<string, L.LayerGroup> = { transit: transitLayer, river: riverLayer }
      L.DomEvent.disableClickPropagation(container)
      container.addEventListener('click', e => {
        const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.control-btn')
        if (!btn) return
        const layer = layers[btn.dataset.layer!]
        if (!layer) return
        const active = map.hasLayer(layer)
        if (active) {
          map.removeLayer(layer)
          btn.classList.remove('active')
          btn.style.opacity = '0.4'
          btn.style.borderColor = 'rgba(255,255,255,0.1)'
        } else {
          layer.addTo(map)
          btn.classList.add('active')
          btn.style.opacity = '1'
          btn.style.borderColor = 'rgba(255,255,255,0.2)'
        }
      })
      return container
    },
  })
  new Control({ position: 'topright' }).addTo(map)
}
