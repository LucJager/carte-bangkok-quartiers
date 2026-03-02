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
