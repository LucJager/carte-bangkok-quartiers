import type { District } from '../types'
import { findNearestStation } from '../utils/geo'
import { transitLines } from '../data/transit-lines'

let panel: HTMLDivElement

function stars(rating: number): string {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5 ? 1 : 0
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half)
}

export function initPanel() {
  panel = document.createElement('div')
  panel.id = 'detail-panel'
  panel.setAttribute('role', 'complementary')
  panel.setAttribute('aria-label', 'Détails du quartier')
  panel.innerHTML = '<button id="panel-close" aria-label="Fermer le panneau">&times;</button><div id="panel-content"></div>'
  document.body.appendChild(panel)
  panel.querySelector('#panel-close')!.addEventListener('click', hidePanel)
}

export function showPanel(d: District) {
  const content = panel.querySelector('#panel-content')!
  const nearest = findNearestStation(d.center, transitLines)

  content.innerHTML = `
    <div class="panel-header">
      <h2>${d.name}</h2>
      <span class="panel-thai">${d.nameThai}</span>
      <div class="panel-rating" style="color:${d.color}">${stars(d.rating)} <span>${d.rating}</span></div>
    </div>
    <p class="panel-desc">${d.description}</p>
    <div class="panel-price" style="background:linear-gradient(135deg,${d.color}33,${d.color}11)">
      <span class="price-label">Budget</span><span class="price-value">${d.priceRange}</span>
    </div>
    ${nearest ? `
    <div class="panel-nearest panel-item" style="animation-delay:0.05s">
      <span class="station-badge station-${nearest.type}">${nearest.type.toUpperCase()}</span>
      <span class="station-info">${nearest.name} — ${nearest.distance}m</span>
    </div>` : ''}
    <div class="panel-section panel-item" style="animation-delay:0.1s">
      <h3>Avantages</h3>
      ${d.pros.map(p => `<div class="pro-item"><span class="icon-pro">&#10003;</span> ${p}</div>`).join('')}
    </div>
    <div class="panel-section panel-item" style="animation-delay:0.2s">
      <h3>Inconvénients</h3>
      ${d.cons.map(c => `<div class="con-item"><span class="icon-con">&#10007;</span> ${c}</div>`).join('')}
    </div>
    <div class="panel-section panel-item" style="animation-delay:0.3s">
      <h3>Activités</h3>
      ${d.activities.map(a => `<div class="activity-item">→ ${a}</div>`).join('')}
    </div>
    <div class="panel-bestfor panel-item" style="animation-delay:0.4s;border-left:3px solid ${d.color}">
      <strong>Idéal pour :</strong> ${d.bestFor}
    </div>
    ${d.tags.length ? `<div class="panel-tags panel-item" style="animation-delay:0.45s">${d.tags.map(t => `<span class="panel-tag">${t}</span>`).join('')}</div>` : ''}
  `
  panel.classList.add('open')
}

export function hidePanel() {
  panel.classList.remove('open')
}
