import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSiteSettings, useUpdateSettings } from "../../hooks/useQueries";

export function AdminSettingsPage() {
  const settings = useSiteSettings();
  const updateSettings = useUpdateSettings();

  const [form, setForm] = useState({
    siteName: "",
    tagline: "",
    logoFileId: null as string | null,
    themeColor: "#B21F2D",
    whatsappNumber: "",
    callNumber: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  useEffect(() => {
    if (settings.data) {
      setForm({
        siteName: settings.data.siteName,
        tagline: settings.data.tagline,
        logoFileId: settings.data.logoFileId ?? null,
        themeColor: settings.data.themeColor,
        whatsappNumber: settings.data.whatsappNumber,
        callNumber: settings.data.callNumber,
        metaTitle: settings.data.metaTitle,
        metaDescription: settings.data.metaDescription,
        metaKeywords: settings.data.metaKeywords,
      });
    }
  }, [settings.data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSettings.mutateAsync(form);
      toast.success("Settings saved.");
    } catch {
      toast.error("Failed to save settings.");
    }
  };

  if (settings.isLoading) {
    return (
      <div className="space-y-4" data-ocid="admin.settings.loading_state">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-12" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8" data-ocid="admin.settings.page">
      <div>
        <h2 className="text-foreground font-black uppercase tracking-wider text-xl">
          Settings
        </h2>
        <p className="text-muted-foreground text-sm">
          Configure site settings and SEO
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Site Settings */}
        <div className="bg-card border border-border p-6 space-y-4">
          <h3 className="text-foreground font-bold uppercase tracking-wider text-sm">
            Site Configuration
          </h3>
          <Separator className="bg-border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase">
                Site Name
              </Label>
              <Input
                data-ocid="admin.settings.input"
                value={form.siteName}
                onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                className="bg-background"
                placeholder="Master Detective Agency"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase">
                Tagline
              </Label>
              <Input
                data-ocid="admin.settings.input"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="bg-background"
                placeholder="Unearthing Truth. Delivering Justice."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase">
                Theme Color
              </Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={form.themeColor}
                  onChange={(e) =>
                    setForm({ ...form, themeColor: e.target.value })
                  }
                  className="w-10 h-10 rounded border border-border bg-background cursor-pointer"
                />
                <Input
                  data-ocid="admin.settings.input"
                  value={form.themeColor}
                  onChange={(e) =>
                    setForm({ ...form, themeColor: e.target.value })
                  }
                  className="bg-background flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase">
                WhatsApp Number
              </Label>
              <Input
                data-ocid="admin.settings.input"
                value={form.whatsappNumber}
                onChange={(e) =>
                  setForm({ ...form, whatsappNumber: e.target.value })
                }
                className="bg-background"
                placeholder="+1234567890"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase">
                Call Number
              </Label>
              <Input
                data-ocid="admin.settings.input"
                value={form.callNumber}
                onChange={(e) =>
                  setForm({ ...form, callNumber: e.target.value })
                }
                className="bg-background"
                placeholder="+1234567890"
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-card border border-border p-6 space-y-4">
          <h3 className="text-foreground font-bold uppercase tracking-wider text-sm">
            SEO &amp; Meta Tags
          </h3>
          <Separator className="bg-border" />

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase">
              Meta Title
            </Label>
            <Input
              data-ocid="admin.settings.input"
              value={form.metaTitle}
              onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
              className="bg-background"
              placeholder="Master Detective – Professional Detective Agency"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase">
              Meta Description
            </Label>
            <Textarea
              data-ocid="admin.settings.textarea"
              value={form.metaDescription}
              onChange={(e) =>
                setForm({ ...form, metaDescription: e.target.value })
              }
              className="bg-background resize-none"
              placeholder="Enter meta description (max 160 chars)"
              rows={3}
              maxLength={160}
            />
            <div className="text-muted-foreground text-xs">
              {form.metaDescription.length}/160
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase">
              Meta Keywords
            </Label>
            <Input
              data-ocid="admin.settings.input"
              value={form.metaKeywords}
              onChange={(e) =>
                setForm({ ...form, metaKeywords: e.target.value })
              }
              className="bg-background"
              placeholder="detective, investigation, private investigator"
            />
          </div>
        </div>

        <Button
          type="submit"
          data-ocid="admin.settings.submit_button"
          disabled={updateSettings.isPending}
          className="detective-btn-primary gap-2"
        >
          {updateSettings.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save Settings
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
