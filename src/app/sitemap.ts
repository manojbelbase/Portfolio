import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Only indexable pages belong here; section anchors and 404s are excluded.
  return [{ url: site.url }];
}
