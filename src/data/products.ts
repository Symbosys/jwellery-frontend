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
    name: 'Eternal CZ Solitaire Ring',
    price: 499,
    originalPrice: 999,
    description: 'An exquisite micro-gold plated ring featuring a sparkling AAA cubic zirconia solitaire with radiant clarity.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
    ],
    category: 'Rings',
    subcategory: 'CZ Rings',
    brand: 'CZ Sparkle',
    rating: 4.9,
    reviews: 128,
    sizes: ['5', '6', '7', '8', '9'],
    colors: [
      { name: '1 Gram Gold Polish', hex: '#E5D5B5' },
      { name: 'Silver Polish', hex: '#E5E7EB' },
    ],
    tags: ['ring', 'cz', 'american diamond', 'artificial'],
    inStock: true,
    isNew: true,
    netWeight: '3.5g',
    karat: '1 Gram Gold',
  },
  {
    id: '2',
    name: 'Royal City Gold Choker Set',
    price: 1499,
    originalPrice: 2499,
    description: 'A stunning City Gold choker necklace set with traditional filigree work and matching drop earrings, perfect for bridal wear.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    ],
    category: 'Necklaces',
    subcategory: 'City Gold',
    brand: 'City Gold Royal',
    rating: 4.8,
    reviews: 212,
    sizes: ['Standard'],
    colors: [
      { name: 'City Gold Finish', hex: '#D4AF37' },
    ],
    tags: ['necklace', 'choker', 'city gold', 'bridal'],
    inStock: true,
    netWeight: '25g',
    karat: 'City Gold',
  },
  {
    id: '3',
    name: 'Rose Gold Polish Infinity Bracelet',
    price: 599,
    originalPrice: 999,
    description: 'Elegant rose gold finish bracelet featuring an infinity link design embellished with micro-pave cubic zirconia.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    ],
    category: 'Bracelets',
    subcategory: 'Rose Gold Polish',
    brand: 'Velasca Fashion',
    rating: 4.7,
    reviews: 89,
    sizes: ['6.5 inch', '7.0 inch'],
    colors: [
      { name: 'Rose Gold Finish', hex: '#E0A899' },
    ],
    tags: ['bracelet', 'rose gold', 'cz', 'infinity'],
    inStock: true,
    isSale: true,
    netWeight: '4.8g',
    karat: 'Rose Gold Finish',
  },
  {
    id: '4',
    name: 'American Diamond Stud Earrings',
    price: 399,
    originalPrice: 799,
    description: 'Timeless micro-silver plated stud earrings featuring a center CZ diamond stone surrounded by a sparkling halo.',
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800',
    ],
    category: 'Earrings',
    subcategory: 'American Diamond',
    brand: 'CZ Sparkle',
    rating: 5.0,
    reviews: 44,
    sizes: ['Standard'],
    colors: [
      { name: 'Silver Polish', hex: '#E5E7EB' },
      { name: 'Gold Polish', hex: '#E5D5B5' },
    ],
    tags: ['earrings', 'studs', 'cz', 'halo'],
    inStock: true,
    isNew: true,
    netWeight: '2.2g',
    karat: 'Silver Plated',
  },
  {
    id: '5',
    name: 'Classic City Gold Kada Bangle',
    price: 799,
    originalPrice: 1299,
    description: 'Broad City Gold kada bangle with traditional carvings and long-lasting gold polish.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
    ],
    category: 'Bracelets',
    subcategory: 'City Gold',
    brand: 'City Gold Royal',
    rating: 4.6,
    reviews: 156,
    sizes: ['2.4', '2.6', '2.8'],
    colors: [
      { name: 'City Gold Polish', hex: '#D4AF37' },
    ],
    tags: ['bangle', 'kada', 'city gold', 'traditional'],
    inStock: true,
    isSale: true,
    netWeight: '15g',
    karat: '1 Gram Gold',
  },
  {
    id: '6',
    name: 'Emerald Color Drop Pendant',
    price: 499,
    originalPrice: 899,
    description: 'Delicate gold-toned chain featuring a green crystal drop pendant outlined with petite CZ stones.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    ],
    category: 'Necklaces',
    subcategory: 'Pendant',
    brand: 'Velasca Fashion',
    rating: 4.9,
    reviews: 320,
    sizes: ['16 inch', '18 inch'],
    colors: [
      { name: 'Gold Plated', hex: '#D4AF37' },
    ],
    tags: ['pendant', 'emerald', 'gold plated', 'necklace'],
    inStock: true,
    netWeight: '3.1g',
    karat: 'Gold Plated',
  },
  {
    id: '7',
    name: 'Geometric CZ Huggies',
    price: 349,
    originalPrice: 599,
    description: 'Modern gold-plated huggie earrings set with sparkling princess-cut cubic zirconia.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    ],
    category: 'Earrings',
    subcategory: 'Gold Plated',
    brand: 'Glow City Gold',
    rating: 4.7,
    reviews: 540,
    sizes: ['Standard'],
    colors: [
      { name: 'Gold Plated', hex: '#D4AF37' },
      { name: 'Rose Gold Plated', hex: '#E0A899' },
    ],
    tags: ['earrings', 'huggies', 'gold plated', 'cz'],
    inStock: true,
    netWeight: '1.8g',
    karat: 'Gold Plated',
  },
  {
    id: '8',
    name: 'Sleek Fashion Ring Band',
    price: 299,
    originalPrice: 499,
    description: 'Ultra-premium gold-toned band with a smooth finish, ideal for daily fashion wear.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
    ],
    category: 'Rings',
    subcategory: 'Bands',
    brand: 'CZ Sparkle',
    rating: 4.5,
    reviews: 78,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: [
      { name: 'Gold Finish', hex: '#F3F4F6' },
    ],
    tags: ['band', 'ring', 'city gold', 'fashion'],
    inStock: true,
    isNew: true,
    netWeight: '5.5g',
    karat: 'Gold Plated',
  },
];

export const categories = [
  {
    name: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600',
    subcategories: ['CZ Rings', 'Fashion Bands', 'Adjustable Rings'],
  },
  {
    name: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
    subcategories: ['Chokers', 'City Gold Sets', 'Pendants'],
  },
  {
    name: 'Earrings',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600',
    subcategories: ['Studs', 'Huggies', 'Jhumkas'],
  },
  {
    name: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600',
    subcategories: ['Rose Gold Finish', 'City Gold Bangles', 'Cuffs'],
  },
  {
    name: 'City Gold Sets',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600',
    subcategories: ['Bridal Sets', 'Heavy Chokers', 'Lightweight Sets'],
  },
];

export const brands = [
  'City Gold Royal',
  'CZ Sparkle',
  'Velasca Fashion',
  'Glow City Gold',
  'Heritage Artificial',
];
