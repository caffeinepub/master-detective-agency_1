import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { FloatingButtons } from "../components/FloatingButtons";
import { Footer } from "../components/Footer";
import { MetaTags } from "../components/MetaTags";
import { Navbar } from "../components/Navbar";
import { useSubmitInquiry } from "../hooks/useQueries";

export function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitInquiry = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitInquiry.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `[Service: ${form.service || "General"}] ${form.message}`,
      });
      setSubmitted(true);
      toast.success(
        "Inquiry submitted successfully! We'll contact you within 24 hours.",
      );
    } catch {
      toast.error("Failed to submit inquiry. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MetaTags
        title="Contact | Master Detective Agency"
        description="Contact Master Detective Agency for a confidential consultation. Submit your inquiry and we will respond within 24 hours."
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
                Get In Touch
              </span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tight text-foreground mb-4">
              Contact Us
            </h1>
            <div className="w-16 h-0.5 bg-primary mb-6" />
            <p className="text-muted-foreground text-lg max-w-2xl">
              All inquiries handled with complete discretion. We typically
              respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-foreground font-bold uppercase tracking-wider text-sm mb-6">
                Contact Information
              </h2>
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+1 (800) 555-DETECTIVE",
                  href: "tel:+18005553384",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "info@masterdetective.agency",
                  href: "mailto:info@masterdetective.agency",
                },
                {
                  icon: MapPin,
                  label: "Address",
                  value: "221B Baker Street, London",
                  href: "#",
                },
                {
                  icon: Clock,
                  label: "Hours",
                  value: "24/7 Emergency Line Available",
                  href: "#",
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-0.5">
                      {label}
                    </div>
                    <div className="text-foreground text-sm">{value}</div>
                  </div>
                </a>
              ))}

              <div className="mt-8 p-4 border border-primary/20 bg-primary/5">
                <div className="text-primary text-xs uppercase tracking-widest font-semibold mb-2">
                  Confidentiality Guarantee
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  All communications are encrypted and held in strict
                  confidence. Your inquiry will never be shared with third
                  parties.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border border-emerald-800 p-8 text-center"
                  data-ocid="contact.success_state"
                >
                  <div className="w-16 h-16 bg-emerald-900/40 border border-emerald-700 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-7 w-7 text-emerald-400" />
                  </div>
                  <h3 className="text-foreground font-bold uppercase tracking-wider text-lg mb-2">
                    Inquiry Received
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. A senior investigator will
                    contact you within 24 hours. Your communication is
                    completely confidential.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-card border border-border p-8 space-y-5"
                  data-ocid="contact.modal"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                        Full Name *
                      </Label>
                      <Input
                        data-ocid="contact.input"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                        className="bg-background border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                        Email Address *
                      </Label>
                      <Input
                        data-ocid="contact.input"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                        className="bg-background border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                        Phone Number
                      </Label>
                      <Input
                        data-ocid="contact.input"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="bg-background border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                        Service Required
                      </Label>
                      <Select
                        onValueChange={(v) => setForm({ ...form, service: v })}
                      >
                        <SelectTrigger
                          data-ocid="contact.select"
                          className="bg-background border-border"
                        >
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="background">
                            Background Verification
                          </SelectItem>
                          <SelectItem value="personal">
                            Personal Investigation
                          </SelectItem>
                          <SelectItem value="corporate">
                            Corporate Investigation
                          </SelectItem>
                          <SelectItem value="missing">
                            Missing Person Tracking
                          </SelectItem>
                          <SelectItem value="surveillance">
                            Surveillance Services
                          </SelectItem>
                          <SelectItem value="asset">
                            Asset Investigation
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                      Your Message *
                    </Label>
                    <Textarea
                      data-ocid="contact.textarea"
                      placeholder="Briefly describe your situation (all details kept strictly confidential)..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      required
                      rows={5}
                      className="bg-background border-border focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    data-ocid="contact.submit_button"
                    disabled={submitInquiry.isPending}
                    className="detective-btn-primary w-full gap-2"
                  >
                    {submitInquiry.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />{" "}
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Submit Confidential Inquiry
                      </>
                    )}
                  </Button>

                  <p className="text-muted-foreground text-xs text-center">
                    By submitting this form, you agree to our Privacy Policy.
                    All information is kept strictly confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons whatsapp="+1234567890" phone="+1234567890" />
    </div>
  );
}
