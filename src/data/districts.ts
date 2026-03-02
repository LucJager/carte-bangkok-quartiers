import type { District } from '../types'

export const districts: District[] = [
  {
    id: 'sukhumvit',
    name: 'Sukhumvit',
    nameThai: 'สุขุมวิท',
    center: [13.7380, 100.5607],
    polygon: [
      [13.7450, 100.5480], [13.7460, 100.5580], [13.7440, 100.5700],
      [13.7380, 100.5750], [13.7300, 100.5720], [13.7290, 100.5600],
      [13.7310, 100.5490], [13.7380, 100.5460]
    ],
    color: '#e74c3c',
    priceRange: '฿฿฿',
    rating: 4.5,
    description: 'Le quartier expat par excellence. De Nana à Phrom Phong, Sukhumvit concentre les condos modernes, les restaurants internationaux et une vie nocturne animée. BTS Skytrain en accès direct.',
    pros: ['Excellente connexion BTS', 'Restaurants internationaux partout', 'Communauté expat active', 'Centres commerciaux premium'],
    cons: ['Loyers élevés', 'Trafic intense aux heures de pointe', 'Tourisme de masse sur Nana'],
    activities: ['Rooftop bars', 'Shopping EmQuartier/Emporium', 'Street food Soi 38', 'Benchasiri Park'],
    bestFor: 'Expats, digital nomads, familles'
  },
  {
    id: 'silom-sathorn',
    name: 'Silom / Sathorn',
    nameThai: 'สีลม / สาทร',
    center: [13.7240, 100.5290],
    polygon: [
      [13.7330, 100.5180], [13.7340, 100.5310], [13.7300, 100.5400],
      [13.7220, 100.5420], [13.7150, 100.5370], [13.7140, 100.5240],
      [13.7190, 100.5150], [13.7270, 100.5140]
    ],
    color: '#3498db',
    priceRange: '฿฿฿฿',
    rating: 4.3,
    description: 'Le CBD de Bangkok. Gratte-ciels, ambassades et rooftop bars mythiques. Silom est aussi connu pour sa vie nocturne (Patpong) et Sathorn pour ses condos luxueux en bord de rivière.',
    pros: ['Quartier business prestigieux', 'Rooftop bars iconiques', 'BTS + MRT accessibles', 'Lumpini Park à proximité'],
    cons: ['Prix très élevés', 'Ambiance corporate en journée', 'Peu de street food authentique'],
    activities: ['Lebua Sky Bar', 'Lumpini Park jogging', 'Patpong Night Market', 'Temples Silom'],
    bestFor: 'Professionnels, cadres, nightlife upscale'
  },
  {
    id: 'khao-san',
    name: 'Khao San / Banglamphu',
    nameThai: 'ข้าวสาร / บางลำพู',
    center: [13.7590, 100.4970],
    polygon: [
      [13.7650, 100.4900], [13.7660, 100.4990], [13.7640, 100.5060],
      [13.7580, 100.5080], [13.7520, 100.5030], [13.7510, 100.4940],
      [13.7540, 100.4880], [13.7600, 100.4870]
    ],
    color: '#f39c12',
    priceRange: '฿',
    rating: 3.8,
    description: 'Le berceau du backpacking en Asie. Khao San Road vibre jour et nuit avec ses bars, ses stands de pad thai et son ambiance festive. Banglamphu offre un côté plus local et authentique.',
    pros: ['Budget ultra-friendly', 'Ambiance unique et festive', 'Proche des temples historiques', 'Street food pas chère'],
    cons: ['Très touristique', 'Bruyant la nuit', 'Loin du BTS/MRT'],
    activities: ['Khao San Road bars', 'Temples Phra Athit', 'Boat taxi Chao Phraya', 'Massage thai pas cher'],
    bestFor: 'Backpackers, voyageurs budget, fêtards'
  },
  {
    id: 'ari',
    name: 'Ari / Pradipat',
    nameThai: 'อารีย์ / ประดิพัทธ์',
    center: [13.7800, 100.5450],
    polygon: [
      [13.7870, 100.5370], [13.7880, 100.5470], [13.7860, 100.5550],
      [13.7800, 100.5570], [13.7730, 100.5530], [13.7720, 100.5430],
      [13.7740, 100.5360], [13.7810, 100.5340]
    ],
    color: '#2ecc71',
    priceRange: '฿฿',
    rating: 4.6,
    description: 'Le quartier hipster de Bangkok. Ari séduit par ses cafés indépendants, sa scène culinaire locale et son ambiance village en pleine ville. Très apprécié des jeunes Thaïs branchés.',
    pros: ['Cafés et brunch spots incroyables', 'Ambiance locale authentique', 'Station BTS Ari directe', 'Loyers raisonnables'],
    cons: ['Peu de vie nocturne', 'Moins international', 'Quartier résidentiel calme'],
    activities: ['Coffee hopping', 'La Villa Ari marché', 'Street food Soi Ari', 'Yoga & wellness'],
    bestFor: 'Digital nomads, hipsters, amoureux du café'
  },
  {
    id: 'ekkamai-thonglor',
    name: 'Ekkamai / Thonglor',
    nameThai: 'เอกมัย / ทองหล่อ',
    center: [13.7300, 100.5850],
    polygon: [
      [13.7370, 100.5760], [13.7380, 100.5870], [13.7360, 100.5960],
      [13.7300, 100.5980], [13.7230, 100.5940], [13.7220, 100.5830],
      [13.7240, 100.5740], [13.7310, 100.5720]
    ],
    color: '#9b59b6',
    priceRange: '฿฿฿฿',
    rating: 4.7,
    description: 'Le quartier le plus trendy de Bangkok. Thonglor et Ekkamai regorgent de restaurants gastronomiques, bars cachés et clubs select. C\'est le playground des jeunes Thaïs fortunés.',
    pros: ['Scène food & drink exceptionnelle', 'Vie nocturne haut de gamme', 'Quartier très photogénique', 'BTS Thong Lo & Ekkamai'],
    cons: ['Très cher', 'Trafic dans les sois', 'Peut sembler exclusif'],
    activities: ['Speakeasy bars', 'Japanese restaurants Thonglor', 'Galleries W District', 'Brunch dominical'],
    bestFor: 'Foodies, nightlife lovers, créatifs'
  },
  {
    id: 'on-nut',
    name: 'On Nut / Phra Khanong',
    nameThai: 'อ่อนนุช / พระโขนง',
    center: [13.7150, 100.6010],
    polygon: [
      [13.7220, 100.5930], [13.7230, 100.6030], [13.7210, 100.6120],
      [13.7150, 100.6140], [13.7080, 100.6100], [13.7070, 100.6000],
      [13.7090, 100.5910], [13.7160, 100.5900]
    ],
    color: '#1abc9c',
    priceRange: '฿',
    rating: 4.2,
    description: 'Le nouveau hotspot des digital nomads à budget malin. On Nut offre tout ce dont Sukhumvit dispose mais à moitié prix. Communauté grandissante, coworkings et street food excellente.',
    pros: ['Loyers très abordables', 'BTS On Nut direct', 'Tesco Lotus & Big C', 'Communauté nomade grandissante'],
    cons: ['Moins glamour que Thonglor', 'En développement constant', 'Vie nocturne limitée'],
    activities: ['Habito Mall', 'Street food marché On Nut', 'W District events', 'Coworking spaces'],
    bestFor: 'Digital nomads budget, long séjour, familles'
  },
  {
    id: 'rattanakosin',
    name: 'Rattanakosin',
    nameThai: 'รัตนโกสินทร์',
    center: [13.7510, 100.4910],
    polygon: [
      [13.7580, 100.4840], [13.7590, 100.4930], [13.7570, 100.4990],
      [13.7510, 100.5010], [13.7450, 100.4970], [13.7440, 100.4880],
      [13.7460, 100.4820], [13.7520, 100.4800]
    ],
    color: '#e67e22',
    priceRange: '฿฿',
    rating: 4.0,
    description: 'Le coeur historique de Bangkok. L\'île de Rattanakosin abrite le Grand Palace, Wat Pho et Wat Arun. Un quartier chargé d\'histoire où le vieux Bangkok se dévoile à chaque coin de rue.',
    pros: ['Temples majestueux', 'Architecture historique', 'Bord du fleuve Chao Phraya', 'Ambiance culturelle unique'],
    cons: ['Très touristique en journée', 'Peu de logements modernes', 'Transports en commun limités'],
    activities: ['Grand Palace', 'Wat Pho massage', 'Wat Arun coucher de soleil', 'Musée National'],
    bestFor: 'Culture lovers, photographes, historiens'
  },
  {
    id: 'chinatown',
    name: 'Chinatown / Yaowarat',
    nameThai: 'เยาวราช',
    center: [13.7400, 100.5090],
    polygon: [
      [13.7460, 100.5020], [13.7470, 100.5100], [13.7450, 100.5170],
      [13.7400, 100.5190], [13.7340, 100.5150], [13.7330, 100.5070],
      [13.7350, 100.5000], [13.7410, 100.4990]
    ],
    color: '#e84393',
    priceRange: '฿',
    rating: 4.4,
    description: 'Le Chinatown le plus vibrant d\'Asie du Sud-Est. Yaowarat Road s\'illumine chaque soir avec ses enseignes néon et ses stands de street food légendaires. Or, temples chinois et saveurs.',
    pros: ['Meilleure street food de Bangkok', 'Ambiance nocturne électrique', 'Prix très bas', 'Culture sino-thaïe unique'],
    cons: ['Ruelles étroites et chaotiques', 'Chaleur étouffante', 'Peu de condos modernes'],
    activities: ['Street food Yaowarat Road', 'Wat Traimit (Bouddha d\'or)', 'Gold shops Chinatown', 'Talat Noi street art'],
    bestFor: 'Foodies, photographes, amateurs de culture'
  },
  {
    id: 'chatuchak',
    name: 'Chatuchak',
    nameThai: 'จตุจักร',
    center: [13.8000, 100.5530],
    polygon: [
      [13.8080, 100.5440], [13.8090, 100.5550], [13.8060, 100.5640],
      [13.8000, 100.5660], [13.7920, 100.5620], [13.7910, 100.5510],
      [13.7940, 100.5420], [13.8010, 100.5400]
    ],
    color: '#00b894',
    priceRange: '฿฿',
    rating: 4.1,
    description: 'Célèbre pour son weekend market (le plus grand au monde), Chatuchak offre aussi de grands parcs verdoyants et un accès BTS/MRT. Un quartier résidentiel agréable au nord de Bangkok.',
    pros: ['Chatuchak Weekend Market', 'Grands parcs (Rod Fai, Queen Sirikit)', 'BTS Mo Chit + MRT', 'Quartier vert et aéré'],
    cons: ['Excentré du centre', 'Marché bondé le weekend', 'Moins de restaurants le soir'],
    activities: ['Weekend Market shopping', 'Rod Fai Park pique-nique', 'Train Night Market', 'Or Tor Kor Market (food)'],
    bestFor: 'Familles, shoppers, amoureux de nature'
  },
  {
    id: 'riverside',
    name: 'Riverside / Charoen Krung',
    nameThai: 'เจริญกรุง',
    center: [13.7270, 100.5130],
    polygon: [
      [13.7340, 100.5060], [13.7350, 100.5150], [13.7330, 100.5220],
      [13.7270, 100.5240], [13.7200, 100.5200], [13.7190, 100.5110],
      [13.7210, 100.5040], [13.7280, 100.5020]
    ],
    color: '#6c5ce7',
    priceRange: '฿฿฿',
    rating: 4.3,
    description: 'Le quartier artistique émergent de Bangkok. Charoen Krung, la plus vieille route de la ville, se réinvente avec des galeries, hôtels boutique et restaurants le long du Chao Phraya.',
    pros: ['Scène artistique en plein essor', 'Vue fleuve Chao Phraya', 'Hôtels iconiques (Mandarin, Capella)', 'Quartier en gentrification positive'],
    cons: ['Transports en commun limités', 'Rues parfois inondables', 'Peu de nightlife'],
    activities: ['Warehouse 30 galleries', 'ICONSIAM shopping', 'Asiatique riverfront', 'Dinner cruise Chao Phraya'],
    bestFor: 'Artistes, créatifs, amateurs de fleuve'
  },
  {
    id: 'ratchathewi',
    name: 'Ratchathewi / Pratunam',
    nameThai: 'ราชเทวี / ประตูน้ำ',
    center: [13.7520, 100.5370],
    polygon: [
      [13.7590, 100.5290], [13.7600, 100.5390], [13.7580, 100.5460],
      [13.7520, 100.5480], [13.7450, 100.5440], [13.7440, 100.5340],
      [13.7460, 100.5270], [13.7530, 100.5260]
    ],
    color: '#fdcb6e',
    priceRange: '฿฿',
    rating: 3.9,
    description: 'Le paradis du shopping à prix cassés. Pratunam est le plus grand marché textile d\'Asie du Sud-Est. Ratchathewi offre une position centrale stratégique avec BTS et Airport Rail Link.',
    pros: ['Shopping pas cher (Pratunam, Platinum)', 'Position ultra-centrale', 'BTS Ratchathewi + Phaya Thai', 'Airport Rail Link direct'],
    cons: ['Trafic cauchemardesque', 'Quartier peu esthétique', 'Pollution sonore'],
    activities: ['Platinum Fashion Mall', 'Pratunam Market', 'Baiyoke Sky Tower', 'Suan Pakkad Palace'],
    bestFor: 'Shoppers, voyageurs transit, budget moyen'
  }
]
