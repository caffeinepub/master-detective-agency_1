import { Button } from "@/components/ui/button";
import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  FolderSearch,
  Globe,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  ScrollText,
  Settings,
  Shield,
  UserCog,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/cases", label: "Cases", icon: FolderSearch },
  { to: "/admin/clients", label: "Clients", icon: Users },
  { to: "/admin/staff", label: "Staff", icon: UserCog },
  { to: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { to: "/admin/media", label: "Media", icon: Image },
  { to: "/admin/settings", label: "Settings", icon: Settings },
  { to: "/admin/website", label: "Website Editor", icon: Globe },
  { to: "/admin/logs", label: "Activity Logs", icon: ScrollText },
];

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, principal } = useAuth();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const SidebarContent = (
    <aside
      className={`flex flex-col h-full bg-sidebar border-r border-border transition-all duration-300 ${
        collapsed && !isMobile ? "w-16" : "w-60"
      }`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
        <img
          src="/assets/generated/detective-logo-transparent.dim_200x200.png"
          alt="Logo"
          className="h-8 w-8 object-contain flex-shrink-0"
        />
        {(!collapsed || isMobile) && (
          <div>
            <div className="text-foreground font-black uppercase tracking-wider text-xs leading-tight">
              Master Detective
            </div>
            <div className="text-muted-foreground text-[9px] uppercase tracking-widest">
              Admin Panel
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const active = item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              data-ocid="admin.nav.link"
              onClick={() => isMobile && setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 group ${
                active
                  ? "bg-primary/20 text-primary border-l-2 border-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <item.icon
                className={`h-4 w-4 flex-shrink-0 ${active ? "text-primary" : ""}`}
              />
              {(!collapsed || isMobile) && (
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3">
        {(!collapsed || isMobile) && (
          <div className="text-muted-foreground text-[10px] uppercase tracking-wider mb-2 px-1 truncate">
            {principal?.slice(0, 20)}...
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          data-ocid="admin.logout.button"
          className={`w-full text-muted-foreground hover:text-primary justify-start gap-2 ${
            collapsed && !isMobile ? "px-0 justify-center" : ""
          }`}
        >
          <LogOut className="h-4 w-4" />
          {(!collapsed || isMobile) && (
            <span className="text-xs uppercase tracking-wider">Logout</span>
          )}
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="relative flex-shrink-0">
          {SidebarContent}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 bg-muted border border-border rounded-full p-1 hover:bg-accent transition-colors z-10"
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </button>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: overlay dismiss */}
          <div
            role="presentation"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10">{SidebarContent}</div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            {isMobile && (
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="text-muted-foreground hover:text-foreground mr-2"
                data-ocid="admin.menu.button"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            <h1 className="text-foreground font-bold uppercase tracking-wider text-sm">
              Admin Control Panel
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <span className="text-muted-foreground text-xs hidden sm:block">
              Administrator
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
