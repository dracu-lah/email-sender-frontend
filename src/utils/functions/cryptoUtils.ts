/**
 * Simple encryption utility for localStorage
 * NOTE: This offers only basic obfuscation against casual users
 * It is NOT secure against determined attackers
 */

/**
 * Creates a consistent key from a passphrase
 * @param {string} passphrase - Secret phrase to derive key from
 * @returns {string} - Derived key
 */
const createKey = (passphrase) => {
  // Simple hash function to create a consistent key
  let hash = 0;
  for (let i = 0; i < passphrase.length; i++) {
    const char = passphrase.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
};

// App-specific passphrase - change this to your own secret
const PASSPHRASE = "your-app-secret-phrase-change-this";
const SECRET_KEY = createKey(PASSPHRASE);

/**
 * Encrypts data for localStorage
 * @param {any} data - Data to encrypt
 * @returns {string} - Encrypted string
 */
export const encryptForStorage = (data) => {
  try {
    // Convert data to string if it's not already
    const dataString = typeof data === "string" ? data : JSON.stringify(data);

    // Simple XOR encryption with the key
    let encrypted = "";
    for (let i = 0; i < dataString.length; i++) {
      const charCode =
        dataString.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
      encrypted += String.fromCharCode(charCode);
    }

    // Convert to base64 for safe storage
    return btoa(encrypted);
  } catch (error) {
    console.error("Encryption failed:", error);
    return null;
  }
};

/**
 * Decrypts data from localStorage
 * @param {string} encryptedData - Encrypted string from localStorage
 * @param {boolean} parseJson - Whether to parse the result as JSON
 * @returns {any} - Decrypted data
 */
export const decryptFromStorage = (encryptedData, parseJson = true) => {
  if (!encryptedData) return null;

  try {
    // Decode from base64
    const encrypted = atob(encryptedData);

    // XOR decrypt with the same key
    let decrypted = "";
    for (let i = 0; i < encrypted.length; i++) {
      const charCode =
        encrypted.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
      decrypted += String.fromCharCode(charCode);
    }

    // Parse JSON if requested
    return parseJson ? JSON.parse(decrypted) : decrypted;
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

// Usage examples:
//
// // Store data in localStorage
// const userData = { name: "User", level: 5 };
// localStorage.setItem('userData', encryptForStorage(userData));
//
// // Retrieve data from localStorage
// const encryptedData = localStorage.getItem('userData');
// const decryptedData = decryptFromStorage(encryptedData);
// console.log(decryptedData); // { name: "User", level: 5 }
