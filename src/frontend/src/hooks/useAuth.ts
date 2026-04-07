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

  const roleQuery = useQuery({
    queryKey: ["callerRole", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return UserRole.guest;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching && !!identity,
    staleTime: 1000 * 60 * 5,
  });

  const isAuthenticated = !!identity || !!localUser;
  const userRole = roleQuery.data ?? UserRole.guest;
  const isAdmin = userRole === UserRole.admin || localUser?.role === "admin";
  const isUser = userRole === UserRole.user || localUser?.role === "client";
  const principal = identity?.getPrincipal().toString();

  const logout = () => {
    clear();
    localLogout();
  };

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
    isRoleLoading: roleQuery.isLoading,
    localLogin,
    localUser,
  };
}
