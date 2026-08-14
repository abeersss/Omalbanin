import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "أم البنين | Omalbnin",
    short_name: "Omalbnin",
    description: "كتاب الأدعية والزيارات اليومية - The Book of Daily Duas and Ziyarat",
    start_url: "/ar/",
    display: "standalone",
    background_color: "#faf6ee",
    theme_color: "#1f5f52",
    lang: "ar",
    dir: "rtl",
    icons: [
      { src: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      // "maskable" lets Android crop the icon to whatever shape the launcher
      // uses without slicing into the star, since the mark sits well inside.
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
