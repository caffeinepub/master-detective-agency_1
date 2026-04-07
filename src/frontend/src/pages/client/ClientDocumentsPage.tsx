import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { HttpAgent } from "@icp-sdk/core/agent";
import { AlertCircle, FileText, Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { loadConfig } from "../../config";
import { useAuth } from "../../hooks/useAuth";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import { useAttachFileToCase } from "../../hooks/useQueries";
import { useCaseFiles } from "../../hooks/useQueries";
import { useCasesByClient } from "../../hooks/useQueries";
import { StorageClient } from "../../utils/StorageClient";

export function ClientDocumentsPage() {
  const { principal } = useAuth();
  const { identity } = useInternetIdentity();
  const cases = useCasesByClient(principal ?? "");
  const attachFile = useAttachFileToCase();

  const [selectedCaseId, setSelectedCaseId] = useState("");
  const [uploading, setUploading] = useState(false);

  const caseFiles = useCaseFiles(selectedCaseId);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedCaseId) {
      toast.error("Please select a case first.");
      return;
    }
    setUploading(true);
    try {
      const config = await loadConfig();
      const agent = HttpAgent.createSync({
        identity: identity || undefined,
        host: config.backend_host,
      });
      if (config.backend_host?.includes("localhost")) {
        await agent.fetchRootKey();
      }
      const storageClient = new StorageClient(
        config.bucket_name,
        config.storage_gateway_url,
        config.backend_canister_id,
        config.project_id,
        agent,
      );
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { hash } = await storageClient.putFile(bytes);
      await attachFile.mutateAsync({
        caseId: selectedCaseId,
        fileId: hash,
        fileName: file.name,
      });
      toast.success(`Uploaded: ${file.name}`);
    } catch {
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-8" data-ocid="client.documents.page">
      <div>
        <h2 className="text-foreground font-black uppercase tracking-wider text-xl">
          Documents
        </h2>
        <p className="text-muted-foreground text-sm">
          Upload and view documents for your cases
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-card border border-border p-6 space-y-4">
        <h3 className="text-foreground font-bold uppercase tracking-wider text-sm">
          Upload Document
        </h3>

        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase">
            Select Case
          </Label>
          {cases.isLoading ? (
            <Skeleton className="h-10" />
          ) : (
            <Select value={selectedCaseId} onValueChange={setSelectedCaseId}>
              <SelectTrigger
                data-ocid="client.documents.select"
                className="bg-background"
              >
                <SelectValue placeholder="Select a case" />
              </SelectTrigger>
              <SelectContent>
                {(cases.data ?? []).map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div
          className="border-2 border-dashed border-border hover:border-primary transition-colors p-8 text-center cursor-pointer relative"
          data-ocid="client.documents.dropzone"
        >
          <input
            id="doc-upload"
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            onChange={handleUpload}
            disabled={uploading || !selectedCaseId}
            accept=".pdf,.doc,.docx,image/*"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-muted-foreground text-sm">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-foreground text-sm font-medium">
                {selectedCaseId
                  ? "Click or drag to upload document"
                  : "Select a case above first"}
              </p>
              <p className="text-muted-foreground text-xs">
                PDF, Word, Images supported
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Files for selected case */}
      {selectedCaseId && (
        <div className="bg-card border border-border p-6">
          <h3 className="text-foreground font-bold uppercase tracking-wider text-sm mb-4">
            Documents for Selected Case
          </h3>
          {caseFiles.isLoading ? (
            <div
              className="space-y-2"
              data-ocid="client.documents.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10" />
              ))}
            </div>
          ) : (caseFiles.data ?? []).length === 0 ? (
            <div
              className="text-center py-6"
              data-ocid="client.documents.empty_state"
            >
              <AlertCircle className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">
                No documents uploaded yet
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {(caseFiles.data ?? []).map((f, idx) => (
                <div
                  key={f.id}
                  className="flex items-center gap-3 bg-background border border-border p-3"
                  data-ocid={`client.documents.item.${idx + 1}`}
                >
                  <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-foreground text-sm">{f.fileName}</div>
                    <div className="text-muted-foreground text-xs">
                      {new Date(
                        Number(f.createdAt) / 1_000_000,
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
