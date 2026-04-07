import { useEffect } from "react";

interface MetaTagsProps {
  title: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
}

export function MetaTags({
  title,
  description = "Master Detective – Professional detective agency for legal investigative services. Confidential, discreet, results-driven.",
  ogImage = "/assets/generated/hero-noir-cityscape.dim_1920x1080.jpg",
  ogType = "website",
}: MetaTagsProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, useProperty = false) => {
      const attr = useProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:type", ogType, true);
    setMeta("twitter:card", ogImage ? "summary_large_image" : "summary");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
  }, [title, description, ogImage, ogType]);

  return null;
}
