"use client";

import React, { useEffect, useRef } from "react";
import { useInfiniteProductsQuery } from "@/api/hooks/product.hooks";
import ProductCard, { ProductCardItem } from "@/components/product/ProductCard";
import { products as mockProducts } from "@/data/products";
import { ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=800";

const LIMIT = 8;

function processImageUrl(url: any): string {
  if (!url) return FALLBACK_IMAGE;
  const str = typeof url === "string" ? url : url?.url || "";
  if (!str) return FALLBACK_IMAGE;
  if (
    str.startsWith("http://") ||
    str.startsWith("https://") ||
    str.startsWith("data:") ||
    str.startsWith("blob:")
  )
    return str;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "")
    : "http://192.168.1.2:4000";
  return `${baseUrl}${str.startsWith("/") ? "" : "/"}${str}`;
}

export default function FeaturedProducts() {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteProductsQuery({
    limit: LIMIT,
    sort: "newest",
  });

  // Flatten all fetched pages of products
  const backendProducts =
    data?.pages?.flatMap((page) => page.products || []) ?? [];

  // Map backend products → ProductCardItem, fallback to mock data while loading or if empty
  const featured: ProductCardItem[] =
    backendProducts.length > 0
      ? backendProducts.map((p) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          originalPrice: p.discountPrice ? Number(p.discountPrice) : undefined,
          images: [
            processImageUrl(p.image),
            ...(Array.isArray(p.images) ? p.images.map(processImageUrl) : []),
          ],
          category: p.category?.name ?? "Uncategorized",
          rating: p.rating,
          inStock: p.quantity > 0,
          sizes: Array.isArray(p.sizes) ? p.sizes : [],
          colors: Array.isArray(p.colors)
            ? (p.colors as any[]).map((c) =>
                typeof c === "string" ? { name: c } : c,
              )
            : [],
          variants: p.variants,
        }))
      : mockProducts.map((p) => ({
          ...p,
          colors: Array.isArray(p.colors)
            ? (p.colors as any[]).map((c) =>
                typeof c === "string" ? { name: c } : c,
              )
            : [],
        }));

  // Trigger loading next page when user scrolls near the bottom sentinel
  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "300px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="heading-bold text-3xl sm:text-4xl lg:text-5xl text-black">
              TOP PICKS <span className="text-[#D4AF37]">FOR</span>
            </h2>
            <h2 className="heading-bold text-3xl sm:text-4xl lg:text-5xl text-[#D4AF37]">
              YOU
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-black hover:text-[#B8933D] transition-colors group"
          >
            Shop All Products
            <span className="w-8 h-8 rounded-full border-2 border-black group-hover:border-[#D4AF37] flex items-center justify-center transition-colors">
              <ChevronRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* Product Cards - Vertical Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <div
                key={i}
                className="w-full aspect-[3/4] bg-gray-100 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((product, index) => (
              <div key={`${product.id}-${index}`} className="w-full">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        )}

        {/* Loading skeletons for next page */}
        {isFetchingNextPage && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`loading-${i}`}
                className="w-full aspect-[3/4] bg-gray-100 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        )}

        {/* Intersection Sentinel */}
        <div
          ref={loadMoreRef}
          className="w-full py-8 flex justify-center items-center"
        >
          {isFetchingNextPage ? (
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <Loader2 className="h-5 w-5 animate-spin text-[#D4AF37]" />
              <span>Loading more products...</span>
            </div>
          ) : !hasNextPage && backendProducts.length > 0 ? (
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-gray-400 font-semibold">
              <span className="w-8 h-[1px] bg-gray-200" />
              <span>All Products Loaded</span>
              <span className="w-8 h-[1px] bg-gray-200" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
