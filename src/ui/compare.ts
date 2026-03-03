import type { District } from '../types'
import { findNearestStation } from '../utils/geo'
import { transitLines } from '../data/transit-lines'
import { TAG_META } from '../data/tag-meta'

export interface CompareConfig {
  onClose: () => void
  onRemove: (remaining: number) => void
  onAdd: () => void
  allDistricts: District[]
}

let panel: HTMLDivElement
const selected: District[] = []
let toast: HTMLDivElement
let config: CompareConfig

export function initCompare(cfg: CompareConfig) {
  config = cfg
  panel = document.createElement('div')
  panel.id = 'compare-panel'
  document.body.appendChild(panel)

  panel.addEventListener('click', (e) => {
    const t = e.target as HTMLElement
    if (t.closest('#compare-close')) { hideCompare(); config.onClose(); return }
    const rm = t.closest('.compare-remove') as HTMLElement
    if (rm) { removeFromCompare(rm.dataset.id!); return }
    if (t.closest('.compare-add-btn')) {
      panel.querySelector('.compare-add-dropdown')?.classList.toggle('open')
      return
    }
    const item = t.closest('.compare-add-item') as HTMLElement
    if (item) {
      const d = config.allDistricts.find(x => x.id === item.dataset.id)
      if (d && !selected.some(s => s.id === d.id) && selected.length < 5) {
        selected.push(d)
        showCompare()
        config.onAdd()
      }
      return
    }
    if (!t.closest('.compare-cell--add')) {
      panel.querySelector('.compare-add-dropdown')?.classList.remove('open')
    }
  })

  toast = document.createElement('div')
  toast.id = 'compare-toast'
  document.body.appendChild(toast)
}

export function setCompareToast(msg: string | null) {
  if (!toast) return
  if (msg) { toast.textContent = msg; toast.classList.add('visible') }
  else toast.classList.remove('visible')
}

export function addToCompare(d: District): boolean {
  if (selected.length >= 5 || selected.some(s => s.id === d.id)) return false
  selected.push(d)
  return true
}

function removeFromCompare(id: string) {
  const idx = selected.findIndex(s => s.id === id)
  if (idx === -1) return
  selected.splice(idx, 1)
  if (selected.length < 2) {
    hideCompare()
    config.onRemove(selected.length)
  } else {
    showCompare()
    config.onRemove(selected.length)
  }
}

export function clearCompare() { selected.length = 0 }
export function getCompareCount() { return selected.length }
export function getCompareIds() { return selected.map(s => s.id) }

export function showCompare() {
  if (selected.length < 2) return
  const hasAdd = selected.length < 5
  const cols = hasAdd
    ? `120px repeat(${selected.length}, 1fr) 140px`
    : `120px repeat(${selected.length}, 1fr)`
  const pad = hasAdd ? '<div class="compare-cell--pad"></div>' : ''
  const stations = selected.map(d => findNearestStation(d.center, transitLines))
  const available = config.allDistricts.filter(d => !selected.some(s => s.id === d.id))

  const addCell = hasAdd ? `<div class="compare-cell compare-cell--add">
    <button class="compare-add-btn" aria-label="Ajouter un quartier">+</button>
    <div class="compare-add-dropdown">${available.map(d =>
      `<button class="compare-add-item" data-id="${d.id}"><span class="compare-add-color" style="background:${d.color}"></span>${d.name} <span class="compare-add-thai">${d.nameThai}</span></button>`
    ).join('')}</div></div>` : ''

  const cell = (d: District, html: string) =>
    `<div class="compare-cell" data-name="${d.name}">${html}</div>`

  const row = (label: string, cells: string) =>
    `<div class="compare-row" style="--grid:${cols}"><div class="compare-row-label">${label}</div>${cells}${pad}</div>`

  panel.innerHTML = `
    <div class="compare-header-bar">
      <h2 class="compare-title">Comparaison</h2>
      <button id="compare-close" aria-label="Fermer la comparaison">&times;</button>
    </div>
    <div class="compare-scroll"><div class="compare-table">
      <div class="compare-row compare-row--header" style="--grid:${cols}">
        <div class="compare-row-label"></div>
        ${selected.map(d => `<div class="compare-cell"><div class="compare-cell-header">
          <span class="compare-color" style="background:${d.color}"></span>
          <div><h3>${d.name}</h3><span class="compare-thai">${d.nameThai}</span></div>
          <button class="compare-remove" data-id="${d.id}" aria-label="Retirer ${d.name}">&times;</button>
        </div></div>`).join('')}
        ${addCell}
      </div>

      ${row('Budget', selected.map(d => {
        const w = (d.priceRange.length / 4) * 100
        return cell(d, `<div class="compare-bar-wrap"><div class="compare-bar" style="width:${w}%;background:${d.color}">${d.priceRange}</div></div>`)
      }).join(''))}

      ${row('Rating', selected.map(d => {
        const w = (d.rating / 5) * 100
        const full = Math.floor(d.rating)
        const stars = '\u2605'.repeat(full) + '\u2606'.repeat(5 - full)
        return cell(d, `<div class="compare-rating"><span class="compare-stars">${stars}</span><span class="compare-rating-num">${d.rating}/5</span></div><div class="compare-bar-wrap"><div class="compare-bar" style="width:${w}%;background:${d.color}"></div></div>`)
      }).join(''))}

      ${row('Tags', selected.map(d => cell(d,
        `<div class="compare-tags">${d.tags.map(t => {
          const m = TAG_META[t]
          return `<span class="compare-tag" style="--tag-color:${m.color}">${m.emoji} ${m.label}</span>`
        }).join('')}</div>`
      )).join(''))}

      ${row('Transport', selected.map((d, i) => {
        const s = stations[i]
        return cell(d, s
          ? `<span class="station-type station-${s.type}">${s.type.toUpperCase()}</span> ${s.name} — ${s.distance}m`
          : '<span class="compare-muted">—</span>')
      }).join(''))}

      ${row('Idéal pour', selected.map(d =>
        cell(d, `<div class="compare-bestfor" style="border-color:${d.color}">${d.bestFor}</div>`)
      ).join(''))}

      ${row('Avantages', selected.map(d =>
        cell(d, `<ul class="compare-pros">${d.pros.map(p => `<li>${p}</li>`).join('')}</ul>`)
      ).join(''))}

      ${row('Inconvénients', selected.map(d =>
        cell(d, `<ul class="compare-cons">${d.cons.map(c => `<li>${c}</li>`).join('')}</ul>`)
      ).join(''))}

      ${row('Activités', selected.map(d =>
        cell(d, `<div class="compare-activities">${d.activities.map(a => `<span class="compare-activity">${a}</span>`).join('')}</div>`)
      ).join(''))}
    </div></div>`

  panel.classList.add('open')
}

export function hideCompare() { panel.classList.remove('open') }
export function isCompareOpen() { return panel?.classList.contains('open') ?? false }
