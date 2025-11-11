/**
 * Generates a unique request ID
 * @returns A 16-character lowercase UUID string
 */
export const generateRequestId = (): string => {
  return crypto.randomUUID().slice(0, 16).toLowerCase();
};

/**
 * Encodes data to base64 string
 * @param data - String or object to encode
 * @returns Base64 encoded string
 */
export const encodeToBase64 = (data: string | Record<string, any>): string => {
  try {
    const stringData = typeof data === "string" ? data : JSON.stringify(data);

    // Check if running in browser or Node.js environment
    if (typeof window !== "undefined" && window.btoa) {
      // Browser environment
      return window.btoa(unescape(encodeURIComponent(stringData)));
    } else {
      // Node.js environment
      return Buffer.from(stringData).toString("base64");
    }
  } catch (error) {
    console.error("Error encoding to base64:", error);
    throw new Error("Failed to encode data to base64");
  }
};

/**
 * Decodes base64 string to original data
 * @param base64String - Base64 encoded string
 * @returns Decoded data (parsed as JSON if possible)
 */
export const decodeFromBase64 = <T = any>(base64String: string): T => {
  try {
    let decodedString: string;

    // Check if running in browser or Node.js environment
    if (typeof window !== "undefined" && window.atob) {
      // Browser environment
      decodedString = decodeURIComponent(escape(window.atob(base64String)));
    } else {
      // Node.js environment
      decodedString = Buffer.from(base64String, "base64").toString("utf-8");
    }

    // Try to parse as JSON, otherwise return as string
    try {
      return JSON.parse(decodedString) as T;
    } catch {
      return decodedString as T;
    }
  } catch (error) {
    console.error("Error decoding from base64:", error);
    throw new Error("Failed to decode base64 string");
  }
};

/**
 * Encodes credentials object to base64
 * @param credentials - Credentials object containing user key, account key, session id, etc.
 * @returns Base64 encoded credentials string
 */
export const encodeCredentials = (credentials: Record<string, any>): string => {
  return encodeToBase64(credentials);
};

/**
 * Validates if a string is valid base64
 * @param str - String to validate
 * @returns True if valid base64, false otherwise
 */
export const isValidBase64 = (str: string): boolean => {
  try {
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64Regex.test(str)) return false;

    // Try to decode
    decodeFromBase64(str);
    return true;
  } catch {
    return false;
  }
};

export class ErrorClass extends Error {
  statusCode: any;

  constructor(message: string, statusCode: any) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
