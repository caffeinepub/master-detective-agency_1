import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  Eye,
  Fingerprint,
  Search,
  Shield,
  Star,
  UserSearch,
  Users,
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
      "Comprehensive background checks for individuals and organizations. Employment history, criminal records, and identity verification.",
  },
  {
    icon: UserSearch,
    title: "Personal Investigation",
    description:
      "Discreet personal investigations handled with utmost confidentiality. Surveillance, fact-finding, and evidence collection.",
  },
  {
    icon: Building2,
    title: "Corporate Investigation",
    description:
      "Protecting your business from fraud, misconduct, and espionage. Thorough corporate due diligence and internal investigations.",
  },
  {
    icon: Search,
    title: "Missing Person Tracking",
    description:
      "Specialized in locating missing persons using advanced investigative techniques and a nationwide network.",
  },
  {
    icon: Shield,
    title: "Asset Investigation",
    description:
      "Locate hidden assets and conduct thorough financial investigations for legal proceedings and divorce cases.",
  },
  {
    icon: Eye,
    title: "Surveillance Services",
    description:
      "Professional covert and overt surveillance using state-of-the-art equipment and experienced field operatives.",
  },
];

const values = [
  {
    icon: Shield,
    title: "Confidentiality",
    description:
      "All cases handled with absolute discretion and protected under strict NDA.",
  },
  {
    icon: Star,
    title: "Expertise",
    description:
      "20+ years of experience with certified investigators and forensic specialists.",
  },
  {
    icon: Eye,
    title: "Discretion",
    description:
      "Silent operations ensuring your privacy is maintained throughout every investigation.",
  },
  {
    icon: ChevronRight,
    title: "Results",
    description:
      "98% case resolution rate with actionable intelligence and court-admissible evidence.",
  },
];

const caseStudies = [
  {
    id: "CS-2024-001",
    title: "Corporate Espionage Uncovered",
    category: "Corporate Investigation",
    summary:
      "A Fortune 500 client suspected internal data theft. Our team conducted a 3-week covert operation, identifying the perpetrator and recovering stolen intellectual property.",
    result: "Successful Prosecution",
  },
  {
    id: "CS-2024-002",
    title: "Missing Executive Located",
    category: "Missing Person",
    summary:
      "A family retained us when their elderly father went missing. Within 72 hours, our operatives located the individual safe in an undisclosed location.",
    result: "Person Found Safe",
  },
  {
    id: "CS-2024-003",
    title: "Insurance Fraud Exposed",
    category: "Background Verification",
    summary:
      "Working with a major insurer, we surveilled a claimant across multiple states, gathering video evidence of fraudulent disability claims worth $2.3 million.",
    result: "Fraud Prevented",
  },
];

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="Master Detective – Professional Detective Agency"
        description="Elite investigative services. Background checks, personal and corporate investigations, missing persons, surveillance. Confidential, professional, results-driven."
      />
      <Navbar />

      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center pt-16"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.05 0 0) 0%, oklch(0.08 0.01 240) 50%, oklch(0.05 0 0) 100%)",
        }}
      >
        {/* Background Image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/assets/generated/hero-noir-cityscape.dim_1920x1080.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        {/* Red corner accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-3 py-1 mb-6">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-xs uppercase tracking-widest font-semibold">
                Professional Detective Agency
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tight text-foreground mb-6">
              Unearthing
              <br />
              <span className="text-primary">Truth.</span>
              <br />
              Delivering
              <br />
              Justice.
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              Elite investigative services delivered with absolute
              confidentiality. Over 20 years of experience. Over 5,000 cases
              resolved.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button
                  data-ocid="hero.primary_button"
                  size="lg"
                  className="detective-btn-primary w-full sm:w-auto gap-2"
                >
                  Request a Case
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  data-ocid="hero.secondary_button"
                  size="lg"
                  variant="outline"
                  className="detective-btn-outline w-full sm:w-auto"
                >
                  Our Services
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/50">
              {[
                { label: "Cases Solved", value: "5,000+" },
                { label: "Years Active", value: "20+" },
                { label: "Success Rate", value: "98%" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-xs uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 border border-border px-3 py-1 mb-4">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span className="text-muted-foreground text-xs uppercase tracking-widest">
                What We Do
              </span>
            </div>
            <h2 className="section-heading">Services</h2>
            <div className="w-12 h-0.5 bg-primary mx-auto mt-3" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="detective-card p-6 group cursor-pointer"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 border border-primary/30 bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-foreground font-bold uppercase tracking-wider text-sm mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link to="/services">
                  <button
                    type="button"
                    className="detective-btn-outline py-1.5 px-4 text-xs flex items-center gap-1 group-hover:border-primary group-hover:text-primary"
                  >
                    Learn More
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agency Values */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 border border-primary/30 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <val.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-foreground font-black uppercase tracking-widest text-sm mb-2">
                  {val.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 border border-border px-3 py-1 mb-4">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span className="text-muted-foreground text-xs uppercase tracking-widest">
                Our Work
              </span>
            </div>
            <h2 className="section-heading">Case Studies</h2>
            <div className="w-12 h-0.5 bg-primary mx-auto mt-3" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {caseStudies.map((cs, idx) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-border p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-primary text-xs font-mono">
                    {cs.id}
                  </span>
                  <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 uppercase tracking-wider">
                    {cs.category}
                  </span>
                </div>
                <h3 className="text-foreground font-bold text-sm uppercase tracking-wide mb-3">
                  {cs.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {cs.summary}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-emerald-400 text-xs uppercase tracking-wider">
                    {cs.result}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/case-studies">
              <Button
                data-ocid="casestudies.primary_button"
                variant="outline"
                className="detective-btn-outline"
              >
                View All Case Studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary/10 border-y border-primary/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-heading mb-4">Ready to Uncover the Truth?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Contact our team today for a confidential consultation. All
            inquiries handled with complete discretion.
          </p>
          <Link to="/contact">
            <Button
              data-ocid="cta.primary_button"
              size="lg"
              className="detective-btn-primary"
            >
              Start Your Investigation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingButtons whatsapp="+1234567890" phone="+1234567890" />
    </div>
  );
}
