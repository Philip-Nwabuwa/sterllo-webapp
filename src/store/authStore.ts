import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ValidateTokenResponse, SubAccount } from "../types/auth";

interface AuthState {
  // User data from validation
  userData: ValidateTokenResponse["data"]["data"] | null;

  // Sub-account data
  subAccounts: SubAccount[];
  selectedSubAccount: SubAccount | null;

  // Actions
  setUserData: (data: ValidateTokenResponse["data"]["data"]) => void;
  setSubAccounts: (accounts: SubAccount[]) => void;
  setSelectedSubAccount: (account: SubAccount) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userData: null,
      subAccounts: [],
      selectedSubAccount: null,

      setUserData: (data) => set({ userData: data }),

      setSubAccounts: (accounts) => set({ subAccounts: accounts }),

      setSelectedSubAccount: (account) => set({ selectedSubAccount: account }),

      clearAuth: () =>
        set({
          userData: null,
          subAccounts: [],
          selectedSubAccount: null,
        }),
    }),
    {
      name: "sterllo-auth-storage",
    }
  )
);
