import { districts } from '../data/districts'

export function initLegend(onSelect: (id: string) => void) {
  const legend = document.createElement('div')
  legend.id = 'legend'
  legend.setAttribute('role', 'navigation')
  legend.setAttribute('aria-label', 'Légende des quartiers')
  legend.innerHTML =
    `<button id="legend-toggle" aria-expanded="false" aria-controls="legend-list">Quartiers ▾</button>` +
    `<div id="legend-list">` +
    districts.map(d => `
      <div class="legend-item" data-id="${d.id}" role="button" tabindex="0" aria-label="${d.name}">
        <span class="legend-dot" style="background:${d.color}"></span>
        <span class="legend-name">${d.name}</span>
      </div>
    `).join('') +
    `</div>`
  document.body.appendChild(legend)

  // Toggle mobile collapse
  const toggle = legend.querySelector('#legend-toggle')!
  toggle.addEventListener('click', (e) => {
    e.stopPropagation()
    const expanded = legend.classList.toggle('expanded')
    toggle.setAttribute('aria-expanded', String(expanded))
    ;(toggle as HTMLElement).textContent = expanded ? 'Quartiers ▴' : 'Quartiers ▾'
  })

  // Select district
  legend.addEventListener('click', (e) => {
    const item = (e.target as HTMLElement).closest('.legend-item') as HTMLElement | null
    if (!item) return
    const id = item.dataset.id!
    setActive(id)
    onSelect(id)
  })

  // Keyboard support
  legend.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    const item = (e.target as HTMLElement).closest('.legend-item') as HTMLElement | null
    if (!item) return
    e.preventDefault()
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
