import type { TagFilter } from '../types'

export const TAG_META: Record<TagFilter, { emoji: string; label: string; color: string }> = {
  'nightlife': { emoji: '🎉', label: 'Nightlife', color: '#e74c3c' },
  'expat-friendly': { emoji: '🌍', label: 'Expats', color: '#3498db' },
  'culture': { emoji: '🏛️', label: 'Culture', color: '#e67e22' },
  'budget-friendly': { emoji: '💰', label: 'Budget', color: '#2ecc71' },
  'foodie': { emoji: '🍜', label: 'Foodie', color: '#e84393' },
  'hipster': { emoji: '😎', label: 'Cool', color: '#9b59b6' },
  'family': { emoji: '👨‍👩‍👧', label: 'Famille', color: '#1abc9c' },
}
