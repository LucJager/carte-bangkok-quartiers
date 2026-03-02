import type { Station, TransitLine, NearestStation } from '../types'

const R = 6371e3 // Earth radius in meters

export function haversineDistance(a: [number, number], b: [number, number]): number {
  const toRad = (d: number) => d * Math.PI / 180
  const dLat = toRad(b[0] - a[0])
  const dLng = toRad(b[1] - a[1])
  const sinLat = Math.sin(dLat / 2)
  const sinLng = Math.sin(dLng / 2)
  const h = sinLat * sinLat + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * sinLng * sinLng
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}

export function pointInPolygon(point: [number, number], polygon: [number, number][]): boolean {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [yi, xi] = polygon[i], [yj, xj] = polygon[j]
    if ((yi > point[0]) !== (yj > point[0]) &&
        point[1] < (xj - xi) * (point[0] - yi) / (yj - yi) + xi) {
      inside = !inside
    }
  }
  return inside
}

export function findNearestStation(point: [number, number], lines: TransitLine[]): NearestStation | null {
  let best: { station: Station, type: TransitLine['type'], dist: number } | null = null
  for (const line of lines) {
    for (const s of line.stations) {
      const dist = haversineDistance(point, s.coords)
      if (!best || dist < best.dist) best = { station: s, type: line.type, dist }
    }
  }
  if (!best) return null
  return { name: best.station.name, type: best.type, distance: Math.round(best.dist) }
}
