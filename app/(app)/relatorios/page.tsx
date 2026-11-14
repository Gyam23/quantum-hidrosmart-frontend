import PageHeader from "@/components/PageHeader";
import { Download, TrendingDown } from "lucide-react";

const months = ["Mar", "Abr", "Mai", "Jun", "Jul", "Ago"];
const antes = [680, 715, 780, 800, 690, 720];
const atual = [450, 430, 460, 420, 415, 395];

const Delta = ({ v }: { v: string }) => <span className="ml-3 inline-flex items-center gap-1 rounded bg-danger/10 px-1.5 py-0.5 text-[10px] font-semibold text-danger"><TrendingDown className="h-2.5 w-2.5" />{v}</span>;

export default function Page() {
  return (
    <>
      <PageHeader title="Relatórios de Impacto" icon="heart" />
      <div className="flex-1 space-y-5 p-8">
        <h2 className="h-display text-lg">Comparativo de Desempenho Operacional</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <section className="card p-6">
            <h3 className="flex items-center gap-3 font-display text-[17px] font-bold text-muted"><span className="h-2 w-2 rounded-full bg-slate-400" />Antes do HidroSmart (Média Histórica)</h3>
            {[["Perdas na rede de distribuição", "52%"], ["Tempo médio de detecção", "18h"], ["Vazamentos ativos por mês", "47"]].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between border-b border-line py-4 last:border-0"><span className="text-sm text-muted">{k}</span><span className="text-2xl font-bold text-muted">{v}</span></div>
            ))}
          </section>
          <section className="rounded-xl border-2 border-brand bg-white p-6">
            <h3 className="flex items-center gap-3 font-display text-[17px] font-bold text-brand-dark"><span className="h-2 w-2 rounded-full bg-brand" />Com HidroSmart (Resultados Atuais)</h3>
            {[["Perdas na rede de distribuição", "37%", "-15%", "text-danger"], ["Tempo médio de detecção", "2h 14min", "-87%", "text-brand"], ["Vazamentos ativos por mês", "12", "-74%", "text-danger"]].map(([k, v, d, c]) => (
              <div key={k} className="flex items-center justify-between border-b border-line py-4 last:border-0"><span className="text-sm text-muted">{k}</span><span className="flex items-center"><span className={`text-2xl font-bold ${c}`}>{v}</span><Delta v={d} /></span></div>
            ))}
          </section>
        </div>

        <section className="card p-6">
          <div className="flex items-start justify-between">
            <div><h2 className="h-display text-lg">Evolução Mensal do Volume de Perdas Estimado (m³)</h2><p className="mt-1 text-[13px] text-muted">Comparativo histórico antes da implantação do sistema vs. cenário atual de monitoramento</p></div>
            <div className="flex gap-4 text-xs text-muted"><span className="flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-slate-400" />Antes</span><span className="flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-brand" />Atual</span></div>
          </div>
          <div className="mt-6 flex">
            <div className="flex h-[200px] flex-col justify-between pr-4 text-[11px] text-muted">{["1.000k L", "750k L", "500k L", "250k L", "0 L"].map((l) => <span key={l}>{l}</span>)}</div>
            <div className="flex-1 border-b border-l border-line">
              <div className="flex h-[200px] items-end justify-around">
                {months.map((m, i) => (
                  <div key={m} className="flex items-end gap-1">
                    <div className="w-[21px] rounded-t-sm bg-slate-400" style={{ height: `${antes[i] / 5}px` }} />
                    <div className="w-[21px] rounded-t-sm bg-brand" style={{ height: `${atual[i] / 5}px` }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-around pt-2 text-xs font-semibold">{months.map((m) => <span key={m}>{m}</span>)}</div>
            </div>
          </div>
        </section>

        <section className="card flex flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div><h3 className="text-sm font-bold text-brand-dark">Gere seu relatório personalizado</h3><p className="mt-1 text-[13px] text-muted">Exporte estatísticas consolidadas e métricas hídricas em formato tabular ou apresentação executiva</p></div>
          <div className="flex items-center gap-6">
            <button className="text-[13px] font-semibold text-brand">Agendar envio automático</button>
            <button className="flex h-10 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark"><Download className="h-4 w-4" />Exportar PDF</button>
          </div>
        </section>
      </div>
    </>
  );
}
