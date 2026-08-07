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
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
