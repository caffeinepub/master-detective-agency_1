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
  AlertCircle,
  CheckCircle,
  Clock,
  FolderSearch,
  MessageSquare,
  TrendingUp,
  UserCog,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { CaseStatus } from "../../backend";
import { CaseStatusBadge } from "../../components/StatusBadge";
import { useAllCases } from "../../hooks/useQueries";
import { useAllClients } from "../../hooks/useQueries";
import { useAllStaff } from "../../hooks/useQueries";
import { useAllInquiries } from "../../hooks/useQueries";

export function AdminDashboardPage() {
  const cases = useAllCases();
  const clients = useAllClients();
  const staff = useAllStaff();
  const inquiries = useAllInquiries();

  const totalCases = cases.data?.length ?? 0;
  const activeCases =
    cases.data?.filter((c) => c.status === CaseStatus.active).length ?? 0;
  const pendingCases =
    cases.data?.filter((c) => c.status === CaseStatus.pending).length ?? 0;
  const totalClients = clients.data?.length ?? 0;
  const totalStaff = staff.data?.length ?? 0;
  const newInquiries =
    inquiries.data?.filter((i) => (i.status as string) === "new").length ?? 0;

  const stats = [
    {
      label: "Total Cases",
      value: totalCases,
      icon: FolderSearch,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Active Cases",
      value: activeCases,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-900/20",
    },
    {
      label: "Total Clients",
      value: totalClients,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-900/20",
    },
    {
      label: "Staff Members",
      value: totalStaff,
      icon: UserCog,
      color: "text-purple-400",
      bg: "bg-purple-900/20",
    },
  ];

  const recentCases = cases.data?.slice(0, 8) ?? [];

  return (
    <div className="space-y-6" data-ocid="admin.page">
      <div>
        <h2 className="text-foreground font-black uppercase tracking-wider text-xl mb-1">
          Dashboard
        </h2>
        <p className="text-muted-foreground text-sm">
          Overview of agency operations
        </p>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="admin.stats.panel"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="stat-card"
            data-ocid={`admin.stats.item.${idx + 1}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 ${stat.bg} flex items-center justify-center`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
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

      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border p-4 flex items-center gap-3">
          <Clock className="h-5 w-5 text-yellow-400" />
          <div>
            <div className="text-foreground font-bold">{pendingCases}</div>
            <div className="text-muted-foreground text-xs uppercase tracking-wider">
              Pending Cases
            </div>
          </div>
        </div>
        <div className="bg-card border border-border p-4 flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-blue-400" />
          <div>
            <div className="text-foreground font-bold">{newInquiries}</div>
            <div className="text-muted-foreground text-xs uppercase tracking-wider">
              New Inquiries
            </div>
          </div>
        </div>
        <div className="bg-card border border-border p-4 flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-emerald-400" />
          <div>
            <div className="text-foreground font-bold">
              {cases.data?.filter((c) => c.status === CaseStatus.closed)
                .length ?? 0}
            </div>
            <div className="text-muted-foreground text-xs uppercase tracking-wider">
              Closed Cases
            </div>
          </div>
        </div>
      </div>

      {/* Recent Cases */}
      <div className="bg-card border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-foreground font-bold uppercase tracking-wider text-sm">
            Recent Cases
          </h3>
        </div>
        {cases.isLoading ? (
          <div className="p-6 space-y-3" data-ocid="admin.cases.loading_state">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : recentCases.length === 0 ? (
          <div className="p-8 text-center" data-ocid="admin.cases.empty_state">
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">No cases yet</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Case ID
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Title
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Status
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Created
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
    </div>
  );
}
