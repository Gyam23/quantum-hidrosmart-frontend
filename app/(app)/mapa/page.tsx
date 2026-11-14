import PageHeader from "@/components/PageHeader";
import OsmMap from "@/components/OsmMap";

const rows: [string, string, boolean?][] = [
  ["Localidade", "Colégio Dom Bosco, Petrolina"],
  ["Tubulação afetada", "Rua Dr. Pacífico da Luz - PVC 150mm"],
  ["Vazão atual estimada", "42 L/min", true],
  ["Tempo desde detecção", "3h 12min"],
];

export default function Page() {
  return (
    <>
      <PageHeader title="Mapa da Rede" />
      <div className="grid flex-1 gap-5 p-5 lg:grid-cols-[1fr_308px]">
        <div className="min-h-[600px] overflow-hidden rounded-2xl"><OsmMap /></div>
        <aside className="card self-start p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Nó Selecionado</p>
          <h2 className="h-display mt-1 text-[22px]">Bairro Centro</h2>
          <dl className="mt-6 space-y-5">
            {rows.map(([k, v, red]) => (
              <div key={k}><dt className="text-xs text-muted">{k}</dt><dd className={`mt-1 text-sm ${red ? "text-[15px] font-bold text-danger" : ""}`}>{v}</dd></div>
            ))}
            <div><dt className="text-xs text-muted">Grau de Severidade</dt><dd className="mt-1.5"><span className="rounded bg-danger/10 px-2 py-0.5 text-xs font-semibold text-danger">Alta</span></dd></div>
          </dl>
        </aside>
      </div>
    </>
  );
}
