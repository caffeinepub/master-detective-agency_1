import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, CheckCircle, Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { InquiryStatus } from "../../backend";
import { InquiryStatusBadge } from "../../components/StatusBadge";
import {
  useAllInquiries,
  useApproveInquiry,
  useRejectInquiry,
} from "../../hooks/useQueries";

export function AdminInquiriesPage() {
  const inquiries = useAllInquiries();
  const approve = useApproveInquiry();
  const reject = useRejectInquiry();

  const handleApprove = async (id: string) => {
    try {
      await approve.mutateAsync(id);
      toast.success("Inquiry approved.");
    } catch {
      toast.error("Failed to approve inquiry.");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await reject.mutateAsync(id);
      toast.success("Inquiry rejected.");
    } catch {
      toast.error("Failed to reject inquiry.");
    }
  };

  return (
    <div className="space-y-6" data-ocid="admin.inquiries.page">
      <div>
        <h2 className="text-foreground font-black uppercase tracking-wider text-xl">
          Inquiries
        </h2>
        <p className="text-muted-foreground text-sm">
          Manage incoming client inquiries
        </p>
      </div>

      <div className="bg-card border border-border">
        {inquiries.isLoading ? (
          <div
            className="p-6 space-y-3"
            data-ocid="admin.inquiries.loading_state"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : (inquiries.data ?? []).length === 0 ? (
          <div
            className="p-8 text-center"
            data-ocid="admin.inquiries.empty_state"
          >
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">No inquiries yet</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Name
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Email
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Phone
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Message
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Status
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Date
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(inquiries.data ?? []).map((inq, idx) => (
                <TableRow
                  key={inq.id}
                  className="border-border hover:bg-muted/30"
                  data-ocid={`admin.inquiries.row.${idx + 1}`}
                >
                  <TableCell className="text-foreground font-medium text-sm">
                    {inq.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {inq.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {inq.phone}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs max-w-[200px]">
                    <span className="line-clamp-2">{inq.message}</span>
                  </TableCell>
                  <TableCell>
                    <InquiryStatusBadge status={inq.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {new Date(
                      Number(inq.createdAt) / 1_000_000,
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {(inq.status as string) === "new" && (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          data-ocid={`admin.inquiries.confirm_button.${idx + 1}`}
                          onClick={() => handleApprove(inq.id)}
                          disabled={approve.isPending}
                          className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/20 h-7 w-7 p-0"
                          title="Approve"
                        >
                          {approve.isPending ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <CheckCircle className="h-3.5 w-3.5" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          data-ocid={`admin.inquiries.delete_button.${idx + 1}`}
                          onClick={() => handleReject(inq.id)}
                          disabled={reject.isPending}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 h-7 w-7 p-0"
                          title="Reject"
                        >
                          {reject.isPending ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    )}
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
