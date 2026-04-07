import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, ScrollText } from "lucide-react";
import { useActivityLogs } from "../../hooks/useQueries";

export function AdminLogsPage() {
  const logs = useActivityLogs();

  return (
    <div className="space-y-6" data-ocid="admin.logs.page">
      <div>
        <h2 className="text-foreground font-black uppercase tracking-wider text-xl">
          Activity Logs
        </h2>
        <p className="text-muted-foreground text-sm">
          System and user activity records
        </p>
      </div>

      <div className="bg-card border border-border">
        {logs.isLoading ? (
          <div className="p-6 space-y-3" data-ocid="admin.logs.loading_state">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (logs.data ?? []).length === 0 ? (
          <div className="p-8 text-center" data-ocid="admin.logs.empty_state">
            <ScrollText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">
              No activity logs yet
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Action
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  User
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  IP Address
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Timestamp
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(logs.data ?? []).map((log, idx) => (
                <TableRow
                  key={log.id}
                  className="border-border hover:bg-muted/30 font-mono"
                  data-ocid={`admin.logs.row.${idx + 1}`}
                >
                  <TableCell className="text-foreground text-xs">
                    {log.action}
                  </TableCell>
                  <TableCell className="text-primary text-xs">
                    {log.userId.toString().slice(0, 16)}...
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {log.ipAddress}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {new Date(
                      Number(log.timestamp) / 1_000_000,
                    ).toLocaleString()}
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
