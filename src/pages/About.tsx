import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <MainLayout>
      {/* Background using theme bg variable */}
      <div className="bg-background pb-16 min-h-screen">
        {/* Top Header Title */}
        <div className="text-center pt-16 pb-10">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-widest uppercase">
            ABOUT AURA FINE JEWELLERY
          </h1>
          <div className="w-16 h-1 bg-accent mx-auto mt-4" />
        </div>

        {/* Hero Banner Section with Oval Logo Badge Overlay */}
        <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden mb-16">
          {/* Model Background Image */}
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1974"
            alt="Aura Fine Jewellery Crafting"
            className="w-full h-full object-cover"
          />
          {/* Subtle dark tint to help text/badge pop */}
          <div className="absolute inset-0 bg-black/15" />

          {/* Central Oval Logo Medallion Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-48 h-56 md:w-56 md:h-64 bg-white border-[6px] border-[#E5D5B5] rounded-[50%] flex flex-col items-center justify-center p-6 shadow-strong">
              <span className="font-display text-lg font-bold tracking-wider text-primary text-center uppercase leading-none">
                AURA FINE<br />JEWELLERY
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-4 text-center">
                HANDCRAFTED LUXURY • EST. 2026
              </span>
            </div>
          </div>
        </div>

        {/* Text Story Section */}
        <div className="max-w-3xl mx-auto px-4">
          {/* Section Divider Header */}
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-primary tracking-wide mb-3">
              Our Story
            </h2>
            <div className="w-12 h-0.5 bg-accent mx-auto" />
          </div>

          {/* Narrative text using standard typography utilities */}
          <div className="space-y-6 text-sm lg:text-base text-foreground/80 leading-relaxed font-light text-justify md:text-center">
            <p>
              Aura Fine Jewellery was born out of a passion for crafting premium, high-quality, and timeless gold and diamond pieces that tell a story. We believe that fine jewellery is not just an accessory, but an expression of aura, personality, and heritage.
            </p>
            <p>
              Every single ornament we create is hallmarked and certified for absolute purity. We combine ancient craftsmanship with modern designs to create earrings, rings, bangles, and necklaces that stand the test of time. We stand for transparency, ethical sourcing, and certified brilliance.
            </p>
            <p className="font-semibold text-foreground text-center pt-4 uppercase">
              Experience Certified Brilliance. Elevate Your Aura.
            </p>
          </div>

          {/* Action Row: Back to Home Button */}
          <div className="text-center mt-12">
            <Link
              to="/"
              className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-xs uppercase tracking-widest py-3 px-10 rounded-full transition-all duration-300 shadow-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
