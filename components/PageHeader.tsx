import { MapPin, Heart } from "lucide-react";
export default function PageHeader({ title, icon = "pin" }: { title: string; icon?: "pin" | "heart" }) {
  const Icon = icon === "pin" ? MapPin : Heart;
  return (
    <header className="flex h-[70px] items-center justify-between border-b border-line bg-white px-8">
      <div className="flex items-center gap-3">
        <h1 className="h-display text-2xl">{title}</h1>
        <span className="flex items-center gap-1.5 rounded-full border border-brand-dark px-2.5 py-[3px] text-xs font-semibold text-brand-dark">
          <Icon className="h-3 w-3 fill-current" />Petrolina, PE
        </span>
      </div>
      <p className="flex items-center gap-2 text-[13px] text-muted">Monitoramento ativo <span className="h-2.5 w-2.5 rounded-full bg-brand ring-2 ring-brand/20" /></p>
    </header>
  );
}
