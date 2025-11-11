import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import {
  encodeToBase64,
  decodeFromBase64,
  encodeCredentials,
  generateRequestId,
} from "./index";
import CryptoJS from "crypto-js";
import type { ApiCredentials, ApiRequestConfig } from "../types/api";
import { EncryptionDecryption } from "./cryptography";

// Get base URL from environment variable - server-side only
const getEnvVar = (key: string): string | undefined => {
  // Check if we're in a server environment
  if (typeof process !== "undefined" && process.env) {
    return process.env[key];
  }
  return undefined;
};

const WALLET_BASE_URL = getEnvVar("WALLET_BASE_URL");

const encryptionService = new EncryptionDecryption();

const sterlloProductKey = getEnvVar("STERLLO_WEB_KEY");
const sterlloProductKeychain = getEnvVar("STERLLO_WEB_KEYCHAIN");
const sterlloLiveProductKey = getEnvVar("STERLLO_PRODUCT_KEY");
const sterlloLiveProductKeychain = getEnvVar("SRERLLO_PRODUCT_KEYCHAIN");

export let decryptedSterlloKey: string;
export let decryptedSterlloLiveKey: string;
export let encryptionKey: string;

export const initializeProductKeys = async (): Promise<void> => {
  try {
    const accountKeyResponse = await encryptionService.decrypt(
      sterlloProductKey!,
      encryptionService.getKey_IV(sterlloProductKeychain!).key,
      encryptionService.getKey_IV(sterlloProductKeychain!).iv
    );

    decryptedSterlloKey = CryptoJS.enc.Base64.parse(
      accountKeyResponse
    ).toString(CryptoJS.enc.Utf8);

    const sterlloLiveKeyResponse = await encryptionService.decrypt(
      sterlloLiveProductKey!,
      encryptionService.getKey_IV(sterlloLiveProductKeychain!).key,
      encryptionService.getKey_IV(sterlloLiveProductKeychain!).iv
    );

    decryptedSterlloLiveKey = CryptoJS.enc.Base64.parse(
      sterlloLiveKeyResponse
    ).toString(CryptoJS.enc.Utf8);

    encryptionKey = decryptedSterlloLiveKey.substring(0, 32);
    console.log("Source-Product-Key", decryptedSterlloKey || "Not initialized");
    console.log(
      "Target-Product-Key",
      decryptedSterlloLiveKey || "Not initialized"
    );
  } catch (error) {
    console.error("Failed to initialize product keys:", error);
    throw error;
  }
};

/**
 * Creates API credentials object
 */
export const createApiCredentials = (
  userKey: string,
  accountKey: string,
  sessionId: string
): ApiCredentials => {
  return {
    "User-Key": userKey,
    "Account-Key": accountKey,
    "Session-Id": sessionId,
    "Request-Source": "WEB",
    "Request-Id": generateRequestId(),
    "Source-Product-Key": decryptedSterlloKey,
    "Target-Product-Key": decryptedSterlloLiveKey,
  };
};

/**
 * Creates an Axios instance with base configuration
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: WALLET_BASE_URL,
    timeout: 30000, // 30 seconds
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`
      );

      // Encode request payload to base64 if it exists
      if (config.data && typeof config.data === "object") {
        const originalData = config.data;
        console.log("[API Request] Original data:", originalData);

        try {
          config.data = {
            payload: encodeToBase64(originalData),
          };
          console.log("[API Request] Encoded payload");
        } catch (error) {
          console.error("[API Request] Failed to encode payload:", error);
          throw error;
        }
      }

      return config;
    },
    (error: AxiosError) => {
      console.error("[API Request] Error:", error.message);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log(`[API Response] ${response.status} ${response.config.url}`);

      // Decode response from base64 if it's base64 encoded
      if (response.data && typeof response.data === "object") {
        // Check if response contains encoded data in 'payload' field
        if (
          response.data.payload &&
          typeof response.data.payload === "string"
        ) {
          try {
            const decodedData = decodeFromBase64(response.data.payload);
            console.log("[API Response] Decoded payload");
            response.data = decodedData;
          } catch (error) {
            console.warn("[API Response] Failed to decode payload:", error);
            // Keep original data if decoding fails
          }
        }
        // Check if response contains encoded data in 'response' field
        else if (
          response.data.response &&
          typeof response.data.response === "string"
        ) {
          try {
            const decodedData = decodeFromBase64(response.data.response);
            console.log("[API Response] Decoded response field");
            response.data = decodedData;
          } catch (error) {
            console.warn(
              "[API Response] Failed to decode response field:",
              error
            );
            // Keep original data if decoding fails
          }
        }
        // Check if entire response is base64 encoded string
        else if (typeof response.data === "string") {
          try {
            const decodedData = decodeFromBase64(response.data);
            console.log("[API Response] Decoded response");
            response.data = decodedData;
          } catch (error) {
            console.warn("[API Response] Response is not base64 encoded");
            // Keep original data if decoding fails
          }
        }
      }

      return response;
    },
    (error: AxiosError) => {
      console.error("[API Response] Error:", error.message);

      // Try to decode error response if it exists
      if (error.response?.data) {
        try {
          if (
            typeof error.response.data === "object" &&
            "payload" in error.response.data &&
            typeof error.response.data.payload === "string"
          ) {
            const decodedError = decodeFromBase64(error.response.data.payload);
            error.response.data = decodedError;
          } else if (typeof error.response.data === "string") {
            const decodedError = decodeFromBase64(error.response.data);
            error.response.data = decodedError;
          }
        } catch (decodeError) {
          console.warn("[API Response] Failed to decode error response");
          // Keep original error data
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Create a singleton instance
const axiosInstance = createAxiosInstance();

/**
 * Sets credentials in the Axios instance headers
 */
export const setApiCredentials = (credentials: ApiCredentials): void => {
  try {
    const encodedCredentials = encodeCredentials(credentials);
    axiosInstance.defaults.headers.common["Credentials"] = encodedCredentials;
    console.log("[API Client] Credentials set successfully");
  } catch (error) {
    console.error("[API Client] Failed to set credentials:", error);
    throw new Error("Failed to set API credentials");
  }
};

/**
 * Clears credentials from the Axios instance headers
 */
export const clearApiCredentials = (): void => {
  delete axiosInstance.defaults.headers.common["Credentials"];
  console.log("[API Client] Credentials cleared");
};

/**
 * Makes an API request with automatic base64 encoding/decoding
 */
export const apiRequest = async <T = any>(
  config: ApiRequestConfig
): Promise<T> => {
  try {
    const { method = "GET", endpoint, data, params, headers } = config;

    console.log("headers", headers);
    const axiosConfig: AxiosRequestConfig = {
      method,
      url: endpoint,
      data,
      params,
      headers,
    };

    const response = await axiosInstance.request<T>(axiosConfig);

    // Return just the decoded data
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      console.error("[API Request] Failed:", axiosError.message);

      // Throw the decoded error response or the error itself
      throw axiosError.response?.data || axiosError;
    }

    // Handle non-Axios errors
    console.error("[API Request] Unexpected error:", error);
    throw error;
  }
};

/**
 * Convenience methods for different HTTP methods
 */
export const apiClient = {
  /**
   * GET request
   */
  get: async <T = any>(
    endpoint: string,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<T> => {
    return apiRequest<T>({
      method: "GET",
      endpoint,
      params,
      headers,
    });
  },

  /**
   * POST request
   */
  post: async <T = any>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> => {
    return apiRequest<T>({
      method: "POST",
      endpoint,
      data,
      headers,
    });
  },

  /**
   * PUT request
   */
  put: async <T = any>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> => {
    return apiRequest<T>({ method: "PUT", endpoint, data, headers });
  },

  /**
   * DELETE request
   */
  delete: async <T = any>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> => {
    return apiRequest<T>({ method: "DELETE", endpoint, data, headers });
  },

  /**
   * PATCH request
   */
  patch: async <T = any>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> => {
    return apiRequest<T>({ method: "PATCH", endpoint, data, headers });
  },
};

/**
 * Export the Axios instance for advanced use cases
 */
export { axiosInstance };

export default apiClient;
