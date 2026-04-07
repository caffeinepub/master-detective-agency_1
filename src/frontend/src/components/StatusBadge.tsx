import { Badge } from "@/components/ui/badge";
import { CaseStatus, InquiryStatus } from "../backend";

export function CaseStatusBadge({ status }: { status: CaseStatus }) {
  const config = {
    [CaseStatus.active]: {
      label: "Active",
      className: "bg-emerald-900/40 text-emerald-400 border-emerald-800",
    },
    [CaseStatus.pending]: {
      label: "Pending",
      className: "bg-yellow-900/40 text-yellow-400 border-yellow-800",
    },
    [CaseStatus.closed]: {
      label: "Closed",
      className: "bg-gray-900/40 text-gray-400 border-gray-700",
    },
  };

  const { label, className } = config[status] ?? {
    label: status,
    className: "",
  };

  return (
    <Badge
      variant="outline"
      className={`text-xs font-semibold uppercase tracking-wider ${className}`}
    >
      {label}
    </Badge>
  );
}

export function InquiryStatusBadge({ status }: { status: InquiryStatus }) {
  const config: Record<string, { label: string; className: string }> = {
    [InquiryStatus.new_]: {
      label: "New",
      className: "bg-blue-900/40 text-blue-400 border-blue-800",
    },
    [InquiryStatus.approved]: {
      label: "Approved",
      className: "bg-emerald-900/40 text-emerald-400 border-emerald-800",
    },
    [InquiryStatus.rejected]: {
      label: "Rejected",
      className: "bg-red-900/40 text-red-400 border-red-800",
    },
  };

  const key = status as string;
  const { label, className } = config[key] ?? {
    label: key,
    className: "",
  };

  return (
    <Badge
      variant="outline"
      className={`text-xs font-semibold uppercase tracking-wider ${className}`}
    >
      {label}
    </Badge>
  );
}
