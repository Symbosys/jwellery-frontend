import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Users, 
  FileText, 
  Cookie, 
  Share2, 
  Scale, 
  Mail, 
  Phone
} from 'lucide-react';

export default function Privacy() {
  return (
    <MainLayout>
      <div className="bg-white min-h-screen pb-16">
        
        {/* Banner Section */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-24">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-sm border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1600&auto=format&fit=crop"
              alt="Privacy Policy"
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
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide">
                  Privacy Policy Overview
                </h2>
              </div>
              <div className="text-gray-600 text-base sm:text-lg leading-relaxed space-y-4 font-light text-left">
                <p>
                  Your personal information is always kept confidential. The privacy policy is displayed on the website. The type of info collected from the customers and usage of this information is published here. We have a policy of not disclosing any information to third parties.
                </p>
                <p>
                  Using our website means you have agreed to the terms and conditions of the website. It applies to the people who have not got any transactions or who have got registered to the site and had business.
                </p>
                <p className="font-medium text-black">
                  Personal information is mainly used to locate or contact a person. Other information like name, address, phone number, fax, credit card information, financial profiles, identification number and e-mail address are also available with us and are always confidential.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section id="info-collect" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <Users className="h-6 w-6" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide">
                  Personal Information That We Collect
                </h2>
              </div>
              <div className="text-gray-600 text-base sm:text-lg leading-relaxed space-y-4 font-light text-left">
                <p>
                  Necessary information is collected for becoming a subscriber or member of our website. Our system collects the IP address of your computer automatically. But this detail does not give information about any particular person.
                </p>
                <p className="font-medium text-black">
                  But Sakhio website doesn’t collect information about children.
                </p>
              </div>
            </section>

            {/* Uses of Information */}
            <section id="uses-info" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <Scale className="h-6 w-6" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide">
                  Uses Of The Information Collected
                </h2>
              </div>
              <div className="text-gray-600 text-base sm:text-lg leading-relaxed space-y-4 font-light text-left">
                <p>
                  All the personal information collected is kept confidential. The information may be used for:
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Send news about the website.",
                    "Calculate the number of visitors",
                    "Monitor the website",
                    "Know the geographical location of the users",
                    "Contact to give information about the website.",
                    "Give a better shopping experience online.",
                    "Update about the recent offers on the website."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Some of the personal information is shared with the courier companies like addresses/contact details. We have to give some information to vendors. This personal information helps Sakhio to perform their duties and fulfil the order requirements. But private information cannot be accessed by unauthorised persons or organisations.
                </p>
                <p className="text-sm border-l-2 border-[#D4AF37]/30 pl-4 py-2 italic bg-[#D4AF37]/5 rounded-r-lg text-gray-500 font-light leading-relaxed">
                  The Company will disclose your information, including, without limitation, your name, city, state, telephone number, email address, user ID history, quoting and listing history, and complaints, to law enforcement or other government officials if it is required to do so by law, regulation or other government authority or otherwise in cooperation with an investigation of governmental authority.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section id="cookies" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <Cookie className="h-6 w-6" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide">
                  Cookies
                </h2>
              </div>
              <div className="text-gray-600 text-base sm:text-lg leading-relaxed space-y-4 font-light text-left">
                <p>
                  Cookies are used to save your personal information on your computer. It helps to calculate the number of times you use our website. Cookies do not keep any personal data of the visitors.
                </p>
                <p>
                  When the user browses <strong>sakhio.com</strong>, cookies are replaced according to the interests of the users. Here none of your particulars like e-mail address, telephone, name or postal address is collected. We give you a safe shopping experience.
                </p>
              </div>
            </section>

            {/* Third-Party Disclosures & Links */}
            <section id="third-party" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                  <Share2 className="h-6 w-6" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide">
                  Third-Party Disclosures & Links
                </h2>
              </div>
              <div className="text-gray-600 text-base sm:text-lg leading-relaxed space-y-4 font-light text-left">
                <p>
                  Sakhio gives some aggregate particulars like website statistics or demographics to sponsors, advertisers and other third parties. Third parties are not authorised to get any of your personal information.
                </p>
                <p>
                  Sakhio has many links to other websites. But once you leave <strong>Sakhio</strong> website, our privacy policy ends.
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
                  If you have any questions regarding this Privacy Policy or how your information is handled, please contact us:
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
