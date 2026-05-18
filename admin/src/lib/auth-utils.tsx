import Cookie from "js-cookie";
import { AUTH_CRED, DIVULGADOR_ADMIN, DIVULGADOR_COLLABORATOR, PERMISSIONS, STAFF, STORE_OWNER, SUPER_ADMIN, TOKEN } from "@/lib/constants";
import { type Login } from "@/modules/users/users.schema";
import { parse as parseCookies } from 'cookie';

export const allowedRoles = [SUPER_ADMIN, STORE_OWNER, STAFF, DIVULGADOR_ADMIN, DIVULGADOR_COLLABORATOR];
export const adminAndOwnerOnly = [SUPER_ADMIN, STORE_OWNER];
export const adminOwnerAndStaffOnly = [SUPER_ADMIN, STORE_OWNER, STAFF];
export const adminOnly = [SUPER_ADMIN];
export const ownerOnly = [STORE_OWNER];
export const ownerAndStaffOnly = [STORE_OWNER, STAFF];
export const divulgadorOnly = [DIVULGADOR_ADMIN, DIVULGADOR_COLLABORATOR];
export const divulgadorAdminOnly = [DIVULGADOR_ADMIN];
export const divulgadorCollaboratorOnly = [DIVULGADOR_COLLABORATOR];

export function setAuthCredentials(
  token: string,
  permissions: Login["permissions"],
) {
  Cookie.set(AUTH_CRED, JSON.stringify({ token, permissions }));
}

export function getAuthCredentials(context?: any): {
  token: string | null;
  permissions: string[] | null;
  role: string | null;
} {
  let authCred;
  
  if (context) {
    // Use parseSSRCookie to extract cookies in SSR
    authCred = parseSSRCookie(context)[AUTH_CRED];
  } else {
    // Use js-cookie to get cookies in client-side
    authCred = Cookie.get(AUTH_CRED);
  }

  // Ensure authCred is a string before parsing it
  if (typeof authCred === "string") {
    return JSON.parse(authCred);
  }

  // Default return when authCred is not valid
  return { token: null, permissions: null, role: null };
}


export function parseSSRCookie(context: any) {
  return parseCookies(context.req.headers.cookie ?? '');
}

export function hasAccess(
  _allowedRoles: string[],
  _userPermissions: string[] | undefined | null
) {
  if (_userPermissions) {
    return Boolean(
      _allowedRoles?.find((aRole) => _userPermissions.includes(aRole))
    );
  }
  return false;
}

export function isAuthenticated(_cookies: any) {
  return (
    !!_cookies[TOKEN] &&
    Array.isArray(_cookies[PERMISSIONS]) &&
    !!_cookies[PERMISSIONS].length
  );
}
