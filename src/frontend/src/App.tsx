import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { AboutPage } from "./pages/AboutPage";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { ContactPage } from "./pages/ContactPage";
import { FaqPage } from "./pages/FaqPage";
import { GalleryPage } from "./pages/GalleryPage";
// Public pages
import { HomePage } from "./pages/HomePage";
import { PrivacyPage, TermsPage } from "./pages/LegalPages";
import { LoginPage } from "./pages/LoginPage";
import { ServicesPage } from "./pages/ServicesPage";

// Admin pages
import { AdminLayout } from "./components/AdminLayout";
import { AdminCasesPage } from "./pages/admin/AdminCasesPage";
import { AdminClientsPage } from "./pages/admin/AdminClientsPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminInquiriesPage } from "./pages/admin/AdminInquiriesPage";
import { AdminLogsPage } from "./pages/admin/AdminLogsPage";
import { AdminMediaPage } from "./pages/admin/AdminMediaPage";
import { AdminSettingsPage } from "./pages/admin/AdminSettingsPage";
import { AdminStaffPage } from "./pages/admin/AdminStaffPage";

// Client pages
import { ClientLayout } from "./components/ClientLayout";
import { ClientCasesPage } from "./pages/client/ClientCasesPage";
import { ClientDocumentsPage } from "./pages/client/ClientDocumentsPage";

import { UserRole } from "./backend";
// Auth
import { ProtectedRoute } from "./components/ProtectedRoute";

// ─── Route Tree ──────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster
        theme="dark"
        toastOptions={{
          classNames: {
            toast:
              "bg-card border border-border text-foreground font-montserrat",
            title: "text-foreground font-semibold",
            description: "text-muted-foreground",
          },
        }}
      />
    </>
  ),
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesPage,
});
const caseStudiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/case-studies",
  component: CaseStudiesPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});
const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: GalleryPage,
});
const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/faq",
  component: FaqPage,
});
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: PrivacyPage,
});
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: TermsPage,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// Admin layout route
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <ProtectedRoute requiredRole={UserRole.admin}>
      <AdminLayout />
    </ProtectedRoute>
  ),
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/",
  component: AdminDashboardPage,
});

const adminCasesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/cases",
  component: AdminCasesPage,
});

const adminClientsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/clients",
  component: AdminClientsPage,
});

const adminStaffRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/staff",
  component: AdminStaffPage,
});

const adminInquiriesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/inquiries",
  component: AdminInquiriesPage,
});

const adminMediaRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/media",
  component: AdminMediaPage,
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/settings",
  component: AdminSettingsPage,
});

const adminLogsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/logs",
  component: AdminLogsPage,
});

// Client layout route
const clientLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/client",
  component: () => (
    <ProtectedRoute requiredRole={UserRole.user}>
      <ClientLayout />
    </ProtectedRoute>
  ),
});

const clientIndexRoute = createRoute({
  getParentRoute: () => clientLayoutRoute,
  path: "/",
  component: ClientCasesPage,
});

const clientDocumentsRoute = createRoute({
  getParentRoute: () => clientLayoutRoute,
  path: "/documents",
  component: ClientDocumentsPage,
});

// ─── Router ───────────────────────────────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  servicesRoute,
  caseStudiesRoute,
  contactRoute,
  galleryRoute,
  faqRoute,
  privacyRoute,
  termsRoute,
  loginRoute,
  adminLayoutRoute.addChildren([
    adminIndexRoute,
    adminCasesRoute,
    adminClientsRoute,
    adminStaffRoute,
    adminInquiriesRoute,
    adminMediaRoute,
    adminSettingsRoute,
    adminLogsRoute,
  ]),
  clientLayoutRoute.addChildren([clientIndexRoute, clientDocumentsRoute]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
