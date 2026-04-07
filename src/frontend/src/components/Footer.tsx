import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const currentYear = new Date().getFullYear();

const socialIcons = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Linkedin, label: "LinkedIn" },
];

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Background Verification", to: "/services" },
      { label: "Personal Investigation", to: "/services" },
      { label: "Corporate Investigation", to: "/services" },
      { label: "Missing Person Tracking", to: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Gallery", to: "/gallery" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[oklch(0.09_0_0)] border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/detective-logo-transparent.dim_200x200.png"
                alt="Master Detective"
                className="h-10 w-10 object-contain"
              />
              <div>
                <div className="text-foreground font-black uppercase tracking-wider text-sm">
                  Master Detective
                </div>
                <div className="text-muted-foreground text-[10px] uppercase tracking-widest">
                  Professional Agency
                </div>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              A trusted professional detective agency with decades of experience
              in legal investigative services. Confidentiality, expertise, and
              results.
            </p>
            {/* Contact */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (800) 555-DETECTIVE</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@masterdetective.agency</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>221B Baker Street, London</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-foreground font-bold uppercase tracking-widest text-xs mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="border-t border-border bg-[oklch(0.07_0_0)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-muted-foreground text-xs text-center leading-relaxed">
            ⚠️ <strong className="text-foreground/70">Legal Disclaimer:</strong>{" "}
            This platform is intended for legal investigative services only. Any
            misuse, unauthorized tracking, or illegal activity is strictly
            prohibited. All data is handled under applicable laws.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-muted-foreground text-xs">
            &copy; {currentYear} Master Detective Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {socialIcons.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="https://masterdetective.agency"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <span className="text-muted-foreground/50 text-xs">|</span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground text-xs hover:text-primary transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
