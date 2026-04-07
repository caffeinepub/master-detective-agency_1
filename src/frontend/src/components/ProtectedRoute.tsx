import { Skeleton } from "@/components/ui/skeleton";
import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { UserRole } from "../backend";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: ReactNode;
  requiredRole?: UserRole;
}) {
  const { isAuthenticated, isInitializing, userRole, isRoleLoading } =
    useAuth();

  if (isInitializing || isRoleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="space-y-4 w-64" data-ocid="auth.loading_state">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect based on actual role
    if (userRole === UserRole.admin) {
      return <Navigate to="/admin" />;
    }
    return <Navigate to="/client" />;
  }

  return <>{children}</>;
}
