import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  AlertCircle,
  Award,
  BarChart3,
  Camera,
  CheckCircle,
  Clock,
  Eye,
  Fingerprint,
  FolderOpen,
  FolderSearch,
  MessageSquare,
  Search,
  Shield,
  Star,
  TrendingUp,
  UserCog,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CaseStatus } from "../../backend";
import { CaseStatusBadge } from "../../components/StatusBadge";
import { useAllCases } from "../../hooks/useQueries";
import { useAllClients } from "../../hooks/useQueries";
import { useAllStaff } from "../../hooks/useQueries";
import { useAllInquiries } from "../../hooks/useQueries";

// ── Slideshow data ────────────────────────────────────────────────────────────
const slides = [
  {
    image: "/assets/generated/dashboard-slide-1.dim_1200x500.jpg",
    title: "🕵️ Surveillance Operations",
    subtitle: "Elite field operatives watching every move",
    badge: "🔴 LIVE OPS",
  },
  {
    image: "/assets/generated/dashboard-slide-2.dim_1200x500.jpg",
    title: "🗂️ Case Intelligence Hub",
    subtitle: "Evidence boards, case files & investigation briefs",
    badge: "📁 ACTIVE CASES",
  },
  {
    image: "/assets/generated/dashboard-slide-3.dim_1200x500.jpg",
    title: "🏆 Proven Results",
    subtitle: "98% case resolution rate — justice delivered",
    badge: "✅ SUCCESS RATE",
  },
];

// ── Gallery data ──────────────────────────────────────────────────────────────
const galleryItems = [
  {
    image: "/assets/generated/gallery-1.dim_400x300.jpg",
    label: "🔭 Surveillance Gear",
  },
  {
    image: "/assets/generated/gallery-2.dim_400x300.jpg",
    label: "🔬 Forensic Analysis",
  },
  {
    image: "/assets/generated/gallery-3.dim_400x300.jpg",
    label: "🏢 Agency HQ",
  },
  {
    image: "/assets/generated/gallery-4.dim_400x300.jpg",
    label: "🖥️ Intel Operations",
  },
  {
    image: "/assets/generated/gallery-5.dim_400x300.jpg",
    label: "📜 Legal Documents",
  },
  {
    image: "/assets/generated/gallery-6.dim_400x300.jpg",
    label: "👥 Our Team",
  },
];

// ── Quick links ───────────────────────────────────────────────────────────────
const quickLinks = [
  {
    icon: FolderSearch,
    label: "Cases",
    emoji: "📁",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/30",
  },
  {
    icon: Users,
    label: "Clients",
    emoji: "👤",
    color: "text-blue-400",
    bg: "bg-blue-900/20 border-blue-800/30",
  },
  {
    icon: UserCog,
    label: "Staff",
    emoji: "🧑‍💼",
    color: "text-purple-400",
    bg: "bg-purple-900/20 border-purple-800/30",
  },
  {
    icon: MessageSquare,
    label: "Inquiries",
    emoji: "💬",
    color: "text-yellow-400",
    bg: "bg-yellow-900/20 border-yellow-800/30",
  },
  {
    icon: Camera,
    label: "Media",
    emoji: "📷",
    color: "text-emerald-400",
    bg: "bg-emerald-900/20 border-emerald-800/30",
  },
  {
    icon: Activity,
    label: "Logs",
    emoji: "📋",
    color: "text-orange-400",
    bg: "bg-orange-900/20 border-orange-800/30",
  },
];

// ── Achievements ──────────────────────────────────────────────────────────────
const achievements = [
  {
    icon: Award,
    emoji: "🥇",
    label: "Top Agency",
    sub: "Best detective agency 2024",
    color: "text-yellow-400",
  },
  {
    icon: Star,
    emoji: "⭐",
    label: "5-Star Rated",
    sub: "500+ satisfied clients",
    color: "text-amber-400",
  },
  {
    icon: Shield,
    emoji: "🛡️",
    label: "Certified",
    sub: "Govt. licensed investigators",
    color: "text-blue-400",
  },
  {
    icon: Zap,
    emoji: "⚡",
    label: "Fast Results",
    sub: "Avg. 48-hr turnaround",
    color: "text-emerald-400",
  },
];

// ── Slideshow Component ───────────────────────────────────────────────────────
function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4500);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: startTimer is stable
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  return (
    <div
      className="relative w-full rounded-sm overflow-hidden border border-border"
      style={{ height: 320 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 p-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-xs uppercase tracking-widest border border-primary/50 bg-primary/20 text-primary px-3 py-1 mb-3"
            >
              {slides[current].badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white font-black uppercase tracking-wider text-xl md:text-2xl mb-1"
            >
              {slides[current].title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 text-sm"
            >
              {slides[current].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 right-6 flex gap-2 z-10">
        {slides.map((slide, i) => (
          <button
            key={slide.badge}
            type="button"
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export function AdminDashboardPage() {
  const cases = useAllCases();
  const clients = useAllClients();
  const staff = useAllStaff();
  const inquiries = useAllInquiries();
  const [selectedGallery, setSelectedGallery] = useState<number | null>(null);

  const totalCases = cases.data?.length ?? 0;
  const activeCases =
    cases.data?.filter((c) => c.status === CaseStatus.active).length ?? 0;
  const pendingCases =
    cases.data?.filter((c) => c.status === CaseStatus.pending).length ?? 0;
  const closedCases =
    cases.data?.filter((c) => c.status === CaseStatus.closed).length ?? 0;
  const totalClients = clients.data?.length ?? 0;
  const totalStaff = staff.data?.length ?? 0;
  const newInquiries =
    inquiries.data?.filter((i) => (i.status as string) === "new").length ?? 0;

  const stats = [
    {
      label: "Total Cases",
      value: totalCases,
      icon: FolderSearch,
      emoji: "📁",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/30",
    },
    {
      label: "Active Cases",
      value: activeCases,
      icon: TrendingUp,
      emoji: "🔥",
      color: "text-emerald-400",
      bg: "bg-emerald-900/20",
      border: "border-emerald-800/30",
    },
    {
      label: "Total Clients",
      value: totalClients,
      icon: Users,
      emoji: "👥",
      color: "text-blue-400",
      bg: "bg-blue-900/20",
      border: "border-blue-800/30",
    },
    {
      label: "Staff Members",
      value: totalStaff,
      icon: UserCog,
      emoji: "🧑‍💼",
      color: "text-purple-400",
      bg: "bg-purple-900/20",
      border: "border-purple-800/30",
    },
  ];

  const recentCases = cases.data?.slice(0, 6) ?? [];

  return (
    <div className="space-y-6 pb-8" data-ocid="admin.page">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground font-black uppercase tracking-wider text-xl mb-1">
            🕵️ Master Detective Dashboard
          </h2>
          <p className="text-muted-foreground text-sm">
            Welcome back, Admin 👋 — Agency operations overview
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 border border-primary/30 bg-primary/10 px-3 py-1.5">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-400 text-xs uppercase tracking-widest font-semibold">
            System Online
          </span>
        </div>
      </div>

      {/* ── Hero Slideshow ── */}
      <div data-ocid="admin.slideshow">
        <HeroSlideshow />
      </div>

      {/* ── Stats ── */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="admin.stats.panel"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
            className={`bg-card border ${stat.border} p-5 rounded-sm hover:shadow-lg transition-all duration-200`}
            data-ocid={`admin.stats.item.${idx + 1}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 ${stat.bg} border ${stat.border} flex items-center justify-center rounded-sm`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span className="text-2xl">{stat.emoji}</span>
            </div>
            {cases.isLoading ? (
              <Skeleton
                className="h-8 w-16 mb-1"
                data-ocid="admin.stats.loading_state"
              />
            ) : (
              <div className="text-3xl font-black text-foreground mb-1">
                {stat.value}
              </div>
            )}
            <div className="text-muted-foreground text-xs uppercase tracking-wider">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Summary Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border p-4 flex items-center gap-3 rounded-sm">
          <div className="text-2xl">⏳</div>
          <Clock className="h-5 w-5 text-yellow-400" />
          <div>
            <div className="text-foreground font-bold text-xl">
              {pendingCases}
            </div>
            <div className="text-muted-foreground text-xs uppercase tracking-wider">
              Pending Cases
            </div>
          </div>
        </div>
        <div className="bg-card border border-border p-4 flex items-center gap-3 rounded-sm">
          <div className="text-2xl">💬</div>
          <MessageSquare className="h-5 w-5 text-blue-400" />
          <div>
            <div className="text-foreground font-bold text-xl">
              {newInquiries}
            </div>
            <div className="text-muted-foreground text-xs uppercase tracking-wider">
              New Inquiries
            </div>
          </div>
        </div>
        <div className="bg-card border border-border p-4 flex items-center gap-3 rounded-sm">
          <div className="text-2xl">✅</div>
          <CheckCircle className="h-5 w-5 text-emerald-400" />
          <div>
            <div className="text-foreground font-bold text-xl">
              {closedCases}
            </div>
            <div className="text-muted-foreground text-xs uppercase tracking-wider">
              Closed Cases
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column: Quick Actions + Services ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Links */}
        <div className="bg-card border border-border rounded-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <h3 className="text-foreground font-bold uppercase tracking-wider text-sm">
              ⚡ Quick Access
            </h3>
          </div>
          <div className="p-4 grid grid-cols-3 gap-3">
            {quickLinks.map((ql, i) => (
              <motion.div
                key={ql.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`flex flex-col items-center justify-center p-3 border ${ql.bg} rounded-sm cursor-pointer hover:opacity-80 transition-all`}
              >
                <span className="text-2xl mb-1">{ql.emoji}</span>
                <ql.icon className={`h-4 w-4 ${ql.color} mb-1`} />
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${ql.color}`}
                >
                  {ql.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-card border border-border rounded-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <h3 className="text-foreground font-bold uppercase tracking-wider text-sm">
              🏆 Agency Achievements
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {achievements.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 p-3 border border-border/50 bg-background/50 rounded-sm"
              >
                <span className="text-2xl">{a.emoji}</span>
                <div className="w-9 h-9 rounded-full bg-card flex items-center justify-center">
                  <a.icon className={`h-4 w-4 ${a.color}`} />
                </div>
                <div>
                  <div className={`font-bold text-sm ${a.color}`}>
                    {a.label}
                  </div>
                  <div className="text-muted-foreground text-xs">{a.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Service Icons Row ── */}
      <div className="bg-card border border-border rounded-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          <h3 className="text-foreground font-bold uppercase tracking-wider text-sm">
            🔍 Our Services
          </h3>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            {
              emoji: "🔎",
              icon: Search,
              label: "Investigation",
              color: "text-primary",
            },
            {
              emoji: "👁️",
              icon: Eye,
              label: "Surveillance",
              color: "text-blue-400",
            },
            {
              emoji: "🧬",
              icon: Fingerprint,
              label: "Forensics",
              color: "text-emerald-400",
            },
            {
              emoji: "🏢",
              icon: FolderOpen,
              label: "Corporate",
              color: "text-purple-400",
            },
            {
              emoji: "📊",
              icon: BarChart3,
              label: "Background",
              color: "text-yellow-400",
            },
            {
              emoji: "🛡️",
              icon: Shield,
              label: "Protection",
              color: "text-red-400",
            },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-2 p-3 border border-border/40 hover:border-primary/40 hover:bg-primary/5 rounded-sm transition-all cursor-pointer group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {s.emoji}
              </span>
              <s.icon className={`h-4 w-4 ${s.color}`} />
              <span className="text-muted-foreground text-[10px] uppercase tracking-wider text-center">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Photo Gallery ── */}
      <div
        className="bg-card border border-border rounded-sm overflow-hidden"
        data-ocid="admin.gallery"
      >
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Camera className="h-4 w-4 text-primary" />
          <h3 className="text-foreground font-bold uppercase tracking-wider text-sm">
            📸 Agency Gallery
          </h3>
          <Badge variant="secondary" className="ml-auto text-xs">
            {galleryItems.length} Photos
          </Badge>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {galleryItems.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              onClick={() =>
                setSelectedGallery(selectedGallery === i ? null : i)
              }
              className="relative group cursor-pointer rounded-sm overflow-hidden border border-border hover:border-primary/50 transition-all"
              style={{ aspectRatio: "4/3" }}
              data-ocid={`admin.gallery.item.${i + 1}`}
            >
              <img
                src={g.image}
                alt={g.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-semibold uppercase tracking-wider">
                  {g.label}
                </span>
              </div>
              <div className="absolute top-2 right-2 bg-black/60 border border-border rounded px-2 py-0.5">
                <span className="text-[10px] text-white uppercase tracking-wider">
                  {g.label.split(" ")[0]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Expanded View */}
        {selectedGallery !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-4"
          >
            <div className="border border-primary/30 rounded-sm overflow-hidden">
              <img
                src={galleryItems[selectedGallery].image}
                alt={galleryItems[selectedGallery].label}
                className="w-full max-h-64 object-cover"
              />
              <div className="bg-card/80 px-4 py-2 border-t border-border flex items-center gap-2">
                <span className="text-primary text-sm font-bold">
                  {galleryItems[selectedGallery].label}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedGallery(null)}
                  className="ml-auto text-muted-foreground hover:text-foreground text-xs uppercase tracking-wider"
                >
                  ✕ Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Recent Cases ── */}
      <div className="bg-card border border-border rounded-sm">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <FolderSearch className="h-4 w-4 text-primary" />
          <h3 className="text-foreground font-bold uppercase tracking-wider text-sm">
            📁 Recent Cases
          </h3>
          {recentCases.length > 0 && (
            <Badge
              variant="outline"
              className="ml-auto text-xs border-primary/30 text-primary"
            >
              {recentCases.length} Cases
            </Badge>
          )}
        </div>
        {cases.isLoading ? (
          <div className="p-6 space-y-3" data-ocid="admin.cases.loading_state">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : recentCases.length === 0 ? (
          <div className="p-8 text-center" data-ocid="admin.cases.empty_state">
            <div className="text-5xl mb-3">📭</div>
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">
              No cases yet. Create your first case to get started!
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  🔢 Case ID
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  📋 Title
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  🔖 Status
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  📅 Created
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCases.map((c, idx) => (
                <TableRow
                  key={c.id}
                  className="border-border hover:bg-muted/30"
                  data-ocid={`admin.cases.row.${idx + 1}`}
                >
                  <TableCell className="text-primary text-xs font-mono">
                    {c.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell className="text-foreground text-sm font-medium">
                    {c.title}
                  </TableCell>
                  <TableCell>
                    <CaseStatusBadge status={c.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {new Date(
                      Number(c.createdAt) / 1_000_000,
                    ).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* ── Footer Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative overflow-hidden rounded-sm border border-primary/30 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-6"
      >
        <div className="relative z-10">
          <div className="text-3xl mb-2">🕵️‍♂️ 🔍 💼 🛡️</div>
          <h3 className="text-foreground font-black uppercase tracking-widest text-lg">
            Master Detective Agency
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            Professional. Confidential. Results-Driven. — Est. 2004
          </p>
          <div className="flex flex-wrap gap-3 mt-3">
            {[
              "🏆 5000+ Cases",
              "⭐ 98% Success",
              "🔐 100% Confidential",
              "⚡ 24/7 Operations",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs border border-primary/30 bg-primary/10 text-primary px-3 py-1 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute right-6 top-6 text-8xl opacity-10">🕵️</div>
      </motion.div>
    </div>
  );
}
