"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
  Calendar,
  User,
  Clock,
  Eye,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Link2,
  Check,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import {
  useBlogsQuery,
  useBlogDetailQuery,
  DBBlog,
} from "@/api/hooks/blog.hooks";
import { Button } from "@/components/ui/button";

// Mock blogs for fallback
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

const formatDate = (dateStr: string | Date) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return String(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const generateHtmlTable = (headers: string[], rows: string[][]) => {
  const headerCols = headers.map(h => `<th class="border-b border-gray-200 px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-black bg-gray-50">${h}</th>`).join("");
  const rowHtml = rows.map(row => {
    const cols = row.map(cell => `<td class="border-b border-gray-100 px-4 py-3 text-sm text-gray-600">${cell}</td>`).join("");
    return `<tr class="hover:bg-gray-50/50 transition-colors">${cols}</tr>`;
  }).join("");

  const tableHtml = `
    <div class="overflow-x-auto my-6 border border-gray-200 rounded-xl shadow-sm">
      <table class="min-w-full border-collapse bg-white">
        <thead>
          <tr>${headerCols}</tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          ${rowHtml}
        </tbody>
      </table>
    </div>
  `;

  return tableHtml.replace(/\n/g, " ").replace(/\s+/g, " ");
};

const parseMarkdown = (markdown: string) => {
  if (!markdown) return "";
  
  let html = markdown;

  // Process Code blocks first
  const codeBlocks: string[] = [];
  html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(`<pre class="bg-gray-50 p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto border text-gray-700"><code>${code}</code></pre>`);
    return placeholder;
  });

  const inlineCodes: string[] = [];
  html = html.replace(/`(.*?)`/g, (match, code) => {
    const placeholder = `__INLINE_CODE_${inlineCodes.length}__`;
    inlineCodes.push(`<code class="bg-gray-50 px-1.5 py-0.5 rounded font-mono text-xs border text-gray-700">${code}</code>`);
    return placeholder;
  });

  // Parse Markdown Tables
  const lines = html.split("\n");
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];
  let newLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("|") && line.endsWith("|")) {
      const cells = line.split("|").map(c => c.trim()).slice(1, -1);
      
      if (!inTable) {
        inTable = true;
        tableHeaders = cells;
      } else {
        const isSeparator = cells.every(c => /^:?-+:?$/.test(c));
        if (isSeparator) {
          continue;
        } else {
          tableRows.push(cells);
        }
      }
    } else {
      if (inTable) {
        const tableHtml = generateHtmlTable(tableHeaders, tableRows);
        newLines.push(tableHtml);
        inTable = false;
        tableHeaders = [];
        tableRows = [];
      }
      newLines.push(lines[i]);
    }
  }
  if (inTable) {
    const tableHtml = generateHtmlTable(tableHeaders, tableRows);
    newLines.push(tableHtml);
  }

  html = newLines.join("\n");

  // Headings
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-extrabold mt-5 mb-2 text-black uppercase">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-extrabold mt-6 mb-3 text-black border-b pb-1 uppercase">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold mt-8 mb-4 text-black border-b pb-2 uppercase">$1</h1>');

  // Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-black">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-[#D4AF37] pl-6 py-1 my-4 italic text-black/80 bg-gray-50 rounded-r">$1</blockquote>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#D4AF37] underline hover:text-[#B8933D] font-bold">$1</a>');

  // Lists
  html = html.replace(/^[\-\*] (.*$)/gim, '<li class="list-disc ml-5 mb-1 text-gray-600">$1</li>');

  // Restore placeholders
  codeBlocks.forEach((code, index) => {
    html = html.replace(`__CODE_BLOCK_${index}__`, code);
  });
  inlineCodes.forEach((code, index) => {
    html = html.replace(`__INLINE_CODE_${index}__`, code);
  });

  // Paragraphs
  const blocks = html.split(/\n{2,}/);
  const parsedBlocks = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";
    if (
      trimmed.startsWith("<h") ||
      trimmed.startsWith("<p") ||
      trimmed.startsWith("<ul") ||
      trimmed.startsWith("<ol") ||
      trimmed.startsWith("<li") ||
      trimmed.startsWith("<blockquote") ||
      trimmed.startsWith("<pre") ||
      trimmed.startsWith("<div class=\"overflow-x-auto my-6\"") ||
      trimmed.startsWith("##") ||
      trimmed.startsWith("#") ||
      trimmed.startsWith(">") ||
      trimmed.startsWith("-") ||
      trimmed.startsWith("*")
    ) {
      return block;
    }
    return `<p class="mb-4 leading-relaxed text-gray-600">${block.replace(/\n/g, "<br />")}</p>`;
  });

  return parsedBlocks.join("\n");
};

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const activeSlug = typeof slug === "string" ? slug : "";

  // Fetch from backend
  const { data: dbBlog, isLoading } = useBlogDetailQuery(activeSlug);
  const { data: listData } = useBlogsQuery({ isActive: true });

  const activeBlog = useMemo(() => {
    if (dbBlog) return dbBlog;
    return MOCK_BLOGS.find((b) => b.slug === activeSlug) || null;
  }, [dbBlog, activeSlug]);

  const relatedBlogs = useMemo(() => {
    if (!activeBlog) return [];
    const list =
      listData?.blogs && listData.blogs.length > 0
        ? listData.blogs
        : MOCK_BLOGS;
    return list
      .filter(
        (b) =>
          b.id !== activeBlog.id &&
          b.tags.some((t) => activeBlog.tags.includes(t)),
      )
      .slice(0, 3);
  }, [activeBlog, listData]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSlug]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="bg-[#FAF9F6] min-h-screen flex items-center justify-center py-20">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">
              Loading article details...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!activeBlog) {
    return (
      <MainLayout>
        <div className="bg-[#FAF9F6] min-h-screen flex flex-col items-center justify-center py-20">
          <p className="text-gray-400 text-lg">Article not found.</p>
          <Button
            onClick={() => navigate("/blog")}
            className="mt-4 bg-[#D4AF37] hover:bg-[#B8933D] text-white rounded-xl text-xs uppercase font-bold tracking-wider px-6 py-3"
          >
            Back to Blog
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-[#FAF9F6] min-h-screen pb-20 pt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-black hover:text-[#B8933D] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="p-2 bg-white border border-gray-150 hover:border-black rounded-lg text-gray-500 hover:text-black transition-all flex items-center justify-center"
                title="Copy Link"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-[#D4AF37]" />
                ) : (
                  <Link2 className="h-4 w-4" />
                )}
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(activeBlog.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white border border-gray-150 hover:border-black rounded-lg text-gray-500 hover:text-[#1DA1F2] transition-all flex items-center justify-center"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white border border-gray-150 hover:border-black rounded-lg text-gray-500 hover:text-[#1877F2] transition-all flex items-center justify-center"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Article Wrapper */}
          <article className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6 sm:p-10 lg:p-12">
            {/* Tags */}
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

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pb-8 border-b border-gray-100 text-xs text-gray-400 font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-[#D4AF37]" />
                Written By:{" "}
                <span className="text-black font-extrabold">
                  {activeBlog.author}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Published:{" "}
                <span className="text-black font-extrabold">
                  {formatDate(activeBlog.createdAt)}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                Read Time:{" "}
                <span className="text-black font-extrabold">
                  {activeBlog.readTime || 5} Mins
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                Views:{" "}
                <span className="text-black font-extrabold">
                  {activeBlog.viewsCount}
                </span>
              </span>
            </div>

            {/* Main Image */}
            <div className="my-8 rounded-2xl overflow-hidden aspect-[16/9]">
              <img
                src={
                  activeBlog.image ||
                  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200"
                }
                alt={activeBlog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Body */}
            <div
              className="prose max-w-none text-gray-600 leading-relaxed space-y-6 
                prose-headings:text-black prose-headings:font-extrabold prose-headings:uppercase prose-headings:mt-8 prose-headings:mb-4
                prose-h2:text-2xl prose-h3:text-xl
                prose-strong:text-black prose-strong:font-bold
                prose-blockquote:border-l-4 prose-blockquote:border-[#D4AF37] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-8 prose-blockquote:text-lg prose-blockquote:text-black/80
                prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
                prose-li:my-2"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(activeBlog.content) }}
            />

            {/* Related Articles */}
            {relatedBlogs.length > 0 && (
              <div className="mt-16 pt-12 border-t border-gray-100">
                <h3 className="heading-bold text-xl sm:text-2xl text-black mb-8 uppercase">
                  Related{" "}
                  <span className="text-gray-400 italic font-bold">
                    Articles
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {relatedBlogs.map((blog) => (
                    <Link
                      key={blog.id}
                      to={`/blog/${blog.slug}`}
                      className="group cursor-pointer block"
                    >
                      <div className="relative overflow-hidden rounded-xl aspect-[16/10] mb-3">
                        <img
                          src={
                            blog.image ||
                            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400"
                          }
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h4 className="font-extrabold text-sm text-black leading-snug group-hover:text-[#B8933D] transition-colors line-clamp-2 uppercase">
                        {blog.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </MainLayout>
  );
}
