import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { HttpAgent } from "@icp-sdk/core/agent";
import { ImageIcon, Loader2, Plus, Save, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { WebsiteContent } from "../../backend";
import { loadConfig } from "../../config";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import {
  useDeleteMedia,
  useMediaByCategory,
  useSaveMedia,
  useUpdateWebsiteContent,
  useWebsiteContent,
} from "../../hooks/useQueries";
import { StorageClient } from "../../utils/StorageClient";

// ── Default content ───────────────────────────────────────────────────────────
const defaultServices = [
  {
    title: "Background Verification",
    description:
      "Comprehensive background checks on individuals, employees and business partners with verified records.",
  },
  {
    title: "Personal Investigation",
    description:
      "Discreet personal investigations including matrimonial enquiries, infidelity checks and lifestyle surveillance.",
  },
  {
    title: "Corporate Investigation",
    description:
      "Business fraud detection, corporate espionage, intellectual property theft and due diligence services.",
  },
  {
    title: "Missing Person Tracking",
    description:
      "Specialised missing persons search using advanced field operatives and intelligence networks.",
  },
  {
    title: "Asset Investigation",
    description:
      "Locate hidden assets, verify property ownership and trace financial trails for legal proceedings.",
  },
  {
    title: "Surveillance Services",
    description:
      "Expert mobile and static surveillance with photo/video documentation for court-admissible evidence.",
  },
];

const defaultTeamMembers = [
  {
    name: "Rajiv Sharma",
    title: "Chief Detective",
    experience: "22 years",
    specialization: "Corporate Fraud",
  },
  {
    name: "Priya Mehra",
    title: "Senior Investigator",
    experience: "15 years",
    specialization: "Cyber Intelligence",
  },
  {
    name: "Arjun Kapoor",
    title: "Field Operative",
    experience: "10 years",
    specialization: "Surveillance",
  },
  {
    name: "Sunita Rao",
    title: "Forensic Analyst",
    experience: "12 years",
    specialization: "Evidence Analysis",
  },
];

const defaultMilestones = [
  {
    year: "2004",
    event: "Agency Founded",
    description: "Established in Mumbai with 3 founding investigators.",
  },
  {
    year: "2010",
    event: "1000 Cases Solved",
    description:
      "Reached landmark milestone of 1000 successfully closed cases.",
  },
  {
    year: "2018",
    event: "National Expansion",
    description: "Opened offices in Delhi, Bangalore and Hyderabad.",
  },
  {
    year: "2024",
    event: "5000+ Cases",
    description: "Celebrated 20 years with over 5000 resolved investigations.",
  },
];

const defaultFaqs = [
  {
    question: "What types of investigations do you handle?",
    answer:
      "We handle personal, corporate, matrimonial, missing persons, background verification, asset investigation and surveillance assignments.",
  },
  {
    question: "Is my case kept confidential?",
    answer:
      "Absolute confidentiality is our core principle. All case information, client identity and findings are kept strictly private.",
  },
  {
    question: "How long does an investigation take?",
    answer:
      "Timelines vary by case complexity. Simple background checks take 2-5 days; complex investigations may take several weeks.",
  },
  {
    question: "Are your investigators licensed?",
    answer:
      "Yes. All our investigators hold valid licenses under applicable Indian law and have law-enforcement or intelligence backgrounds.",
  },
  {
    question: "What is your success rate?",
    answer:
      "We maintain a 98% case resolution rate across all investigation categories, built over 20 years of field experience.",
  },
];

// ── Helper types ──────────────────────────────────────────────────────────────
interface ServiceItem {
  title: string;
  description: string;
}
interface TeamMember {
  name: string;
  title: string;
  experience: string;
  specialization: string;
}
interface Milestone {
  year: string;
  event: string;
  description: string;
}
interface FaqItem {
  question: string;
  answer: string;
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border p-6 rounded-sm space-y-4">
      <h3 className="text-foreground font-bold uppercase tracking-wider text-sm">
        {title}
      </h3>
      <Separator className="bg-border" />
      {children}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-foreground/70 text-xs uppercase tracking-wider">
        {label}
      </Label>
      {children}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function AdminWebsiteEditorPage() {
  const content = useWebsiteContent();
  const updateContent = useUpdateWebsiteContent();

  // ── Tab 1: Home ──
  const [heroHeadline, setHeroHeadline] = useState(
    "Unearthing Truth. Delivering Justice.",
  );
  const [heroSubheadline, setHeroSubheadline] = useState(
    "Elite investigative services delivered with absolute confidentiality and precision. We find answers others cannot.",
  );
  const [heroCtaText, setHeroCtaText] = useState("Request a Case");
  const [heroStatCases, setHeroStatCases] = useState("5,000+");
  const [heroStatCasesLabel, setHeroStatCasesLabel] = useState("Cases Solved");
  const [heroStatYears, setHeroStatYears] = useState("20+");
  const [heroStatYearsLabel, setHeroStatYearsLabel] = useState("Years Active");
  const [heroStatSuccess, setHeroStatSuccess] = useState("98%");
  const [heroStatSuccessLabel, setHeroStatSuccessLabel] =
    useState("Success Rate");

  // ── Tab 2: Services ──
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);

  // ── Tab 3: About ──
  const [agencyStory, setAgencyStory] = useState(
    "Master Detective Agency was founded in 2004 by a team of former intelligence officers and legal professionals. With over 20 years of experience, we have built a reputation for absolute confidentiality, cutting-edge investigative techniques, and unwavering commitment to justice. Our team of 50+ licensed investigators operates across India with a 98% case resolution rate.",
  );
  const [teamMembers, setTeamMembers] =
    useState<TeamMember[]>(defaultTeamMembers);
  const [milestones, setMilestones] = useState<Milestone[]>(defaultMilestones);

  // ── Tab 5: FAQ ──
  const [faqs, setFaqs] = useState<FaqItem[]>(defaultFaqs);

  // ── Tab 6: Contact ──
  const [contactPhone, setContactPhone] = useState("+91 98765 43210");
  const [contactEmail, setContactEmail] = useState(
    "contact@masterdetective.in",
  );
  const [contactAddress, setContactAddress] = useState(
    "204 Sherlock House, Linking Road, Bandra West, Mumbai 400050",
  );
  const [whatsappNumber, setWhatsappNumber] = useState("+91 98765 43210");
  const [callNumber, setCallNumber] = useState("+91 98765 43210");

  // ── Tab 7: Nav & Footer ──
  const [footerTagline, setFooterTagline] = useState(
    "Professional. Confidential. Results-Driven.",
  );
  const [legalDisclaimer, setLegalDisclaimer] = useState(
    "Master Detective Agency provides legal investigative services only. All investigations are conducted within the bounds of Indian law. Client information is kept strictly confidential.",
  );
  const [socialFacebook, setSocialFacebook] = useState("");
  const [socialTwitter, setSocialTwitter] = useState("");
  const [socialInstagram, setSocialInstagram] = useState("");
  const [socialLinkedin, setSocialLinkedin] = useState("");
  const [footerDescription, setFooterDescription] = useState(
    "Elite detective agency delivering truth, justice and results since 2004.",
  );

  // ── Load from backend ──
  useEffect(() => {
    const d = content.data;
    if (!d) return;
    if (d.heroHeadline) setHeroHeadline(d.heroHeadline);
    if (d.heroSubheadline) setHeroSubheadline(d.heroSubheadline);
    if (d.heroCtaText) setHeroCtaText(d.heroCtaText);
    if (d.heroStatCases) setHeroStatCases(d.heroStatCases);
    if (d.heroStatYears) setHeroStatYears(d.heroStatYears);
    if (d.heroStatSuccess) setHeroStatSuccess(d.heroStatSuccess);
    if (d.agencyStory) setAgencyStory(d.agencyStory);
    if (d.contactPhone) setContactPhone(d.contactPhone);
    if (d.contactEmail) setContactEmail(d.contactEmail);
    if (d.contactAddress) setContactAddress(d.contactAddress);
    if (d.footerTagline) setFooterTagline(d.footerTagline);
    if (d.legalDisclaimer) setLegalDisclaimer(d.legalDisclaimer);
    if (d.socialFacebook) setSocialFacebook(d.socialFacebook);
    if (d.socialTwitter) setSocialTwitter(d.socialTwitter);
    if (d.socialInstagram) setSocialInstagram(d.socialInstagram);
    if (d.socialLinkedin) setSocialLinkedin(d.socialLinkedin);
    try {
      if (d.servicesData) setServices(JSON.parse(d.servicesData));
    } catch {}
    try {
      if (d.teamMembers) setTeamMembers(JSON.parse(d.teamMembers));
    } catch {}
    try {
      if (d.faqItems) setFaqs(JSON.parse(d.faqItems));
    } catch {}
  }, [content.data]);

  const buildPayload = (): WebsiteContent => ({
    heroHeadline,
    heroSubheadline,
    heroCtaText,
    heroStatCases,
    heroStatYears,
    heroStatSuccess,
    agencyStory,
    contactPhone,
    contactEmail,
    contactAddress,
    footerTagline,
    legalDisclaimer,
    socialFacebook,
    socialTwitter,
    socialInstagram,
    socialLinkedin,
    servicesData: JSON.stringify(services),
    teamMembers: JSON.stringify(teamMembers),
    faqItems: JSON.stringify(faqs),
  });

  const handleSave = async () => {
    try {
      await updateContent.mutateAsync(buildPayload());
      toast.success("✅ Website content saved successfully!");
    } catch {
      toast.error("❌ Failed to save. Please try again.");
    }
  };

  const SaveButton = (
    <Button
      type="button"
      onClick={handleSave}
      disabled={updateContent.isPending}
      data-ocid="admin.website.save_button"
      className="detective-btn-primary gap-2 mt-4"
    >
      {updateContent.isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Saving...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" /> 💾 Save Changes
        </>
      )}
    </Button>
  );

  if (content.isLoading) {
    return (
      <div className="space-y-4" data-ocid="admin.website.loading_state">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-12" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8" data-ocid="admin.website.page">
      {/* Header */}
      <div>
        <h2 className="text-foreground font-black uppercase tracking-wider text-xl mb-1">
          🌐 Website Content Editor
        </h2>
        <p className="text-foreground/60 text-sm">
          Edit and update all public-facing website content
        </p>
      </div>

      <Tabs defaultValue="home" data-ocid="admin.website.tab">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-card border border-border p-1 mb-6">
          <TabsTrigger value="home" data-ocid="admin.website.tab">
            🏠 Home
          </TabsTrigger>
          <TabsTrigger value="services" data-ocid="admin.website.tab">
            ⚙️ Services
          </TabsTrigger>
          <TabsTrigger value="about" data-ocid="admin.website.tab">
            🏢 About
          </TabsTrigger>
          <TabsTrigger value="gallery" data-ocid="admin.website.tab">
            📸 Gallery
          </TabsTrigger>
          <TabsTrigger value="faq" data-ocid="admin.website.tab">
            ❓ FAQ
          </TabsTrigger>
          <TabsTrigger value="contact" data-ocid="admin.website.tab">
            📞 Contact
          </TabsTrigger>
          <TabsTrigger value="navfooter" data-ocid="admin.website.tab">
            🌐 Nav & Footer
          </TabsTrigger>
        </TabsList>

        {/* ── Tab 1: Home ── */}
        <TabsContent value="home" className="space-y-4">
          <Section title="🦸 Hero Section">
            <Field label="Headline">
              <Input
                data-ocid="admin.website.input"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="bg-background"
                placeholder="Unearthing Truth. Delivering Justice."
              />
            </Field>
            <Field label="Subheadline">
              <Textarea
                data-ocid="admin.website.textarea"
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                className="bg-background resize-none"
                rows={3}
              />
            </Field>
            <Field label="CTA Button Text">
              <Input
                data-ocid="admin.website.input"
                value={heroCtaText}
                onChange={(e) => setHeroCtaText(e.target.value)}
                className="bg-background"
                placeholder="Request a Case"
              />
            </Field>
          </Section>

          <Section title="📊 Hero Stats">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Field label="Stat 1 Label">
                  <Input
                    data-ocid="admin.website.input"
                    value={heroStatCasesLabel}
                    onChange={(e) => setHeroStatCasesLabel(e.target.value)}
                    className="bg-background"
                    placeholder="Cases Solved"
                  />
                </Field>
                <Field label="Stat 1 Value">
                  <Input
                    data-ocid="admin.website.input"
                    value={heroStatCases}
                    onChange={(e) => setHeroStatCases(e.target.value)}
                    className="bg-background"
                    placeholder="5,000+"
                  />
                </Field>
              </div>
              <div className="space-y-2">
                <Field label="Stat 2 Label">
                  <Input
                    data-ocid="admin.website.input"
                    value={heroStatYearsLabel}
                    onChange={(e) => setHeroStatYearsLabel(e.target.value)}
                    className="bg-background"
                    placeholder="Years Active"
                  />
                </Field>
                <Field label="Stat 2 Value">
                  <Input
                    data-ocid="admin.website.input"
                    value={heroStatYears}
                    onChange={(e) => setHeroStatYears(e.target.value)}
                    className="bg-background"
                    placeholder="20+"
                  />
                </Field>
              </div>
              <div className="space-y-2">
                <Field label="Stat 3 Label">
                  <Input
                    data-ocid="admin.website.input"
                    value={heroStatSuccessLabel}
                    onChange={(e) => setHeroStatSuccessLabel(e.target.value)}
                    className="bg-background"
                    placeholder="Success Rate"
                  />
                </Field>
                <Field label="Stat 3 Value">
                  <Input
                    data-ocid="admin.website.input"
                    value={heroStatSuccess}
                    onChange={(e) => setHeroStatSuccess(e.target.value)}
                    className="bg-background"
                    placeholder="98%"
                  />
                </Field>
              </div>
            </div>
          </Section>
          {SaveButton}
        </TabsContent>

        {/* ── Tab 2: Services ── */}
        <TabsContent value="services" className="space-y-4">
          <Section title="⚙️ Services List">
            <div className="space-y-4">
              {services.map((svc, idx) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: editable list with stable index
                  key={idx}
                  className="border border-border/60 bg-background/40 p-4 rounded-sm space-y-3"
                  data-ocid={`admin.website.item.${idx + 1}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60 text-xs uppercase tracking-wider font-semibold">
                      Service {idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setServices((prev) => prev.filter((_, i) => i !== idx))
                      }
                      data-ocid={`admin.website.delete_button.${idx + 1}`}
                      className="p-1.5 bg-red-900/30 hover:bg-red-900/60 text-red-400 rounded transition-colors"
                      title="Remove service"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <Field label="Service Title">
                    <Input
                      data-ocid="admin.website.input"
                      value={svc.title}
                      onChange={(e) =>
                        setServices((prev) =>
                          prev.map((s, i) =>
                            i === idx ? { ...s, title: e.target.value } : s,
                          ),
                        )
                      }
                      className="bg-background"
                    />
                  </Field>
                  <Field label="Service Description">
                    <Textarea
                      data-ocid="admin.website.textarea"
                      value={svc.description}
                      onChange={(e) =>
                        setServices((prev) =>
                          prev.map((s, i) =>
                            i === idx
                              ? { ...s, description: e.target.value }
                              : s,
                          ),
                        )
                      }
                      className="bg-background resize-none"
                      rows={2}
                    />
                  </Field>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setServices((prev) => [
                  ...prev,
                  { title: "New Service", description: "" },
                ])
              }
              data-ocid="admin.website.primary_button"
              className="gap-2 border-primary/40 text-primary hover:bg-primary/10"
            >
              <Plus className="h-4 w-4" /> Add Service
            </Button>
          </Section>
          {SaveButton}
        </TabsContent>

        {/* ── Tab 3: About ── */}
        <TabsContent value="about" className="space-y-4">
          <Section title="📖 Agency Story">
            <Field label="Agency Story Text">
              <Textarea
                data-ocid="admin.website.textarea"
                value={agencyStory}
                onChange={(e) => setAgencyStory(e.target.value)}
                className="bg-background resize-none"
                rows={6}
              />
            </Field>
          </Section>

          <Section title="👥 Team Members">
            <div className="space-y-4">
              {teamMembers.map((member, idx) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: editable list with stable index
                  key={idx}
                  className="border border-border/60 bg-background/40 p-4 rounded-sm space-y-3"
                  data-ocid={`admin.website.item.${idx + 1}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60 text-xs uppercase tracking-wider font-semibold">
                      Member {idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setTeamMembers((prev) =>
                          prev.filter((_, i) => i !== idx),
                        )
                      }
                      data-ocid={`admin.website.delete_button.${idx + 1}`}
                      className="p-1.5 bg-red-900/30 hover:bg-red-900/60 text-red-400 rounded transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Name">
                      <Input
                        data-ocid="admin.website.input"
                        value={member.name}
                        onChange={(e) =>
                          setTeamMembers((prev) =>
                            prev.map((m, i) =>
                              i === idx ? { ...m, name: e.target.value } : m,
                            ),
                          )
                        }
                        className="bg-background"
                      />
                    </Field>
                    <Field label="Title">
                      <Input
                        data-ocid="admin.website.input"
                        value={member.title}
                        onChange={(e) =>
                          setTeamMembers((prev) =>
                            prev.map((m, i) =>
                              i === idx ? { ...m, title: e.target.value } : m,
                            ),
                          )
                        }
                        className="bg-background"
                      />
                    </Field>
                    <Field label="Experience">
                      <Input
                        data-ocid="admin.website.input"
                        value={member.experience}
                        onChange={(e) =>
                          setTeamMembers((prev) =>
                            prev.map((m, i) =>
                              i === idx
                                ? { ...m, experience: e.target.value }
                                : m,
                            ),
                          )
                        }
                        className="bg-background"
                      />
                    </Field>
                    <Field label="Specialization">
                      <Input
                        data-ocid="admin.website.input"
                        value={member.specialization}
                        onChange={(e) =>
                          setTeamMembers((prev) =>
                            prev.map((m, i) =>
                              i === idx
                                ? { ...m, specialization: e.target.value }
                                : m,
                            ),
                          )
                        }
                        className="bg-background"
                      />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setTeamMembers((prev) => [
                  ...prev,
                  {
                    name: "",
                    title: "",
                    experience: "",
                    specialization: "",
                  },
                ])
              }
              data-ocid="admin.website.primary_button"
              className="gap-2 border-primary/40 text-primary hover:bg-primary/10"
            >
              <Plus className="h-4 w-4" /> Add Team Member
            </Button>
          </Section>

          <Section title="🏅 Milestones">
            <div className="space-y-4">
              {milestones.map((m, idx) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: editable list with stable index
                  key={idx}
                  className="border border-border/60 bg-background/40 p-4 rounded-sm space-y-3"
                  data-ocid={`admin.website.item.${idx + 1}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60 text-xs uppercase tracking-wider font-semibold">
                      Milestone {idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setMilestones((prev) =>
                          prev.filter((_, i) => i !== idx),
                        )
                      }
                      data-ocid={`admin.website.delete_button.${idx + 1}`}
                      className="p-1.5 bg-red-900/30 hover:bg-red-900/60 text-red-400 rounded transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Year">
                      <Input
                        data-ocid="admin.website.input"
                        value={m.year}
                        onChange={(e) =>
                          setMilestones((prev) =>
                            prev.map((ms, i) =>
                              i === idx ? { ...ms, year: e.target.value } : ms,
                            ),
                          )
                        }
                        className="bg-background"
                      />
                    </Field>
                    <Field label="Event">
                      <Input
                        data-ocid="admin.website.input"
                        value={m.event}
                        onChange={(e) =>
                          setMilestones((prev) =>
                            prev.map((ms, i) =>
                              i === idx ? { ...ms, event: e.target.value } : ms,
                            ),
                          )
                        }
                        className="bg-background"
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <Textarea
                      data-ocid="admin.website.textarea"
                      value={m.description}
                      onChange={(e) =>
                        setMilestones((prev) =>
                          prev.map((ms, i) =>
                            i === idx
                              ? { ...ms, description: e.target.value }
                              : ms,
                          ),
                        )
                      }
                      className="bg-background resize-none"
                      rows={2}
                    />
                  </Field>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setMilestones((prev) => [
                  ...prev,
                  { year: "", event: "", description: "" },
                ])
              }
              data-ocid="admin.website.primary_button"
              className="gap-2 border-primary/40 text-primary hover:bg-primary/10"
            >
              <Plus className="h-4 w-4" /> Add Milestone
            </Button>
          </Section>
          {SaveButton}
        </TabsContent>

        {/* ── Tab 4: Gallery ── */}
        <TabsContent value="gallery">
          <GalleryTab />
        </TabsContent>

        {/* ── Tab 5: FAQ ── */}
        <TabsContent value="faq" className="space-y-4">
          <Section title="❓ FAQ Items">
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: editable list with stable index
                  key={idx}
                  className="border border-border/60 bg-background/40 p-4 rounded-sm space-y-3"
                  data-ocid={`admin.website.item.${idx + 1}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60 text-xs uppercase tracking-wider font-semibold">
                      FAQ {idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFaqs((prev) => prev.filter((_, i) => i !== idx))
                      }
                      data-ocid={`admin.website.delete_button.${idx + 1}`}
                      className="p-1.5 bg-red-900/30 hover:bg-red-900/60 text-red-400 rounded transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <Field label="Question">
                    <Input
                      data-ocid="admin.website.input"
                      value={faq.question}
                      onChange={(e) =>
                        setFaqs((prev) =>
                          prev.map((f, i) =>
                            i === idx ? { ...f, question: e.target.value } : f,
                          ),
                        )
                      }
                      className="bg-background"
                    />
                  </Field>
                  <Field label="Answer">
                    <Textarea
                      data-ocid="admin.website.textarea"
                      value={faq.answer}
                      onChange={(e) =>
                        setFaqs((prev) =>
                          prev.map((f, i) =>
                            i === idx ? { ...f, answer: e.target.value } : f,
                          ),
                        )
                      }
                      className="bg-background resize-none"
                      rows={3}
                    />
                  </Field>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setFaqs((prev) => [...prev, { question: "", answer: "" }])
              }
              data-ocid="admin.website.primary_button"
              className="gap-2 border-primary/40 text-primary hover:bg-primary/10"
            >
              <Plus className="h-4 w-4" /> Add FAQ
            </Button>
          </Section>
          {SaveButton}
        </TabsContent>

        {/* ── Tab 6: Contact ── */}
        <TabsContent value="contact" className="space-y-4">
          <Section title="📞 Contact Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Phone Number">
                <Input
                  data-ocid="admin.website.input"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="bg-background"
                  placeholder="+91 98765 43210"
                />
              </Field>
              <Field label="Email Address">
                <Input
                  data-ocid="admin.website.input"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="bg-background"
                  placeholder="contact@masterdetective.in"
                />
              </Field>
              <Field label="WhatsApp Number">
                <Input
                  data-ocid="admin.website.input"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="bg-background"
                  placeholder="+91 98765 43210"
                />
                <p className="text-foreground/50 text-xs mt-1">
                  ⚡ Also updates the floating WhatsApp button
                </p>
              </Field>
              <Field label="Call Number">
                <Input
                  data-ocid="admin.website.input"
                  value={callNumber}
                  onChange={(e) => setCallNumber(e.target.value)}
                  className="bg-background"
                  placeholder="+91 98765 43210"
                />
                <p className="text-foreground/50 text-xs mt-1">
                  ⚡ Also updates the floating Call button
                </p>
              </Field>
            </div>
            <Field label="Office Address">
              <Input
                data-ocid="admin.website.input"
                value={contactAddress}
                onChange={(e) => setContactAddress(e.target.value)}
                className="bg-background"
                placeholder="204 Sherlock House, Linking Road, Mumbai"
              />
            </Field>
          </Section>
          {SaveButton}
        </TabsContent>

        {/* ── Tab 7: Nav & Footer ── */}
        <TabsContent value="navfooter" className="space-y-4">
          <Section title="🦶 Footer">
            <Field label="Footer Tagline">
              <Input
                data-ocid="admin.website.input"
                value={footerTagline}
                onChange={(e) => setFooterTagline(e.target.value)}
                className="bg-background"
                placeholder="Professional. Confidential. Results-Driven."
              />
            </Field>
            <Field label="Footer Description">
              <Textarea
                data-ocid="admin.website.textarea"
                value={footerDescription}
                onChange={(e) => setFooterDescription(e.target.value)}
                className="bg-background resize-none"
                rows={3}
              />
            </Field>
            <Field label="Legal Disclaimer">
              <Textarea
                data-ocid="admin.website.textarea"
                value={legalDisclaimer}
                onChange={(e) => setLegalDisclaimer(e.target.value)}
                className="bg-background resize-none"
                rows={4}
              />
            </Field>
          </Section>

          <Section title="📱 Social Media Links">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Facebook URL">
                <Input
                  data-ocid="admin.website.input"
                  value={socialFacebook}
                  onChange={(e) => setSocialFacebook(e.target.value)}
                  className="bg-background"
                  placeholder="https://facebook.com/masterdetective"
                />
              </Field>
              <Field label="Twitter / X URL">
                <Input
                  data-ocid="admin.website.input"
                  value={socialTwitter}
                  onChange={(e) => setSocialTwitter(e.target.value)}
                  className="bg-background"
                  placeholder="https://twitter.com/masterdetective"
                />
              </Field>
              <Field label="Instagram URL">
                <Input
                  data-ocid="admin.website.input"
                  value={socialInstagram}
                  onChange={(e) => setSocialInstagram(e.target.value)}
                  className="bg-background"
                  placeholder="https://instagram.com/masterdetective"
                />
              </Field>
              <Field label="LinkedIn URL">
                <Input
                  data-ocid="admin.website.input"
                  value={socialLinkedin}
                  onChange={(e) => setSocialLinkedin(e.target.value)}
                  className="bg-background"
                  placeholder="https://linkedin.com/company/masterdetective"
                />
              </Field>
            </div>
          </Section>
          {SaveButton}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ── Gallery Tab (separated for hooks clarity) ─────────────────────────────────
function GalleryTab() {
  const media = useMediaByCategory("Gallery");
  const saveMedia = useSaveMedia();
  const deleteMedia = useDeleteMedia();
  const { identity } = useInternetIdentity();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const config = await loadConfig();
      const agent = HttpAgent.createSync({
        identity: identity || undefined,
        host: config.backend_host,
      });
      if (config.backend_host?.includes("localhost")) {
        await agent.fetchRootKey();
      }
      const storageClient = new StorageClient(
        config.bucket_name,
        config.storage_gateway_url,
        config.backend_canister_id,
        config.project_id,
        agent,
      );
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { hash } = await storageClient.putFile(bytes);
      await saveMedia.mutateAsync({
        name: file.name,
        fileId: hash,
        category: "Gallery",
      });
      toast.success(`✅ Uploaded: ${file.name}`);
    } catch {
      toast.error("❌ Upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMedia.mutateAsync(id);
      toast.success("🗑️ Photo deleted.");
    } catch {
      toast.error("❌ Delete failed.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border p-6 rounded-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-foreground font-bold uppercase tracking-wider text-sm">
              📸 Gallery Photos
            </h3>
            <p className="text-foreground/60 text-xs mt-1">
              Upload images to the public gallery. These appear on the Gallery
              page.
            </p>
          </div>
          <label
            htmlFor="gallery-upload"
            data-ocid="admin.website.upload_button"
            className={`cursor-pointer inline-flex items-center gap-2 detective-btn-primary px-4 py-2 text-sm ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" /> Upload Photo
              </>
            )}
            <input
              id="gallery-upload"
              type="file"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
              accept="image/*"
            />
          </label>
        </div>

        <Separator className="bg-border" />

        {media.isLoading ? (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            data-ocid="admin.website.loading_state"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        ) : (media.data ?? []).length === 0 ? (
          <div
            className="py-12 text-center border border-dashed border-border rounded-sm"
            data-ocid="admin.website.empty_state"
          >
            <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground/70 text-sm">
              No gallery photos uploaded yet
            </p>
            <p className="text-foreground/50 text-xs mt-1">
              Upload images using the button above
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            data-ocid="admin.website.list"
          >
            {(media.data ?? []).map((file, idx) => (
              <div
                key={file.id}
                className="group bg-background border border-border hover:border-primary/40 transition-colors relative rounded-sm overflow-hidden"
                data-ocid={`admin.website.item.${idx + 1}`}
              >
                <div className="h-32 bg-muted flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="p-2">
                  <div className="text-foreground text-xs truncate">
                    {file.name}
                  </div>
                  <div className="text-foreground/50 text-xs uppercase tracking-wider mt-0.5">
                    {file.category}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(file.id)}
                  data-ocid={`admin.website.delete_button.${idx + 1}`}
                  className="absolute top-2 right-2 p-1.5 bg-red-900/80 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity rounded"
                  title="Delete photo"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
