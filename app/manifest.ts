import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Quantum HidroSmart",
    short_name: "HidroSmart",
    description: "Denúncias e acompanhamento de vazamentos de água em Petrolina.",
    start_url: "/cidadao",
    display: "standalone",
    background_color: "#f5f8fb",
    theme_color: "#123b5d",
    icons: [{ src: "/hidrosmart.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
