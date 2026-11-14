// Mapa OpenStreetMap centrado no Colégio Dom Bosco, Petrolina-PE
export default function OsmMap({ className = "" }: { className?: string }) {
  const src = "https://www.openstreetmap.org/export/embed.html?bbox=-40.5075%2C-9.3925%2C-40.4985%2C-9.3855&layer=mapnik&marker=-9.3893%2C-40.5031";
  return <iframe title="Mapa da rede" src={src} loading="lazy" className={`h-full w-full rounded-xl border-0 ${className}`} />;
}
