import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { AlertCircle, Edit2, Loader2, Plus, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Staff } from "../../backend";
import { useAddStaff, useAllStaff, useEditStaff } from "../../hooks/useQueries";

const ROLES = [
  "Lead Investigator",
  "Field Operative",
  "Digital Forensics",
  "Background Analyst",
  "Admin Staff",
];

const emptyForm = {
  userId: "",
  fullName: "",
  role: "",
  phone: "",
  email: "",
  isActive: true,
};

export function AdminStaffPage() {
  const staff = useAllStaff();
  const addStaff = useAddStaff();
  const editStaff = useEditStaff();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Staff | null>(null);
  const [form, setForm] = useState({ ...emptyForm });

  const filtered = (staff.data ?? []).filter(
    (s) =>
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()),
  );

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setModalOpen(true);
  };

  const openEdit = (s: Staff) => {
    setEditing(s);
    setForm({
      userId: s.userId,
      fullName: s.fullName,
      role: s.role,
      phone: s.phone,
      email: s.email,
      isActive: s.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await editStaff.mutateAsync({ id: editing.id, ...form });
        toast.success("Staff updated.");
      } else {
        await addStaff.mutateAsync(form);
        toast.success("Staff added.");
      }
      setModalOpen(false);
    } catch {
      toast.error("Operation failed.");
    }
  };

  const isPending = addStaff.isPending || editStaff.isPending;

  return (
    <div className="space-y-6" data-ocid="admin.staff.page">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground font-black uppercase tracking-wider text-xl">
            Staff
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage investigators and staff
          </p>
        </div>
        <Button
          data-ocid="admin.staff.open_modal_button"
          className="detective-btn-primary gap-2"
          onClick={openNew}
        >
          <Plus className="h-4 w-4" /> Add Staff
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          data-ocid="admin.staff.search_input"
          placeholder="Search staff..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      <div className="bg-card border border-border">
        {staff.isLoading ? (
          <div className="p-6 space-y-3" data-ocid="admin.staff.loading_state">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center" data-ocid="admin.staff.empty_state">
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">No staff found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Name
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Role
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Email
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Status
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s, idx) => (
                <TableRow
                  key={s.id}
                  className="border-border hover:bg-muted/30"
                  data-ocid={`admin.staff.row.${idx + 1}`}
                >
                  <TableCell className="text-foreground font-medium text-sm">
                    {s.fullName}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5">
                      {s.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {s.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        s.isActive
                          ? "text-emerald-400 border-emerald-800"
                          : "text-muted-foreground border-border"
                      }
                    >
                      {s.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      data-ocid={`admin.staff.edit_button.${idx + 1}`}
                      onClick={() => openEdit(s)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className="bg-card border-border"
          data-ocid="admin.staff.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-foreground uppercase tracking-wider">
              {editing ? "Edit Staff" : "Add Staff"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: "fullName", label: "Full Name", required: true },
              { key: "phone", label: "Phone" },
              { key: "email", label: "Email", type: "email" },
            ].map(({ key, label, required, type }) => (
              <div key={key} className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase">
                  {label}
                </Label>
                <Input
                  data-ocid="admin.staff.input"
                  type={type || "text"}
                  placeholder={label}
                  value={(form as any)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required={required}
                  className="bg-background"
                />
              </div>
            ))}
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase">
                Role
              </Label>
              <Select
                value={form.role}
                onValueChange={(v) => setForm({ ...form, role: v })}
              >
                <SelectTrigger
                  data-ocid="admin.staff.select"
                  className="bg-background"
                >
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {editing && (
              <div className="flex items-center gap-3">
                <Switch
                  data-ocid="admin.staff.switch"
                  checked={form.isActive}
                  onCheckedChange={(v) => setForm({ ...form, isActive: v })}
                />
                <Label className="text-muted-foreground text-sm">
                  {form.isActive ? "Active" : "Inactive"}
                </Label>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                data-ocid="admin.staff.submit_button"
                disabled={isPending}
                className="detective-btn-primary flex-1"
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {editing ? "Save Changes" : "Add Staff"}
              </Button>
              <Button
                type="button"
                variant="outline"
                data-ocid="admin.staff.cancel_button"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
