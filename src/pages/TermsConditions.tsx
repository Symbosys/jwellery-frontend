import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  BookOpen, 
  ShoppingBag, 
  Shield, 
  FileText, 
  Tag, 
  Sparkles, 
  Mail, 
  Phone
} from 'lucide-react';

export default function TermsConditions() {
  return (
    <MainLayout>
      <div className="bg-white min-h-screen pb-16">
        
        {/* Banner Section */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-24">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-sm border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1600&auto=format&fit=crop"
              alt="Terms & Conditions"
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
                  <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide">
                  Terms of Service Overview
                </h2>
              </div>
              <div className="text-gray-600 text-base sm:text-lg leading-relaxed space-y-4 font-light text-left">
                <p>
                  Sakhio operates this website. Throughout the site, the terms <strong>"we"</strong>, <strong>"us"</strong> and <strong>"our"</strong> refer to Sakhio. Sakhio offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
                </p>
                <p>
                  By visiting our site and/ or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
                </p>
                <p>
                  Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
                </p>
                <p>
                  Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
                </p>
                <p className="font-semibold text-black italic">
                  We have hosted our store on Nushop.store.
                </p>
                <p className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-[#D4AF37] italic font-medium">
                  "Discover our exquisite collection of jewelry, crafted to add a touch of sophistication to your everyday look. From statement pieces to subtle accents, our jewelry is designed to make you shine."
                </p>
              </div>
            </section>

            {/* Section 1: Online Store Terms */}
            <section id="section-1" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide">
                  Section 1 – Online Store Terms
                </h2>
              </div>
              <div className="text-gray-600 text-base sm:text-lg leading-relaxed space-y-4 font-light text-left">
                <p>
                  By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
                </p>
                <p>
                  You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
                </p>
                <p>
                  You must not transmit any worms or viruses or any code of a destructive nature.
                </p>
                <p className="font-medium text-black">
                  A breach or violation of any of the Terms will result in an immediate termination of your Services.
                </p>
              </div>
            </section>

            {/* Section 2: General Conditions */}
            <section id="section-2" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <Shield className="h-6 w-6" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide">
                  Section 2 – General Conditions
                </h2>
              </div>
              <div className="text-gray-600 text-base sm:text-lg leading-relaxed space-y-4 font-light text-left">
                <p>
                  We reserve the right to refuse service to anyone for any reason at any time.
                </p>
                <p>
                  You agree not to duplicate, sell, copy, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
                </p>
              </div>
            </section>

            {/* Section 3: Accuracy, Completeness and Timeliness of Information */}
            <section id="section-3" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide">
                  Section 3 – Accuracy, Completeness and Timeliness of Information
                </h2>
              </div>
              <div className="text-gray-600 text-base sm:text-lg leading-relaxed space-y-4 font-light text-left">
                <p>
                  We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.
                </p>
              </div>
            </section>

            {/* Section 4: Modifications to the Service and Prices */}
            <section id="section-4" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <Tag className="h-6 w-6" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide">
                  Section 4 – Modifications to the Service and Prices
                </h2>
              </div>
              <div className="text-gray-600 text-base sm:text-lg leading-relaxed space-y-4 font-light text-left">
                <p>
                  Prices for our products are subject to change without notice.
                </p>
                <p>
                  We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                </p>
                <p>
                  We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
                </p>
              </div>
            </section>

            {/* Section 5: Products or Services */}
            <section id="section-5" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide">
                  Section 5 – Products or Services
                </h2>
              </div>
              <div className="text-gray-600 text-base sm:text-lg leading-relaxed space-y-4 font-light text-left">
                <p>
                  Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.
                </p>
                <p>
                  We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.
                </p>
                <p>
                  We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.
                </p>
              </div>
            </section>

            {/* Contact Us */}
            <section id="contact" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <Mail className="h-6 w-6" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide">
                  Contact Us
                </h2>
              </div>
              <div className="text-gray-600 text-base sm:text-lg leading-relaxed space-y-6 font-light text-left">
                <p>
                  If you have any questions regarding our Terms of Service or need further clarification, please contact our support team:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href="mailto:support@sakhio.com" className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 border border-gray-100 transition-colors group">
                    <Mail className="h-5 w-5 text-[#D4AF37]" />
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Us</p>
                      <p className="text-sm font-semibold text-black group-hover:text-[#D4AF37] transition-colors">support@sakhio.com</p>
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
