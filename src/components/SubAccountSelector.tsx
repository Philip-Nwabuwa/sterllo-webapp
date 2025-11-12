import { useState } from "react";
import type { SubAccount } from "../types/auth";
import { cookieUtils } from "../lib/cookies";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "@tanstack/react-router";
import AuthLayout from "./layout/AuthLayout";

interface SubAccountSelectorProps {
  subAccounts: SubAccount[];
  onSelect: (account: SubAccount) => void;
}

export default function SubAccountSelector({
  subAccounts,
  onSelect,
}: SubAccountSelectorProps) {
  const [selectedAccount, setSelectedAccount] = useState<SubAccount | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const setSelectedSubAccount = useAuthStore(
    (state) => state.setSelectedSubAccount
  );
  const navigate = useNavigate();

  const handleSelectAndContinue = () => {
    if (!selectedAccount) return;

    setIsLoading(true);
    try {
      // Store the selected profile.key in cookies
      cookieUtils.set("accountKey", selectedAccount.profile.key, 7);

      // Store the selected account data in Zustand
      setSelectedSubAccount(selectedAccount);

      // Call the onSelect callback
      onSelect(selectedAccount);

      // Navigate to dashboard
      navigate({ to: "/dashboard" });
    } catch (error) {
      console.error("Error selecting sub-account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div
        className="content-stretch flex flex-col gap-8 items-center relative shrink-0 w-[400px]"
        data-name="SelectionContainer"
      >
        {/* Title */}
        <div className="flex flex-col font-['Nunito',sans-serif] font-bold justify-end leading-none relative shrink-0 text-4xl text-white tracking-[0.12px]">
          <h1 className="leading-[48px] text-center">Select Account</h1>
        </div>

        {/* Subtitle */}
        <div className="flex flex-col font-['Nunito',sans-serif] font-normal leading-none relative shrink-0 text-sm text-[#c0c0c0] text-center tracking-[-0.28px]">
          <p className="leading-[22.4px]">
            Choose the account you want to access
          </p>
        </div>

        {/* Account List */}
        <div className="flex flex-col gap-4 w-full">
          {subAccounts.map((account) => (
            <button
              key={account.profile.key}
              onClick={() => setSelectedAccount(account)}
              className={`
                border border-solid rounded-xl p-4 transition-all cursor-pointer
                ${
                  selectedAccount?.profile.key === account.profile.key
                    ? "border-[#D3F60B] bg-[#252a09]"
                    : "border-[#97ab27] bg-transparent hover:bg-[#1a1d0a]"
                }
              `}
              data-name="AccountOption"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="size-12 rounded-full overflow-hidden bg-[#97ab27] flex items-center justify-center">
                  {account.profile.bio.avatar ? (
                    <img
                      src={account.profile.bio.avatar}
                      alt={account.profile.bio.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <span className="text-[#181A0E] font-['Nunito',sans-serif] font-bold text-xl">
                      {account.profile.bio.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Account Info */}
                <div className="flex flex-col items-start flex-1">
                  <p className="font-['Nunito',sans-serif] font-semibold text-white text-lg leading-[25.6px]">
                    {account.profile.bio.name}
                  </p>
                  <p className="font-['Nunito',sans-serif] font-normal text-[#c0c0c0] text-sm leading-[22.4px]">
                    {account.profile.bio.type}
                  </p>
                  {account.profile.account_number && (
                    <p className="font-['Nunito',sans-serif] font-normal text-[#97ab27] text-xs leading-[19.2px]">
                      {account.profile.account_number}
                    </p>
                  )}
                </div>

                {/* Selection Indicator */}
                {selectedAccount?.profile.key === account.profile.key && (
                  <div className="size-6 rounded-full bg-[#D3F60B] flex items-center justify-center">
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L5 9L13 1"
                        stroke="#181A0E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSelectAndContinue}
          disabled={!selectedAccount || isLoading}
          className="bg-[#D3F60B] border-[#97ab27] border-[0.5px] border-solid relative rounded-full shrink-0 w-full hover:bg-[#a5bc2e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          data-name="ContinueButton"
        >
          <div className="box-border content-stretch flex gap-2 items-center justify-center overflow-hidden px-10 py-5 relative rounded-[inherit] w-full">
            <p className="font-['Nunito',sans-serif] font-semibold leading-[21.6px] relative shrink-0 text-[#262b0a] text-lg text-nowrap tracking-[0.18px] whitespace-pre">
              {isLoading ? "Loading..." : "Continue"}
            </p>
          </div>
        </button>
      </div>
    </AuthLayout>
  );
}
