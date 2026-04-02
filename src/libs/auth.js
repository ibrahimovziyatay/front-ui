import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.VUE_APP_SECRET_KEY;
const sessionOnly = process.env.VUE_SESSION_ONLY;

export function encryptData(data) {
  const stringData = JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringData, SECRET_KEY).toString();
}

export function decryptData(ciphertext) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Decrypt error:", error);
    return null;
  }
}

function setCookie(name, value, days, sessionOnly = false) {
  let expires = "";
  if (!sessionOnly && typeof days === "number") {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value || ""
  )}${expires}; path=/`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return decodeURIComponent(parts.pop().split(";").shift());
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=-1; path=/`;
}

export function setLogin(data) {
  const encData = encryptData(data);

  if (sessionOnly === "true") {
    // Session cookie: removed when browser closes
    setCookie("user", encData, null, true);
  } else {
    // Persistent cookie: 1 day expiry
    setCookie("user", encData, 1, false);
  }
}

export function validateRequest() {
  const stored = getCookie("user");
  if (!stored) return null;
  return decryptData(stored);
}

export function logout() {
  deleteCookie("user");
}
