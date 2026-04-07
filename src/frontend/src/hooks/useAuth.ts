import { useQuery } from "@tanstack/react-query";
import { UserRole } from "../backend";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";
import { useLocalAuth } from "./useLocalAuth";

export function useAuth() {
  const { identity, login, clear, isInitializing, isLoggingIn, loginStatus } =
    useInternetIdentity();
  const { actor, isFetching } = useActor();
  const { localUser, localLogin, localLogout } = useLocalAuth();

  // Only query role from backend when using Internet Identity (not local login)
  const roleQueryEnabled = !!actor && !isFetching && !!identity && !localUser;

  const roleQuery = useQuery({
    queryKey: ["callerRole", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return UserRole.guest;
      return actor.getCallerUserRole();
    },
    enabled: roleQueryEnabled,
    staleTime: 1000 * 60 * 5,
  });

  const isAuthenticated = !!identity || !!localUser;

  // Local user role takes priority over backend role
  const localRole =
    localUser?.role === "admin"
      ? UserRole.admin
      : localUser?.role === "client"
        ? UserRole.user
        : null;

  const userRole = localRole ?? roleQuery.data ?? UserRole.guest;
  const isAdmin = userRole === UserRole.admin;
  const isUser = userRole === UserRole.user;
  const principal = identity?.getPrincipal().toString() ?? localUser?.username;

  const logout = () => {
    clear();
    localLogout();
  };

  // isRoleLoading is false when using local auth (role is known immediately)
  const isRoleLoading = roleQueryEnabled ? roleQuery.isLoading : false;

  return {
    identity,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    loginStatus,
    login,
    logout,
    userRole,
    isAdmin,
    isUser,
    principal,
    isRoleLoading,
    localLogin,
    localUser,
  };
}
