import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FolderSearch } from "lucide-react";
import { CaseStatusBadge } from "../../components/StatusBadge";
import { useAuth } from "../../hooks/useAuth";
import { useCasesByClient } from "../../hooks/useQueries";

export function ClientCasesPage() {
  const { principal } = useAuth();
  const cases = useCasesByClient(principal ?? "");

  return (
    <div className="space-y-6" data-ocid="client.cases.page">
      <div>
        <h2 className="text-foreground font-black uppercase tracking-wider text-xl">
          My Cases
        </h2>
        <p className="text-muted-foreground text-sm">
          Track the progress of your investigations
        </p>
      </div>

      <div className="bg-card border border-border">
        {cases.isLoading ? (
          <div className="p-6 space-y-3" data-ocid="client.cases.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : (cases.data ?? []).length === 0 ? (
          <div
            className="p-12 text-center"
            data-ocid="client.cases.empty_state"
          >
            <FolderSearch className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-foreground font-semibold mb-2">No cases yet</h3>
            <p className="text-muted-foreground text-sm">
              Contact us to start an investigation. Your cases will appear here.
            </p>
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
                  Investigator
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Created
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Updated
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(cases.data ?? []).map((c, idx) => (
                <TableRow
                  key={c.id}
                  className="border-border hover:bg-muted/30"
                  data-ocid={`client.cases.row.${idx + 1}`}
                >
                  <TableCell className="text-primary text-xs font-mono">
                    {c.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell className="text-foreground font-medium text-sm">
                    {c.title}
                  </TableCell>
                  <TableCell>
                    <CaseStatusBadge status={c.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {c.investigatorId
                      ? `${c.investigatorId.slice(0, 8)}...`
                      : "Unassigned"}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {new Date(
                      Number(c.createdAt) / 1_000_000,
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {new Date(
                      Number(c.updatedAt) / 1_000_000,
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
