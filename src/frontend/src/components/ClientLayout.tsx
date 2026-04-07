import { Button } from "@/components/ui/button";
import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { FileText, FolderOpen, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { to: "/client", label: "My Cases", icon: FolderOpen, exact: true },
  { to: "/client/documents", label: "Documents", icon: FileText },
];

export function ClientLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/assets/generated/detective-logo-transparent.dim_200x200.png"
              alt="Logo"
              className="h-8 w-8 object-contain"
            />
            <div>
              <div className="text-foreground font-black uppercase tracking-wider text-xs">
                Master Detective
              </div>
              <div className="text-muted-foreground text-[9px] uppercase tracking-widest">
                Client Portal
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const active = item.exact
                ? location.pathname === item.to
                : location.pathname.startsWith(item.to);
              return (
                <Link key={item.to} to={item.to} data-ocid="client.nav.link">
                  <Button
                    variant={active ? "default" : "ghost"}
                    size="sm"
                    className="uppercase tracking-wider text-xs gap-2"
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              data-ocid="client.logout.button"
              className="text-muted-foreground uppercase tracking-wider text-xs gap-2"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
