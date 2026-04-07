# Master Detective Agency

## Current State
- Full detective agency platform with admin dashboard, public pages (Home, About, Services, Gallery, FAQ, Contact, Case Studies, Legal), client portal
- AdminDashboardPage has color contrast issues - some elements are hard to read (muted-foreground on dark cards)
- Admin dashboard lacks any website content management - no way to edit homepage hero text, services, cards, about page content, gallery images, footer/navbar links, etc.
- All public-facing content is hardcoded in React component files

## Requested Changes (Diff)

### Add
- **AdminWebsiteEditorPage** (`/admin/website`): A full website content management panel with tabs for:
  - **Home Page**: Edit hero headline, subheadline, stats (Cases Solved, Years Active, Success Rate), CTA button text, case studies preview cards, services section title
  - **Services**: Edit each service card (title, description) - 6 services
  - **About Page**: Edit agency story text, team members (name, title, experience, specialization), milestones
  - **Gallery**: Upload/manage gallery images (using blob storage), add/remove photo labels
  - **FAQ**: Add/edit/delete FAQ questions and answers
  - **Contact Info**: Edit phone, email, address, WhatsApp number, call number shown in footer and floating buttons
  - **Navbar/Footer**: Edit nav links labels, footer tagline, social media links, legal disclaimer text
- New sidebar nav item "Website Editor" with Globe/Layout icon in AdminLayout
- New route `/admin/website` in main.tsx
- Backend: Add `WebsiteContent` type and `getWebsiteContent` / `updateWebsiteContent` Motoko functions covering all editable sections

### Modify
- **AdminDashboardPage**: Fix color contrast - ensure stat card numbers, labels, summary row text, table headers all use `text-foreground` instead of low-contrast colors. Fix muted text that's hard to read.
- **AdminLayout**: Add "Website Editor" nav item with Globe icon between Settings and Activity Logs
- **main.tsx**: Add `adminWebsiteRoute` for the new page

### Remove
- Nothing removed

## Implementation Plan
1. Fix dashboard color contrast in AdminDashboardPage - change low-visibility text to higher contrast variants
2. Create `AdminWebsiteEditorPage` with tabbed interface (Home, Services, About, Gallery, FAQ, Contact, Nav/Footer)
3. Each tab has edit forms with save buttons; uses existing `useUpdateSettings` pattern for backend calls or local state with save
4. Gallery tab integrates blob-storage upload (already available via MixinStorage)
5. Add Globe icon + "Website" nav item to AdminLayout navItems array
6. Add route + import in main.tsx
7. Backend: extend SiteSettings or add new WebsiteContent storage for the editable fields
