import React from "react";
import { toast } from "sonner";
import { LogIn, ShoppingBag, X } from "lucide-react";

import { checkIsLoggedIn } from "@/hooks/use-auth";

/**
 * Checks if the user is currently authenticated based on tokens in localStorage.
 */
export const isUserLoggedIn = checkIsLoggedIn;


/**
 * Displays a custom toast popup prompting unauthenticated users to log in
 * before adding products to their cart, with Login and Cancel buttons.
 */
export const showLoginRequiredToast = (
  message: string = "Please login first to add products to your cart."
) => {
  toast.custom(
    (t) => (
      <div
        data-custom-toast="true"
        className="custom-auth-toast w-full max-w-sm sm:max-w-md bg-white border border-[#E5D5B5] rounded-xl shadow-xl p-4 flex flex-col gap-3 font-sans text-left relative overflow-hidden pointer-events-auto"
      >
        {/* Accent indicator line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#8A1B28]" />

        <div className="flex items-start gap-3 pt-0.5">
          <div className="w-9 h-9 rounded-full bg-[#8A1B28]/10 text-[#8A1B28] flex items-center justify-center flex-shrink-0 mt-0.5">
            <ShoppingBag className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>

          <div className="flex-1 pr-3">
            <h4 className="text-sm font-bold text-[#2C2C2C] tracking-wide">
              Login Required
            </h4>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1 -mt-1 rounded-md"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="px-3.5 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-150 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              toast.dismiss(t);
              if (typeof window !== "undefined") {
                window.location.href = "/login";
              }
            }}
            className="px-4 py-1.5 text-xs font-bold text-white bg-[#8A1B28] hover:bg-[#721620] active:bg-[#5C111A] rounded-lg transition-all duration-150 shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>
        </div>
      </div>
    ),
    {
      id: "login-required-toast",
      duration: 6000,
      unstyled: true,
      style: {
        background: "transparent",
        backgroundColor: "transparent",
        border: "none",
        boxShadow: "none",
        padding: 0,
      },
      className: "!bg-transparent !border-0 !border-none !shadow-none !p-0 custom-auth-toast-wrapper w-full flex justify-center",
    }
  );
};
