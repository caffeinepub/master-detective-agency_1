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
import { Skeleton } from "@/components/ui/skeleton";
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
import type { Client } from "../../backend";
import {
  useAddClient,
  useAllClients,
  useAllUsers,
  useEditClient,
} from "../../hooks/useQueries";

const emptyForm = {
  userId: "",
  fullName: "",
  phone: "",
  email: "",
  address: "",
  kycFileId: null as string | null,
};

export function AdminClientsPage() {
  const clients = useAllClients();
  const users = useAllUsers();
  const addClient = useAddClient();
  const editClient = useEditClient();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState({ ...emptyForm });

  const filtered = (clients.data ?? []).filter(
    (c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setModalOpen(true);
  };

  const openEdit = (client: Client) => {
    setEditing(client);
    setForm({
      userId: client.userId,
      fullName: client.fullName,
      phone: client.phone,
      email: client.email,
      address: client.address,
      kycFileId: client.kycFileId ?? null,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await editClient.mutateAsync({ id: editing.id, ...form });
        toast.success("Client updated.");
      } else {
        await addClient.mutateAsync(form);
        toast.success("Client added.");
      }
      setModalOpen(false);
    } catch {
      toast.error("Operation failed.");
    }
  };

  const isPending = addClient.isPending || editClient.isPending;

  return (
    <div className="space-y-6" data-ocid="admin.clients.page">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground font-black uppercase tracking-wider text-xl">
            Clients
          </h2>
          <p className="text-muted-foreground text-sm">Manage client records</p>
        </div>
        <Button
          data-ocid="admin.clients.open_modal_button"
          className="detective-btn-primary gap-2"
          onClick={openNew}
        >
          <Plus className="h-4 w-4" /> Add Client
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          data-ocid="admin.clients.search_input"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      <div className="bg-card border border-border">
        {clients.isLoading ? (
          <div
            className="p-6 space-y-3"
            data-ocid="admin.clients.loading_state"
          >
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="p-8 text-center"
            data-ocid="admin.clients.empty_state"
          >
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">No clients found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Name
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Phone
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Email
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  KYC
                </TableHead>
                <TableHead className="text-muted-foreground uppercase tracking-wider text-xs">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((client, idx) => (
                <TableRow
                  key={client.id}
                  className="border-border hover:bg-muted/30"
                  data-ocid={`admin.clients.row.${idx + 1}`}
                >
                  <TableCell className="text-foreground font-medium text-sm">
                    {client.fullName}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {client.phone}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {client.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs uppercase tracking-wider ${
                        client.kycFileId
                          ? "text-emerald-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      {client.kycFileId ? "Uploaded" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      data-ocid={`admin.clients.edit_button.${idx + 1}`}
                      onClick={() => openEdit(client)}
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
          data-ocid="admin.clients.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-foreground uppercase tracking-wider">
              {editing ? "Edit Client" : "Add Client"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase">
                User Account
              </Label>
              <Select
                value={form.userId}
                onValueChange={(v) => setForm({ ...form, userId: v })}
              >
                <SelectTrigger
                  data-ocid="admin.clients.select"
                  className="bg-background"
                >
                  <SelectValue placeholder="Link to user" />
                </SelectTrigger>
                <SelectContent>
                  {(users.data ?? []).map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {[
              { key: "fullName", label: "Full Name", required: true },
              { key: "phone", label: "Phone" },
              { key: "email", label: "Email", type: "email" },
              { key: "address", label: "Address" },
            ].map(({ key, label, required, type }) => (
              <div key={key} className="space-y-2">
                <Label className="text-muted-foreground text-xs uppercase">
                  {label}
                </Label>
                <Input
                  data-ocid="admin.clients.input"
                  type={type || "text"}
                  placeholder={label}
                  value={(form as any)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  required={required}
                  className="bg-background"
                />
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                data-ocid="admin.clients.submit_button"
                disabled={isPending}
                className="detective-btn-primary flex-1"
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {editing ? "Save Changes" : "Add Client"}
              </Button>
              <Button
                type="button"
                variant="outline"
                data-ocid="admin.clients.cancel_button"
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
