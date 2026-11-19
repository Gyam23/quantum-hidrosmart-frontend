"use client";

import dynamic from "next/dynamic";
import { MapMarker } from "@/components/LeafletMap";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center text-sm text-muted">Carregando mapa...</div>,
});

export default function OsmMap({ className = "", markers = [] }: { className?: string; markers?: MapMarker[] }) {
  return <LeafletMap markers={markers} className={className} />;
}
