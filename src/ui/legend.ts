import { districts } from '../data/districts'

export function initLegend(onSelect: (id: string) => void) {
  const legend = document.createElement('div')
  legend.id = 'legend'
  legend.innerHTML = `<div class="legend-title">Quartiers</div>` +
    districts.map(d => `
      <div class="legend-item" data-id="${d.id}">
        <span class="legend-dot" style="background:${d.color}"></span>
        <span class="legend-name">${d.name}</span>
      </div>
    `).join('')
  document.body.appendChild(legend)

  legend.addEventListener('click', (e) => {
    const item = (e.target as HTMLElement).closest('.legend-item') as HTMLElement | null
    if (!item) return
    const id = item.dataset.id!
    setActive(id)
    onSelect(id)
  })
}

export function setActive(id: string | null) {
  document.querySelectorAll('.legend-item').forEach(el => {
    const item = el as HTMLElement
    const d = districts.find(d => d.id === item.dataset.id)
    if (item.dataset.id === id && d) {
      item.classList.add('active')
      item.style.borderLeftColor = d.color
    } else {
      item.classList.remove('active')
      item.style.borderLeftColor = 'transparent'
    }
  })
}
