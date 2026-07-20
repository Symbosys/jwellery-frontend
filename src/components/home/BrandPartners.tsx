"use client";

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBrandsQuery } from '@/api/hooks/brand.hooks';

const fallbackBrands = [
  {
    id: 'aura-gold',
    name: 'Aura Gold',
    shortName: 'AG',
    tagline: '22K Royal Indian Gold',
    color: '#D4AF37',
    logo: null
  },
  {
    id: 'solitaire-luxe',
    name: 'Solitaire Luxe',
    shortName: 'SL',
    tagline: 'Exquisite Certified Diamonds',
    color: '#B5A075',
    logo: null
  },
  {
    id: 'velasca-rose',
    name: 'Velasca Rose',
    shortName: 'VR',
    tagline: 'Minimalist Italian Rose Gold',
    color: '#E0A899',
    logo: null
  },
  {
    id: 'glow-silver',
    name: 'Glow Silver',
    shortName: 'GS',
    tagline: '925 Sterling Silver Jewellery',
    color: '#9CA3AF',
    logo: null
  }
];

export default function BrandPartners() {
  const { data: brandsData, isLoading } = useBrandsQuery({ isActive: true, limit: 12 });
  const brandsList = brandsData?.brands || [];

  const getShortName = (name: string) => {
    if (!name) return 'BR';
    return name
      .split(' ')
      .filter(Boolean)
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getBrandColor = (name: string) => {
    const colors = ['#D4AF37', '#B5A075', '#E0A899', '#8B4513', '#2D7D46', '#6B21A8', '#0E7490'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const displayBrands = brandsList.length > 0 
    ? brandsList.map(b => ({
        id: b.id,
        name: b.name,
        shortName: getShortName(b.name),
        tagline: b.description || 'Premium Jewellery',
        color: getBrandColor(b.name),
        logo: b.logo
      }))
    : fallbackBrands;

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="heading-bold text-3xl sm:text-4xl lg:text-5xl text-black">
              SHOP BY <span className="text-[#D4AF37]">COLLECTIONS</span>
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              Exquisite collections crafted with precision
            </p>
          </div>
          <Link
            to="/products"
            className="hidden sm:inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-black hover:text-[#B8933D] transition-colors group"
          >
            View All Collections
            <span className="w-8 h-8 rounded-full border-2 border-black group-hover:border-[#D4AF37] flex items-center justify-center transition-colors">
              <ChevronRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* Brand Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 rounded-2xl bg-gray-50 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {displayBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
              >
                <Link
                  to={`/products?brandId=${brand.id}`}
                  className="group block relative overflow-hidden rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-500"
                  style={{ background: `linear-gradient(135deg, ${brand.color}15, ${brand.color}08)` }}
                >
                  <div className="p-5 sm:p-6 min-h-[160px] sm:min-h-[180px] flex flex-col justify-between relative">
                    {/* Brand Logo or Initial Circle */}
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center overflow-hidden text-white font-black text-xl sm:text-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: brand.color }}
                    >
                      {brand.logo ? (
                        <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
                      ) : (
                        brand.shortName
                      )}
                    </div>

                    {/* Brand Info */}
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-black group-hover:text-[#B8933D] transition-colors uppercase tracking-wide truncate">
                        {brand.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-1 font-medium line-clamp-1">
                        {brand.tagline}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-[#D4AF37]">
                      <ChevronRight className="h-4 w-4 text-black" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
