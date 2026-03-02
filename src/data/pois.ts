import type { Poi } from '../types'

export const pois: Poi[] = [
  // ☕ Coworking
  { name: 'AIS D.C.', category: 'coworking', coords: [13.7460, 100.5395], address: 'Siam Square' },
  { name: 'Hubba Ekkamai', category: 'coworking', coords: [13.7196, 100.5870], address: 'Ekkamai Soi 4' },
  { name: 'The Hive Thonglor', category: 'coworking', coords: [13.7300, 100.5790], address: 'Thonglor Soi 17' },
  { name: 'TCDC Commons', category: 'coworking', coords: [13.7275, 100.5800], address: 'Thonglor Soi 17' },
  { name: 'Punspace Ekkamai', category: 'coworking', coords: [13.7215, 100.5855], address: 'Ekkamai Soi 2' },
  { name: 'True Digital Park', category: 'coworking', coords: [13.6855, 100.6100], address: 'Sukhumvit 101' },
  { name: 'Glowfish Sathorn', category: 'coworking', coords: [13.7230, 100.5290], address: 'Sathorn Soi 3' },
  { name: 'The Work Loft', category: 'coworking', coords: [13.7310, 100.5670], address: 'Sukhumvit 24' },
  { name: 'CAMP by Maya', category: 'coworking', coords: [13.7445, 100.5350], address: 'Siam' },
  { name: 'JustCo Ari', category: 'coworking', coords: [13.7797, 100.5450], address: 'Ari Soi 1' },
  // 🏥 Hôpitaux
  { name: 'Bumrungrad Hospital', category: 'hospital', coords: [13.7440, 100.5530], address: 'Sukhumvit Soi 3' },
  { name: 'BNH Hospital', category: 'hospital', coords: [13.7270, 100.5350], address: 'Silom/Sathorn' },
  { name: 'Samitivej Sukhumvit', category: 'hospital', coords: [13.7190, 100.5900], address: 'Sukhumvit 49' },
  { name: 'Bangkok Hospital', category: 'hospital', coords: [13.7460, 100.5660], address: 'Soi Soonvijai' },
  { name: 'St. Louis Hospital', category: 'hospital', coords: [13.7210, 100.5240], address: 'Sathorn' },
  { name: 'Medpark Hospital', category: 'hospital', coords: [13.7200, 100.5620], address: 'Phetchaburi' },
  { name: 'Praram 9 Hospital', category: 'hospital', coords: [13.7560, 100.5660], address: 'Phra Ram 9' },
  { name: 'Phyathai 2 Hospital', category: 'hospital', coords: [13.7650, 100.5400], address: 'Phaya Thai' },
  // 🛒 Supermarchés
  { name: 'Tops Sukhumvit 11', category: 'supermarket', coords: [13.7420, 100.5550], address: 'Sukhumvit Soi 11' },
  { name: 'Villa Market Thonglor', category: 'supermarket', coords: [13.7280, 100.5810], address: 'Thonglor' },
  { name: 'Gourmet Market Siam', category: 'supermarket', coords: [13.7455, 100.5340], address: 'Siam Paragon' },
  { name: 'Big C Rajdamri', category: 'supermarket', coords: [13.7430, 100.5400], address: 'Rajdamri' },
  { name: 'Tesco Lotus On Nut', category: 'supermarket', coords: [13.7050, 100.6010], address: 'On Nut' },
  { name: 'Makro Sathorn', category: 'supermarket', coords: [13.7190, 100.5270], address: 'Sathorn' },
  { name: 'MaxValu Ari', category: 'supermarket', coords: [13.7800, 100.5440], address: 'La Villa Ari' },
  { name: 'Foodland Sukhumvit 16', category: 'supermarket', coords: [13.7370, 100.5570], address: 'Sukhumvit 16' },
  { name: 'Big C On Nut', category: 'supermarket', coords: [13.7080, 100.6020], address: 'On Nut' },
  { name: 'Tops Silom Complex', category: 'supermarket', coords: [13.7290, 100.5340], address: 'Silom' },
  // 🍜 Street food
  { name: 'Yaowarat Road', category: 'street-food', coords: [13.7400, 100.5100], address: 'Chinatown' },
  { name: 'Soi 38 Night Market', category: 'street-food', coords: [13.7265, 100.5780], address: 'Sukhumvit 38' },
  { name: 'Or Tor Kor Market', category: 'street-food', coords: [13.8020, 100.5500], address: 'Chatuchak' },
  { name: 'Khao San Road Food', category: 'street-food', coords: [13.7590, 100.4970], address: 'Khao San' },
  { name: 'Victory Monument', category: 'street-food', coords: [13.7650, 100.5370], address: 'Victory Monument' },
  { name: 'Bang Rak Market', category: 'street-food', coords: [13.7250, 100.5130], address: 'Charoen Krung' },
  { name: 'Silom Soi 20', category: 'street-food', coords: [13.7260, 100.5330], address: 'Silom' },
  { name: 'Ari Soi 1 Food Street', category: 'street-food', coords: [13.7790, 100.5445], address: 'Ari' },
  { name: 'Talat Noi', category: 'street-food', coords: [13.7350, 100.5100], address: 'Chinatown' },
  { name: 'Phra Khanong Market', category: 'street-food', coords: [13.7150, 100.5920], address: 'Phra Khanong' },
  { name: 'Pratunam Market Food', category: 'street-food', coords: [13.7530, 100.5400], address: 'Pratunam' },
  { name: 'Wang Lang Market', category: 'street-food', coords: [13.7580, 100.4860], address: 'Rattanakosin' },
  // 🏋️ Gyms
  { name: 'Fitness First Asok', category: 'gym', coords: [13.7360, 100.5560], address: 'Asok' },
  { name: 'Virgin Active Thonglor', category: 'gym', coords: [13.7310, 100.5830], address: 'Thonglor' },
  { name: 'Base Bangkok', category: 'gym', coords: [13.7430, 100.5535], address: 'Sukhumvit 2' },
  { name: 'Jetts 24hr On Nut', category: 'gym', coords: [13.7060, 100.6010], address: 'On Nut' },
  { name: 'F45 Silom', category: 'gym', coords: [13.7280, 100.5340], address: 'Silom' },
  { name: 'CrossFit BK', category: 'gym', coords: [13.7250, 100.5850], address: 'Ekkamai' },
  { name: 'RSM Ari', category: 'gym', coords: [13.7790, 100.5460], address: 'Ari' },
  { name: 'Muay Thai Lab', category: 'gym', coords: [13.7200, 100.5860], address: 'Ekkamai' },
  // 🎉 Nightlife
  { name: 'Thonglor Bar District', category: 'nightlife', coords: [13.7300, 100.5830], address: 'Thonglor Soi 10' },
  { name: 'RCA (Royal City Ave)', category: 'nightlife', coords: [13.7510, 100.5710], address: 'Phra Ram 9' },
  { name: 'Patpong Night Market', category: 'nightlife', coords: [13.7280, 100.5330], address: 'Silom' },
  { name: 'Khao San Road Bars', category: 'nightlife', coords: [13.7590, 100.4975], address: 'Khao San' },
  { name: 'Sukhumvit Soi 11', category: 'nightlife', coords: [13.7420, 100.5555], address: 'Sukhumvit 11' },
  { name: 'Nana Plaza Area', category: 'nightlife', coords: [13.7400, 100.5545], address: 'Sukhumvit 4' },
  { name: 'Ekkamai Beer Bars', category: 'nightlife', coords: [13.7200, 100.5860], address: 'Ekkamai' },
  { name: 'Charoen Krung Bars', category: 'nightlife', coords: [13.7270, 100.5140], address: 'Charoen Krung' },
]

export const poiEmojis: Record<string, string> = {
  coworking: '☕', hospital: '🏥', supermarket: '🛒',
  'street-food': '🍜', gym: '🏋️', nightlife: '🎉',
}

export const poiLabels: Record<string, string> = {
  coworking: 'Coworking', hospital: 'Hôpitaux', supermarket: 'Supermarchés',
  'street-food': 'Street Food', gym: 'Gyms', nightlife: 'Nightlife',
}
