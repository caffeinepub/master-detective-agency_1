import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Award, Clock, Eye, Shield, Target, Users } from "lucide-react";
import { motion } from "motion/react";
import { FloatingButtons } from "../components/FloatingButtons";
import { Footer } from "../components/Footer";
import { MetaTags } from "../components/MetaTags";
import { Navbar } from "../components/Navbar";

const teamMembers = [
  {
    name: "Richard Hawthorne",
    title: "Chief Investigator",
    experience: "22 Years",
    specialization: "Corporate Espionage & Financial Fraud",
  },
  {
    name: "Elena Vasquez",
    title: "Senior Field Operative",
    experience: "15 Years",
    specialization: "Surveillance & Missing Persons",
  },
  {
    name: "Marcus Chen",
    title: "Digital Forensics Specialist",
    experience: "12 Years",
    specialization: "Cyber Investigation & Data Recovery",
  },
  {
    name: "Sarah Mitchell",
    title: "Background Verification Lead",
    experience: "10 Years",
    specialization: "Identity Verification & Due Diligence",
  },
];

const milestones = [
  {
    year: "2001",
    event: "Agency Founded",
    description:
      "Established with a team of 3 former law enforcement officers.",
  },
  {
    year: "2008",
    event: "Digital Division",
    description: "Expanded into cyber forensics and digital investigations.",
  },
  {
    year: "2015",
    event: "National Reach",
    description: "Opened regional offices across 5 major cities.",
  },
  {
    year: "2020",
    event: "5,000 Cases",
    description: "Celebrated our 5,000th successfully resolved investigation.",
  },
  {
    year: "2024",
    event: "Digital Platform",
    description: "Launched secure client portal for real-time case tracking.",
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="About Master Detective Agency"
        description="Founded in 2001, Master Detective Agency has been delivering professional investigative services with absolute confidentiality for over 20 years."
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-card border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 border border-border px-3 py-1 mb-4">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span className="text-muted-foreground text-xs uppercase tracking-widest">
                Our Story
              </span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tight text-foreground mb-4">
              About the Agency
            </h1>
            <div className="w-16 h-0.5 bg-primary mb-6" />
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Founded in 2001, Master Detective Agency has become a trusted name
              in professional investigative services, known for our unwavering
              commitment to truth, justice, and client confidentiality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/assets/generated/about-detectives.dim_800x500.jpg"
                alt="Detective team"
                className="w-full object-cover border border-border"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="section-heading mb-3">Our Mission</h2>
                <div className="w-10 h-0.5 bg-primary mb-4" />
                <p className="text-muted-foreground leading-relaxed">
                  To provide legally compliant, confidential, and results-driven
                  investigative services that empower our clients with the truth
                  they need to make informed decisions and seek justice.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "Licensed & Bonded" },
                  { icon: Eye, label: "Covert Operations" },
                  { icon: Target, label: "Precision Results" },
                  { icon: Award, label: "Industry Certified" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 bg-card border border-border p-3"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-foreground text-xs font-semibold uppercase tracking-wider">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { value: "5000+", label: "Cases" },
                  { value: "20+", label: "Years" },
                  { value: "98%", label: "Success" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center border border-border p-4"
                  >
                    <div className="text-2xl font-black text-primary">
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
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Our History</h2>
            <div className="w-12 h-0.5 bg-primary mx-auto" />
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
            {milestones.map((m, idx) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative flex gap-6 pb-8 last:pb-0"
              >
                <div className="relative z-10 w-16 flex-shrink-0">
                  <div className="w-8 h-8 bg-primary flex items-center justify-center">
                    <Clock className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                  <div className="text-primary text-xs font-mono mt-1 text-center">
                    {m.year}
                  </div>
                </div>
                <div className="flex-1 bg-background border border-border p-4">
                  <div className="text-foreground font-bold uppercase tracking-wider text-sm mb-1">
                    {m.event}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {m.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Our Team</h2>
            <div className="w-12 h-0.5 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="detective-card p-6 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <div className="text-foreground font-bold text-sm mb-1">
                  {member.name}
                </div>
                <div className="text-primary text-xs uppercase tracking-widest mb-2">
                  {member.title}
                </div>
                <div className="text-muted-foreground text-xs">
                  {member.experience} Experience
                </div>
                <div className="text-muted-foreground text-xs mt-1">
                  {member.specialization}
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
