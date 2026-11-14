import PageHeader from "@/components/PageHeader";
import OsmMap from "@/components/OsmMap";
import Fab from "@/components/Fab";
import Link from "next/link";
import { TrendingDown } from "lucide-react";

const alerts = [
  { t: "Av. Monsenhor Ângelo", s: "Alerta identificado", w: "Há 12 min" },
  { t: "Bairro José e Maria", s: "Alerta identificado", w: "Há 45 min" },
  { t: "Bairro Centro", s: "Alerta identificado", w: "Há 2h" },
  { t: "Cohab Massangano", s: "Alerta identificado", w: "", dim: true },
];

export default function Page() {
  return (
    <>
      <PageHeader title="Visão Geral" />
      <div className="flex-1 space-y-5 p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="card p-5"><p className="text-[13px] text-muted">Perdas na rede</p><div className="mt-3 flex items-end justify-between"><p className="text-[32px] font-bold leading-none">37%</p><span className="flex items-center gap-1 text-xs font-semibold text-danger"><TrendingDown className="h-3 w-3" />−2.4%</span></div></div>
          <div className="card p-5"><p className="text-[13px] text-muted">Vazamentos ativos</p><div className="mt-3 flex items-end justify-between"><p className="text-[32px] font-bold leading-none text-danger">12</p><span className="text-xs text-muted">6 prioritários</span></div></div>
          <div className="card p-5"><p className="text-[13px] text-muted">Tempo médio de detecção</p><div className="mt-3 flex items-end justify-between"><p className="text-[32px] font-bold leading-none">2h 14min</p><span className="text-xs font-semibold text-brand">Eficiência alta</span></div></div>
          <div className="card p-5"><p className="text-[13px] text-muted">Água preservada</p><div className="mt-3 flex items-end justify-between"><p className="text-[32px] font-bold leading-none text-brand">1.2M L</p><span className="text-xs text-muted">este mês</span></div></div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1fr_404px]">
          <section className="card p-6"><h2 className="h-display mb-4 text-[17px]">Fluxo da Rede de Distribuição</h2><div className="h-[495px] overflow-hidden rounded-xl border border-line"><OsmMap /></div></section>
          <section className="card p-6">
            <div className="mb-4 flex items-center justify-between"><h2 className="h-display text-[17px]">Alertas Recentes</h2><Link href="/alertas" className="text-xs font-semibold text-brand">Ver todos</Link></div>
            <div className="space-y-3">
              {alerts.map((a) => (
                <div key={a.t} className="rounded-lg border border-line px-4 py-3">
                  <p className={`text-sm font-bold ${a.dim ? "text-muted" : "text-ink"}`}>{a.t}</p>
                  <p className="mt-0.5 text-xs text-muted">{a.s}</p>
                  {a.w && <p className="mt-0.5 text-[11px] text-muted">{a.w}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Fab />
    </>
  );
}
