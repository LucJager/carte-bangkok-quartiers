export type TagFilter = 'nightlife' | 'expat-friendly' | 'culture' | 'budget-friendly' | 'foodie' | 'hipster' | 'family'

export type BudgetFilter = '฿' | '฿฿' | '฿฿฿' | '฿฿฿฿'

export type PoiCategory = 'coworking' | 'hospital' | 'supermarket' | 'street-food' | 'gym' | 'nightlife'

export interface Poi {
  name: string
  category: PoiCategory
  coords: [number, number]
  address?: string
}

export interface NearestStation {
  name: string
  type: 'bts' | 'mrt' | 'arl'
  distance: number
}

export interface District {
  id: string
  name: string
  nameThai: string
  center: [number, number]
  polygon: [number, number][]
  color: string
  priceRange: string
  rating: number
  description: string
  pros: string[]
  cons: string[]
  activities: string[]
  bestFor: string
  tags: TagFilter[]
}

export interface Station {
  name: string
  coords: [number, number]
}

export interface TransitLine {
  name: string
  color: string
  stations: Station[]
  type: 'bts' | 'mrt' | 'arl'
}
