import type { District } from '../types'

export const districts: District[] = [
  {
    id: 'sukhumvit',
    name: 'Sukhumvit',
    nameThai: 'สุขุมวิท',
    center: [13.7380, 100.5607],
    polygon: [
      [13.7450, 100.5480], [13.7460, 100.5520], [13.7465, 100.5560], [13.7460, 100.5600],
      [13.7455, 100.5650], [13.7440, 100.5700], [13.7420, 100.5730], [13.7380, 100.5750],
      [13.7340, 100.5740], [13.7310, 100.5720], [13.7295, 100.5680], [13.7290, 100.5640],
      [13.7290, 100.5600], [13.7295, 100.5560], [13.7300, 100.5520], [13.7310, 100.5490],
      [13.7340, 100.5470], [13.7370, 100.5460], [13.7400, 100.5460], [13.7430, 100.5470]
    ],
    color: '#e74c3c',
    priceRange: '฿฿฿',
    rating: 4.5,
    description: 'Le quartier expat par excellence. De Nana à Phrom Phong, Sukhumvit concentre les condos modernes, les restaurants internationaux et une vie nocturne animée. BTS Skytrain en accès direct.',
    pros: ['Excellente connexion BTS', 'Restaurants internationaux partout', 'Communauté expat active', 'Centres commerciaux premium'],
    cons: ['Loyers élevés', 'Trafic intense aux heures de pointe', 'Tourisme de masse sur Nana'],
    activities: ['Rooftop bars', 'Shopping EmQuartier/Emporium', 'Street food Soi 38', 'Benchasiri Park'],
    bestFor: 'Expats, digital nomads, familles',
    tags: ['expat-friendly', 'nightlife', 'foodie']
  },
  {
    id: 'silom-sathorn',
    name: 'Silom / Sathorn',
    nameThai: 'สีลม / สาทร',
    center: [13.7240, 100.5290],
    polygon: [
      [13.7330, 100.5180], [13.7340, 100.5220], [13.7345, 100.5270], [13.7340, 100.5310],
      [13.7330, 100.5350], [13.7310, 100.5390], [13.7280, 100.5410], [13.7250, 100.5420],
      [13.7220, 100.5420], [13.7190, 100.5400], [13.7160, 100.5370], [13.7145, 100.5330],
      [13.7140, 100.5280], [13.7145, 100.5240], [13.7160, 100.5200], [13.7190, 100.5170],
      [13.7220, 100.5150], [13.7260, 100.5145], [13.7290, 100.5155], [13.7310, 100.5170]
    ],
    color: '#3498db',
    priceRange: '฿฿฿฿',
    rating: 4.3,
    description: 'Le CBD de Bangkok. Gratte-ciels, ambassades et rooftop bars mythiques. Silom est aussi connu pour sa vie nocturne (Patpong) et Sathorn pour ses condos luxueux en bord de rivière.',
    pros: ['Quartier business prestigieux', 'Rooftop bars iconiques', 'BTS + MRT accessibles', 'Lumpini Park à proximité'],
    cons: ['Prix très élevés', 'Ambiance corporate en journée', 'Peu de street food authentique'],
    activities: ['Lebua Sky Bar', 'Lumpini Park jogging', 'Patpong Night Market', 'Temples Silom'],
    bestFor: 'Professionnels, cadres, nightlife upscale',
    tags: ['nightlife', 'expat-friendly']
  },
  {
    id: 'khao-san',
    name: 'Khao San / Banglamphu',
    nameThai: 'ข้าวสาร / บางลำพู',
    center: [13.7590, 100.4970],
    polygon: [
      [13.7650, 100.4900], [13.7658, 100.4930], [13.7660, 100.4960], [13.7658, 100.4990],
      [13.7650, 100.5020], [13.7640, 100.5050], [13.7620, 100.5070], [13.7595, 100.5080],
      [13.7570, 100.5070], [13.7545, 100.5050], [13.7525, 100.5030], [13.7515, 100.5000],
      [13.7510, 100.4965], [13.7512, 100.4935], [13.7520, 100.4910], [13.7540, 100.4890],
      [13.7565, 100.4878], [13.7590, 100.4873], [13.7615, 100.4878], [13.7635, 100.4888]
    ],
    color: '#f39c12',
    priceRange: '฿',
    rating: 3.8,
    description: 'Le berceau du backpacking en Asie. Khao San Road vibre jour et nuit avec ses bars, ses stands de pad thai et son ambiance festive. Banglamphu offre un côté plus local et authentique.',
    pros: ['Budget ultra-friendly', 'Ambiance unique et festive', 'Proche des temples historiques', 'Street food pas chère'],
    cons: ['Très touristique', 'Bruyant la nuit', 'Loin du BTS/MRT'],
    activities: ['Khao San Road bars', 'Temples Phra Athit', 'Boat taxi Chao Phraya', 'Massage thai pas cher'],
    bestFor: 'Backpackers, voyageurs budget, fêtards',
    tags: ['budget-friendly', 'nightlife', 'culture']
  },
  {
    id: 'ari',
    name: 'Ari / Pradipat',
    nameThai: 'อารีย์ / ประดิพัทธ์',
    center: [13.7800, 100.5450],
    polygon: [
      [13.7870, 100.5370], [13.7878, 100.5400], [13.7882, 100.5435], [13.7880, 100.5470],
      [13.7875, 100.5505], [13.7860, 100.5540], [13.7840, 100.5560], [13.7815, 100.5570],
      [13.7790, 100.5570], [13.7765, 100.5560], [13.7745, 100.5540], [13.7730, 100.5510],
      [13.7722, 100.5475], [13.7720, 100.5440], [13.7725, 100.5405], [13.7735, 100.5375],
      [13.7755, 100.5355], [13.7780, 100.5342], [13.7810, 100.5342], [13.7840, 100.5352]
    ],
    color: '#2ecc71',
    priceRange: '฿฿',
    rating: 4.6,
    description: 'Le quartier hipster de Bangkok. Ari séduit par ses cafés indépendants, sa scène culinaire locale et son ambiance village en pleine ville. Très apprécié des jeunes Thaïs branchés.',
    pros: ['Cafés et brunch spots incroyables', 'Ambiance locale authentique', 'Station BTS Ari directe', 'Loyers raisonnables'],
    cons: ['Peu de vie nocturne', 'Moins international', 'Quartier résidentiel calme'],
    activities: ['Coffee hopping', 'La Villa Ari marché', 'Street food Soi Ari', 'Yoga & wellness'],
    bestFor: 'Digital nomads, hipsters, amoureux du café',
    tags: ['hipster', 'foodie', 'budget-friendly']
  },
  {
    id: 'ekkamai-thonglor',
    name: 'Ekkamai / Thonglor',
    nameThai: 'เอกมัย / ทองหล่อ',
    center: [13.7300, 100.5850],
    polygon: [
      [13.7370, 100.5760], [13.7378, 100.5795], [13.7382, 100.5835], [13.7380, 100.5870],
      [13.7375, 100.5905], [13.7365, 100.5940], [13.7345, 100.5965], [13.7320, 100.5980],
      [13.7295, 100.5980], [13.7270, 100.5970], [13.7248, 100.5950], [13.7232, 100.5920],
      [13.7222, 100.5885], [13.7220, 100.5845], [13.7225, 100.5805], [13.7235, 100.5770],
      [13.7255, 100.5745], [13.7280, 100.5730], [13.7310, 100.5725], [13.7340, 100.5738]
    ],
    color: '#9b59b6',
    priceRange: '฿฿฿฿',
    rating: 4.7,
    description: 'Le quartier le plus trendy de Bangkok. Thonglor et Ekkamai regorgent de restaurants gastronomiques, bars cachés et clubs select. C\'est le playground des jeunes Thaïs fortunés.',
    pros: ['Scène food & drink exceptionnelle', 'Vie nocturne haut de gamme', 'Quartier très photogénique', 'BTS Thong Lo & Ekkamai'],
    cons: ['Très cher', 'Trafic dans les sois', 'Peut sembler exclusif'],
    activities: ['Speakeasy bars', 'Japanese restaurants Thonglor', 'Galleries W District', 'Brunch dominical'],
    bestFor: 'Foodies, nightlife lovers, créatifs',
    tags: ['nightlife', 'foodie', 'hipster']
  },
  {
    id: 'on-nut',
    name: 'On Nut / Phra Khanong',
    nameThai: 'อ่อนนุช / พระโขนง',
    center: [13.7150, 100.6010],
    polygon: [
      [13.7220, 100.5930], [13.7228, 100.5960], [13.7232, 100.5995], [13.7230, 100.6030],
      [13.7225, 100.6065], [13.7215, 100.6095], [13.7198, 100.6120], [13.7175, 100.6138],
      [13.7150, 100.6142], [13.7125, 100.6135], [13.7105, 100.6118], [13.7088, 100.6095],
      [13.7075, 100.6060], [13.7070, 100.6025], [13.7072, 100.5990], [13.7080, 100.5955],
      [13.7098, 100.5928], [13.7120, 100.5910], [13.7148, 100.5900], [13.7178, 100.5908]
    ],
    color: '#1abc9c',
    priceRange: '฿',
    rating: 4.2,
    description: 'Le nouveau hotspot des digital nomads à budget malin. On Nut offre tout ce dont Sukhumvit dispose mais à moitié prix. Communauté grandissante, coworkings et street food excellente.',
    pros: ['Loyers très abordables', 'BTS On Nut direct', 'Tesco Lotus & Big C', 'Communauté nomade grandissante'],
    cons: ['Moins glamour que Thonglor', 'En développement constant', 'Vie nocturne limitée'],
    activities: ['Habito Mall', 'Street food marché On Nut', 'W District events', 'Coworking spaces'],
    bestFor: 'Digital nomads budget, long séjour, familles',
    tags: ['budget-friendly', 'expat-friendly', 'family']
  },
  {
    id: 'rattanakosin',
    name: 'Rattanakosin',
    nameThai: 'รัตนโกสินทร์',
    center: [13.7510, 100.4910],
    polygon: [
      [13.7580, 100.4840], [13.7588, 100.4870], [13.7592, 100.4900], [13.7590, 100.4930],
      [13.7585, 100.4958], [13.7575, 100.4982], [13.7558, 100.5002], [13.7535, 100.5012],
      [13.7510, 100.5015], [13.7488, 100.5008], [13.7465, 100.4992], [13.7450, 100.4968],
      [13.7442, 100.4940], [13.7440, 100.4910], [13.7445, 100.4878], [13.7455, 100.4850],
      [13.7472, 100.4828], [13.7495, 100.4812], [13.7522, 100.4805], [13.7550, 100.4815]
    ],
    color: '#e67e22',
    priceRange: '฿฿',
    rating: 4.0,
    description: 'Le coeur historique de Bangkok. L\'île de Rattanakosin abrite le Grand Palace, Wat Pho et Wat Arun. Un quartier chargé d\'histoire où le vieux Bangkok se dévoile à chaque coin de rue.',
    pros: ['Temples majestueux', 'Architecture historique', 'Bord du fleuve Chao Phraya', 'Ambiance culturelle unique'],
    cons: ['Très touristique en journée', 'Peu de logements modernes', 'Transports en commun limités'],
    activities: ['Grand Palace', 'Wat Pho massage', 'Wat Arun coucher de soleil', 'Musée National'],
    bestFor: 'Culture lovers, photographes, historiens',
    tags: ['culture', 'budget-friendly']
  },
  {
    id: 'chinatown',
    name: 'Chinatown / Yaowarat',
    nameThai: 'เยาวราช',
    center: [13.7400, 100.5090],
    polygon: [
      [13.7460, 100.5020], [13.7468, 100.5048], [13.7472, 100.5078], [13.7470, 100.5108],
      [13.7465, 100.5138], [13.7455, 100.5162], [13.7438, 100.5180], [13.7418, 100.5190],
      [13.7395, 100.5192], [13.7372, 100.5185], [13.7352, 100.5168], [13.7338, 100.5145],
      [13.7330, 100.5118], [13.7328, 100.5088], [13.7332, 100.5058], [13.7342, 100.5032],
      [13.7358, 100.5012], [13.7380, 100.4998], [13.7405, 100.4992], [13.7432, 100.5000]
    ],
    color: '#e84393',
    priceRange: '฿',
    rating: 4.4,
    description: 'Le Chinatown le plus vibrant d\'Asie du Sud-Est. Yaowarat Road s\'illumine chaque soir avec ses enseignes néon et ses stands de street food légendaires. Or, temples chinois et saveurs.',
    pros: ['Meilleure street food de Bangkok', 'Ambiance nocturne électrique', 'Prix très bas', 'Culture sino-thaïe unique'],
    cons: ['Ruelles étroites et chaotiques', 'Chaleur étouffante', 'Peu de condos modernes'],
    activities: ['Street food Yaowarat Road', 'Wat Traimit (Bouddha d\'or)', 'Gold shops Chinatown', 'Talat Noi street art'],
    bestFor: 'Foodies, photographes, amateurs de culture',
    tags: ['foodie', 'culture', 'budget-friendly']
  },
  {
    id: 'chatuchak',
    name: 'Chatuchak',
    nameThai: 'จตุจักร',
    center: [13.8000, 100.5530],
    polygon: [
      [13.8080, 100.5440], [13.8088, 100.5475], [13.8092, 100.5510], [13.8090, 100.5550],
      [13.8082, 100.5588], [13.8068, 100.5620], [13.8048, 100.5645], [13.8022, 100.5658],
      [13.7995, 100.5662], [13.7968, 100.5655], [13.7942, 100.5638], [13.7925, 100.5612],
      [13.7915, 100.5580], [13.7910, 100.5545], [13.7912, 100.5508], [13.7920, 100.5472],
      [13.7935, 100.5442], [13.7960, 100.5420], [13.7988, 100.5408], [13.8020, 100.5408],
      [13.8050, 100.5418]
    ],
    color: '#00b894',
    priceRange: '฿฿',
    rating: 4.1,
    description: 'Célèbre pour son weekend market (le plus grand au monde), Chatuchak offre aussi de grands parcs verdoyants et un accès BTS/MRT. Un quartier résidentiel agréable au nord de Bangkok.',
    pros: ['Chatuchak Weekend Market', 'Grands parcs (Rod Fai, Queen Sirikit)', 'BTS Mo Chit + MRT', 'Quartier vert et aéré'],
    cons: ['Excentré du centre', 'Marché bondé le weekend', 'Moins de restaurants le soir'],
    activities: ['Weekend Market shopping', 'Rod Fai Park pique-nique', 'Train Night Market', 'Or Tor Kor Market (food)'],
    bestFor: 'Familles, shoppers, amoureux de nature',
    tags: ['family', 'budget-friendly']
  },
  {
    id: 'riverside',
    name: 'Riverside / Charoen Krung',
    nameThai: 'เจริญกรุง',
    center: [13.7270, 100.5130],
    polygon: [
      [13.7340, 100.5060], [13.7348, 100.5090], [13.7352, 100.5120], [13.7350, 100.5150],
      [13.7345, 100.5178], [13.7335, 100.5202], [13.7318, 100.5222], [13.7295, 100.5235],
      [13.7270, 100.5240], [13.7245, 100.5235], [13.7222, 100.5220], [13.7205, 100.5200],
      [13.7195, 100.5175], [13.7190, 100.5145], [13.7192, 100.5115], [13.7200, 100.5085],
      [13.7215, 100.5060], [13.7238, 100.5042], [13.7265, 100.5030], [13.7295, 100.5035],
      [13.7318, 100.5045]
    ],
    color: '#6c5ce7',
    priceRange: '฿฿฿',
    rating: 4.3,
    description: 'Le quartier artistique émergent de Bangkok. Charoen Krung, la plus vieille route de la ville, se réinvente avec des galeries, hôtels boutique et restaurants le long du Chao Phraya.',
    pros: ['Scène artistique en plein essor', 'Vue fleuve Chao Phraya', 'Hôtels iconiques (Mandarin, Capella)', 'Quartier en gentrification positive'],
    cons: ['Transports en commun limités', 'Rues parfois inondables', 'Peu de nightlife'],
    activities: ['Warehouse 30 galleries', 'ICONSIAM shopping', 'Asiatique riverfront', 'Dinner cruise Chao Phraya'],
    bestFor: 'Artistes, créatifs, amateurs de fleuve',
    tags: ['culture', 'hipster']
  },
  {
    id: 'ratchathewi',
    name: 'Ratchathewi / Pratunam',
    nameThai: 'ราชเทวี / ประตูน้ำ',
    center: [13.7520, 100.5370],
    polygon: [
      [13.7590, 100.5290], [13.7598, 100.5320], [13.7602, 100.5352], [13.7600, 100.5385],
      [13.7595, 100.5415], [13.7585, 100.5442], [13.7568, 100.5465], [13.7545, 100.5478],
      [13.7520, 100.5482], [13.7495, 100.5478], [13.7472, 100.5465], [13.7455, 100.5442],
      [13.7445, 100.5412], [13.7440, 100.5380], [13.7442, 100.5348], [13.7450, 100.5318],
      [13.7465, 100.5292], [13.7488, 100.5272], [13.7515, 100.5262], [13.7545, 100.5265],
      [13.7570, 100.5275]
    ],
    color: '#fdcb6e',
    priceRange: '฿฿',
    rating: 3.9,
    description: 'Le paradis du shopping à prix cassés. Pratunam est le plus grand marché textile d\'Asie du Sud-Est. Ratchathewi offre une position centrale stratégique avec BTS et Airport Rail Link.',
    pros: ['Shopping pas cher (Pratunam, Platinum)', 'Position ultra-centrale', 'BTS Ratchathewi + Phaya Thai', 'Airport Rail Link direct'],
    cons: ['Trafic cauchemardesque', 'Quartier peu esthétique', 'Pollution sonore'],
    activities: ['Platinum Fashion Mall', 'Pratunam Market', 'Baiyoke Sky Tower', 'Suan Pakkad Palace'],
    bestFor: 'Shoppers, voyageurs transit, budget moyen',
    tags: ['budget-friendly', 'family']
  }
]
