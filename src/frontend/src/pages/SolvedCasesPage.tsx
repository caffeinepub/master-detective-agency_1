import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  Award,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  FileSearch,
  MessageCircle,
  Search,
  Shield,
  ShieldOff,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { SolvedCase } from "../backend";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { usePublishedSolvedCases } from "../hooks/useQueries";

// ─── Static Sample Cases ──────────────────────────────────────────────────────
// These are shown as demo data when no backend cases are published yet.

interface StaticCase {
  id: string;
  caseNumber: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  rating: number;
  policeHelp: boolean;
  policeHelpDetail: string;
  outcome: string;
  challenges: string;
  feedback: string;
  roadmap: { step: string; title: string; detail: string }[];
  year: string;
  difficulty: "High" | "Medium" | "Critical";
}

const STATIC_CASES: StaticCase[] = [
  {
    id: "static-1",
    caseNumber: "SC-2024-001",
    category: "Missing Person",
    title: "Lapata Vyakti Ki Khoj – Safal Punarmilan",
    description:
      "Ek parivaar ke sadasya achanak bina kisi suchna ke ghar se ghaib ho gaye. Parivaar ne police mein FIR darj karayi, lekin 3 hafton baad bhi koi khabar nahi mili. Tab unhone hamare agency se sampark kiya.",
    duration: "6 Hafte",
    rating: 5,
    policeHelp: true,
    policeHelpDetail:
      "Police ne CCTV footage access karne mein sahayata ki aur 2 states mein coordinates kiye.",
    outcome:
      "Lapata vyakti ko Gujarat ke ek sheher mein dhundha gaya. Woh apni marzi se gaya tha aur ek factory mein kaam kar raha tha. Punarmilan safaltapoorvak hua. Parivaar mein khushi ki lahar aa gayi.",
    challenges:
      "Subject ne jaanbujhkar apna phone band kar rakha tha. Social media inactive tha. Kisi bhi local contact se koi lead nahi mili. Multiple states mein simultaneously investigation karni padi.",
    feedback:
      "Hamara beta 6 hafte baad ghar wapas aaya, sab kuch aapki wajah se hua. Hum zindagi bhar aapke ehsaanmand rahenge. Jo kaam police 3 hafte mein nahi kar payi, aapne 6 hafte mein kar dikhaya.",
    roadmap: [
      {
        step: "1",
        title: "Initial Briefing & Profile Analysis",
        detail:
          "Client se complete family background, photos, last known location, contacts aur habits ke baare mein detailed briefing li. Psychological profile banaya.",
      },
      {
        step: "2",
        title: "Digital Footprint Tracking",
        detail:
          "Last active social media, mobile towers, ATM transactions, aur online activity ka analysis kiya. Ek hidden email account mila.",
      },
      {
        step: "3",
        title: "Field Surveillance",
        detail:
          "Last known location ke 5 km radius mein ground-level surveillance ki. 23 CCTV locations check kiye.",
      },
      {
        step: "4",
        title: "Interstate Coordination",
        detail:
          "2 states – Maharashtra aur Gujarat – mein field agents deploy kiye. Local contacts activate kiye.",
      },
      {
        step: "5",
        title: "Location Confirmation & Recovery",
        detail:
          "Surat ke industrial area mein subject ki location confirm ki. Family ke saath safe reunion arrange kiya.",
      },
    ],
    year: "2024",
    difficulty: "High",
  },
  {
    id: "static-2",
    caseNumber: "SC-2024-002",
    category: "Fraud Investigation",
    title: "Multi-Crore Business Fraud Unmasked",
    description:
      "Ek reputed manufacturing company ke director ko shak tha ki unka senior manager company funds ka durupyog kar raha hai. Last 18 months mein 2.4 crore rupaye ka financial fraud hua tha. Internal audit mein kuch clear nahi aaya tha.",
    duration: "8 Hafte",
    rating: 5,
    policeHelp: true,
    policeHelpDetail:
      "Evidence compile karne ke baad EOW (Economic Offences Wing) mein complaint darj karwai. Police ne arrest kiya.",
    outcome:
      "Manager ke paas 3 fake vendor accounts miliye jisme paise transfer kiye jaate the. 1.8 crore rupaye recover hue. Manager ko arrest kiya gaya aur company ne legal action liya. Complete financial audit kiya gaya.",
    challenges:
      "Fraud bahut expertly chhupaya gaya tha – multiple layers of shell vendors, partial payments, aur fake invoices. Internal IT team ke kuch members bhi involved the.",
    feedback:
      "Jo hamare accountants 18 mahine mein nahi pakad paaye, aapne 8 hafte mein expose kar diya. Aapke kaam ki wajah se company ko 1.8 crore wapas mile aur ek bade fraud ring ka parda faash hua.",
    roadmap: [
      {
        step: "1",
        title: "Financial Records Deep Dive",
        detail:
          "3 saal ke bank statements, vendor payments, aur internal transfer records ka forensic analysis kiya.",
      },
      {
        step: "2",
        title: "Vendor Background Verification",
        detail:
          "Top 50 vendors ki physical verification ki. 3 vendors ke addresses pe actual koi office nahi mila – fake entities confirm hua.",
      },
      {
        step: "3",
        title: "Employee Surveillance",
        detail:
          "Suspect manager ki office ke bahar aur meetings mein covert surveillance ki. 4 suspicious meetings capture ki.",
      },
      {
        step: "4",
        title: "Digital Evidence Collection",
        detail:
          "Email trails, payment approvals, aur digital signatures ka forensic recovery kiya. Deleted records partially restore kiye.",
      },
      {
        step: "5",
        title: "Legal Evidence Packaging",
        detail:
          "Court-admissible evidence compile kiya – affidavits, bank trails, surveillance footage. EOW complaint file ki.",
      },
    ],
    year: "2024",
    difficulty: "Critical",
  },
  {
    id: "static-3",
    caseNumber: "SC-2023-007",
    category: "Background Verification",
    title: "Pre-Marital Background Check – Asal Sachai Saamne Aayi",
    description:
      "Ek parivar apni beti ki shaadi ek vyakti se karna chahta tha. Rishtedaaron ne kuch shakk zaahir kiye the. Family chahti thi ki dulhe ki background, financial status, previous relationships, aur character ki complete verification ho.",
    duration: "2 Hafte",
    rating: 5,
    policeHelp: false,
    policeHelpDetail: "",
    outcome:
      "Dulhe ke 2 previous marriages ka pata chala jo chhupaye gaye the. Financial records mein bhi major discrepancies mili. Ek pending criminal case bhi mila. Family ne rishtaa tod liya aur beti ki raksha hui.",
    challenges:
      "Subject bahut careful tha aur kisi bhi question ka jawab deta time red flags nahi dikhta tha. Records multiple cities mein bikhre hue the.",
    feedback:
      "Aapne humari beti ki zindagi barbad hone se bachi. Pehle hum gusse mein the jab aapne yeh sab bataya, lekin aaj hum aapke liye dua karte hain. Yeh kaam sirf ek professional agency hi kar sakti thi.",
    roadmap: [
      {
        step: "1",
        title: "Identity & Address Verification",
        detail:
          "Aadhaar, PAN, property records aur 3 previous addresses ki physical verification ki.",
      },
      {
        step: "2",
        title: "Employment & Financial Check",
        detail:
          "Claimed job position verify ki – actual CTC aur designation mein major difference mila. Loans aur liabilities checked.",
      },
      {
        step: "3",
        title: "Criminal & Court Record Search",
        detail:
          "3 states mein court records, FIR history, aur police verification ki. 1 pending case mila.",
      },
      {
        step: "4",
        title: "Marital History Investigation",
        detail:
          "Social network aur local enquiry se 2 previous marriages ka pata chala. Documents obtained.",
      },
      {
        step: "5",
        title: "Comprehensive Report Delivery",
        detail:
          "Photo evidence, documents, aur signed affidavits ke saath complete confidential report family ko di.",
      },
    ],
    year: "2023",
    difficulty: "Medium",
  },
  {
    id: "static-4",
    caseNumber: "SC-2024-004",
    category: "Corporate Investigation",
    title: "Trade Secret Leak – Competitor Ke Jaasoos Pakde",
    description:
      "Ek pharmaceutical company ko shak tha ki unka upcoming product formula competitor ke paas pahunch raha hai. Teen mahine mein unki 2 products ke exactly similar versions market mein aa chuke the competitor ne.",
    duration: "5 Hafte",
    rating: 5,
    policeHelp: false,
    policeHelpDetail: "",
    outcome:
      "R&D department ke 2 employees ko pakda gaya jo competitor ke through payment le rahe the. USB data theft aur email leaks both confirm hue. Company ne tatkaal legal action liya. NDA breach ka case file kiya gaya.",
    challenges:
      "Company mein 200+ employees the. Internal saboteur dhundhna bohot complex tha. Digital forensics mein limited access thi.",
    feedback:
      "Hamare R&D department mein 5 saal se kaam kar raha tha woh shakhs aur hume bilkul idea nahi tha. Aapne nah sirf use pakda balki evidence bhi itna solid diya ki court case aasaan ho gaya.",
    roadmap: [
      {
        step: "1",
        title: "Threat Assessment & Access Audit",
        detail:
          "Sensitive information access karne wale sab employees ki list banai. Access logs review kiye.",
      },
      {
        step: "2",
        title: "Covert Internal Surveillance",
        detail:
          "Top 12 suspected employees ki office behavior, meetings aur phone usage pattern pe nazar rakhi.",
      },
      {
        step: "3",
        title: "Digital Forensics",
        detail:
          "USB transfers, email attachments, aur cloud uploads ka forensic audit kiya. 2 employees ke suspicious transfers mile.",
      },
      {
        step: "4",
        title: "Financial Trail Investigation",
        detail:
          "Suspect employees ke bank statements mein unexplained credits mili – competitor company ke naam pe benami payments.",
      },
      {
        step: "5",
        title: "Evidence Compilation & Legal Handover",
        detail:
          "Digital + physical evidence company lawyers ko di. Both employees ne apni company ke legal notice ke baad quit kiya.",
      },
    ],
    year: "2024",
    difficulty: "Critical",
  },
  {
    id: "static-5",
    caseNumber: "SC-2023-012",
    category: "Surveillance",
    title: "Spouse Surveillance – Sach Ka Khulasa",
    description:
      "Ek client ko apne spouse ke behaviour mein abrupt changes dikhe the – late nights, unexplained expenses, aur phone par secrecy. Client chahta tha ki bina kisi confrontation ke sach jaana jaye.",
    duration: "3 Hafte",
    rating: 4,
    policeHelp: false,
    policeHelpDetail: "",
    outcome:
      "Surveillance mein spouse ki parallel relationship confirm hui. Photo aur video evidence collect ki gayi. Client ko complete factual report di gayi jisme courts ke liye usable evidence tha. Divorce proceedings mein yeh evidence kaam aaya.",
    challenges:
      "Subject bahut vigilant tha aur kai baar route change karta tha. Multiple vehicles aur team rotations use karni padi.",
    feedback:
      "Mujhe pehle se dil mein andaaza tha, lekin yaqeen karna mushkil tha. Aapne bahut professionally kaam kiya – meri privacy bhi protect ki aur sach bhi bataya. Ab main apni zindagi naye sir se shuru kar sakti hoon.",
    roadmap: [
      {
        step: "1",
        title: "Pattern Analysis & Route Mapping",
        detail:
          "Subject ke daily routine, office timings, aur regular haunts ka week-long passive observation kiya.",
      },
      {
        step: "2",
        title: "Mobile Surveillance Team Deployment",
        detail:
          "2-vehicle rotating surveillance team deploy ki. Plain clothes agents alag shifts mein.",
      },
      {
        step: "3",
        title: "Evidence Documentation",
        detail:
          "Photo, video aur timestamp-verified evidence collection. Location metadata ke saath.",
      },
      {
        step: "4",
        title: "Confidential Report Delivery",
        detail:
          "Complete evidence package client ko encrypted format mein deliver kiya. Legal use ke liye affidavit bhi diya.",
      },
    ],
    year: "2023",
    difficulty: "Medium",
  },
  {
    id: "static-6",
    caseNumber: "SC-2024-008",
    category: "Asset Investigation",
    title: "Hidden Assets Uncovered – Divorce Case Mein Nyaay",
    description:
      "Divorce proceedings mein client ke spouse ne court mein assets severely underreport kiye the. Client ka manna tha ki crores ki property aur investments chhupaye ja rahe hain. Court-admissible proof chahiye tha.",
    duration: "4 Hafte",
    rating: 5,
    policeHelp: false,
    policeHelpDetail: "",
    outcome:
      "Registered properties, benami investments, aur 3 undisclosed bank accounts mili – total value 3.2 crore. Court mein evidence present karne ke baad settlement amount 4x zyada hua. Client ko uska hakka mila.",
    challenges:
      "Assets multiple family members ke naam pe the. Benami property laws ke through dhundhna technically bahut mushkil tha. Financial records kai jurisdictions mein bikhre the.",
    feedback:
      "Mere advocate ne kaha tha yeh sab dhundhna almost impossible hai. Aapne jo kaam kiya woh miracle se kam nahi tha. Mera haq mujhe mila – yeh sirf aapki wajah se hua. Court mein judge bhi evidence dekh ke hairan rah gaye.",
    roadmap: [
      {
        step: "1",
        title: "Property Records Search",
        detail:
          "Subject ke naam, spouse ke naam, parents ke naam aur known relatives ke naam pe property registrations check ki – 4 states mein.",
      },
      {
        step: "2",
        title: "Business & Investment Audit",
        detail:
          "MCA records, partnership firms, aur directorship history check ki. 2 undisclosed companies mili.",
      },
      {
        step: "3",
        title: "Bank Account Tracing",
        detail:
          "Known financial institution contacts aur transaction trails se 3 hidden accounts identify kiye.",
      },
      {
        step: "4",
        title: "Benami Investigation",
        detail:
          "Trusted associates ke naam pe chhupaye gaye assets dhundhe. Driver aur distant relative ke naam pe properties mili.",
      },
      {
        step: "5",
        title: "Legal Documentation",
        detail:
          "Notarized property extracts, registration copies, aur financial statements compile kiye. Lawyer ko handover kiya.",
      },
    ],
    year: "2024",
    difficulty: "High",
  },
  {
    id: "static-7",
    caseNumber: "SC-2023-019",
    category: "Personal Investigation",
    title: "Online Blackmail Network Ka Parda Faash",
    description:
      "Ek young professional ko anonymous accounts se lagatar blackmail messages aa rahe the. Personal photos aur information ke badle mein money demand ki ja rahi thi. Subject dar ke but kuchh karta nahi tha.",
    duration: "3 Hafte",
    rating: 5,
    policeHelp: true,
    policeHelpDetail:
      "Cyber crime cell ke saath coordinates kiya. Digital evidence police ko handover ki. 2 individuals arrested hue.",
    outcome:
      "Blackmailers ka network 3 logon ka tha jo different cities se operate kar rahe the. Digital forensics se real identities trace ki gayi. Police case file hua aur 2 main accused arrested hue. Blackmail permanently band hua.",
    challenges:
      "Sab kuch VPN aur anonymous services ke through ho raha tha. Identity tracing technically bahut complex tha. Client ko psychological support bhi dena pada.",
    feedback:
      "Main itna dara hua tha ki ghar se nahi niklata tha. Aapne na sirf yeh problem solve ki balki mujhe yeh himmat di ki main apni normal life wapas paa sakta hoon. Jo log mujhe pareshan kar rahe the woh ab jail mein hain.",
    roadmap: [
      {
        step: "1",
        title: "Digital Evidence Preservation",
        detail:
          "Sab messages, screenshots, accounts aur transaction requests securely preserve kiye. Digital chain of custody maintain ki.",
      },
      {
        step: "2",
        title: "Source IP Tracing",
        detail:
          "Technical analysis se approximate locations identify ki. VPN layers ke through partial traces results aaye.",
      },
      {
        step: "3",
        title: "Social Engineering Intelligence",
        detail:
          "Blackmailers ke communication patterns, language style aur timing se psychological profile banai.",
      },
      {
        step: "4",
        title: "Cyber Crime Cell Coordination",
        detail:
          "Evidence ke saath cyber cell mein formal complaint. Technical data handover kiya.",
      },
      {
        step: "5",
        title: "Arrest & Case Closure",
        detail:
          "Police ne 2 main accused ko arrest kiya. Teen mahine baad case mein conviction mili.",
      },
    ],
    year: "2023",
    difficulty: "High",
  },
  {
    id: "static-8",
    caseNumber: "SC-2024-011",
    category: "Corporate Investigation",
    title: "Fake Employee Racket – HR Fraud Exposed",
    description:
      "Ek large retail chain company mein HR manager salaries ke liye ghost employees register kar raha tha. Company ke accounts team ko ek audit mein mismatch mili. Internal investigation se kuch nahi mila.",
    duration: "3 Hafte",
    rating: 4,
    policeHelp: true,
    policeHelpDetail:
      "Aadhaar verification ke liye UIDAI se coordinates kiya. Company ne FIR file ki aur police ne main accused ko pakda.",
    outcome:
      "47 ghost employees ka pata chala jinka salary account mein paise ja rahe the – ye sab HR manager ke relatives ya fake identities thi. Total fraud amount 38 lakh per month tha. 14 mahine ka total loss 5.3 crore. Complete recovery ka case court mein hai.",
    challenges:
      "47 fake IDs real-looking documents ke saath the. Aadhaar numbers actual real logon ke the jo involve nahi the – identity theft bhi tha.",
    feedback:
      "Hamare internal team ko puri idea nahi thi ki kitna bada fraud chal raha tha. Aapne jo figures nikale woh dekh ke board meeting mein sab hairan reh gaye. Ab poori HR system restructure ho rahi hai.",
    roadmap: [
      {
        step: "1",
        title: "Employee Database Audit",
        detail:
          "Poori employee database – 1200+ entries – ka manual aur digital cross-verification kiya.",
      },
      {
        step: "2",
        title: "Physical Verification",
        detail:
          "50 randomly selected employees ki physical address verification ki – 9 addresses pe koi nahi mila.",
      },
      {
        step: "3",
        title: "Aadhaar & Document Forensics",
        detail:
          "Suspect employee documents ki forensic verification. 47 mein se 40 ke Aadhaar numbers mismatch ya stolen identity nikle.",
      },
      {
        step: "4",
        title: "Financial Trail Analysis",
        detail:
          "Salary accounts kahan ja rahi hai – trace kiya. Majority ek hi geography mein linked thi.",
      },
      {
        step: "5",
        title: "FIR & Evidence Handover",
        detail:
          "Company ke lawyers aur police ke saath complete evidence package share ki. HR manager arrested.",
      },
    ],
    year: "2024",
    difficulty: "Critical",
  },
];

const ALL_CATEGORIES = [
  "All",
  "Missing Person",
  "Fraud Investigation",
  "Background Verification",
  "Corporate Investigation",
  "Surveillance",
  "Asset Investigation",
  "Personal Investigation",
];

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"];

const DIFFICULTY_COLORS = {
  Medium: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  High: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Critical: "bg-red-500/20 text-red-400 border-red-500/30",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

interface RoadmapStep {
  step: string;
  title: string;
  detail: string;
}

function parseRoadmap(roadmapJson: string): RoadmapStep[] {
  try {
    const parsed = JSON.parse(roadmapJson);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

// ─── Case Detail Dialog ───────────────────────────────────────────────────────

function StaticCaseDetailDialog({
  sc,
  open,
  onClose,
}: {
  sc: StaticCase | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!sc) return null;
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="case_detail.dialog"
        className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[oklch(0.10_0_0)] border-border text-foreground p-0"
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-b border-border p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-primary text-xs font-bold tracking-widest bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-sm">
                  {sc.caseNumber}
                </span>
                <Badge
                  className={`text-[10px] border ${DIFFICULTY_COLORS[sc.difficulty]}`}
                >
                  {sc.difficulty} Difficulty
                </Badge>
                <span className="text-muted-foreground text-xs">{sc.year}</span>
              </div>
              <DialogTitle className="text-xl font-black text-foreground leading-tight">
                {sc.title}
              </DialogTitle>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Badge
              variant="outline"
              className="border-primary/40 text-primary text-xs"
            >
              {sc.category}
            </Badge>
            <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <Clock className="h-3.5 w-3.5" />
              {sc.duration}
            </span>
            <StarRating rating={sc.rating} />
            {sc.policeHelp ? (
              <span className="flex items-center gap-1 text-green-400 text-xs">
                <Shield className="h-3.5 w-3.5" /> Police Assisted
              </span>
            ) : (
              <span className="flex items-center gap-1 text-muted-foreground text-xs">
                <ShieldOff className="h-3.5 w-3.5" /> Independent
              </span>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <SectionLabel
              icon={<FileSearch className="h-4 w-4" />}
              label="Case Overview"
            />
            <p className="text-muted-foreground text-sm leading-relaxed mt-2">
              {sc.description}
            </p>
          </div>

          {/* Roadmap */}
          {sc.roadmap.length > 0 && (
            <div>
              <SectionLabel
                icon={<CheckCircle2 className="h-4 w-4" />}
                label="Investigation Roadmap"
              />
              <div className="relative pl-7 mt-4">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                <div className="space-y-4">
                  {sc.roadmap.map((step, idx) => (
                    <motion.div
                      key={`${step.step}-${idx}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.07, duration: 0.3 }}
                      className="relative"
                    >
                      <div className="absolute -left-7 top-2 h-6 w-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                        <span className="text-primary text-[9px] font-black">
                          {step.step}
                        </span>
                      </div>
                      <div className="bg-muted/20 border border-border rounded-sm p-3 hover:border-primary/30 transition-colors">
                        <p className="text-foreground font-bold text-sm">
                          {step.title}
                        </p>
                        {step.detail && (
                          <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                            {step.detail}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Challenges */}
          {sc.challenges && (
            <div>
              <SectionLabel
                icon={<AlertTriangle className="h-4 w-4 text-yellow-500" />}
                label="Challenges Faced"
              />
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-sm p-4 mt-2">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {sc.challenges}
                </p>
              </div>
            </div>
          )}

          {/* Police */}
          <div>
            <SectionLabel
              icon={<Shield className="h-4 w-4" />}
              label="Police Assistance"
            />
            <div className="mt-2">
              {sc.policeHelp ? (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1.5">
                  <CheckCircle2 className="h-3 w-3" /> Police Assistance: YES
                </Badge>
              ) : (
                <Badge className="bg-muted/50 text-muted-foreground border-border gap-1.5">
                  <ShieldOff className="h-3 w-3" /> Independent Investigation
                </Badge>
              )}
              {sc.policeHelp && sc.policeHelpDetail && (
                <p className="text-muted-foreground text-xs mt-2 leading-relaxed">
                  {sc.policeHelpDetail}
                </p>
              )}
            </div>
          </div>

          {/* Outcome */}
          {sc.outcome && (
            <div>
              <SectionLabel
                icon={<Trophy className="h-4 w-4" />}
                label="Outcome & Result"
              />
              <div className="bg-primary/10 border border-primary/30 rounded-sm p-4 mt-2">
                <p className="text-foreground font-medium text-sm leading-relaxed">
                  {sc.outcome}
                </p>
              </div>
            </div>
          )}

          {/* Feedback */}
          {sc.feedback && (
            <div>
              <SectionLabel
                icon={<MessageCircle className="h-4 w-4" />}
                label="Client Feedback"
                note="(Identity Strictly Confidential)"
              />
              <div className="bg-muted/20 border border-border rounded-sm p-4 mt-2">
                <StarRating rating={sc.rating} />
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed italic">
                  &ldquo;{sc.feedback}&rdquo;
                </p>
                <p className="text-muted-foreground/50 text-[10px] mt-2">
                  — Verified Client | Identity Protected
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function BackendCaseDetailDialog({
  solvedCase,
  open,
  onClose,
}: {
  solvedCase: SolvedCase | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!solvedCase) return null;
  const roadmap = parseRoadmap(solvedCase.roadmap);
  const rating = Number(solvedCase.rating);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="case_detail.dialog"
        className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[oklch(0.10_0_0)] border-border text-foreground p-0"
      >
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-b border-border p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-primary text-xs font-bold tracking-widest bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-sm">
                  {solvedCase.caseNumber}
                </span>
              </div>
              <DialogTitle className="text-xl font-black text-foreground leading-tight">
                {solvedCase.title}
              </DialogTitle>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Badge
              variant="outline"
              className="border-primary/40 text-primary text-xs"
            >
              {solvedCase.category}
            </Badge>
            <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <Clock className="h-3.5 w-3.5" />
              {solvedCase.duration}
            </span>
            <StarRating rating={rating} />
            {solvedCase.policeHelp ? (
              <span className="flex items-center gap-1 text-green-400 text-xs">
                <Shield className="h-3.5 w-3.5" /> Police Assisted
              </span>
            ) : (
              <span className="flex items-center gap-1 text-muted-foreground text-xs">
                <ShieldOff className="h-3.5 w-3.5" /> Independent
              </span>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <SectionLabel
              icon={<FileSearch className="h-4 w-4" />}
              label="Case Overview"
            />
            <p className="text-muted-foreground text-sm leading-relaxed mt-2">
              {solvedCase.description}
            </p>
          </div>

          {roadmap.length > 0 && (
            <div>
              <SectionLabel
                icon={<CheckCircle2 className="h-4 w-4" />}
                label="Investigation Roadmap"
              />
              <div className="relative pl-7 mt-4">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                <div className="space-y-4">
                  {roadmap.map((step, idx) => (
                    <div key={`${step.step}-${idx}`} className="relative">
                      <div className="absolute -left-7 top-2 h-6 w-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                        <span className="text-primary text-[9px] font-black">
                          {step.step}
                        </span>
                      </div>
                      <div className="bg-muted/20 border border-border rounded-sm p-3">
                        <p className="text-foreground font-bold text-sm">
                          {step.title}
                        </p>
                        {step.detail && (
                          <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                            {step.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {solvedCase.challenges && (
            <div>
              <SectionLabel
                icon={<AlertTriangle className="h-4 w-4 text-yellow-500" />}
                label="Challenges Faced"
              />
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-sm p-4 mt-2">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {solvedCase.challenges}
                </p>
              </div>
            </div>
          )}

          <div>
            <SectionLabel
              icon={<Shield className="h-4 w-4" />}
              label="Police Assistance"
            />
            <div className="mt-2">
              {solvedCase.policeHelp ? (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1.5">
                  <CheckCircle2 className="h-3 w-3" /> YES – Police Assisted
                </Badge>
              ) : (
                <Badge className="bg-muted/50 text-muted-foreground border-border gap-1.5">
                  <ShieldOff className="h-3 w-3" /> Independent Investigation
                </Badge>
              )}
            </div>
          </div>

          {solvedCase.outcome && (
            <div>
              <SectionLabel
                icon={<Trophy className="h-4 w-4" />}
                label="Outcome"
              />
              <div className="bg-primary/10 border border-primary/30 rounded-sm p-4 mt-2">
                <p className="text-foreground font-medium text-sm leading-relaxed">
                  {solvedCase.outcome}
                </p>
              </div>
            </div>
          )}

          {solvedCase.feedback && (
            <div>
              <SectionLabel
                icon={<MessageCircle className="h-4 w-4" />}
                label="Client Feedback"
                note="(Identity Confidential)"
              />
              <div className="bg-muted/20 border border-border rounded-sm p-4 mt-2">
                <StarRating rating={rating} />
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed italic">
                  &ldquo;{solvedCase.feedback}&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionLabel({
  icon,
  label,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  note?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-primary">{icon}</span>
      <h3 className="text-foreground font-bold uppercase tracking-wider text-xs">
        {label}
      </h3>
      {note && (
        <span className="text-muted-foreground text-[10px] font-normal normal-case">
          {note}
        </span>
      )}
    </div>
  );
}

// ─── Case Card ────────────────────────────────────────────────────────────────

function StaticCaseCard({
  sc,
  index,
  onClick,
}: {
  sc: StaticCase;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      onClick={onClick}
      className="group relative bg-[oklch(0.11_0_0)] border border-border hover:border-primary/60 rounded-sm p-5 cursor-pointer transition-all duration-300 overflow-hidden"
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-primary text-[11px] font-black tracking-widest">
            {sc.caseNumber}
          </span>
          <span className="text-muted-foreground/40 text-xs">{sc.year}</span>
        </div>
        <Badge
          className={`text-[9px] border ${DIFFICULTY_COLORS[sc.difficulty]} shrink-0`}
        >
          {sc.difficulty}
        </Badge>
      </div>

      {/* Category */}
      <div className="mb-2">
        <Badge
          variant="outline"
          className="text-[10px] border-muted-foreground/20 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary transition-colors"
        >
          {sc.category}
        </Badge>
      </div>

      {/* Title */}
      <h3 className="text-foreground font-bold text-sm mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
        {sc.title}
      </h3>

      {/* Description preview */}
      <p className="text-muted-foreground/70 text-xs leading-relaxed line-clamp-2 mb-4">
        {sc.description}
      </p>

      {/* Bottom row */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-muted-foreground text-xs">
            <Calendar className="h-3 w-3" />
            {sc.duration}
          </span>
          {sc.policeHelp ? (
            <span className="flex items-center gap-1 text-green-400/80 text-[10px]">
              <Shield className="h-3 w-3" /> Police
            </span>
          ) : (
            <span className="flex items-center gap-1 text-muted-foreground/50 text-[10px]">
              <ShieldOff className="h-3 w-3" /> Independent
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <StarRating rating={sc.rating} />
          <span className="text-primary text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
            <Eye className="h-3 w-3" /> Details
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function BackendCaseCard({
  solvedCase,
  index,
  onClick,
}: {
  solvedCase: SolvedCase;
  index: number;
  onClick: () => void;
}) {
  const rating = Number(solvedCase.rating);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      data-ocid={`solved_cases.item.${index + 1}`}
      onClick={onClick}
      className="group relative bg-[oklch(0.11_0_0)] border border-border hover:border-primary/60 rounded-sm p-5 cursor-pointer transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="font-mono text-primary text-[11px] font-black tracking-widest">
          {solvedCase.caseNumber}
        </span>
        <Badge
          variant="outline"
          className="text-[10px] border-muted-foreground/30 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary transition-colors"
        >
          {solvedCase.category}
        </Badge>
      </div>

      <h3 className="text-foreground font-bold text-sm mb-3 group-hover:text-primary transition-colors leading-snug">
        {solvedCase.title}
      </h3>

      {solvedCase.description && (
        <p className="text-muted-foreground/70 text-xs leading-relaxed line-clamp-2 mb-4">
          {solvedCase.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <Calendar className="h-3 w-3" />
            {solvedCase.duration}
          </span>
          {solvedCase.policeHelp ? (
            <span className="flex items-center gap-1 text-green-400/80 text-[10px]">
              <Shield className="h-3 w-3" /> Police
            </span>
          ) : (
            <span className="flex items-center gap-1 text-muted-foreground/50 text-[10px]">
              <ShieldOff className="h-3 w-3" /> Independent
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <StarRating rating={rating} />
          <span className="text-primary text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
            <Eye className="h-3 w-3" /> Details
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function SolvedCasesPage() {
  const { data: backendCases = [], isLoading } = usePublishedSolvedCases();

  // Use backend cases if available, else fall back to static showcase
  const useStatic = !isLoading && backendCases.length === 0;
  const _displayCases = useStatic ? STATIC_CASES : null;
  const displayBackend = !useStatic ? backendCases : null;

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedStatic, setSelectedStatic] = useState<StaticCase | null>(null);
  const [staticDialogOpen, setStaticDialogOpen] = useState(false);
  const [selectedBackend, setSelectedBackend] = useState<SolvedCase | null>(
    null,
  );
  const [backendDialogOpen, setBackendDialogOpen] = useState(false);

  const filteredStatic =
    activeCategory === "All"
      ? STATIC_CASES
      : STATIC_CASES.filter((c) => c.category === activeCategory);

  const filteredBackend =
    activeCategory === "All"
      ? (displayBackend ?? [])
      : (displayBackend ?? []).filter((c) => c.category === activeCategory);

  const totalCount = useStatic ? STATIC_CASES.length : backendCases.length;
  const policeCount = useStatic
    ? STATIC_CASES.filter((c) => c.policeHelp).length
    : backendCases.filter((c) => c.policeHelp).length;
  const avgRating = useStatic
    ? Math.round(
        STATIC_CASES.reduce((s, c) => s + c.rating, 0) / STATIC_CASES.length,
      )
    : backendCases.length > 0
      ? Math.round(
          backendCases.reduce((s, c) => s + Number(c.rating), 0) /
            backendCases.length,
        )
      : 0;

  const categoryList = useStatic
    ? ALL_CATEGORIES
    : [
        "All",
        "Corporate Investigation",
        "Missing Person",
        "Background Verification",
        "Personal Investigation",
        "Fraud Investigation",
        "Asset Investigation",
        "Surveillance",
        "Other",
      ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative bg-[oklch(0.07_0_0)] py-16 md:py-24 border-b border-border overflow-hidden">
          {/* Grid bg */}
          <div className="absolute inset-0 opacity-[0.04]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 40px, oklch(1 0 0 / 0.5) 40px, oklch(1 0 0 / 0.5) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, oklch(1 0 0 / 0.5) 40px, oklch(1 0 0 / 0.5) 41px)",
              }}
            />
          </div>
          {/* Red glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/8 rounded-full blur-3xl" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-sm mb-6">
                <Trophy className="h-4 w-4" />
                Case Resolution Archive
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground mb-4">
                Solved <span className="text-primary">Cases</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
                Hamari agency ne aaj tak{" "}
                <span className="text-foreground font-semibold">
                  {totalCount}+ cases
                </span>{" "}
                safaltapoorvak solve kiye hain. Client ki pehchaan, naam aur
                contact information poori tarah guppt rakhi jaati hai. Yeh
                records sirf transparency aur public vishwaas ke liye share kiye
                gaye hain.
              </p>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-center justify-center flex-wrap gap-6 md:gap-12 mt-10"
            >
              {[
                {
                  icon: <Trophy className="h-5 w-5" />,
                  value: `${totalCount}+`,
                  label: "Cases Solved",
                },
                {
                  icon: (
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ),
                  value: `${avgRating}/5`,
                  label: "Avg. Rating",
                },
                {
                  icon: <Shield className="h-5 w-5" />,
                  value: `${policeCount}`,
                  label: "Police Assisted",
                },
                {
                  icon: <Users className="h-5 w-5" />,
                  value: "100%",
                  label: "Confidential",
                },
              ].map(({ icon, value, label }) => (
                <div key={label} className="text-center">
                  <div className="flex items-center justify-center gap-2 text-primary mb-1">
                    {icon}
                    <span className="text-2xl md:text-3xl font-black text-foreground">
                      {value}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-[11px] uppercase tracking-widest">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Achievement Badges ───────────────────────────────── */}
        <section className="bg-[oklch(0.09_0_0)] border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              {[
                {
                  icon: <Award className="h-4 w-4" />,
                  text: "Top Rated Agency",
                },
                {
                  icon: <Zap className="h-4 w-4" />,
                  text: "Fast Investigation",
                },
                {
                  icon: <Shield className="h-4 w-4" />,
                  text: "Legal & Certified",
                },
                {
                  icon: <Search className="h-4 w-4" />,
                  text: "99% Success Rate",
                },
                {
                  icon: <CheckCircle2 className="h-4 w-4" />,
                  text: "Court-Admissible Evidence",
                },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="text-primary/60">{icon}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cases Section ────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Tabs */}
          <div
            className="mb-8 overflow-x-auto"
            data-ocid="solved_cases.filter.tab"
          >
            <div className="flex gap-2 min-w-max pb-2">
              {categoryList.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  data-ocid="solved_cases.tab"
                  className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-sm border transition-all duration-200 whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                      : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Section header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-foreground font-black uppercase tracking-wider text-base">
                {activeCategory === "All"
                  ? "Sab Solve Kiye Gaye Cases"
                  : activeCategory}
              </h2>
              <p className="text-muted-foreground text-xs mt-0.5">
                {useStatic ? filteredStatic.length : filteredBackend.length}{" "}
                cases • Click karo details ke liye
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-primary/40" />
          </div>

          {/* Loading */}
          {isLoading && (
            <div
              data-ocid="solved_cases.loading_state"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {SKELETON_KEYS.map((k) => (
                <Skeleton key={k} className="h-44 rounded-sm" />
              ))}
            </div>
          )}

          {/* Static cases grid */}
          {!isLoading && useStatic && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredStatic.map((c, i) => (
                  <StaticCaseCard
                    key={c.id}
                    sc={c}
                    index={i}
                    onClick={() => {
                      setSelectedStatic(c);
                      setStaticDialogOpen(true);
                    }}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Backend cases grid */}
          {!isLoading && !useStatic && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredBackend.map((c, i) => (
                  <BackendCaseCard
                    key={c.id}
                    solvedCase={c}
                    index={i}
                    onClick={() => {
                      setSelectedBackend(c);
                      setBackendDialogOpen(true);
                    }}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Empty state (only when backend has cases but filter matches nothing) */}
          {!isLoading && !useStatic && filteredBackend.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              data-ocid="solved_cases.empty_state"
              className="text-center py-20"
            >
              <FileSearch className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">
                Is category mein koi case nahi mila.
              </p>
            </motion.div>
          )}
        </section>

        {/* ── Privacy Notice ───────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-muted/10 border border-border rounded-sm p-5 flex gap-4 items-start">
            <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-foreground font-semibold text-sm mb-1">
                Privacy Guarantee
              </p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                In tamam cases mein client ka naam, phone number, address, ya
                koi bhi pehchaan ki jaankari publicly share nahi ki gayi hai.
                Yeh records sirf case type, roadmap, aur outcome ke baare mein
                hain. Client ki consent se anonymized feedback share ki gayi
                hai.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Dialogs */}
      <StaticCaseDetailDialog
        sc={selectedStatic}
        open={staticDialogOpen}
        onClose={() => setStaticDialogOpen(false)}
      />
      <BackendCaseDetailDialog
        solvedCase={selectedBackend}
        open={backendDialogOpen}
        onClose={() => setBackendDialogOpen(false)}
      />
    </div>
  );
}
