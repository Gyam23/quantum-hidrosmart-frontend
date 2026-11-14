"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, ChartScatter, Bell, Users, FileBarChart } from "lucide-react";

const items = [
  { href: "/visao-geral", label: "Visão geral", icon: LayoutGrid },
  { href: "/mapa", label: "Mapa da rede", icon: ChartScatter },
  { href: "/alertas", label: "Alertas", icon: Bell, badge: 3 },
  { href: "/cidadaos", label: "Cidadãos", icon: Users },
  { href: "/relatorios", label: "Relatórios", icon: FileBarChart },
];

export default function Sidebar() {
  const path = usePathname();
  const senhaAtiva = path === "/alterar-senha";
  return (
    <aside className="hidden w-[227px] shrink-0 flex-col bg-brand-soft px-4 pb-4 pt-8 md:flex">
      <Link href="/visao-geral" className="mb-8 block px-2 leading-tight">
        <p className="font-display text-[19px] font-bold text-brand-dark">QUANTUM</p>
        <p className="text-[11px] font-bold tracking-[0.28em] text-brand">HIDROSMART</p>
      </Link>
      <nav className="flex flex-col gap-1.5">
        {items.map(({ href, label, icon: Icon, badge }) => {
          const active = path === href;
          return (
            <Link key={href} href={href} className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm ${active ? "bg-white font-semibold text-brand-dark shadow-sm" : "text-ink hover:bg-white/60"}`}>
              <Icon className={`h-[18px] w-[18px] ${active ? "text-brand" : "text-muted"}`} />
              <span className="flex-1">{label}</span>
              {badge && <span className="grid h-5 w-5 place-items-center rounded-full bg-danger text-[11px] font-semibold text-white">{badge}</span>}
            </Link>
          );
        })}
      </nav>
      <Link
        href="/alterar-senha"
        className={`mt-auto flex items-center gap-3 rounded-lg border bg-white p-2.5 transition hover:border-brand ${senhaAtiva ? "border-brand" : "border-line"}`}
      >
        <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-brand text-[11px] font-bold text-white">CH</span>
        <div className="leading-tight"><p className="text-xs font-semibold">Coord. Hídrico</p><p className="text-[11px] text-muted">Petrolina, PE</p></div>
      </Link>
    </aside>
  );
}