import CryptoJS from "crypto-js";
import { ErrorClass } from ".";

export class EncryptionDecryption {
  private getKeyAndIV: (secret: string) => any;

  constructor(getKeyAndIV?: (secret: string) => any) {
    this.getKeyAndIV =
      getKeyAndIV ||
      ((secret: string): any => {
        const envSecret = secret;

        if (!envSecret || envSecret.length < 48) {
          throw new ErrorClass(
            "KEYCHAIN must be at least 48 characters long",
            500
          );
        }
        return {
          key: envSecret.slice(0, 32),
          iv: envSecret.slice(-16),
        };
      });
  }

  encrypt = (data: any, key: any, iv: any) => {
    try {
      const secretKey = CryptoJS.enc.Utf8.parse(key);
      const ivParams = CryptoJS.enc.Utf8.parse(iv);

      const cipherText = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
      const encrypted = CryptoJS.AES.encrypt(cipherText, secretKey, {
        iv: ivParams,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      return encrypted.toString();
    } catch (error) {
      console.error("Encryption error:", error);
      throw new ErrorClass("Failed to ecrypt data", 500);
    }
  };

  decrypt = async (cipherText: any, key: any, iv: any) => {
    try {
      const normalizedKey = key.length > 32 ? key.slice(0, 32) : key;
      let cleanedCipherText = cipherText;

      if (typeof cipherText === "string") {
        cleanedCipherText = cipherText.replace(/\\\//g, "/");
      }

      const secretKey = CryptoJS.enc.Utf8.parse(normalizedKey);
      const ivParams = CryptoJS.enc.Utf8.parse(iv);

      const parsedCipherText = CryptoJS.enc.Base64.parse(cleanedCipherText);

      const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: parsedCipherText,
      });

      const decrypted = CryptoJS.AES.decrypt(cipherParams, secretKey, {
        iv: ivParams,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      const utf8Text = decrypted.toString(CryptoJS.enc.Utf8);

      try {
        return JSON.parse(utf8Text);
      } catch (jsonError) {
        return utf8Text;
      }
    } catch (error: any) {
      console.error("Detailed decryption error:", {
        name: error?.name || "Unknown error",
        message: error?.message || "No error message",
        stack: error?.stack || "No stack trace",
      });
      throw new ErrorClass("Failed to decrypt data", 500);
    }
  };

  getKey_IV = (secret: string) => {
    const { key, iv } = this.getKeyAndIV(secret);
    return { key, iv };
  };
}
