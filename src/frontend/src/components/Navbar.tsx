import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { UserRole } from "../backend";
import { useAuth } from "../hooks/useAuth";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/solved-cases", label: "Solved Cases" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, userRole, logout } = useAuth();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: location change triggers close
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const dashboardLink = userRole === UserRole.admin ? "/admin" : "/client";

  return (
    <header
      data-ocid="navbar.panel"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[oklch(0.09_0_0)]/95 backdrop-blur-sm border-b border-border"
          : "bg-[oklch(0.09_0_0)]"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
            data-ocid="navbar.link"
          >
            <div className="relative">
              <img
                src="/assets/generated/detective-logo-transparent.dim_200x200.png"
                alt="Master Detective Logo"
                className="h-9 w-9 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-black uppercase tracking-wider text-sm leading-tight">
                Master Detective
              </span>
              <span className="text-muted-foreground text-[10px] uppercase tracking-widest leading-tight">
                Professional Agency
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="navbar.link"
                className={`nav-link ${
                  location.pathname === link.to ? "text-foreground" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to={dashboardLink} data-ocid="navbar.link">
                  <Button
                    variant="outline"
                    size="sm"
                    className="uppercase tracking-widest text-xs border-border hover:border-primary"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  data-ocid="navbar.button"
                  className="uppercase tracking-widest text-xs text-muted-foreground"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" data-ocid="navbar.link">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="uppercase tracking-widest text-xs text-muted-foreground"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/contact" data-ocid="navbar.link">
                  <Button size="sm" className="detective-btn-primary text-xs">
                    Request a Case
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            data-ocid="navbar.toggle"
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[oklch(0.11_0_0)] border-t border-border py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="navbar.link"
                className="block px-4 py-3 text-sm uppercase tracking-widest font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-3 border-t border-border mt-2">
              {isAuthenticated ? (
                <>
                  <Link to={dashboardLink}>
                    <Button
                      className="w-full mb-2 uppercase text-xs tracking-widest"
                      variant="outline"
                      size="sm"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="w-full uppercase text-xs tracking-widest"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mb-2 uppercase text-xs"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button
                      size="sm"
                      className="w-full detective-btn-primary text-xs"
                    >
                      Request a Case
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
