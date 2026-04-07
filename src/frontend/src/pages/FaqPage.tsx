import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FloatingButtons } from "../components/FloatingButtons";
import { Footer } from "../components/Footer";
import { MetaTags } from "../components/MetaTags";
import { Navbar } from "../components/Navbar";

const faqs = [
  {
    q: "Is my inquiry kept confidential?",
    a: "Absolutely. All communications with our agency are protected under strict NDA and legal privilege. No information about your inquiry is ever shared with third parties without your explicit consent.",
  },
  {
    q: "How do I know if what I need is legal?",
    a: "All our services are conducted strictly within legal frameworks. During your initial consultation, we will advise you on what we can legally and ethically do in your jurisdiction. We do not engage in any unauthorized surveillance or illegal activity.",
  },
  {
    q: "How long does an investigation typically take?",
    a: "Investigation duration varies significantly by case type. Background verifications typically take 3-7 business days. Surveillance operations may take 2-6 weeks. Complex corporate investigations can take 2-3 months. We provide timeline estimates during the initial consultation.",
  },
  {
    q: "What happens to my evidence after the investigation?",
    a: "All evidence is securely stored and handed over exclusively to you. We maintain encrypted backups for 12 months for legal proceedings, then permanently delete all data. You retain full ownership of all evidence collected.",
  },
  {
    q: "Can the evidence be used in court?",
    a: "Yes. We specialize in collecting court-admissible evidence that meets all legal standards. Our investigators follow strict protocols to ensure the chain of custody is maintained and evidence is legally obtained.",
  },
  {
    q: "Do you offer free consultations?",
    a: "We offer a complimentary 30-minute initial consultation via phone or secure video call. During this consultation, we assess your situation, explain what we can do, and provide a transparent fee estimate.",
  },
  {
    q: "What areas do you cover?",
    a: "We operate nationally with offices in major cities. For international cases, we work with a network of vetted partner agencies in over 40 countries. Contact us to discuss your specific geographic requirements.",
  },
  {
    q: "How are fees structured?",
    a: "Our fees vary by service type and complexity. We offer both hourly rates and fixed-price packages depending on the investigation scope. We provide detailed, transparent quotes before any work begins — no hidden fees.",
  },
  {
    q: "Can you investigate without the subject knowing?",
    a: "Yes. Covert investigation is a core competency of our agency. All covert operations are conducted by experienced operatives using legal surveillance methods. We ensure complete operational security.",
  },
  {
    q: "What if I just need a quick background check?",
    a: "We offer tiered background check packages starting from basic identity verification to comprehensive deep-dive checks. These can often be completed within 24-72 hours.",
  },
];

export function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="FAQ | Master Detective Agency"
        description="Frequently asked questions about Master Detective Agency's investigative services, pricing, confidentiality, and legal compliance."
      />
      <Navbar />

      <section className="relative pt-24 pb-16 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-black uppercase tracking-tight text-foreground mb-4">
              FAQ
            </h1>
            <div className="w-16 h-0.5 bg-primary mb-4" />
            <p className="text-muted-foreground text-lg">
              Answers to your most common questions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="border border-border hover:border-primary/50 transition-colors"
                data-ocid={`faq.item.${idx + 1}`}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  aria-expanded={openIdx === idx}
                >
                  <span className="text-foreground font-semibold text-sm pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                      openIdx === idx ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 border-t border-border">
                        <p className="text-muted-foreground text-sm leading-relaxed pt-3">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons whatsapp="+1234567890" phone="+1234567890" />
    </div>
  );
}
