import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle,
  Eye,
  Fingerprint,
  Search,
  Shield,
  UserSearch,
} from "lucide-react";
import { motion } from "motion/react";
import { FloatingButtons } from "../components/FloatingButtons";
import { Footer } from "../components/Footer";
import { MetaTags } from "../components/MetaTags";
import { Navbar } from "../components/Navbar";

const services = [
  {
    icon: Fingerprint,
    title: "Background Verification",
    description:
      "Our comprehensive background verification service covers criminal history, employment verification, identity checks, credit history, and reference verification. We use legally compliant methods to ensure accurate and thorough results.",
    includes: [
      "Criminal record check",
      "Employment history verification",
      "Identity & document authentication",
      "Credit history (with consent)",
      "Reference verification",
      "Address history tracking",
    ],
  },
  {
    icon: UserSearch,
    title: "Personal Investigation",
    description:
      "Discreet personal investigations for individuals seeking truth in sensitive situations. Whether it's infidelity concerns, custody disputes, or personal matters, our team conducts covert surveillance and fact-finding operations.",
    includes: [
      "Covert surveillance",
      "Activity monitoring",
      "Evidence collection (court-admissible)",
      "Behavioral analysis",
      "Location tracking (legal)",
      "Detailed investigation reports",
    ],
  },
  {
    icon: Building2,
    title: "Corporate Investigation",
    description:
      "Protect your business from internal fraud, corporate espionage, and misconduct. We conduct thorough investigations for due diligence, employee misconduct, IP theft, and competitive intelligence.",
    includes: [
      "Employee misconduct investigation",
      "Corporate espionage detection",
      "Intellectual property theft",
      "Vendor due diligence",
      "Fraud investigation",
      "Whistleblower case management",
    ],
  },
  {
    icon: Search,
    title: "Missing Person Tracking",
    description:
      "Our specialized missing persons unit combines traditional investigative techniques with advanced digital tools to locate missing individuals. We work closely with families and legal authorities.",
    includes: [
      "Family member location",
      "Witness location",
      "Debtor tracing",
      "Runaway tracking",
      "Digital footprint analysis",
      "Coordination with authorities",
    ],
  },
  {
    icon: Shield,
    title: "Asset Investigation",
    description:
      "Uncover hidden assets and conduct financial investigations for legal proceedings. Our asset investigation services are particularly valuable in divorce cases, business disputes, and litigation support.",
    includes: [
      "Hidden asset discovery",
      "Property & real estate search",
      "Bank account tracing",
      "Business ownership investigation",
      "Offshore account detection",
      "Litigation support",
    ],
  },
  {
    icon: Eye,
    title: "Surveillance Services",
    description:
      "Professional surveillance services using state-of-the-art equipment and experienced field operatives. We provide both covert and overt surveillance with full documentation and reporting.",
    includes: [
      "Static & mobile surveillance",
      "Video & photo documentation",
      "Counter-surveillance",
      "Event monitoring",
      "GPS tracking (legal)",
      "Comprehensive surveillance reports",
    ],
  },
];

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="Services | Master Detective Agency"
        description="Professional detective agency services: background verification, personal investigation, corporate investigation, missing person tracking, surveillance, and asset investigation."
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-card border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 border border-border px-3 py-1 mb-4">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span className="text-muted-foreground text-xs uppercase tracking-widest">
                What We Offer
              </span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tight text-foreground mb-4">
              Our Services
            </h1>
            <div className="w-16 h-0.5 bg-primary mb-6" />
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Comprehensive investigative services tailored to your needs. All
              operations conducted within legal frameworks with full
              confidentiality guarantees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-card border border-border p-8 hover:border-primary transition-colors group"
                data-ocid={`services.item.${idx + 1}`}
              >
                <div className="lg:col-span-2">
                  <div className="w-14 h-14 border border-primary/30 bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-foreground font-black uppercase tracking-wider text-lg mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <Link to="/contact" className="mt-4 inline-block">
                    <Button
                      size="sm"
                      className="detective-btn-primary text-xs mt-2"
                    >
                      Request This Service
                    </Button>
                  </Link>
                </div>

                <div className="lg:col-span-3">
                  <div className="text-muted-foreground text-xs uppercase tracking-widest mb-3 font-semibold">
                    What's Included:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.includes.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        <span className="text-foreground text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons whatsapp="+1234567890" phone="+1234567890" />
    </div>
  );
}
