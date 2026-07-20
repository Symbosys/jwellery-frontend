import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  Truck, 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  Mail, 
  ArrowRight,
  Ban,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ReturnAndRefund = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <MainLayout>
            <div className="bg-[#FAF9F6] min-h-screen text-black font-sans pb-16">
                
                {/* Banner Section */}
                <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-24">
                    <div className="relative w-full overflow-hidden rounded-2xl shadow-sm border border-gray-100">
                        <img
                            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600&auto=format&fit=crop"
                            alt="Return & Refund Policy"
                            className="w-full h-[250px] sm:h-[320px] object-cover"
                        />
                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative bg-white pt-16 pb-20 overflow-hidden border-b border-gray-100">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-white to-white" />
                    <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight text-black uppercase">
                                Return & <span className="text-[#D4AF37] italic">Refund Policy</span>
                            </h1>
                            <p className="text-base sm:text-lg text-gray-500 font-light leading-relaxed">
                                Our commitment to excellence extends to your complete satisfaction. Read our guidelines on cancellations, returns, and refunds.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Key Features Grid */}
                <section className="py-12 -mt-10 relative z-20">
                    <div className="max-w-7xl mx-auto px-4 lg:px-8">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {[
                                {
                                    icon: <Clock className="w-8 h-8 text-[#D4AF37]" />,
                                    title: "3-Day Window",
                                    desc: "For most products, the standard return window is 3 days from delivery."
                                },
                                {
                                    icon: <Truck className="w-8 h-8 text-[#D4AF37]" />,
                                    title: "Insured Return",
                                    desc: "Self-shipping is required only if reverse pick-up is unavailable at your location."
                                },
                                {
                                    icon: <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />,
                                    title: "Purity & Hygiene QC",
                                    desc: "Items must be unused, unwashed, and returned with original packaging and tags."
                                }
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className="mb-4 p-3 bg-[#D4AF37]/5 rounded-xl w-fit group-hover:bg-[#D4AF37]/10 transition-colors">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 text-black uppercase tracking-wide">{feature.title}</h3>
                                    <p className="text-sm text-gray-500 font-light leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Detailed Policy Content */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                            {/* Main Content */}
                            <div className="lg:col-span-8 space-y-10">

                                {/* Cancellation Policy */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4"
                                >
                                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                                        <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                                            <Ban className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide">Cancellation Policy</h2>
                                    </div>
                                    <div className="text-gray-600 text-sm sm:text-base leading-relaxed space-y-3 font-light">
                                        <p>
                                            In case there is an order cancellation, please do so before it is shipped. Once the product is shipped, it cannot be cancelled using our website.
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Return Policy */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4"
                                >
                                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                                        <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                                            <RefreshCw className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide">Return Policy</h2>
                                    </div>
                                    <div className="text-gray-600 text-sm sm:text-base leading-relaxed space-y-4 font-light">
                                        <ol className="space-y-4 list-decimal pl-5">
                                            <li>
                                                Returns and exchanges are applicable only to select products. Detailed return eligibility and conditions are provided on the respective product pages. For most products, the standard return window is <strong>3 days</strong>.
                                            </li>
                                            <li>
                                                The return policy for any product is subject to change without prior notice.
                                            </li>
                                            <li>
                                                In case we do not have pick up service available at your location, you would have to self-ship the product to our office Address.
                                            </li>
                                            <li>
                                                Return/Exchange charges may apply on case to case basis.
                                            </li>
                                        </ol>
                                    </div>
                                </motion.div>

                                {/* Notes for Return */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4"
                                >
                                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                                        <div className="p-2 bg-gray-50 rounded-lg text-[#D4AF37]">
                                            <AlertTriangle className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide">Note for Return</h2>
                                    </div>
                                    <div className="text-gray-600 text-sm sm:text-base leading-relaxed space-y-4 font-light">
                                        <ul className="space-y-3.5 pl-1">
                                            {[
                                                "The items should be unused and unwashed for hygiene reasons.",
                                                "The product should have the original packaging and tags in place. Items without the original tags will not be accepted.",
                                                "Customized products cannot be returned or exchanged.",
                                                "Return/Exchange requests that are not raised within the return period (refer to product page) will not be accepted."
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>

                            </div>

                            {/* Sidebar / CTA */}
                            <div className="lg:col-span-4 space-y-6">
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 sticky top-24">
                                    <h3 className="text-lg font-bold mb-3 uppercase tracking-wide">Initiate Return</h3>
                                    <p className="text-gray-400 mb-6 text-xs font-semibold">
                                        Need to request a return or exchange? Check your order history to get started.
                                    </p>
                                    <Button className="w-full bg-[#D4AF37] hover:bg-[#B8933D] text-black h-12 text-sm font-bold uppercase tracking-wider rounded-xl transition-all" asChild>
                                        <Link to="/account/orders">
                                            My Orders <ArrowRight className="ml-2 w-4 h-4" />
                                        </Link>
                                    </Button>

                                    <div className="my-6 border-t border-gray-100" />

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <HelpCircle className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                                            <div>
                                                <h4 className="font-bold text-sm">Need Help?</h4>
                                                <p className="text-xs text-gray-400 font-semibold mt-1">Our support team is ready to assist you.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Mail className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                                            <div>
                                                <h4 className="font-bold text-sm">Email Us</h4>
                                                <a href="mailto:support@sakhio.com" className="text-xs text-gray-400 font-bold mt-1 hover:text-[#D4AF37] transition-colors">support@sakhio.com</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};

export default ReturnAndRefund;
