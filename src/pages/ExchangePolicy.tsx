import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  RotateCcw, 
  CheckCircle, 
  Ban, 
  HelpCircle, 
  Truck, 
  CheckSquare, 
  PackageSearch, 
  Mail, 
  Phone 
} from 'lucide-react';

export default function ExchangePolicy() {
  return (
    <MainLayout>
      <div className="bg-white min-h-screen pb-16">
        
        {/* Banner Section */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-24">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-sm border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1600&auto=format&fit=crop"
              alt="Exchange Policy"
              className="w-full h-[250px] sm:h-[320px] object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-12">
          <div className="max-w-4xl space-y-12 text-left">
            
            {/* Overview */}
            <section id="overview" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <RotateCcw className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-bold text-black uppercase tracking-wide">
                  Overview
                </h2>
              </div>
              <div className="text-gray-600 text-lg lg:text-xl leading-relaxed space-y-4 font-light text-left">
                <p>
                  At Aura Fine Jewellery, we take utmost care in crafting and delivering premium-quality gold and diamond jewellery. If you receive a damaged, defective, or incorrect piece, you may request an exchange according to the policy outlined below.
                </p>
                <p>
                  Exchange requests are subject to product certification verification, purity inspection, and approval by our support team.
                </p>
              </div>
            </section>

            {/* Eligibility For Exchange */}
            <section id="eligibility" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-bold text-black uppercase tracking-wide">
                  Eligibility For Exchange
                </h2>
              </div>
              <div className="text-gray-600 text-lg lg:text-xl leading-relaxed space-y-4 font-light text-left">
                <p className="font-semibold text-black">Products may qualify for exchange if:</p>
                <ul className="space-y-2.5">
                  {[
                    "The wrong jewellery item was delivered",
                    "The product arrived physically damaged or with loose stones",
                    "The item does not match design or weight specifications",
                    "The issue is reported within 48 hours of delivery with original opening video"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-semibold text-black mt-6">To be eligible:</p>
                <ul className="space-y-2.5">
                  {[
                    "The product must remain unworn and in pristine condition",
                    "All tag certifications and BIS hallmark tags must be intact",
                    "Original invoice and certificates (GIA/IGI) must be returned"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Non-Exchangeable Items */}
            <section id="non-exchangeable" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <Ban className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-bold text-black uppercase tracking-wide">
                  Non-Exchangeable Items
                </h2>
              </div>
              <div className="text-gray-600 text-lg lg:text-xl leading-relaxed space-y-4 font-light text-left">
                <p className="font-semibold text-black">The following items are not eligible for exchange:</p>
                <ul className="space-y-2.5">
                  {[
                    "Customized or personalized engraved jewellery pieces",
                    "Items showing signs of wear and tear, scratches or resizing done by a third party",
                    "Clearance sale or gold coin promotional purchases",
                    "Digital e-gift cards",
                    "Products returned without their original authenticity certificate (GIA/IGI/BIS)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[#D4AF37] font-medium">
                  For security and valuation verification reasons, customized, resized or gold-coin items cannot be exchanged.
                </p>
              </div>
            </section>

            {/* Exchange Process */}
            <section id="exchange-process" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-bold text-black uppercase tracking-wide">
                  Exchange Process
                </h2>
              </div>
              <div className="text-gray-600 text-lg lg:text-xl leading-relaxed space-y-4 font-light text-left">
                <p className="font-semibold text-black">To request an exchange:</p>
                <ul className="space-y-2.5">
                  {[
                    "Contact our support team within 48 hours of receipt",
                    "Provide your invoice number and description of the issue",
                    "Attach clear close-up photos and an opening video of the parcel",
                    "Await validation and transit insurance shipping directions"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Once approved, our team will arrange the secure reverse shipping and replacement process.
                </p>
              </div>
            </section>

            {/* Shipping For Exchanges */}
            <section id="shipping" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <Truck className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-bold text-black uppercase tracking-wide">
                  Shipping For Exchanges
                </h2>
              </div>
              <div className="text-gray-600 text-lg lg:text-xl leading-relaxed space-y-4 font-light text-left">
                <p className="font-semibold text-black">If the exchange is approved due to:</p>
                <ul className="space-y-2.5">
                  {[
                    "Wrong design/product delivery",
                    "Physically damaged packages",
                    "Authenticity or structural defects"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Aura Fine Jewellery will cover the fully-insured return shipping costs.
                </p>
                <p>
                  Additional transit insurance and shipping charges may apply for exchanges requested due to sizing alterations.
                </p>
              </div>
            </section>

            {/* Exchange Approval */}
            <section id="approval" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <CheckSquare className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-bold text-black uppercase tracking-wide">
                  Exchange Approval
                </h2>
              </div>
              <div className="text-gray-600 text-lg lg:text-xl leading-relaxed space-y-4 font-light text-left">
                <p>
                  All exchange requests are reviewed individually by our quality control lab. Aura Fine Jewellery reserves the right to reject exchange requests if:
                </p>
                <ul className="space-y-2.5">
                  {[
                    "The jewellery item has been worn, scratched, or shows resizing signs",
                    "The tag certifying security verification is broken or missing",
                    "The lab inspection determines the item is not in its original return condition"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Product Availability */}
            <section id="availability" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <PackageSearch className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-bold text-black uppercase tracking-wide">
                  Product Availability
                </h2>
              </div>
              <div className="text-gray-600 text-lg lg:text-xl leading-relaxed space-y-4 font-light text-left">
                <p>
                  Exchanges are subject to design and casting availability. If the requested replacement design is out of stock, we may:
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Offer an alternative design in gold or diamond",
                    "Provide store credit equivalent to the invoice value",
                    "Process a refund if applicable under custom design exceptions"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Contact Us */}
            <section id="contact-us" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <Mail className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-bold text-black uppercase tracking-wide">
                  Contact Us
                </h2>
              </div>
              <div className="text-gray-600 text-lg lg:text-xl leading-relaxed space-y-6 font-light text-left">
                <p>
                  For exchange-related assistance, please contact:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href="mailto:support@aurafinejewellery.com" className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 border border-gray-100 transition-colors group">
                    <Mail className="h-5 w-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Us</p>
                      <p className="text-sm font-semibold text-black group-hover:text-[#D4AF37] transition-colors">support@aurafinejewellery.com</p>
                    </div>
                  </a>
                  
                  <a href="tel:+916200065378" className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 border border-gray-100 transition-colors group">
                    <Phone className="h-5 w-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Call Us</p>
                      <p className="text-sm font-semibold text-black group-hover:text-[#D4AF37] transition-colors">+91 6200065378</p>
                    </div>
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </MainLayout>
  );
}
