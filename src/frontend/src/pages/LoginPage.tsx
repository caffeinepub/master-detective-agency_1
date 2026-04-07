import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, LogIn, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { UserRole } from "../backend";
import { MetaTags } from "../components/MetaTags";
import { useAuth } from "../hooks/useAuth";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();
  const { isAuthenticated, userRole, isRoleLoading, isAdmin, localLogin } =
    useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credError, setCredError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isRoleLoading) {
      if (isAdmin || userRole === UserRole.admin) {
        navigate({ to: "/admin" });
      } else {
        navigate({ to: "/client" });
      }
    }
  }, [isAuthenticated, userRole, isAdmin, isRoleLoading, navigate]);

  const handleCredentialLogin = () => {
    setCredError(false);
    setIsSubmitting(true);
    const success = localLogin(username.trim(), password);
    setIsSubmitting(false);
    if (!success) {
      setCredError(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCredentialLogin();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <MetaTags title="Login | Master Detective Agency" />

      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/generated/hero-noir-cityscape.dim_1920x1080.jpg')`,
        }}
      />
      <div className="fixed inset-0 bg-black/75" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/assets/generated/detective-logo-transparent.dim_200x200.png"
            alt="Master Detective"
            className="h-16 w-16 object-contain mx-auto mb-4"
          />
          <h1 className="text-foreground font-black uppercase tracking-widest text-xl">
            Master Detective
          </h1>
          <p className="text-muted-foreground text-xs uppercase tracking-widest mt-1">
            Professional Agency Platform
          </p>
        </div>

        <div
          className="bg-card border border-border p-8"
          data-ocid="login.modal"
        >
          <Tabs defaultValue="client">
            <TabsList className="w-full bg-muted mb-6">
              <TabsTrigger
                value="admin"
                data-ocid="login.tab"
                className="flex-1 uppercase tracking-wider text-xs"
              >
                Admin
              </TabsTrigger>
              <TabsTrigger
                value="staff"
                data-ocid="login.tab"
                className="flex-1 uppercase tracking-wider text-xs"
              >
                Staff
              </TabsTrigger>
              <TabsTrigger
                value="client"
                data-ocid="login.tab"
                className="flex-1 uppercase tracking-wider text-xs"
              >
                Client
              </TabsTrigger>
            </TabsList>

            {/* Admin Tab — credential login + Internet Identity */}
            <TabsContent value="admin" className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-foreground font-bold uppercase tracking-wider text-sm">
                  Administrator Login
                </h3>
              </div>

              {/* Credential form */}
              <div className="space-y-3">
                <Input
                  data-ocid="login.input"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setCredError(false);
                  }}
                  onKeyDown={handleKeyDown}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                  autoComplete="username"
                />
                <Input
                  data-ocid="login.input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setCredError(false);
                  }}
                  onKeyDown={handleKeyDown}
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                  autoComplete="current-password"
                />

                {credError && (
                  <p
                    data-ocid="login.error_state"
                    className="text-destructive text-xs text-center"
                  >
                    Invalid credentials. Please try again.
                  </p>
                )}

                <Button
                  data-ocid="login.submit_button"
                  className="detective-btn-primary w-full gap-2"
                  onClick={handleCredentialLogin}
                  disabled={isSubmitting || !username || !password}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" /> Login
                    </>
                  )}
                </Button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-muted-foreground text-xs uppercase tracking-wider">
                  or
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Internet Identity */}
              <Button
                data-ocid="login.secondary_button"
                variant="outline"
                className="w-full gap-2 border-border text-foreground hover:bg-muted"
                onClick={login}
                disabled={isLoggingIn || isInitializing}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" /> Login with Internet Identity
                  </>
                )}
              </Button>

              <p className="text-muted-foreground text-xs text-center leading-relaxed">
                Internet Identity provides cryptographic verification and
                end-to-end encrypted sessions.
              </p>
            </TabsContent>

            {/* Staff Tab — Internet Identity only */}
            <TabsContent value="staff" className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-foreground font-bold uppercase tracking-wider text-sm">
                  Staff Member Login
                </h3>
                <p className="text-muted-foreground text-xs mt-1">
                  Authenticate securely using Internet Identity
                </p>
              </div>

              <Button
                data-ocid="login.submit_button"
                className="detective-btn-primary w-full gap-2"
                onClick={login}
                disabled={isLoggingIn || isInitializing}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />{" "}
                    Authenticating...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" /> Login with Internet Identity
                  </>
                )}
              </Button>

              <p className="text-muted-foreground text-xs text-center leading-relaxed">
                Your identity is cryptographically verified and never shared.
                All sessions are encrypted and secure.
              </p>
            </TabsContent>

            {/* Client Tab — Internet Identity only */}
            <TabsContent value="client" className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-foreground font-bold uppercase tracking-wider text-sm">
                  Client Login
                </h3>
                <p className="text-muted-foreground text-xs mt-1">
                  Authenticate securely using Internet Identity
                </p>
              </div>

              <Button
                data-ocid="login.submit_button"
                className="detective-btn-primary w-full gap-2"
                onClick={login}
                disabled={isLoggingIn || isInitializing}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />{" "}
                    Authenticating...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" /> Login with Internet Identity
                  </>
                )}
              </Button>

              <p className="text-muted-foreground text-xs text-center leading-relaxed">
                Your identity is cryptographically verified and never shared.
                All sessions are encrypted and secure.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-muted-foreground text-xs text-center mt-6">
          By logging in, you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms
          </a>{" "}
          &amp;{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}
