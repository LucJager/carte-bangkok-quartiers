import type { District } from '../types'
import { findNearestStation } from '../utils/geo'
import { transitLines } from '../data/transit-lines'

let panel: HTMLDivElement
const selected: District[] = []

export function initCompare() {
  panel = document.createElement('div')
  panel.id = 'compare-panel'
  panel.innerHTML = '<button id="compare-close" aria-label="Fermer la comparaison">&times;</button><div id="compare-content"></div>'
  document.body.appendChild(panel)
  panel.querySelector('#compare-close')!.addEventListener('click', hideCompare)
}

export function addToCompare(d: District): boolean {
  if (selected.length >= 3 || selected.some(s => s.id === d.id)) return false
  selected.push(d)
  return true
}

export function removeFromCompare(id: string) {
  const idx = selected.findIndex(s => s.id === id)
  if (idx >= 0) selected.splice(idx, 1)
}

export function clearCompare() { selected.length = 0 }
export function getCompareCount() { return selected.length }
export function getCompareIds() { return selected.map(s => s.id) }

export function showCompare() {
  if (selected.length < 2) return
  const content = panel.querySelector('#compare-content')!
  const maxBudget = 4

  content.innerHTML = `
    <h2 class="compare-title">Comparaison</h2>
    <div class="compare-grid" style="grid-template-columns:repeat(${selected.length},1fr)">
      ${selected.map(d => {
        const nearest = findNearestStation(d.center, transitLines)
        const budgetWidth = (d.priceRange.length / maxBudget) * 100
        const ratingWidth = (d.rating / 5) * 100
        return `
          <div class="compare-card" style="border-top:3px solid ${d.color}">
            <h3>${d.name}</h3>
            <span class="compare-thai">${d.nameThai}</span>
            <div class="compare-row">
              <span class="compare-label">Budget</span>
              <div class="compare-bar-wrap"><div class="compare-bar" style="width:${budgetWidth}%;background:${d.color}">${d.priceRange}</div></div>
            </div>
            <div class="compare-row">
              <span class="compare-label">Rating</span>
              <div class="compare-bar-wrap"><div class="compare-bar" style="width:${ratingWidth}%;background:${d.color}">${d.rating}/5</div></div>
            </div>
            ${nearest ? `<div class="compare-station"><span class="station-type station-${nearest.type}">${nearest.type.toUpperCase()}</span> ${nearest.name} — ${nearest.distance}m</div>` : ''}
            <div class="compare-bestfor">${d.bestFor}</div>
          </div>
        `
      }).join('')}
    </div>
  `
  panel.classList.add('open')
}

export function hideCompare() {
  panel.classList.remove('open')
}

export function isCompareOpen() { return panel?.classList.contains('open') ?? false }
