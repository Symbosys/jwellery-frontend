"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useBlogsQuery, DBBlog } from "@/api/hooks/blog.hooks";
import { apiClient } from "@/api/apiclient/apiClient";

interface BlogItem {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
}

const fallbackBlogs: BlogItem[] = [
  {
    id: "blog-1",
    category: "Guides",
    title: "HOW TO MEASURE YOUR RING SIZE AT HOME",
    excerpt: "Finding the perfect fit doesn't have to be a guessing game. Use our simple step-by-step guide to measure your ring size accurately at home using paper or string.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600",
    slug: "how-to-measure-your-ring-size-at-home"
  },
  {
    id: "blog-2",
    category: "Care",
    title: "CARING FOR YOUR GOLD & DIAMOND JEWELLERY",
    excerpt: "Keep your precious pieces sparkling for generations. Discover the best practices for cleaning, storing, and maintaining your gold and diamonds safely.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
    slug: "caring-for-your-gold-and-diamond-jewellery"
  },
  {
    id: "blog-3",
    category: "Trends",
    title: "TOP 5 JEWELLERY TRENDS FOR THIS WEDDING SEASON",
    excerpt: "From statement choker necklaces to elegant layered bangles, explore the hottest trends dominating wedding fashion this season and how to style them.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600",
    slug: "top-5-jewellery-trends-for-this-wedding-season"
  }
];

export default function BlogSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { data, isLoading } = useBlogsQuery({ limit: 6, isActive: true });

  if (isLoading) return null;

  const rawBlogs = data?.blogs || [];

  const processImageUrl = (url: string | null) => {
    if (!url) return "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    
    // Extract base URL from apiClient configuration
    const clientBaseUrl = apiClient.defaults.baseURL || "";
    const baseUrl = clientBaseUrl.replace("/api", "") || "http://192.168.1.2:4000";
    
    return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const activeBlogPosts: BlogItem[] = rawBlogs.length > 0
    ? rawBlogs.map((b: DBBlog) => {
        const category = Array.isArray(b.tags) && b.tags.length > 0 && typeof b.tags[0] === "string"
          ? b.tags[0]
          : "General";

        return {
          id: b.id,
          category,
          title: b.title,
          excerpt: b.excerpt || "",
          image: processImageUrl(b.image),
          slug: b.slug,
        };
      })
    : fallbackBlogs;


  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="heading-bold text-3xl sm:text-4xl lg:text-5xl text-gray-300 italic" style={{ fontStyle: 'italic' }}>
              OUR
            </h2>
            <h2 className="heading-bold text-3xl sm:text-4xl lg:text-5xl text-black">
              BLOG
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-black hover:text-[#B8933D] transition-colors group"
          >
            View All Posts
            <span className="w-8 h-8 rounded-full border-2 border-black group-hover:border-[#D4AF37] flex items-center justify-center transition-colors">
              <ChevronRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* Blog Cards - Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto hide-scrollbar pb-4"
        >
          {activeBlogPosts.map((post: BlogItem, index: number) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="min-w-[240px] sm:min-w-[280px] max-w-[300px] flex-shrink-0 group"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[16/10] w-full">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Category Tag */}
                  <span className="absolute bottom-3 left-3 bg-white text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-bold text-sm sm:text-base text-black mb-2 leading-snug group-hover:text-[#B8933D] transition-colors uppercase">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
