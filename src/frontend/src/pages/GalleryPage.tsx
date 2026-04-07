import { FileText, Grid, Image, List, Video } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { FloatingButtons } from "../components/FloatingButtons";
import { Footer } from "../components/Footer";
import { MetaTags } from "../components/MetaTags";
import { Navbar } from "../components/Navbar";

const galleryItems = [
  {
    id: 1,
    category: "Operations",
    title: "Field Investigation Setup",
    type: "image",
    color: "bg-primary/20",
  },
  {
    id: 2,
    category: "Office",
    title: "Command Center",
    type: "image",
    color: "bg-muted",
  },
  {
    id: 3,
    category: "Equipment",
    title: "Surveillance Equipment Array",
    type: "image",
    color: "bg-primary/10",
  },
  {
    id: 4,
    category: "Operations",
    title: "Evidence Documentation",
    type: "image",
    color: "bg-muted",
  },
  {
    id: 5,
    category: "Team",
    title: "Investigator Briefing",
    type: "image",
    color: "bg-primary/15",
  },
  {
    id: 6,
    category: "Office",
    title: "Digital Forensics Lab",
    type: "image",
    color: "bg-card",
  },
  {
    id: 7,
    category: "Equipment",
    title: "Mobile Surveillance Unit",
    type: "image",
    color: "bg-primary/20",
  },
  {
    id: 8,
    category: "Team",
    title: "Field Operatives",
    type: "image",
    color: "bg-muted",
  },
  {
    id: 9,
    category: "Operations",
    title: "Night Ops Documentation",
    type: "image",
    color: "bg-primary/10",
  },
];

const categories = ["All", "Operations", "Office", "Equipment", "Team"];

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <MetaTags title="Gallery | Master Detective Agency" />
      <Navbar />

      <section className="relative pt-24 pb-16 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-black uppercase tracking-tight text-foreground mb-4">
              Gallery
            </h1>
            <div className="w-16 h-0.5 bg-primary mb-4" />
            <p className="text-muted-foreground">
              A visual showcase of our facilities, equipment, and operations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2" data-ocid="gallery.tab">
              {categories.map((cat) => (
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
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                data-ocid="gallery.toggle"
                className={`p-2 border transition-colors ${
                  viewMode === "grid"
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                data-ocid="gallery.toggle"
                className={`p-2 border transition-colors ${
                  viewMode === "list"
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-3"
            }
            data-ocid="gallery.list"
          >
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`border border-border hover:border-primary transition-colors group cursor-pointer ${
                  viewMode === "list" ? "flex items-center gap-4 p-3" : ""
                }`}
                data-ocid={`gallery.item.${idx + 1}`}
              >
                <div
                  className={`${item.color} flex items-center justify-center ${
                    viewMode === "grid" ? "h-48" : "h-16 w-24 flex-shrink-0"
                  }`}
                >
                  <Image className="h-8 w-8 text-muted-foreground/30" />
                </div>
                {viewMode === "grid" ? (
                  <div className="p-3 border-t border-border bg-card">
                    <div className="text-xs text-primary uppercase tracking-widest mb-1">
                      {item.category}
                    </div>
                    <div className="text-foreground text-sm font-semibold">
                      {item.title}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-xs text-primary uppercase tracking-widest mb-1">
                      {item.category}
                    </div>
                    <div className="text-foreground text-sm font-semibold">
                      {item.title}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons whatsapp="+1234567890" phone="+1234567890" />
    </div>
  );
}
