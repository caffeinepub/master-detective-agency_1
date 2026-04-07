# Master Detective Agency

## Current State
The app uses Internet Identity exclusively for authentication (admin, staff, client roles). The LoginPage shows tabs for Admin/Staff/Client but all three tabs just show the Internet Identity login button. There's no traditional username/password login option.

## Requested Changes (Diff)

### Add
- Username/password login form as an alternative option on the Login page
- Admin credentials: username `admin`, password `504560@AUC`
- A local auth context/hook (`useLocalAuth`) that stores a credential-based session in localStorage
- The `useAuth` hook should check both Internet Identity and local credential login for `isAuthenticated` / `isAdmin` states

### Modify
- `LoginPage.tsx`: Add credential-based username/password form alongside the Internet Identity button (two options: "Login with Credentials" and "Login with Internet Identity")
- `useAuth.ts`: Merge local credential session with Internet Identity so `isAuthenticated` and `isAdmin` work for both paths
- `ProtectedRoute.tsx`: Accept both auth paths

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/hooks/useLocalAuth.ts` -- manages credential-based login/logout stored in localStorage. Hardcoded admin: `admin` / `504560@AUC`. Exposes `localLogin(username, password)`, `localLogout()`, `localUser` (null or `{username, role}`)
2. Update `useAuth.ts` to also check `useLocalAuth` state and merge: `isAuthenticated = !!identity || !!localUser`, `isAdmin = (userRole === admin) || (localUser?.role === 'admin')`
3. Update `LoginPage.tsx` Admin tab: show a username+password form with a submit button AND keep the Internet Identity button below it as secondary option
4. Update `ProtectedRoute.tsx` to use the merged auth state (already flows through `useAuth`, so minimal change needed)
