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
    name: 'Eternal Solitaire Ring',
    price: 45999,
    originalPrice: 49999,
    description: 'An exquisite 18K yellow gold ring featuring a certified 0.5-carat brilliant round-cut solitaire diamond with VVS1 clarity.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
    ],
    category: 'Rings',
    subcategory: 'Solitaires',
    brand: 'Solitaire Luxe',
    rating: 4.9,
    reviews: 128,
    sizes: ['5', '6', '7', '8', '9'],
    colors: [
      { name: '18K Yellow Gold', hex: '#E5D5B5' },
      { name: '18K White Gold', hex: '#E5E7EB' },
    ],
    tags: ['ring', 'solitaire', 'diamond', 'engagement'],
    inStock: true,
    isNew: true,
    netWeight: '3.5g',
    karat: '18K',
  },
  {
    id: '2',
    name: 'Royal Heritage Choker Set',
    price: 125000,
    originalPrice: 135000,
    description: 'A stunning 22K yellow gold choker necklace set with traditional filigree work and matching drop earrings, perfect for bridal wear.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    ],
    category: 'Necklaces',
    subcategory: 'Gold',
    brand: 'Aura Gold',
    rating: 4.8,
    reviews: 212,
    sizes: ['Standard'],
    colors: [
      { name: '22K Yellow Gold', hex: '#D4AF37' },
    ],
    tags: ['necklace', 'choker', 'gold', 'bridal'],
    inStock: true,
    netWeight: '25g',
    karat: '22K',
  },
  {
    id: '3',
    name: 'Rose Gold Infinity Bracelet',
    price: 18999,
    originalPrice: 21999,
    description: 'Elegant 14K rose gold bracelet featuring an infinity link design embellished with micro-pave diamonds.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    ],
    category: 'Bracelets',
    subcategory: 'Rose Gold',
    brand: 'Velasca Rose',
    rating: 4.7,
    reviews: 89,
    sizes: ['6.5 inch', '7.0 inch'],
    colors: [
      { name: '14K Rose Gold', hex: '#E0A899' },
    ],
    tags: ['bracelet', 'rose gold', 'diamond', 'infinity'],
    inStock: true,
    isSale: true,
    netWeight: '4.8g',
    karat: '14K',
  },
  {
    id: '4',
    name: 'Diamond Halo Stud Earrings',
    price: 29999,
    description: 'Timeless 18K white gold stud earrings featuring a center diamond surrounded by a sparkling halo of pave diamonds.',
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800',
    ],
    category: 'Earrings',
    subcategory: 'Diamond',
    brand: 'Solitaire Luxe',
    rating: 5.0,
    reviews: 44,
    sizes: ['Standard'],
    colors: [
      { name: '18K White Gold', hex: '#E5E7EB' },
      { name: '18K Yellow Gold', hex: '#E5D5B5' },
    ],
    tags: ['earrings', 'studs', 'diamond', 'halo'],
    inStock: true,
    isNew: true,
    netWeight: '2.2g',
    karat: '18K',
  },
  {
    id: '5',
    name: 'Classic Gold Kada Bangle',
    price: 68999,
    originalPrice: 72999,
    description: 'Broad 22K yellow gold kada bangle with traditional carvings and a secure screw lock mechanism.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
    ],
    category: 'Bracelets',
    subcategory: 'Gold',
    brand: 'Aura Gold',
    rating: 4.6,
    reviews: 156,
    sizes: ['2.4', '2.6', '2.8'],
    colors: [
      { name: '22K Yellow Gold', hex: '#D4AF37' },
    ],
    tags: ['bangle', 'kada', 'gold', 'traditional'],
    inStock: true,
    isSale: true,
    netWeight: '15g',
    karat: '22K',
  },
  {
    id: '6',
    name: 'Emerald Drop Pendant',
    price: 24999,
    description: 'Delicate 18K gold chain featuring a pear-shaped natural emerald drop pendant outlined with petite round diamonds.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    ],
    category: 'Necklaces',
    subcategory: 'Pendant',
    brand: 'Velasca Rose',
    rating: 4.9,
    reviews: 320,
    sizes: ['16 inch', '18 inch'],
    colors: [
      { name: '18K Yellow Gold', hex: '#D4AF37' },
    ],
    tags: ['pendant', 'emerald', 'gold', 'necklace'],
    inStock: true,
    netWeight: '3.1g',
    karat: '18K',
  },
  {
    id: '7',
    name: 'Geometric Diamond Huggies',
    price: 15499,
    originalPrice: 17999,
    description: 'Modern 14K yellow gold huggie earrings set with sparkling princess-cut diamonds in a geometric channel setting.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    ],
    category: 'Earrings',
    subcategory: 'Gold',
    brand: 'Glow Silver',
    rating: 4.7,
    reviews: 540,
    sizes: ['Standard'],
    colors: [
      { name: '14K Yellow Gold', hex: '#D4AF37' },
      { name: '14K Rose Gold', hex: '#E0A899' },
    ],
    tags: ['earrings', 'huggies', 'gold', 'geometric'],
    inStock: true,
    netWeight: '1.8g',
    karat: '14K',
  },
  {
    id: '8',
    name: 'Sleek Platinum Band',
    price: 39999,
    originalPrice: 42999,
    description: 'Ultra-premium platinum band with a matte finish center and polished bevelled edges, ideal for daily wear or wedding bands.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
    ],
    category: 'Rings',
    subcategory: 'Bands',
    brand: 'Solitaire Luxe',
    rating: 4.5,
    reviews: 78,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'Platinum 950', hex: '#F3F4F6' },
    ],
    tags: ['band', 'ring', 'platinum', 'wedding'],
    inStock: true,
    isNew: true,
    netWeight: '5.5g',
    karat: 'PT950',
  },
];

export const categories = [
  {
    name: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600',
    subcategories: ['Solitaires', 'Bands', 'Fashion Rings'],
  },
  {
    name: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
    subcategories: ['Chokers', 'Pendants', 'Chains'],
  },
  {
    name: 'Earrings',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600',
    subcategories: ['Studs', 'Huggies', 'Drops'],
  },
  {
    name: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600',
    subcategories: ['Rose Gold', 'Gold Bangles', 'Cuffs'],
  },
  {
    name: 'Solitaires',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600',
    subcategories: ['Rings', 'Earrings', 'Pendants'],
  },
];

export const brands = [
  'Aura Gold',
  'Solitaire Luxe',
  'Velasca Rose',
  'Glow Silver',
  'Heritage Jadau',
];
