import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { useState } from "react";
import { FloatingButtons } from "../components/FloatingButtons";
import { Footer } from "../components/Footer";
import { MetaTags } from "../components/MetaTags";
import { Navbar } from "../components/Navbar";

const caseStudies = [
  {
    id: "CS-2024-001",
    title: "Corporate Espionage Uncovered at Tech Firm",
    category: "Corporate Investigation",
    duration: "3 weeks",
    outcome: "Successful Prosecution",
    description:
      "A Fortune 500 technology company suspected one of their senior developers was leaking proprietary source code to a competitor. Our team deployed a multi-pronged approach combining digital forensics, covert surveillance, and document analysis. We identified the perpetrator and documented over 200 instances of unauthorized data transfers.",
    result:
      "Evidence package delivered. The employee was terminated and subsequently prosecuted. The client recovered stolen IP valued at over $4.2 million.",
    tags: ["Digital Forensics", "Surveillance", "Corporate"],
  },
  {
    id: "CS-2024-002",
    title: "Missing Executive Located Within 72 Hours",
    category: "Missing Person",
    duration: "72 hours",
    outcome: "Person Found Safe",
    description:
      "A family retained us when their 68-year-old father, a retired executive, went missing from his home in Miami. Our missing persons unit immediately began cross-referencing last known locations, bank transactions, and digital footprints. We coordinated with local authorities while conducting independent field operations.",
    result:
      "The individual was located safe and well at a private facility in Georgia. Reunited with family within 4 days of initial contact.",
    tags: ["Missing Persons", "Field Operations", "Digital Trace"],
  },
  {
    id: "CS-2024-003",
    title: "$2.3M Insurance Fraud Investigation",
    category: "Background Verification",
    duration: "6 weeks",
    outcome: "Fraud Prevented",
    description:
      "A major insurance company retained us to investigate a disability claimant receiving $18,000/month. The claimant alleged complete physical incapacity. Our surveillance team monitored the subject across three states, documenting extensive physical activities inconsistent with the claimed disability.",
    result:
      "Video evidence package submitted. The claimant's benefits were terminated, and the insurer saved over $2.3 million in fraudulent payouts. Criminal charges were filed.",
    tags: ["Surveillance", "Insurance Fraud", "Evidence Collection"],
  },
  {
    id: "CS-2023-089",
    title: "Custody Dispute Evidence Collection",
    category: "Personal Investigation",
    duration: "4 weeks",
    outcome: "Court-Admissible Evidence",
    description:
      "During a contentious custody battle, our client needed documentation of their ex-spouse's lifestyle and parenting behavior. We conducted lawful surveillance and gathered extensive documentation of behavior directly relevant to child welfare arguments in court.",
    result:
      "Evidence package accepted by the family court. Our client was awarded primary custody. All evidence collected within strict legal guidelines.",
    tags: ["Surveillance", "Legal Support", "Family Court"],
  },
  {
    id: "CS-2023-156",
    title: "Employee Background Fraud Discovery",
    category: "Background Verification",
    duration: "2 weeks",
    outcome: "Candidate Disqualified",
    description:
      "A financial institution hired us to verify credentials of a C-suite candidate. Standard verification checks revealed inconsistencies. Our deep-dive investigation uncovered fabricated degrees, falsified employment history, and a previously undisclosed criminal record from another country.",
    result:
      "The candidate was disqualified before hiring. The client avoided potential regulatory exposure and reputational damage.",
    tags: ["Background Check", "Financial Sector", "Credential Verification"],
  },
  {
    id: "CS-2023-201",
    title: "Hidden Assets Located in Divorce Case",
    category: "Asset Investigation",
    duration: "8 weeks",
    outcome: "$1.8M Assets Discovered",
    description:
      "Our client, in divorce proceedings, suspected their spouse of hiding assets through shell companies and offshore accounts. Our financial investigation team traced money movements across 6 jurisdictions, identifying previously undisclosed real estate holdings, business interests, and offshore accounts.",
    result:
      "Over $1.8 million in hidden assets identified and reported to the court. Our client received a significantly improved settlement.",
    tags: ["Asset Investigation", "Financial Forensics", "Divorce Support"],
  },
];

const categories = [
  "All",
  "Corporate Investigation",
  "Missing Person",
  "Background Verification",
  "Personal Investigation",
  "Asset Investigation",
];

export function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="Case Studies | Master Detective Agency"
        description="Real-world case studies from Master Detective Agency. Corporate espionage, missing persons, fraud investigations, and more."
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
                Proven Results
              </span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tight text-foreground mb-4">
              Case Studies
            </h1>
            <div className="w-16 h-0.5 bg-primary mb-6" />
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Real investigations. Real results. All identifying details have
              been changed to protect client confidentiality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10" data-ocid="cases.tab">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                data-ocid="cases.tab"
                className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent border-border text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((cs, idx) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-card border border-border p-6 hover:border-primary transition-colors"
                data-ocid={`cases.item.${idx + 1}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-primary text-xs font-mono mb-1">
                      {cs.id}
                    </div>
                    <h3 className="text-foreground font-bold uppercase tracking-wide text-sm">
                      {cs.title}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <div className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1 uppercase tracking-wider text-center">
                      {cs.category}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {cs.description}
                </p>

                <div className="bg-background/50 border border-border p-3 mb-4">
                  <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                    Outcome:
                  </div>
                  <div className="text-foreground text-sm">{cs.result}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {cs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-muted/50 text-muted-foreground border border-border px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    {cs.outcome}
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
