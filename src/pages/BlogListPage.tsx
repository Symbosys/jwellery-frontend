"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, User, Clock, Eye, ArrowLeft, Share2, Facebook, Twitter, Link2, Check } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useBlogsQuery, useBlogDetailQuery, DBBlog } from "@/api/hooks/blog.hooks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// High-quality mock blogs to fallback to if backend has no blogs
const MOCK_BLOGS: DBBlog[] = [
  {
    id: "mock-1",
    title: "HOW TO MEASURE YOUR RING SIZE AT HOME",
    slug: "how-to-measure-your-ring-size-at-home",
    excerpt: "Finding the perfect fit doesn't have to be a guessing game. Use our simple step-by-step guide to measure your ring size accurately at home using paper or string.",
    content: `
      <h2>The Importance of Right Fitting</h2>
      <p>An ill-fitting ring can either easily slip off your finger or restrict blood flow. Finding the perfect fit is key to daily comfort and the long-term safety of your precious solitaire.</p>
      <h2>Method 1: The Paper or String Test</h2>
      <p>To measure using materials at hand:</p>
      <ul>
        <li>Wrap a thin strip of paper or piece of string snugly around the base of the intended finger.</li>
        <li>Mark the exact spot where the paper/string overlaps to form a complete circle.</li>
        <li>Lay it flat and measure the distance in millimetres using a standard ruler. This gives you the circumference.</li>
        <li>Cross-reference the circumference with our standard size chart to find your match.</li>
      </ul>
      <blockquote>
        "Pro Tip: Fingers tend to be slightly larger in the evening and during warm weather, so measure at the end of the day for the best fit."
      </blockquote>
    `,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000&auto=format&fit=crop",
    author: "Aura Jewellery Experts",
    tags: ["Guides", "Rings", "Sizing"],
    isActive: true,
    viewsCount: 154,
    readTime: 5,
    createdAt: "2026-06-15T08:00:00.000Z",
    updatedAt: "2026-06-15T08:00:00.000Z"
  },
  {
    id: "mock-2",
    title: "CARING FOR YOUR GOLD & DIAMOND JEWELLERY",
    slug: "caring-for-your-gold-and-diamond-jewellery",
    excerpt: "Keep your precious pieces sparkling for generations. Discover the best practices for cleaning, storing, and maintaining your gold and diamonds safely.",
    content: `
      <h2>Keep the Sparkle Alive</h2>
      <p>Fine jewellery is an investment in beauty and emotion. Over time, daily wear, lotions, and soaps can leave a film over diamonds and gold, dulling their natural brilliance.</p>
      <h2>Simple Cleaning at Home</h2>
      <p>Follow this safe, professional cleaning routine:</p>
      <ul>
        <li>Prepare a bowl of lukewarm water mixed with a few drops of mild dishwashing soap.</li>
        <li>Soak your gold and diamond pieces for 15-20 minutes.</li>
        <li>Gently brush details and stone backings with a soft-bristled toothbrush to remove dust.</li>
        <li>Rinse thoroughly in clean water and pat dry with a lint-free polishing cloth.</li>
      </ul>
      <blockquote>
        "Warning: Never use harsh household cleaners or chlorine, as they can scratch metals and degrade diamond settings."
      </blockquote>
    `,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&auto=format&fit=crop",
    author: "Ananya Roy",
    tags: ["Care", "Gold", "Diamonds"],
    isActive: true,
    viewsCount: 231,
    readTime: 6,
    createdAt: "2026-06-08T08:00:00.000Z",
    updatedAt: "2026-06-08T08:00:00.000Z"
  },
  {
    id: "mock-3",
    title: "TOP 5 JEWELLERY TRENDS FOR THIS WEDDING SEASON",
    slug: "top-5-jewellery-trends-for-this-wedding-season",
    excerpt: "From statement choker necklaces to elegant layered bangles, explore the hottest trends dominating wedding fashion this season and how to style them.",
    content: `
      <h2>Bridal Elegance Redefined</h2>
      <p>This wedding season is all about blending rich heritage with modern minimalism. Brides are opting for pieces that are not only grand for the big day but versatile enough for future wear.</p>
      <h2>Top Trends of the Season</h2>
      <ul>
        <li><strong>Choker Necklaces:</strong> Broad, intricate chokers in 22K gold featuring traditional filigree or gemstone details.</li>
        <li><strong>Multi-layered Chains:</strong> Delicate chains layered with solitaire pendants for a modern, cascading neck look.</li>
        <li><strong>Statement Cocktail Rings:</strong> Large, bold gold rings encrusted with diamonds or emeralds that draw every eye.</li>
        <li><strong>Stackable Rose Gold Bangles:</strong> Combining traditional patterns in modern rose gold hues.</li>
      </ul>
    `,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1000&auto=format&fit=crop",
    author: "Fashion Team",
    tags: ["Trends", "Wedding", "Style"],
    isActive: true,
    viewsCount: 342,
    readTime: 8,
    createdAt: "2026-06-01T08:00:00.000Z",
    updatedAt: "2026-06-01T08:00:00.000Z"
  }
];

const CATEGORIES = ["All", "Guides", "Care", "Trends", "Style", "Gold", "Diamonds"];

const formatDate = (dateStr: string | Date) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return String(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [copied, setCopied] = useState(false);

  const selectedSlug = searchParams.get("slug");

  // Fetch blogs list from backend
  const { data: backendData, isLoading: isListLoading } = useBlogsQuery({
    search: searchQuery || undefined,
    isActive: true,
    sort: sortBy,
  });

  // Fetch single blog detail if a slug is active
  const { data: dbBlogDetail, isLoading: isDetailLoading } = useBlogDetailQuery(selectedSlug || "");

  // Combine backend list and mock list
  const blogsList = useMemo(() => {
    let list = MOCK_BLOGS;
    if (backendData?.blogs && backendData.blogs.length > 0) {
      list = backendData.blogs;
    }

    // Apply client-side filters
    return list.filter((blog) => {
      // Category filter (looks at tags)
      const matchesCategory =
        selectedCategory === "All" ||
        blog.tags.some((tag) => tag.toLowerCase() === selectedCategory.toLowerCase());

      // Search filter (looks at title/excerpt)
      const matchesSearch =
        !searchQuery ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [backendData, selectedCategory, searchQuery]);

  // Determine the featured blog post (newest post when no filters/searches are active)
  const featuredBlog = useMemo(() => {
    if (selectedCategory !== "All" || searchQuery !== "" || blogsList.length === 0) {
      return null;
    }
    return blogsList[0];
  }, [blogsList, selectedCategory, searchQuery]);

  // Determine the blogs for the grid (excluding the featured one if visible)
  const gridBlogs = useMemo(() => {
    if (featuredBlog) {
      return blogsList.slice(1);
    }
    return blogsList;
  }, [blogsList, featuredBlog]);

  // Get active blog for the detail view (either fetched from DB or fallback to mock)
  const activeBlog = useMemo(() => {
    if (!selectedSlug) return null;
    if (dbBlogDetail) return dbBlogDetail;
    return MOCK_BLOGS.find((b) => b.slug === selectedSlug) || null;
  }, [selectedSlug, dbBlogDetail]);

  // Determine related blogs for the bottom of the detail view
  const relatedBlogs = useMemo(() => {
    if (!activeBlog) return [];
    const list = backendData?.blogs && backendData.blogs.length > 0 ? backendData.blogs : MOCK_BLOGS;
    return list
      .filter((b) => b.id !== activeBlog.id && b.tags.some((t) => activeBlog.tags.includes(t)))
      .slice(0, 3);
  }, [activeBlog, backendData]);

  // Handle Share link copy
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Scroll to top on page or view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSlug]);

  return (
    <MainLayout>
      <div className="bg-[#FAF9F6] min-h-screen pb-20">
        <AnimatePresence mode="wait">
          {!selectedSlug ? (
            /* BLOG LIST VIEW */
            <motion.div
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12"
            >
              {/* Header */}
              <div className="text-center mb-16">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-1.5 rounded-full">
                  Insights & Articles
                </span>
                <h1 className="heading-bold text-4xl sm:text-5xl lg:text-6xl text-black mt-4 uppercase">
                  Our <span className="text-gray-400 italic">Blog</span>
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-base sm:text-lg">
                  Explore the latest guides, jewellery care tips, metal trends, and styling advice to elevate your personal brilliance.
                </p>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#FAF9F6] border-0 text-black placeholder-gray-400 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>

                {/* Categories Scrollable Pills */}
                <div className="flex gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto py-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold transition-all whitespace-nowrap",
                        selectedCategory === cat
                          ? "bg-black text-white shadow-md"
                          : "bg-[#FAF9F6] text-gray-500 hover:text-black hover:bg-gray-100"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Sort Option */}
                <div className="w-full md:w-auto flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold whitespace-nowrap">
                    Sort By:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#FAF9F6] border-0 text-black text-xs uppercase tracking-wider font-bold py-2.5 px-3 pr-8 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:outline-none cursor-pointer"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="popular">Popular</option>
                  </select>
                </div>
              </div>

              {isListLoading ? (
                /* LOADING STATE */
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="h-10 w-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Loading articles...</p>
                </div>
              ) : blogsList.length === 0 ? (
                /* EMPTY STATE */
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                  <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="mt-4 bg-[#D4AF37] hover:bg-[#B8933D] text-white rounded-xl text-xs uppercase font-bold tracking-wider px-6 py-3"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                /* LIST OF BLOGS */
                <>
                  {/* FEATURED SPOTLIGHT */}
                  {featuredBlog && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-14 group"
                    >
                      <div
                        onClick={() => navigate(`/blog/${featuredBlog.slug}`)}
                        className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 cursor-pointer"
                      >
                        {/* Image */}
                        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] overflow-hidden">
                          <img
                            src={featuredBlog.image || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000"}
                            alt={featuredBlog.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <span className="absolute top-4 left-4 bg-[#D4AF37] text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-md">
                            Featured Post
                          </span>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {featuredBlog.tags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-[#FAF9F6] text-black text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Title */}
                          <h2 className="heading-bold text-2xl sm:text-3xl lg:text-4xl text-black leading-tight mb-4 group-hover:text-[#B8933D] transition-colors uppercase">
                            {featuredBlog.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6 line-clamp-4">
                            {featuredBlog.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-6 border-t border-gray-100 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <User className="h-4 w-4 text-[#D4AF37]" />
                              {featuredBlog.author}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" />
                              {formatDate(featuredBlog.createdAt)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" />
                              {featuredBlog.readTime || 5} Min Read
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Eye className="h-4 w-4" />
                              {featuredBlog.viewsCount} Views
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* GRID LIST */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gridBlogs.map((blog, index) => (
                      <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        onClick={() => navigate(`/blog/${blog.slug}`)}
                        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col h-full"
                      >
                        {/* Card Image */}
                        <div className="relative overflow-hidden aspect-[16/10]">
                          <img
                            src={blog.image || "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800"}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Main tag overlay */}
                          {blog.tags.length > 0 && (
                            <span className="absolute bottom-3 left-3 bg-white text-black text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">
                              {blog.tags[0]}
                            </span>
                          )}
                        </div>

                        {/* Card Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          {/* Title */}
                          <h3 className="font-extrabold text-lg text-black mb-3 leading-snug group-hover:text-[#B8933D] transition-colors line-clamp-2 uppercase">
                            {blog.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                            {blog.excerpt}
                          </p>

                          {/* Meta Row */}
                          <div className="mt-auto pt-4 border-t border-gray-500/10 flex items-center justify-between text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(blog.createdAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {blog.readTime || 5} Min Read
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            /* BLOG DETAIL VIEW */
            <motion.div
              key="detail-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12"
            >
              {/* Back Button & Share */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => setSearchParams({})}
                  className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-black hover:text-[#B8933D] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Articles
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="p-2 bg-white border border-gray-150 hover:border-black rounded-lg text-gray-500 hover:text-black transition-all flex items-center justify-center"
                    title="Copy Link"
                  >
                    {copied ? <Check className="h-4 w-4 text-[#D4AF37]" /> : <Link2 className="h-4 w-4" />}
                  </button>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(activeBlog?.title || "")}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white border border-gray-150 hover:border-black rounded-lg text-gray-500 hover:text-[#1DA1F2] transition-all flex items-center justify-center"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white border border-gray-150 hover:border-black rounded-lg text-gray-500 hover:text-[#1877F2] transition-all flex items-center justify-center"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {isDetailLoading ? (
                /* LOADING DETAIL */
                <div className="flex flex-col items-center justify-center py-32">
                  <div className="h-10 w-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">Loading article details...</p>
                </div>
              ) : !activeBlog ? (
                /* NOT FOUND */
                <div className="text-center py-20 bg-white rounded-3xl">
                  <p className="text-gray-400 text-lg">Article not found.</p>
                  <Button
                    onClick={() => setSearchParams({})}
                    className="mt-4 bg-[#D4AF37] hover:bg-[#B8933D] text-white rounded-xl text-xs uppercase font-bold tracking-wider px-6 py-3"
                  >
                    Back to Blog
                  </Button>
                </div>
              ) : (
                /* DETAILED CONTENT */
                <article className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6 sm:p-10 lg:p-12">
                  {/* Article Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeBlog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#FAF9F6] text-black text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h1 className="heading-bold text-3xl sm:text-4xl lg:text-5xl text-black leading-tight mb-6 uppercase">
                    {activeBlog.title}
                  </h1>

                  {/* Meta Details */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pb-8 border-b border-gray-100 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <User className="h-4 w-4 text-[#D4AF37]" />
                      Written By: <span className="text-black font-extrabold">{activeBlog.author}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      Published: <span className="text-black font-extrabold">{formatDate(activeBlog.createdAt)}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      Read Time: <span className="text-black font-extrabold">{activeBlog.readTime || 5} Mins</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye className="h-4 w-4" />
                      Views: <span className="text-black font-extrabold">{activeBlog.viewsCount}</span>
                    </span>
                  </div>

                  {/* Feature Image */}
                  <div className="my-8 rounded-2xl overflow-hidden aspect-[16/9]">
                    <img
                      src={activeBlog.image || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200"}
                      alt={activeBlog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Body Content */}
                  <div
                    className="prose max-w-none text-gray-600 leading-relaxed space-y-6 
                      prose-headings:text-black prose-headings:font-extrabold prose-headings:uppercase prose-headings:mt-8 prose-headings:mb-4
                      prose-h2:text-2xl prose-h3:text-xl
                      prose-strong:text-black prose-strong:font-bold
                      prose-blockquote:border-l-4 prose-blockquote:border-[#D4AF37] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-8 prose-blockquote:text-lg prose-blockquote:text-black/80
                      prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
                      prose-li:my-2"
                    dangerouslySetInnerHTML={{ __html: activeBlog.content }}
                  />

                  {/* RELATED POSTS SECTION */}
                  {relatedBlogs.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-gray-100">
                      <h3 className="heading-bold text-xl sm:text-2xl text-black mb-8 uppercase">
                        Related <span className="text-gray-400 italic font-bold">Articles</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {relatedBlogs.map((blog) => (
                          <div
                            key={blog.id}
                            onClick={() => setSearchParams({ slug: blog.slug })}
                            className="group cursor-pointer"
                          >
                            <div className="relative overflow-hidden rounded-xl aspect-[16/10] mb-3">
                              <img
                                src={blog.image || "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400"}
                                alt={blog.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <h4 className="font-extrabold text-sm text-black leading-snug group-hover:text-[#B8933D] transition-colors line-clamp-2 uppercase">
                              {blog.title}
                            </h4>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
