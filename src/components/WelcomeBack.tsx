import Logo from "./common/Logo";

import bgImage from "../assets/images/bg-image.svg";
import securityIcon from "../assets/icons/security-icon.svg";
import { useEffect, useState } from "react";
import type { SubAccount } from "../types/auth";
import { cookieUtils } from "../lib/cookies";
import { useAuthStore } from "../store/authStore";
import SubAccountSelector from "./SubAccountSelector";

export default function WelcomeBack() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [subAccounts, setSubAccounts] = useState<SubAccount[]>([]);
  const [showSubAccountSelector, setShowSubAccountSelector] = useState(false);

  const { setUserData, setSubAccounts: setStoreSubAccounts } = useAuthStore();

  const accountUrl =
    "https://account.redbiller.com/login/?rr=http://localhost:3000/login";

  const getToken = () => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    return params.get("x92Qko8x9UwMs8") || "";
  };

  const fetchSubAccounts = async (userKey: string, sessionId: string) => {
    try {
      console.log("Fetching sub-accounts...", { userKey, sessionId });

      const response = await fetch("/api/auth/sub-accounts", {
        method: "GET",
        headers: {
          key: userKey,
          session_id: sessionId,
        },
      });

      const result = await response.json();

      console.log("Sub-accounts fetch result:", result);

      if (result.success && result.data.data) {
        const accounts = result.data.data;
        setSubAccounts(accounts);
        setStoreSubAccounts(accounts);

        // Show the sub-account selector
        setShowSubAccountSelector(true);

        return accounts;
      } else {
        console.error("Failed to fetch sub-accounts:", result.error);
        setError(result.error || "Failed to fetch sub-accounts");
        return null;
      }
    } catch (error) {
      console.error("Error fetching sub-accounts:", error);
      setError("Failed to fetch sub-accounts");
      return null;
    }
  };

  const validateToken = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/validate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();

      // Log on client side
      console.log("Token validation result:", result);

      if (result.success && result.data.data) {
        const userData = result.data.data;
        console.log("Token validated successfully:", userData);

        // Store profile.key as userKey in cookies
        const userKey = userData.profile.key;
        const sessionId = userData.session.id;

        cookieUtils.set("userKey", userKey, 1);
        cookieUtils.set("sessionId", sessionId, 1);

        console.log("Stored in cookies:", { userKey, sessionId });

        // Store full user data in Zustand (localStorage)
        setUserData(userData);

        // Fetch sub-accounts
        await fetchSubAccounts(userKey, sessionId);

        return userData;
      } else {
        console.error("Token validation failed:", result.error);
        setError(result.error || "Token validation failed");
        return null;
      }
    } catch (error) {
      console.error("Error validating token:", error);
      setError("Failed to validate token");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubAccountSelect = (account: SubAccount) => {
    console.log("Sub-account selected:", account);
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      console.log("Token found in URL, validating...", token);
      validateToken(token);
    }
  }, []);

  // Show sub-account selector if we have sub-accounts
  if (showSubAccountSelector && subAccounts.length > 0) {
    return (
      <SubAccountSelector
        subAccounts={subAccounts}
        onSelect={handleSubAccountSelect}
      />
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      window.location.href = accountUrl;
    } catch (error) {
      setError("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-white grid grid-cols-[538px_1fr] h-screen"
      data-name="WelcomeBack"
    >
      <div
        className="relative box-border content-stretch flex flex-col h-full items-center justify-between overflow-hidden px-0 py-12"
        data-name="LeftPanel"
      >
        <div
          className="absolute h-[1092px] left-[-355px] top-0 w-[1456px]"
          data-name="BackgroundImage"
        >
          <img alt="" className="block max-w-none size-full" src={bgImage} />
        </div>

        <Logo className="h-6 overflow-hidden relative shrink-0 w-[102px] z-10" />

        {/* Copyright */}
        <div className="flex flex-col font-['Nunito',sans-serif] font-normal justify-end leading-none relative shrink-0 text-[#a2a2a2] text-base text-nowrap tracking-[0.024px] z-10">
          <p className="leading-[25.6px] whitespace-pre">
            © {new Date().getFullYear()} Redbiller. All rights reserved
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div
        className="bg-[#181A0E] box-border content-stretch flex flex-col gap-12 h-full items-center justify-center overflow-hidden p-[72px]"
        data-name="RightPanel"
      >
        {/* Welcome Message */}
        <div
          className="content-stretch flex flex-col gap-8 items-center relative shrink-0 w-[400px]"
          data-name="WelcomeMessage"
        >
          <div className="flex flex-col font-['Nunito',sans-serif] font-bold justify-end leading-none relative shrink-0 text-5xl text-nowrap text-white tracking-[0.12px]">
            <h1 className="leading-[57.6px] whitespace-pre">Welcome back 👋</h1>
          </div>

          {/* URL Confirmation */}
          <div
            className="content-stretch flex flex-col gap-4 items-center justify-center relative shrink-0 w-full"
            data-name="URLConfirmation"
          >
            <div className="flex flex-col font-['Nunito',sans-serif] font-normal justify-end leading-none min-w-full relative shrink-0 text-sm text-[#c0c0c0] text-center tracking-[-0.28px] w-[min-content]">
              <p className="leading-[22.4px]">
                Kindly confirm that you you're on
              </p>
            </div>
            <div
              className="bg-[#252a09] border-[#97ab27] border-[0.5px] border-solid box-border content-stretch flex gap-2 items-center justify-center px-8 py-2 relative rounded-full shrink-0"
              data-name="URLContainer"
            >
              <div
                className="relative shrink-0 size-6"
                data-name="SecurityIcon"
              >
                <img
                  alt="Security"
                  className="block max-w-none size-full"
                  src={securityIcon}
                />
              </div>
              <div className="flex flex-col font-['Nunito',sans-serif] font-normal justify-end leading-none relative shrink-0 text-base text-nowrap text-white tracking-[0.024px]">
                <p className="leading-[25.6px] whitespace-pre">
                  https://app.sterllo.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <form
          onSubmit={onSubmit}
          className="content-stretch flex flex-col gap-8 items-center relative shrink-0 w-[400px]"
          data-name="FormContainer"
        >
          {/* Error Message */}
          {error && (
            <div className="w-full bg-red-900/20 border border-red-500 rounded-lg px-4 py-3">
              <p className="font-['Nunito',sans-serif] text-red-400 text-sm text-center">
                {error}
              </p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#D3F60B] border-[#97ab27] border-[0.5px] border-solid relative rounded-full shrink-0 w-full hover:bg-[#a5bc2e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            data-name="LoginButton"
          >
            <div className="box-border content-stretch flex gap-2 items-center justify-center overflow-hidden px-10 py-5 relative rounded-[inherit] w-full">
              <div
                className="box-border content-stretch flex gap-1 items-center justify-center px-1 py-0 relative shrink-0"
                data-name="TextContainer"
              >
                <p className="font-['Nunito',sans-serif] font-semibold leading-[21.6px] relative shrink-0 text-[#262b0a] text-lg text-nowrap tracking-[0.18px] whitespace-pre">
                  {isLoading ? "Logging in..." : "Login"}
                </p>
              </div>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
