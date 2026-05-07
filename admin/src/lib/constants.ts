const isSecureContext =
  typeof window !== "undefined" && window.location.protocol === "https:";

export const AUTH_TOKEN_KEY = "auth_token";
export const AUTH_USER = "auth_user";
export const AUTH_CRED = "AUTH_CRED_SHOP";
export const SUPER_ADMIN = "super_admin";
export const STORE_OWNER = "store_owner";
export const STAFF = "staff";
export const TOKEN = "token";
export const PERMISSIONS = "permissions";
export const AUTH_COOKIE_OPTIONS = {
  sameSite: "strict" as const,
  secure: isSecureContext,
  path: "/",
};
