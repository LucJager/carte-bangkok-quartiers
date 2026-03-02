import type { TransitLine } from '../types'
import { btsStations } from './bts-stations'
import { mrtStations } from './mrt-stations'

const arlStations = [
  { name: 'Phaya Thai', coords: [13.7542, 100.5336] as [number, number] },
  { name: 'Ratchaprarop', coords: [13.7538, 100.5417] as [number, number] },
  { name: 'Makkasan', coords: [13.7503, 100.5596] as [number, number] },
  { name: 'Ramkhamhaeng', coords: [13.7575, 100.5894] as [number, number] },
  { name: 'Hua Mak', coords: [13.7377, 100.6452] as [number, number] },
  { name: 'Ban Thap Chang', coords: [13.7305, 100.6726] as [number, number] },
  { name: 'Lat Krabang', coords: [13.7279, 100.7084] as [number, number] },
  { name: 'Suvarnabhumi', coords: [13.6900, 100.7501] as [number, number] },
]

export const transitLines: TransitLine[] = [
  { name: 'BTS Sukhumvit', color: '#5CBF54', stations: btsStations.sukhumvit, type: 'bts' },
  { name: 'BTS Silom', color: '#008751', stations: btsStations.silom, type: 'bts' },
  { name: 'MRT Blue', color: '#1E4D8C', stations: mrtStations.blue, type: 'mrt' },
  { name: 'Airport Rail Link', color: '#E31E24', stations: arlStations, type: 'arl' },
]
