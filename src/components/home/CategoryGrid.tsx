"use client";

import { useCategoriesQuery, DBCategory } from "@/api/hooks/category.hooks";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { apiClient } from "@/api/apiclient/apiClient";

interface CategoryItem {
  name: string;
  image: string | null;
}

const mockCategories = [
  { name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600' },
  { name: 'Necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600' },
  { name: 'Bracelets', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600' },
  { name: 'Earrings', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600' },
  { name: 'Solitaires', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600' },
];

export default function CategoryGrid() {
  const { data, isLoading } = useCategoriesQuery({ limit: 50 });

  const processImageUrl = (url: string | null) => {
    if (!url)
      return "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop";
    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("data:") ||
      url.startsWith("blob:")
    )
      return url;

    // Resolve dynamic base URL from apiClient configuration
    const clientBaseUrl = apiClient.defaults.baseURL || "";
    const baseUrl =
      clientBaseUrl.replace("/api", "") || "http://192.168.1.2:4000";

    return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  if (isLoading) {
    return null;
  }

  const rawCategories = data?.categories || [];

  const categoriesList: CategoryItem[] =
    rawCategories.length > 0
      ? rawCategories.map((cat: DBCategory) => ({
          name: cat.name,
          image: cat.image,
        }))
      : mockCategories.map((cat) => ({
          name: cat.name,
          image: cat.image,
        }));

  const repeatedCategories = [
    ...categoriesList,
    ...categoriesList,
    ...categoriesList,
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="heading-bold text-2xl sm:text-3xl lg:text-4xl text-black">
            SHOP BY <span className="text-[#D4AF37]">CATEGORY</span>
          </h2>
          <Link
            to="/categories"
            className="inline-flex items-center gap-1 text-xs uppercase font-bold tracking-wider text-black hover:text-[#B8933D] transition-colors"
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Scrollable Category Grid - Infinite Scroll LTR */}
        <div className="w-full overflow-hidden relative py-2">
          <div
            className="animate-scroll-ltr flex hover:[animation-play-state:paused] cursor-pointer"
            style={{ animationDuration: "70s" }}
          >
            {/* First track */}
            <div className="flex shrink-0 items-center justify-start gap-4 md:gap-6 px-2 min-w-full">
              {repeatedCategories.map((category: CategoryItem, idx: number) => {
                const imageUrl = processImageUrl(category.image);
                return (
                  <Link
                    key={`track1-${category.name}-${idx}`}
                    to={`/products?category=${encodeURIComponent(category.name)}`}
                    className="flex flex-col items-center group flex-shrink-0"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-1 bg-white border border-[#E5D5B5] group-hover:border-[#D4AF37] transition-all duration-300 shadow-sm">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider mt-3 text-[#2C2C2C] group-hover:text-[#D4AF37] transition-colors text-center truncate w-20 md:w-24">
                      {category.name}
                    </span>
                  </Link>
                );
              })}
            </div>
            {/* Second track (identical for seamless loop) */}
            <div className="flex shrink-0 items-center justify-start gap-4 md:gap-6 px-2 min-w-full">
              {repeatedCategories.map((category: CategoryItem, idx: number) => {
                const imageUrl = processImageUrl(category.image);
                return (
                  <Link
                    key={`track2-${category.name}-${idx}`}
                    to={`/products?category=${encodeURIComponent(category.name)}`}
                    className="flex flex-col items-center group flex-shrink-0"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-1 bg-white border border-[#E5D5B5] group-hover:border-[#D4AF37] transition-all duration-300 shadow-sm">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider mt-3 text-[#2C2C2C] group-hover:text-[#D4AF37] transition-colors text-center truncate w-20 md:w-24">
                      {category.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
