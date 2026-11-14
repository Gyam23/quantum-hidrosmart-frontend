import PageHeader from "@/components/PageHeader";
import Fab from "@/components/Fab";

const ranking: [string, number, number][] = [["Centro", 42, 98], ["Areia Branca", 35, 92], ["Cohab Massangano", 31, 89], ["São José", 24, 81], ["Jardim Maravilha", 19, 76], ["Vila Eduardo", 14, 70], ["João de Deus", 11, 64], ["Gercino Coelho", 8, 58]];
const reports = [
  { i: "JM", n: "José Marcelo", w: "Há 12 min", s: "Aberta", d: "Vazamento volumoso no projeto N4, próximo ao cruzamento central. Água limpa escorrendo há horas." },
  { i: "MC", n: "Maria Carmo", w: "Há 34 min", s: "Em análise", d: "Infiltração grave detectada no muro lateral público da Escola Municipal no Bairro José e Maria." },
  { i: "CA", n: "Carlos", w: "Há 1h", s: "Em análise", d: "Tubulação rompida jorrando água na via pública do Bairro Areia Branca. Dificultando trânsito de pedestres." },
  { i: "AL", n: "Ana Lima", w: "Há 3h", s: "Resolvida", d: "Flutuação severa de pressão e barulho estranho na rede de entrada do condomínio Atrás da Barca." },
];
const badge: Record<string, string> = { "Aberta": "bg-amber-50 text-amber-500", "Em análise": "bg-brand-soft text-brand", "Resolvida": "bg-slate-100 text-muted" };

export default function Page() {
  return (
    <>
      <PageHeader title="Cidadãos e Denúncias" icon="heart" />
      <div className="flex-1 px-8 pt-6">
        <div className="border-b border-line"><span className="inline-block border-b-2 border-brand px-1 pb-2.5 text-sm font-semibold text-brand">Painel Municipal</span></div>
        <div className="mt-6 grid items-start gap-5 lg:grid-cols-[1fr_463px]">
          <section className="card p-6">
            <h2 className="h-display text-lg">Ranking de Bairros por Engajamento</h2>
            <p className="mb-4 mt-1 text-[13px] text-muted">Análise com base em denúncias reportadas e resoluções colaborativas</p>
            <table className="w-full text-sm">
              <thead><tr className="bg-surface text-xs font-semibold text-muted"><th className="w-14 px-4 py-3 text-left">#</th><th className="text-left">Bairro</th><th className="text-right">Denúncias</th><th className="px-4 text-right">Score Geral</th></tr></thead>
              <tbody>
                {ranking.map(([b, d, s], i) => (
                  <tr key={b} className={`border-b border-line ${i < 3 ? "bg-brand-soft/50" : ""}`}>
                    <td className={`px-4 py-3.5 ${i < 3 ? "font-semibold text-brand" : ""}`}>{i + 1}</td>
                    <td className={i < 3 ? "font-semibold" : ""}>{b}</td>
                    <td className="text-right">{d}</td>
                    <td className="px-4 text-right"><span className={`inline-block min-w-[32px] rounded px-2 py-0.5 text-center text-xs font-bold ${i < 3 ? "bg-brand text-white" : "bg-slate-100 text-muted"}`}>{s}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="card p-6">
            <h2 className="h-display mb-4 text-lg">Denúncias Recentes</h2>
            <div className="space-y-3">
              {reports.map((r) => (
                <article key={r.n} className="rounded-lg border border-line p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-brand text-[11px] font-bold text-white">{r.i}</span>
                    <div className="flex-1 leading-tight"><p className="text-sm font-bold">{r.n}</p><p className="text-[11px] text-muted">{r.w}</p></div>
                    <span className={`rounded px-2 py-1 text-[11px] font-semibold ${badge[r.s]}`}>{r.s}</span>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">{r.d}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Fab />
    </>
  );
}
