import React, { createContext, useCallback, useEffect, useState } from "react";
import {
  createApiCredentials,
  setApiCredentials,
  clearApiCredentials,
} from "../lib/api-client";

/**
 * Credentials stored in the auth context (without requestSource and requestId)
 */
export interface AuthCredentials {
  userKey: string;
  accountKey: string;
  sessionId: string;
}

/**
 * Auth context state shape
 */
export interface AuthContextValue {
  credentials: AuthCredentials | null;
  isAuthenticated: boolean;
  login: (userKey: string, accountKey: string, sessionId: string) => void;
  logout: () => void;
  setCredentials: (
    userKey: string,
    accountKey: string,
    sessionId: string
  ) => void;
}

/**
 * Auth context
 */
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

/**
 * Storage keys for persisting credentials
 */
const STORAGE_KEY = "sterllo_auth_credentials";

/**
 * Storage type (sessionStorage or localStorage)
 */
type StorageType = "session" | "local";

interface AuthProviderProps {
  children: React.ReactNode;
  /**
   * Storage type to use for persisting credentials
   * - 'session': credentials cleared when browser tab is closed
   * - 'local': credentials persist across browser sessions
   * @default 'session'
   */
  storageType?: StorageType;
}

/**
 * Auth Provider Component
 *
 * Manages API credentials and provides authentication state to the application.
 * Automatically calls setApiCredentials() whenever credentials change.
 *
 * @example
 * ```tsx
 * // Wrap your app with the provider
 * <AuthProvider storageType="session">
 *   <App />
 * </AuthProvider>
 * ```
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  storageType = "session",
}) => {
  const [credentials, setCredentialsState] = useState<AuthCredentials | null>(
    null
  );

  /**
   * Get the appropriate storage object based on storageType
   */
  const getStorage = useCallback((): Storage => {
    return storageType === "local" ? localStorage : sessionStorage;
  }, [storageType]);

  /**
   * Load credentials from storage on mount
   */
  useEffect(() => {
    try {
      const storage = getStorage();
      const storedCredentials = storage.getItem(STORAGE_KEY);

      if (storedCredentials) {
        const parsed: AuthCredentials = JSON.parse(storedCredentials);

        // Validate that all required fields are present
        if (parsed.userKey && parsed.accountKey && parsed.sessionId) {
          setCredentialsState(parsed);

          // Set credentials in API client
          const apiCredentials = createApiCredentials(
            parsed.userKey,
            parsed.accountKey,
            parsed.sessionId
          );
          setApiCredentials(apiCredentials);

          console.log("[AuthContext] Credentials restored from storage");
        } else {
          console.warn(
            "[AuthContext] Invalid credentials in storage, clearing"
          );
          storage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error(
        "[AuthContext] Failed to load credentials from storage:",
        error
      );
      // Clear potentially corrupted data
      getStorage().removeItem(STORAGE_KEY);
    }
  }, [getStorage]);

  /**
   * Save credentials to storage
   */
  const saveCredentials = useCallback(
    (creds: AuthCredentials): void => {
      try {
        const storage = getStorage();
        storage.setItem(STORAGE_KEY, JSON.stringify(creds));
        console.log("[AuthContext] Credentials saved to storage");
      } catch (error) {
        console.error(
          "[AuthContext] Failed to save credentials to storage:",
          error
        );
      }
    },
    [getStorage]
  );

  /**
   * Clear credentials from storage
   */
  const clearStoredCredentials = useCallback((): void => {
    try {
      const storage = getStorage();
      storage.removeItem(STORAGE_KEY);
      console.log("[AuthContext] Credentials cleared from storage");
    } catch (error) {
      console.error(
        "[AuthContext] Failed to clear credentials from storage:",
        error
      );
    }
  }, [getStorage]);

  /**
   * Set credentials and update API client
   */
  const setCredentials = useCallback(
    (userKey: string, accountKey: string, sessionId: string): void => {
      try {
        // Validate inputs
        if (!userKey || !accountKey || !sessionId) {
          throw new Error(
            "All credential fields are required: userKey, accountKey, sessionId"
          );
        }

        const newCredentials: AuthCredentials = {
          userKey,
          accountKey,
          sessionId,
        };

        // Update state
        setCredentialsState(newCredentials);

        // Create API credentials and set in API client
        const apiCredentials = createApiCredentials(
          userKey,
          accountKey,
          sessionId
        );
        setApiCredentials(apiCredentials);

        // Persist to storage
        saveCredentials(newCredentials);

        console.log("[AuthContext] Credentials updated successfully");
      } catch (error) {
        console.error("[AuthContext] Failed to set credentials:", error);
        throw error;
      }
    },
    [saveCredentials]
  );

  /**
   * Login by setting credentials
   */
  const login = useCallback(
    (userKey: string, accountKey: string, sessionId: string): void => {
      setCredentials(userKey, accountKey, sessionId);
    },
    [setCredentials]
  );

  /**
   * Logout by clearing credentials
   */
  const logout = useCallback((): void => {
    try {
      // Clear state
      setCredentialsState(null);

      // Clear API client credentials
      clearApiCredentials();

      // Clear storage
      clearStoredCredentials();

      console.log("[AuthContext] Logged out successfully");
    } catch (error) {
      console.error("[AuthContext] Failed to logout:", error);
      throw error;
    }
  }, [clearStoredCredentials]);

  const value: AuthContextValue = {
    credentials,
    isAuthenticated: credentials !== null,
    login,
    logout,
    setCredentials,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
