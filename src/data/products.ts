export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: { name: string; hex: string }[];
  tags: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  netWeight?: string;
  karat?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Solitaire Diamond Ring',
    price: 85000,
    originalPrice: 95000,
    description: 'A breathtaking 1.0 carat round brilliant cut diamond claw-set in an elegant, polished 18k white gold band. A timeless choice for engagements.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
    ],
    category: 'Rings',
    subcategory: 'Diamond Rings',
    brand: 'Cartier',
    rating: 4.9,
    reviews: 48,
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9'],
    colors: [
      { name: 'White Gold', hex: '#E5E4E2' },
      { name: 'Yellow Gold', hex: '#FFD700' },
    ],
    tags: ['ring', 'diamond', 'gold', 'solitaire', 'engagement'],
    inStock: true,
    isNew: true,
    netWeight: '3.5g',
    karat: '18K',
  },
  {
    id: '2',
    name: 'Royale Emerald Drop Earrings',
    price: 62000,
    originalPrice: 75000,
    description: 'Elegant teardrop earrings featuring rich, deep green emeralds surrounded by a micro-pave halo of brilliant diamonds, finished in 18k yellow gold.',
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800',
    ],
    category: 'Earrings',
    subcategory: 'Gemstone Earrings',
    brand: 'Bvlgari',
    rating: 4.8,
    reviews: 32,
    sizes: ['One Size'],
    colors: [
      { name: 'Yellow Gold', hex: '#FFD700' },
    ],
    tags: ['earrings', 'emerald', 'gemstone', 'diamond', 'gold'],
    inStock: true,
    netWeight: '5.2g',
    karat: '18K',
  },
  {
    id: '3',
    name: 'Classic Cuban Link Gold Chain',
    price: 45000,
    originalPrice: 49999,
    description: 'A timeless 22k yellow gold Cuban link chain with an ultra-high polish finish, featuring a secure lobster clasp. Perfect for layering or everyday wear.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    ],
    category: 'Necklaces',
    subcategory: 'Gold Chains',
    brand: 'Tiffany & Co.',
    rating: 4.7,
    reviews: 84,
    sizes: ['18 inches', '20 inches', '22 inches'],
    colors: [
      { name: 'Yellow Gold', hex: '#FFD700' },
    ],
    tags: ['necklace', 'chain', 'gold', 'classic'],
    inStock: true,
    isSale: true,
    netWeight: '12g',
    karat: '22K',
  },
  {
    id: '4',
    name: 'Sparkling Diamond Tennis Bracelet',
    price: 125000,
    description: 'An exquisite, continuous row of round-cut brilliant diamonds totaling 3.0 carats, meticulously set in a flexible 18k white gold tennis bracelet setting.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
    ],
    category: 'Bracelets',
    subcategory: 'Diamond Bracelets',
    brand: 'Tiffany & Co.',
    rating: 5.0,
    reviews: 29,
    sizes: ['6.5 inches', '7.0 inches', '7.5 inches'],
    colors: [
      { name: 'White Gold', hex: '#E5E4E2' },
    ],
    tags: ['bracelet', 'diamond', 'tennis', 'gold', 'luxury'],
    inStock: true,
    isNew: true,
    netWeight: '8.4g',
    karat: '18K',
  },
  {
    id: '5',
    name: 'Eternity Rose Gold Promise Ring',
    price: 28000,
    originalPrice: 32000,
    description: 'A dainty rose gold band embellished with a continuous line of sparkling cubic zirconia stones. Represents eternal love and promise.',
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800',
    ],
    category: 'Rings',
    subcategory: 'Eternity Bands',
    brand: 'Pandora',
    rating: 4.6,
    reviews: 112,
    sizes: ['US 5', 'US 6', 'US 7', 'US 8'],
    colors: [
      { name: 'Rose Gold', hex: '#B76E79' },
    ],
    tags: ['ring', 'rose-gold', 'eternity', 'promise'],
    inStock: true,
    isSale: true,
    netWeight: '2.8g',
    karat: '14K',
  },
  {
    id: '6',
    name: 'South Sea Pearl Pendant Necklace',
    price: 35000,
    description: 'A hand-selected, lustrous white South Sea pearl suspended from a delicate 18k white gold bail and matching chain, highlighted by a single diamond accent.',
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
    ],
    category: 'Pendants',
    subcategory: 'Pearl Pendants',
    brand: 'Swarovski',
    rating: 4.9,
    reviews: 18,
    sizes: ['16 inches', '18 inches'],
    colors: [
      { name: 'White Pearl', hex: '#F0EAD6' },
    ],
    tags: ['necklace', 'pendant', 'pearl', 'gold', 'white-gold'],
    inStock: true,
    netWeight: '4.1g',
    karat: '18K',
  },
  {
    id: '7',
    name: 'Aura Engraved Gold Bangle',
    price: 95000,
    originalPrice: 110000,
    description: 'An intricately hand-engraved 22k yellow gold bangle with a classic openable clasp. Displays traditional Indian design elements.',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800',
    ],
    category: 'Bracelets',
    subcategory: 'Bangles',
    brand: 'Cartier',
    rating: 4.8,
    reviews: 41,
    sizes: ['2.4', '2.6', '2.8'],
    colors: [
      { name: 'Yellow Gold', hex: '#FFD700' },
    ],
    tags: ['bangle', 'bracelet', 'gold', 'traditional'],
    inStock: true,
    netWeight: '22g',
    karat: '22K',
  },
  {
    id: '8',
    name: 'Royal Blue Sapphire Studs',
    price: 48000,
    originalPrice: 55000,
    description: 'Royal blue oval sapphire gemstones set in a classic four-prong 18k white gold setting. Subtle, elegant daily-wear earrings.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    ],
    category: 'Earrings',
    subcategory: 'Gemstone Studs',
    brand: 'Bvlgari',
    rating: 4.7,
    reviews: 23,
    sizes: ['One Size'],
    colors: [
      { name: 'White Gold', hex: '#E5E4E2' },
    ],
    tags: ['earrings', 'sapphire', 'gemstone', 'blue', 'studs'],
    inStock: true,
    isNew: true,
    netWeight: '3.0g',
    karat: '18K',
  },
];

export const categories = [
  {
    name: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600',
    subcategories: ['Diamond Rings', 'Eternity Bands', 'Gold Rings'],
  },
  {
    name: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
    subcategories: ['Gold Chains', 'Chokers', 'Diamond Necklaces'],
  },
  {
    name: 'Earrings',
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600',
    subcategories: ['Gemstone Earrings', 'Studs', 'Gold Hoops'],
  },
  {
    name: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600',
    subcategories: ['Diamond Bracelets', 'Bangles', 'Gold Bracelets'],
  },
  {
    name: 'Pendants',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600',
    subcategories: ['Pearl Pendants', 'Gold Pendants', 'Diamond Pendants'],
  },
];

export const brands = [
  'Cartier',
  'Tiffany & Co.',
  'Bvlgari',
  'Pandora',
  'Swarovski',
];
