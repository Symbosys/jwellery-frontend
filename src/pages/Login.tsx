import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  ArrowRight,
  X,
  ShieldCheck,
  LockKeyhole,
  Sparkles,
  ArrowLeft,
  Home,
} from "lucide-react";
import {
  useRequestOtpMutation,
  useVerifyOtpMutation,
} from "@/api/hooks/auth.hooks";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const requestOtpMutation = useRequestOtpMutation();
  const verifyOtpMutation = useVerifyOtpMutation();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) setPhoneNumber(value);
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Handle Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return;

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await requestOtpMutation.mutateAsync({
        phoneNumber: `+91${phoneNumber}`,
      });
      setSuccessMessage(response.message || "OTP sent successfully");
      setIsOtpOpen(true);
    } catch (err: any) {
      console.error("OTP send error:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to send OTP",
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) return;

    setLoading(true);
    setError("");

    try {
      const data = await verifyOtpMutation.mutateAsync({
        phoneNumber: `+91${phoneNumber}`,
        otp: otpString,
      });

      console.log("Login success:", data);

      if (data.token) {
        localStorage.setItem("user_token", data.token);
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/account");
    } catch (err: any) {
      console.error("OTP verification error:", err);
      setError(err.response?.data?.message || err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FAF9F6] text-black relative overflow-hidden font-sans">
      {/* LEFT COLUMN: Premium Jewellery Editorial Imagery (Hidden on Mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden h-screen select-none">
        <img
          src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200&auto=format&fit=crop"
          alt="Aura Fine Jewellery Editorial"
          className="w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Editorial Text Overlay */}
        <div className="absolute bottom-16 left-16 right-16 text-white space-y-6">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <Sparkles className="h-5 w-5" />
            <span className="text-xs uppercase font-extrabold tracking-[0.25em]">
              Handcrafted Brilliance
            </span>
          </div>
          <h2 className="text-4xl xl:text-5xl font-display font-light leading-tight tracking-wide uppercase">
            Aura Fine <br />
            <span className="font-semibold text-[#D4AF37]">Jewellery</span>
          </h2>
          <p className="text-gray-300 font-light text-base xl:text-lg max-w-md leading-relaxed">
            Step into our digital vault to manage your orders, check your gold
            harvesting schemes, and explore curated, certified diamonds.
          </p>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 font-semibold tracking-wider uppercase">
            <span>© {new Date().getFullYear()} Aura Jewellery</span>
            <span>BIS 100% Hallmarked</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Minimalist Premium Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between px-6 sm:px-12 py-8 relative h-screen">
        {/* Navigation Header */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-[#D4AF37]" />
            Back to Store
          </Link>
          <Link
            to="/"
            className="p-2 bg-white rounded-full border border-gray-100 hover:border-[#D4AF37] transition-all flex items-center justify-center shadow-sm text-gray-400 hover:text-black"
          >
            <Home className="h-4 w-4" />
          </Link>
        </div>

        {/* Centered Login Card */}
        <div className="my-auto max-w-md w-full mx-auto space-y-8">
          {/* Header Description */}
          <div className="text-left space-y-3">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1.5 rounded-full inline-block">
              Secure Digital Portal
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-black uppercase tracking-wide leading-tight">
              Welcome{" "}
              <span className="text-gray-400 italic font-bold">Back</span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base font-light">
              Enter your mobile number to securely sign in or register with OTP
              verification.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(212,175,55,0.04)] border border-[#E5D5B5]/20 relative overflow-hidden">
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase font-extrabold tracking-wider text-gray-400">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center gap-2 select-none pointer-events-none">
                    <Phone className="h-4 w-4 text-[#D4AF37]" />
                    <span className="text-sm font-extrabold text-[#D4AF37] tracking-wider">
                      +91
                    </span>
                    <span className="h-4 w-px bg-gray-200" />
                  </div>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder=""
                    style={{ paddingLeft: "96px" }}
                    className="w-full bg-[#FAF9F6] border border-gray-100 focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 rounded-xl py-4 pr-4 outline-none transition-all placeholder:text-gray-300 font-bold text-lg text-black"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && !isOtpOpen && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-semibold leading-relaxed">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={phoneNumber.length < 10 || loading}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A880] text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-md shadow-[#D4AF37]/20 hover:shadow-lg hover:shadow-[#D4AF37]/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <motion.div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending Code...
                  </>
                ) : (
                  <>
                    Request Secure OTP
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-4">
          <p className="text-xs text-gray-400 font-light max-w-sm mx-auto leading-relaxed">
            By proceeding, you agree to Aura Fine Jewellery's{" "}
            <Link
              to="/terms-conditions"
              className="text-black font-semibold underline hover:text-[#B8933D] transition-colors"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-black font-semibold underline hover:text-[#B8933D] transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      <AnimatePresence>
        {isOtpOpen && (
          <>
            {/* Backdrop with frosted glass effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOtpOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[50]"
            />
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
              transition={{ type: "spring", duration: 0.4 }}
              className="fixed z-[51] left-1/2 top-1/2 w-full max-w-md px-4"
            >
              <div className="bg-white rounded-3xl p-8 border border-[#E5D5B5]/20 shadow-2xl relative">
                {/* Close Button */}
                <button
                  onClick={() => setIsOtpOpen(false)}
                  className="absolute top-5 right-5 p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 hover:text-black transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="text-center mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A880]/20 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/20">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-black uppercase tracking-wide">
                    Verify Account
                  </h2>
                  <p className="text-gray-500 mt-2 text-sm font-light leading-relaxed">
                    We've dispatched a secure 4-digit code to <br />
                    <span className="font-extrabold text-black tracking-wider">
                      +91 {phoneNumber}
                    </span>
                  </p>

                  {successMessage && (
                    <div className="mt-4 text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 py-2 px-4.5 rounded-lg border border-[#D4AF37]/20 inline-block">
                      {successMessage}
                    </div>
                  )}
                </div>

                {/* 4-Digit Input Fields */}
                <div className="flex justify-center gap-4 mb-8">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleOtpChange(e.target as HTMLInputElement, index)
                      }
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-14 h-16 rounded-xl border border-gray-100 bg-[#FAF9F6] text-center text-2xl font-bold focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 focus:bg-white transition-all outline-none text-black"
                    />
                  ))}
                </div>

                {/* Error inside modal */}
                {error && (
                  <div className="p-3.5 mb-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-semibold leading-relaxed text-center">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleVerifyOtp}
                  disabled={otp.join("").length !== 4 || loading}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-900 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <motion.div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <LockKeyhole className="h-4 w-4" />
                      Verify & Sign In
                    </>
                  )}
                </button>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-400 font-light">
                    Didn't receive the code?{" "}
                    <button className="text-[#D4AF37] font-bold hover:underline">
                      Resend
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
