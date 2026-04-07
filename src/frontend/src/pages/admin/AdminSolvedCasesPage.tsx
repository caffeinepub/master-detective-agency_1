import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  Plus,
  Star,
  Trash2,
  Trophy,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { SolvedCase } from "../../backend";
import {
  useAddSolvedCase,
  useAllSolvedCases,
  useDeleteSolvedCase,
  useUpdateSolvedCase,
} from "../../hooks/useQueries";

const CATEGORIES = [
  "Corporate Investigation",
  "Missing Person",
  "Background Verification",
  "Personal Investigation",
  "Fraud Investigation",
  "Asset Investigation",
  "Surveillance",
  "Other",
];

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4"];

interface RoadmapStep {
  step: string;
  title: string;
  detail: string;
  _id: string;
}

function parseRoadmap(json: string): RoadmapStep[] {
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed))
      return parsed.map((s, i) => ({ ...s, _id: `step-${i}-${s.step || i}` }));
    return [];
  } catch {
    return [];
  }
}

const defaultForm = (): Omit<SolvedCase, "id" | "createdAt"> => ({
  caseNumber: "",
  category: CATEGORIES[0],
  title: "",
  description: "",
  duration: "",
  outcome: "",
  roadmap: "[]",
  challenges: "",
  policeHelp: false,
  policeHelpDetail: "",
  feedback: "",
  rating: BigInt(5),
  isPublished: false,
});

function RoadmapEditor({
  value,
  onChange,
}: {
  value: RoadmapStep[];
  onChange: (steps: RoadmapStep[]) => void;
}) {
  const addStep = () => {
    const newStep: RoadmapStep = {
      step: String(value.length + 1),
      title: "",
      detail: "",
      _id: `step-${Date.now()}`,
    };
    onChange([...value, newStep]);
  };

  const removeStep = (id: string) => {
    onChange(value.filter((s) => s._id !== id));
  };

  const updateStep = (
    id: string,
    field: keyof Omit<RoadmapStep, "_id">,
    val: string,
  ) => {
    onChange(value.map((s) => (s._id === id ? { ...s, [field]: val } : s)));
  };

  return (
    <div className="space-y-3">
      {value.map((step, idx) => (
        <div
          key={step._id}
          className="bg-muted/30 border border-border rounded p-3 space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-primary font-mono text-xs font-bold">
              Step {step.step || idx + 1}
            </span>
            <button
              type="button"
              onClick={() => removeStep(step._id)}
              className="text-destructive hover:text-destructive/80"
              aria-label="Remove step"
            >
              <XCircle className="h-4 w-4" />
            </button>
          </div>
          <Input
            placeholder="Step title"
            value={step.title}
            onChange={(e) => updateStep(step._id, "title", e.target.value)}
            className="bg-background border-border text-xs"
          />
          <Textarea
            placeholder="Step detail (optional)"
            value={step.detail}
            onChange={(e) => updateStep(step._id, "detail", e.target.value)}
            className="bg-background border-border text-xs min-h-[60px]"
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addStep}
        className="w-full border-dashed border-primary/40 text-primary/80 hover:border-primary hover:text-primary text-xs"
      >
        <Plus className="h-3.5 w-3.5 mr-1" />
        Add Roadmap Step
      </Button>
    </div>
  );
}

function CaseFormDialog({
  open,
  onClose,
  initialData,
  mode,
}: {
  open: boolean;
  onClose: () => void;
  initialData?: SolvedCase;
  mode: "add" | "edit";
}) {
  const addMutation = useAddSolvedCase();
  const updateMutation = useUpdateSolvedCase();

  const [form, setForm] = useState<Omit<SolvedCase, "id" | "createdAt">>(() =>
    initialData
      ? {
          caseNumber: initialData.caseNumber,
          category: initialData.category,
          title: initialData.title,
          description: initialData.description,
          duration: initialData.duration,
          outcome: initialData.outcome,
          roadmap: initialData.roadmap,
          challenges: initialData.challenges,
          policeHelp: initialData.policeHelp,
          policeHelpDetail: initialData.policeHelpDetail,
          feedback: initialData.feedback,
          rating: initialData.rating,
          isPublished: initialData.isPublished,
        }
      : defaultForm(),
  );

  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>(() =>
    parseRoadmap(initialData?.roadmap ?? "[]"),
  );

  const isPending = addMutation.isPending || updateMutation.isPending;

  const handleSubmit = async () => {
    if (!form.caseNumber.trim() || !form.title.trim()) {
      toast.error("Case number and title are required");
      return;
    }
    // Strip the internal _id field before serializing
    const cleanSteps = roadmapSteps.map(({ step, title, detail }) => ({
      step,
      title,
      detail,
    }));
    const payload: SolvedCase = {
      ...form,
      id: initialData?.id ?? "",
      createdAt: initialData?.createdAt ?? BigInt(0),
      roadmap: JSON.stringify(cleanSteps),
    };

    try {
      if (mode === "add") {
        await addMutation.mutateAsync(payload);
        toast.success("Case added successfully");
      } else if (initialData) {
        await updateMutation.mutateAsync({ id: initialData.id, data: payload });
        toast.success("Case updated successfully");
      }
      onClose();
    } catch {
      toast.error("Failed to save case. Please try again.");
    }
  };

  const set = (field: keyof typeof form, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid={mode === "add" ? "add_case.dialog" : "edit_case.dialog"}
        className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border text-foreground"
      >
        <DialogHeader>
          <DialogTitle className="uppercase tracking-wider text-sm">
            {mode === "add" ? "Add New Solved Case" : "Edit Solved Case"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Case Number */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider">
                Case Number *
              </Label>
              <Input
                data-ocid="case_number.input"
                placeholder="SC-2024-001"
                value={form.caseNumber}
                onChange={(e) => set("caseNumber", e.target.value)}
                className="bg-background border-border font-mono text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider">
                Category *
              </Label>
              <Select
                value={form.category}
                onValueChange={(v) => set("category", v)}
              >
                <SelectTrigger
                  data-ocid="category.select"
                  className="bg-background border-border text-sm"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-sm">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider">Title *</Label>
            <Input
              data-ocid="title.input"
              placeholder="Generic case title (no client names)"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className="bg-background border-border text-sm"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider">
              Description
            </Label>
            <Textarea
              data-ocid="description.textarea"
              placeholder="Brief case overview without identifying details..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="bg-background border-border text-sm min-h-[80px]"
            />
          </div>

          {/* Duration + Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider">
                Duration
              </Label>
              <Input
                data-ocid="duration.input"
                placeholder="e.g. 3 weeks"
                value={form.duration}
                onChange={(e) => set("duration", e.target.value)}
                className="bg-background border-border text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider">
                Star Rating (1–5)
              </Label>
              <Select
                value={String(Number(form.rating))}
                onValueChange={(v) => set("rating", BigInt(v))}
              >
                <SelectTrigger
                  data-ocid="rating.select"
                  className="bg-background border-border text-sm"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)} className="text-sm">
                      {Array.from({ length: n }, () => "★").join("")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Outcome */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider">Outcome</Label>
            <Textarea
              data-ocid="outcome.textarea"
              placeholder="Case resolution and final result..."
              value={form.outcome}
              onChange={(e) => set("outcome", e.target.value)}
              className="bg-background border-border text-sm min-h-[70px]"
            />
          </div>

          {/* Roadmap */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider">
              Investigation Roadmap
            </Label>
            <RoadmapEditor value={roadmapSteps} onChange={setRoadmapSteps} />
          </div>

          {/* Challenges */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider">
              Challenges Faced
            </Label>
            <Textarea
              data-ocid="challenges.textarea"
              placeholder="Difficulties encountered during the investigation..."
              value={form.challenges}
              onChange={(e) => set("challenges", e.target.value)}
              className="bg-background border-border text-sm min-h-[70px]"
            />
          </div>

          {/* Police Help */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Switch
                id="policeHelp"
                data-ocid="police_help.switch"
                checked={form.policeHelp}
                onCheckedChange={(v) => set("policeHelp", v)}
              />
              <Label
                htmlFor="policeHelp"
                className="text-xs uppercase tracking-wider cursor-pointer"
              >
                Police Assistance Required
              </Label>
            </div>
            {form.policeHelp && (
              <Input
                data-ocid="police_help_detail.input"
                placeholder="Describe how police assisted..."
                value={form.policeHelpDetail}
                onChange={(e) => set("policeHelpDetail", e.target.value)}
                className="bg-background border-border text-sm"
              />
            )}
          </div>

          {/* Feedback */}
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider">
              Client Feedback
              <span className="text-muted-foreground font-normal normal-case ml-1">
                — ⚠️ Do NOT include names or contact numbers
              </span>
            </Label>
            <Textarea
              data-ocid="feedback.textarea"
              placeholder="Client's anonymous feedback..."
              value={form.feedback}
              onChange={(e) => set("feedback", e.target.value)}
              className="bg-background border-border text-sm min-h-[70px]"
            />
          </div>

          {/* Published toggle */}
          <div className="flex items-center gap-3 bg-muted/30 border border-border rounded p-3">
            <Switch
              id="isPublished"
              data-ocid="published.switch"
              checked={form.isPublished}
              onCheckedChange={(v) => set("isPublished", v)}
            />
            <div>
              <Label
                htmlFor="isPublished"
                className="text-xs uppercase tracking-wider cursor-pointer"
              >
                Publish to Public Page
              </Label>
              <p className="text-muted-foreground text-[10px] mt-0.5">
                Visible to public when enabled
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            data-ocid="case_form.cancel_button"
            className="text-xs uppercase tracking-wider"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            data-ocid="case_form.submit_button"
            className="text-xs uppercase tracking-wider"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {isPending
              ? "Saving..."
              : mode === "add"
                ? "Add Case"
                : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted-foreground/20"
          }`}
        />
      ))}
    </div>
  );
}

export function AdminSolvedCasesPage() {
  const { data: cases = [], isLoading } = useAllSolvedCases();
  const updateMutation = useUpdateSolvedCase();
  const deleteMutation = useDeleteSolvedCase();

  const [addOpen, setAddOpen] = useState(false);
  const [editCase, setEditCase] = useState<SolvedCase | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const totalCases = cases.length;
  const publishedCases = cases.filter((c) => c.isPublished).length;
  const draftCases = totalCases - publishedCases;

  const handleTogglePublish = async (c: SolvedCase) => {
    try {
      await updateMutation.mutateAsync({
        id: c.id,
        data: { ...c, isPublished: !c.isPublished },
      });
      toast.success(
        c.isPublished ? "Case unpublished" : "Case published to public page",
      );
    } catch {
      toast.error("Failed to update publish status");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success("Case deleted successfully");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete case");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-foreground font-black uppercase tracking-wider text-lg">
              Solved Cases Manager
            </h1>
            <p className="text-muted-foreground text-xs">
              Manage the public solved cases showcase
            </p>
          </div>
        </div>
        <Button
          onClick={() => setAddOpen(true)}
          data-ocid="solved_cases.open_modal_button"
          className="text-xs uppercase tracking-wider gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Case
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Cases", value: totalCases, color: "text-foreground" },
          {
            label: "Published",
            value: publishedCases,
            color: "text-green-400",
          },
          { label: "Draft", value: draftCases, color: "text-yellow-400" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-sm p-4 text-center"
          >
            <div className={`text-2xl font-black ${color}`}>{value}</div>
            <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-sm overflow-hidden">
        {isLoading ? (
          <div data-ocid="solved_cases.loading_state" className="p-6 space-y-3">
            {SKELETON_KEYS.map((k) => (
              <Skeleton key={k} className="h-12" />
            ))}
          </div>
        ) : cases.length === 0 ? (
          <div
            data-ocid="solved_cases.empty_state"
            className="text-center py-16"
          >
            <Trophy className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              No solved cases yet. Add your first case.
            </p>
          </div>
        ) : (
          <Table data-ocid="solved_cases.table">
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                  Case #
                </TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                  Title
                </TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">
                  Category
                </TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell">
                  Rating
                </TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase tracking-wider text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((c, idx) => (
                <TableRow
                  key={c.id}
                  data-ocid={`solved_cases.item.${idx + 1}`}
                  className="border-border hover:bg-muted/20"
                >
                  <TableCell className="font-mono text-primary text-xs font-bold">
                    {c.caseNumber}
                  </TableCell>
                  <TableCell className="text-foreground text-sm max-w-[200px] truncate">
                    {c.title}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      variant="outline"
                      className="text-[10px] border-border text-muted-foreground"
                    >
                      {c.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <StarDisplay rating={Number(c.rating)} />
                  </TableCell>
                  <TableCell>
                    {c.isPublished ? (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px]">
                        Published
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-[10px] border-border text-muted-foreground"
                      >
                        Draft
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Toggle publish */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleTogglePublish(c)}
                        data-ocid={`solved_cases.toggle.${idx + 1}`}
                        className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        title={c.isPublished ? "Unpublish" : "Publish"}
                      >
                        {c.isPublished ? (
                          <EyeOff className="h-3.5 w-3.5" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" />
                        )}
                      </Button>
                      {/* Edit */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditCase(c)}
                        data-ocid={`solved_cases.edit_button.${idx + 1}`}
                        className="h-7 w-7 text-muted-foreground hover:text-primary"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      {/* Delete */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(c.id)}
                        data-ocid={`solved_cases.delete_button.${idx + 1}`}
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Add Case Dialog */}
      {addOpen && (
        <CaseFormDialog
          open={addOpen}
          onClose={() => setAddOpen(false)}
          mode="add"
        />
      )}

      {/* Edit Case Dialog */}
      {editCase && (
        <CaseFormDialog
          open={!!editCase}
          onClose={() => setEditCase(null)}
          initialData={editCase}
          mode="edit"
        />
      )}

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(v) => !v && setDeleteId(null)}
      >
        <AlertDialogContent
          data-ocid="delete_case.dialog"
          className="bg-card border-border text-foreground"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="uppercase tracking-wider text-sm">
              Confirm Delete
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm">
              This case will be permanently deleted and removed from the public
              showcase. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="delete_case.cancel_button"
              className="text-xs uppercase tracking-wider"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              data-ocid="delete_case.confirm_button"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs uppercase tracking-wider"
            >
              {deleteMutation.isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
              ) : null}
              Delete Case
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
