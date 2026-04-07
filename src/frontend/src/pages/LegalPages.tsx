import { Footer } from "../components/Footer";
import { MetaTags } from "../components/MetaTags";
import { Navbar } from "../components/Navbar";

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <MetaTags title="Privacy Policy | Master Detective Agency" />
      <Navbar />

      <section className="relative pt-24 pb-16 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black uppercase tracking-tight text-foreground mb-4">
            Privacy Policy
          </h1>
          <div className="w-16 h-0.5 bg-primary mb-4" />
          <p className="text-muted-foreground">Last updated: January 2024</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert max-w-none">
          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
            {[
              {
                title: "1. Information We Collect",
                content:
                  "We collect information you provide directly to us when you submit an inquiry, create an account, or use our services. This includes your name, email address, phone number, and the details of your case or inquiry. We may also collect technical information such as IP addresses and browser data for security purposes.",
              },
              {
                title: "2. How We Use Your Information",
                content:
                  "We use the information we collect to provide, maintain, and improve our investigative services; communicate with you about your case; send you security alerts and administrative messages; and comply with legal obligations. We do not sell, trade, or rent your personal information to third parties.",
              },
              {
                title: "3. Information Security",
                content:
                  "We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit and at rest. Our team is bound by strict confidentiality agreements.",
              },
              {
                title: "4. Data Retention",
                content:
                  "We retain your information only as long as necessary to provide our services and comply with legal obligations. Case files are retained for 12 months after case closure for legal proceedings, then permanently deleted. Inquiry data is retained for 6 months.",
              },
              {
                title: "5. Your Rights",
                content:
                  "You have the right to access, correct, or delete your personal information. You may also object to or restrict our processing of your information. To exercise these rights, contact us at privacy@masterdetective.agency.",
              },
              {
                title: "6. Cookies",
                content:
                  "We use essential cookies to maintain your session and security. We do not use tracking or advertising cookies. You can control cookie preferences through your browser settings.",
              },
              {
                title: "7. Contact Us",
                content:
                  "If you have questions about this Privacy Policy, please contact our Data Protection Officer at: privacy@masterdetective.agency or Master Detective Agency, 221B Baker Street, London.",
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="text-foreground font-bold uppercase tracking-wider text-sm mb-3">
                  {section.title}
                </h3>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MetaTags title="Terms & Conditions | Master Detective Agency" />
      <Navbar />

      <section className="relative pt-24 pb-16 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black uppercase tracking-tight text-foreground mb-4">
            Terms &amp; Conditions
          </h1>
          <div className="w-16 h-0.5 bg-primary mb-4" />
          <p className="text-muted-foreground">Last updated: January 2024</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
            {[
              {
                title: "1. Acceptance of Terms",
                content:
                  "By accessing or using the Master Detective Agency platform, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, you may not use our services.",
              },
              {
                title: "2. Legal Use Only",
                content:
                  "Our services are intended solely for legal, legitimate investigative purposes. You agree not to use our services for any illegal purpose, including unauthorized surveillance, stalking, harassment, or any activity that violates applicable laws.",
              },
              {
                title: "3. Legal Disclaimer",
                content:
                  "This platform is intended for legal investigative services only. Any misuse, unauthorized tracking, or illegal activity is strictly prohibited and will result in immediate termination of services and potential reporting to law enforcement. All data is handled under applicable laws.",
              },
              {
                title: "4. Client Obligations",
                content:
                  "Clients are responsible for providing accurate and truthful information. Clients must ensure that any investigation requested is legal in their jurisdiction. Clients indemnify the Agency against any claims arising from misrepresentation.",
              },
              {
                title: "5. Confidentiality",
                content:
                  "We maintain strict confidentiality regarding all client matters. All investigators and staff are bound by NDAs. Client information is never shared without explicit written consent or legal requirement.",
              },
              {
                title: "6. Payment & Fees",
                content:
                  "Fees are agreed upon in writing before work commences. A retainer may be required for complex cases. Invoices are payable within 14 days. We reserve the right to suspend services for non-payment.",
              },
              {
                title: "7. Limitation of Liability",
                content:
                  "Our liability is limited to the fees paid for the specific service. We are not liable for indirect, incidental, or consequential damages. We do not guarantee specific outcomes, though we commit to professional best efforts.",
              },
              {
                title: "8. Governing Law",
                content:
                  "These terms are governed by and construed in accordance with applicable law. Any disputes will be subject to the exclusive jurisdiction of the competent courts.",
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="text-foreground font-bold uppercase tracking-wider text-sm mb-3">
                  {section.title}
                </h3>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
