import { useState, useEffect, useCallback } from "react";
import { showLoginRequiredToast } from "@/lib/auth-toast";

/**
 * Helper function to check if the user is authenticated via localStorage tokens.
 */
export const checkIsLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return !!(
      localStorage.getItem("user_token") ||
      localStorage.getItem("token")
    );
  } catch {
    return false;
  }
};

/**
 * Custom React hook for checking authentication status and enforcing login requirements.
 */
export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => checkIsLoggedIn());

  useEffect(() => {
    setIsLoggedIn(checkIsLoggedIn());

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user_token" || e.key === "token" || e.key === null) {
        setIsLoggedIn(checkIsLoggedIn());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  /**
   * Verifies user login status. If authenticated, runs optional callback and returns true.
   * If not logged in, pops the custom login toast and returns false.
   */
  const requireAuth = useCallback(
    (callback?: () => void, message?: string): boolean => {
      const authenticated = checkIsLoggedIn();
      if (!authenticated) {
        showLoginRequiredToast(message);
        return false;
      }
      if (callback) {
        callback();
      }
      return true;
    },
    []
  );

  return {
    isLoggedIn,
    checkIsLoggedIn,
    requireAuth,
    showLoginRequiredToast,
  };
}

export default useAuth;
