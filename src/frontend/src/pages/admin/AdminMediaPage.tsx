import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { HttpAgent } from "@icp-sdk/core/agent";
import {
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { loadConfig } from "../../config";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import {
  useDeleteMedia,
  useMediaByCategory,
  useSaveMedia,
} from "../../hooks/useQueries";
import { StorageClient } from "../../utils/StorageClient";

const CATEGORIES = ["Evidence", "Gallery", "Documents", "Media"];
const ALL_CATEGORY = "Evidence";

export function AdminMediaPage() {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [uploading, setUploading] = useState(false);
  const media = useMediaByCategory(activeCategory);
  const saveMedia = useSaveMedia();
  const deleteMedia = useDeleteMedia();
  const { identity } = useInternetIdentity();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      await saveMedia.mutateAsync({
        name: file.name,
        fileId: hash,
        category: activeCategory,
      });
      toast.success(`Uploaded: ${file.name}`);
    } catch {
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMedia.mutateAsync(id);
      toast.success("File deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="space-y-6" data-ocid="admin.media.page">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground font-black uppercase tracking-wider text-xl">
            Media Manager
          </h2>
          <p className="text-muted-foreground text-sm">
            Upload and manage media files
          </p>
        </div>
        <label
          htmlFor="media-upload"
          data-ocid="admin.media.upload_button"
          className={`cursor-pointer inline-flex items-center gap-2 detective-btn-primary px-4 py-2 text-sm ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" /> Upload File
            </>
          )}
          <input
            id="media-upload"
            type="file"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
            accept="image/*,video/*,.pdf"
          />
        </label>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2" data-ocid="admin.media.tab">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all border ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {media.isLoading ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          data-ocid="admin.media.loading_state"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      ) : (media.data ?? []).length === 0 ? (
        <div
          className="p-12 text-center border border-dashed border-border"
          data-ocid="admin.media.empty_state"
        >
          <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            No media in this category
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            Upload files using the button above
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          data-ocid="admin.media.list"
        >
          {(media.data ?? []).map((file, idx) => (
            <div
              key={file.id}
              className="group bg-card border border-border hover:border-primary transition-colors relative"
              data-ocid={`admin.media.item.${idx + 1}`}
            >
              <div className="h-32 bg-muted flex items-center justify-center">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="p-2">
                <div className="text-foreground text-xs truncate">
                  {file.name}
                </div>
                <div className="text-muted-foreground text-[10px] uppercase tracking-wider mt-0.5">
                  {file.category}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(file.id)}
                data-ocid={`admin.media.delete_button.${idx + 1}`}
                className="absolute top-2 right-2 p-1 bg-red-900/80 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
