import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, FileText, Loader2, Plus, Search, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { type Case, CaseStatus } from "../../backend";
import { CaseStatusBadge } from "../../components/StatusBadge";
import {
  useAddNotes,
  useAllCases,
  useAllClients,
  useAllStaff,
  useAssignInvestigator,
  useCaseFiles,
  useCreateCase,
  useUpdateCaseStatus,
} from "../../hooks/useQueries";

export function AdminCasesPage() {
  const cases = useAllCases();
  const clients = useAllClients();
  const staff = useAllStaff();
  const createCase = useCreateCase();
  const updateStatus = useUpdateCaseStatus();
  const assignInvestigator = useAssignInvestigator();
  const addNotes = useAddNotes();

  const [search, setSearch] = useState("");
  const [newCaseOpen, setNewCaseOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [newCaseForm, setNewCaseForm] = useState({
    title: "",
    description: "",
    clientId: "",
  });
  const [notesInput, setNotesInput] = useState("");

  const caseFiles = useCaseFiles(selectedCase?.id ?? "");

  const filtered = (cases.data ?? []).filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseForm.title || !newCaseForm.clientId) {
      toast.error("Title and client are required.");
      return;
    }
    try {
      await createCase.mutateAsync(newCaseForm);
      toast.success("Case created successfully.");
      setNewCaseOpen(false);
      setNewCaseForm({ title: "", description: "", clientId: "" });
    } catch {
      toast.error("Failed to create case.");
    }
  };

  const handleStatusChange = async (caseId: string, status: CaseStatus) => {
    try {
      await updateStatus.mutateAsync({ caseId, status });
      if (selectedCase) setSelectedCase({ ...selectedCase, status });
      toast.success("Status updated.");
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const handleAssign = async (caseId: string, investigatorId: string) => {
    try {
      await assignInvestigator.mutateAsync({ caseId, investigatorId });
      toast.success("Investigator assigned.");
    } catch {
      toast.error("Failed to assign investigator.");
    }
  };

  const handleAddNotes = async () => {
    if (!selectedCase || !notesInput.trim()) return;
    try {
      await addNotes.mutateAsync({
        caseId: selectedCase.id,
        notes: notesInput,
      });
      setNotesInput("");
      toast.success("Notes saved.");
    } catch {
      toast.error("Failed to save notes.");
    }
  };

  return (
    <div className="space-y-6" data-ocid="admin.cases.page">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground font-black uppercase tracking-wider text-xl">
            Cases
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage all investigation cases
          </p>
        </div>
        <Dialog open={newCaseOpen} onOpenChange={setNewCaseOpen}>
          <DialogTrigger asChild>
            <Button
              data-ocid="admin.cases.open_modal_button"
              className="detective-btn-primary gap-2"
            >
              <Plus className="h-4 w-4" /> New Case
            </Button>
          </DialogTrigger>
          <DialogContent
            className="bg-card border-border"
            data-ocid="admin.cases.dialog"
          >
            <DialogHeader>
              <DialogTitle className="text-foreground uppercase tracking-wider">
                New Case
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateCase} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                  Title *
                </Label>
                <Input
                  data-ocid="admin.cases.input"
                  placeholder="Case title"
                  value={newCaseForm.title}
                  onChange={(e) =>
                    setNewCaseForm({ ...newCaseForm, title: e.target.value })
                  }
                  className="bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                  Description
                </Label>
                <Textarea
                  data-ocid="admin.cases.textarea"
                  placeholder="Case description"
                  value={newCaseForm.description}
                  onChange={(e) =>
                    setNewCaseForm({
                      ...newCaseForm,
                      description: e.target.value,
                    })
                  }
                  className="bg-background resize-none"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                  Client *
                </Label>
                <Select
                  onValueChange={(v) =>
                    setNewCaseForm({ ...newCaseForm, clientId: v })
                  }
                >
                  <SelectTrigger
                    data-ocid="admin.cases.select"
                    className="bg-background"
                  >
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {(clients.data ?? []).map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.fullName}
                      </SelectItem>
                    ))}
                    {(clients.data ?? []).length === 0 && (
                      <SelectItem value="">No clients available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  data-ocid="admin.cases.submit_button"
                  disabled={createCase.isPending}
                  className="detective-btn-primary flex-1"
                >
                  {createCase.isPending && (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  )}
                  Create Case
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  data-ocid="admin.cases.cancel_button"
                  onClick={() => setNewCaseOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          data-ocid="admin.cases.search_input"
          placeholder="Search cases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border">
        {cases.isLoading ? (
          <div className="p-6 space-y-3" data-ocid="admin.cases.loading_state">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center" data-ocid="admin.cases.empty_state">
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">No cases found</p>
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
                  Client
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
              {filtered.map((c, idx) => (
                <TableRow
                  key={c.id}
                  className="border-border hover:bg-muted/30 cursor-pointer"
                  onClick={() => {
                    setSelectedCase(c);
                    setNotesInput(c.notes || "");
                  }}
                  data-ocid={`admin.cases.row.${idx + 1}`}
                >
                  <TableCell className="text-primary text-xs font-mono">
                    {c.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell className="text-foreground text-sm font-medium">
                    {c.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {c.clientId.slice(0, 8)}...
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

      {/* Case Detail Sheet */}
      <Sheet
        open={!!selectedCase}
        onOpenChange={(o) => !o && setSelectedCase(null)}
      >
        <SheetContent
          className="bg-card border-border w-full sm:w-[500px] overflow-y-auto scrollbar-thin"
          data-ocid="admin.cases.sheet"
        >
          {selectedCase && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-foreground uppercase tracking-wider">
                  Case Detail
                </SheetTitle>
                <div className="text-primary text-xs font-mono">
                  {selectedCase.id}
                </div>
              </SheetHeader>

              <div className="space-y-5">
                <div>
                  <h4 className="text-foreground font-bold text-sm mb-1">
                    {selectedCase.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {selectedCase.description}
                  </p>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                    Status
                  </Label>
                  <Select
                    value={selectedCase.status}
                    onValueChange={(v) =>
                      handleStatusChange(selectedCase.id, v as CaseStatus)
                    }
                  >
                    <SelectTrigger
                      data-ocid="admin.cases.select"
                      className="bg-background"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={CaseStatus.pending}>
                        Pending
                      </SelectItem>
                      <SelectItem value={CaseStatus.active}>Active</SelectItem>
                      <SelectItem value={CaseStatus.closed}>Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Assign Investigator */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                    Assign Investigator
                  </Label>
                  <Select
                    value={selectedCase.investigatorId || ""}
                    onValueChange={(v) => handleAssign(selectedCase.id, v)}
                  >
                    <SelectTrigger
                      data-ocid="admin.cases.select"
                      className="bg-background"
                    >
                      <SelectValue placeholder="Select investigator" />
                    </SelectTrigger>
                    <SelectContent>
                      {(staff.data ?? []).map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.fullName} — {s.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                    Notes
                  </Label>
                  <Textarea
                    data-ocid="admin.cases.textarea"
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    placeholder="Add investigation notes..."
                    className="bg-background resize-none"
                    rows={4}
                  />
                  <Button
                    size="sm"
                    data-ocid="admin.cases.save_button"
                    className="detective-btn-primary text-xs"
                    onClick={handleAddNotes}
                    disabled={addNotes.isPending}
                  >
                    {addNotes.isPending && (
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    )}
                    Save Notes
                  </Button>
                </div>

                {/* Files */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                    Attached Files
                  </Label>
                  {caseFiles.isLoading ? (
                    <Skeleton className="h-10 w-full" />
                  ) : (caseFiles.data ?? []).length === 0 ? (
                    <div
                      className="text-muted-foreground text-xs border border-border p-3"
                      data-ocid="admin.files.empty_state"
                    >
                      No files attached
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {(caseFiles.data ?? []).map((f) => (
                        <div
                          key={f.id}
                          className="flex items-center gap-2 bg-background border border-border p-2 text-xs"
                        >
                          <FileText className="h-3.5 w-3.5 text-primary" />
                          <span className="text-foreground">{f.fileName}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
