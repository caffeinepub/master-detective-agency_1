import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { backendInterface } from "../backend";
import { createActorWithConfig } from "../config";
import { getSecretParameter } from "../utils/urlParams";
import { useInternetIdentity } from "./useInternetIdentity";

const ACTOR_QUERY_KEY = "actor";
const LOCAL_AUTH_KEY = "mda_local_user";

function getLocalUser(): { username: string; role: string } | null {
  try {
    const stored = localStorage.getItem(LOCAL_AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function useActor() {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  // Read local user to include in query key so actor refreshes on local login/logout
  const localUser = getLocalUser();
  const localUserKey = localUser ? localUser.username : null;

  const actorQuery = useQuery<backendInterface>({
    queryKey: [
      ACTOR_QUERY_KEY,
      identity?.getPrincipal().toString(),
      localUserKey,
    ],
    queryFn: async () => {
      const isAuthenticated = !!identity;

      if (!isAuthenticated) {
        // Return anonymous actor -- but if local admin is logged in, initialize with admin token
        const actor = await createActorWithConfig();
        const localUser = getLocalUser();
        if (localUser?.role === "admin") {
          const adminToken = getSecretParameter("caffeineAdminToken") || "";
          await actor._initializeAccessControlWithSecret(adminToken);
        }
        return actor;
      }

      const actorOptions = {
        agentOptions: {
          identity,
        },
      };

      const actor = await createActorWithConfig(actorOptions);
      const adminToken = getSecretParameter("caffeineAdminToken") || "";
      await actor._initializeAccessControlWithSecret(adminToken);
      return actor;
    },
    // Only refetch when identity or local user changes
    staleTime: Number.POSITIVE_INFINITY,
    enabled: true,
  });

  // When the actor changes, invalidate dependent queries
  useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        },
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        },
      });
    }
  }, [actorQuery.data, queryClient]);

  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching,
  };
}
