import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard, { ProductCardItem } from "@/components/product/ProductCard";
import { useProductsQuery } from "@/api/hooks/product.hooks";
import { useCategoriesQuery } from "@/api/hooks/category.hooks";

const processImageUrl = (url: any) => {
  if (!url)
    return "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=800";
  const finalUrl = typeof url === "string" ? url : url.url || "";
  if (typeof finalUrl !== "string" || !finalUrl)
    return "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=800";
  if (
    finalUrl.startsWith("http://") ||
    finalUrl.startsWith("https://") ||
    finalUrl.startsWith("data:") ||
    finalUrl.startsWith("blob:")
  )
    return finalUrl;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "")
    : "http://localhost:4000";
  return `${baseUrl}${finalUrl.startsWith("/") ? "" : "/"}${finalUrl}`;
};

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const { data: productsData, isLoading } = useProductsQuery({ limit: 100 });
  const { data: categoriesData } = useCategoriesQuery({ limit: 20 });

  const mappedProducts: ProductCardItem[] = useMemo(() => {
    if (!productsData?.products) return [];
    return productsData.products.map((dbP: any) => ({
      id: dbP.id,
      name: dbP.name,
      price: Number(dbP.price),
      originalPrice: dbP.discountPrice ? Number(dbP.discountPrice) : undefined,
      images: [
        processImageUrl(dbP.image),
        ...(Array.isArray(dbP.images) ? dbP.images.map(processImageUrl) : []),
      ],
      category: dbP.category?.name || "Uncategorized",
      rating: dbP.rating || 5,
      inStock: dbP.quantity > 0,
      sizes: Array.isArray(dbP.sizes) ? dbP.sizes : [],
      colors: Array.isArray(dbP.colors)
        ? (dbP.colors as any[]).map((c: any) =>
            typeof c === "string" ? { name: c } : c,
          )
        : [],
      variants: dbP.variants,
    }));
  }, [productsData]);

  const searchResults = useMemo(() => {
    if (query.trim().length < 2) return [];
    const qLower = query.trim().toLowerCase();
    return mappedProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(qLower) ||
        (p.category && p.category.toLowerCase().includes(qLower)),
    );
  }, [query, mappedProducts]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <MainLayout>
      <div className="pt-32 pb-16 bg-[#FAF9F6] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Search Form */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, categories, or collections..."
                className="w-full bg-transparent border-b-2 border-gray-300 focus:border-[#8A1B28] py-4 pl-10 pr-12 text-xl outline-none font-medium text-black transition-colors"
                autoFocus
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-black"
                >
                  <X className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#8A1B28]"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}
            </form>
          </div>

          {/* Results or Suggestions */}
          {query.trim().length < 2 ? (
            <div className="max-w-2xl mx-auto space-y-10">
              {/* Popular Searches */}
              <div>
                <h3 className="text-xs uppercase font-extrabold text-gray-500 tracking-wider mb-4">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {["Ring", "Necklace", "Gold", "Diamond", "Bangles", "Earrings"].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() =>
                          navigate(`/products?search=${encodeURIComponent(term)}`)
                        }
                        className="px-4 py-2 bg-white border border-[#E5D5B5] rounded-full text-xs font-bold text-[#2C2C2C] hover:border-[#8A1B28] hover:text-[#8A1B28] transition-colors shadow-xs"
                      >
                        {term}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Categories */}
              {categoriesData?.categories && categoriesData.categories.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase font-extrabold text-gray-500 tracking-wider mb-4">
                    Browse Categories
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categoriesData.categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/products?category=${encodeURIComponent(cat.name)}`}
                        className="flex items-center justify-between p-4 bg-white border border-[#E5D5B5]/60 rounded-xl hover:border-[#8A1B28] transition-all shadow-xs group"
                      >
                        <span className="font-bold text-xs uppercase tracking-wider text-[#2C2C2C] group-hover:text-[#8A1B28]">
                          {cat.name}
                        </span>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#8A1B28] transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Results Header Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-[#E5D5B5]/60">
                <div>
                  <h2 className="font-display text-xl font-bold text-black uppercase">
                    Search Results
                  </h2>
                  <p className="text-xs text-gray-500 tracking-wide mt-0.5">
                    Found {searchResults.length} related items for "<strong>{query}</strong>"
                  </p>
                </div>

                {searchResults.length > 0 && (
                  <button
                    onClick={() =>
                      navigate(`/products?search=${encodeURIComponent(query.trim())}`)
                    }
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8A1B28] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#721620] transition-colors shadow-sm"
                  >
                    <span>View All Matching Products</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-[#8A1B28]" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
                  {searchResults.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white border border-[#E5D5B5]/60 rounded-2xl p-8 max-w-md mx-auto shadow-sm">
                  <h3 className="font-display text-lg font-bold text-[#8A1B28] mb-2 uppercase">
                    No products found for "{query}"
                  </h3>
                  <p className="text-xs text-gray-500 mb-6">
                    Try searching for different keywords or explore all available items on the products page.
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center gap-2 bg-black hover:bg-black/90 text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-lg transition-colors shadow-sm"
                  >
                    View All Products
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
