import type { TagFilter } from '../types'
import { districts } from '../data/districts'
import { TAG_META } from '../data/tag-meta'
import '../styles/category-bar.css'

const CATEGORIES = (Object.entries(TAG_META) as [TagFilter, typeof TAG_META[TagFilter]][]).map(
  ([tag, meta]) => ({ tag, ...meta })
)

export function initCategoryBar(onFilter: (ids: string[] | null) => void) {
  const bar = document.createElement('div')
  bar.id = 'category-bar'
  bar.setAttribute('role', 'toolbar')
  bar.setAttribute('aria-label', 'Filtrer par catégorie')

  const activeTags = new Set<TagFilter>()

  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button')
    btn.className = 'cat-btn'
    btn.style.background = cat.color
    btn.dataset.tag = cat.tag
    btn.setAttribute('aria-pressed', 'false')
    btn.innerHTML = `<span class="cat-emoji">${cat.emoji}</span><span class="cat-label">${cat.label}</span>`
    bar.appendChild(btn)
  })

  bar.addEventListener('click', e => {
    const btn = (e.target as HTMLElement).closest('.cat-btn') as HTMLButtonElement | null
    if (!btn?.dataset.tag) return
    const tag = btn.dataset.tag as TagFilter
    const wasActive = activeTags.has(tag)
    if (wasActive) activeTags.delete(tag); else activeTags.add(tag)
    btn.classList.toggle('active', !wasActive)
    btn.setAttribute('aria-pressed', String(!wasActive))

    if (!activeTags.size) { onFilter(null); return }
    const ids = districts.filter(d => d.tags.some(t => activeTags.has(t))).map(d => d.id)
    onFilter(ids)
  })

  document.body.appendChild(bar)
}
