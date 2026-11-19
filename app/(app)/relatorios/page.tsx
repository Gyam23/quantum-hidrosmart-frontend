"use client";

import { FormEvent, useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { ApiError, apiRequest, getCurrentUser, ImpactReport, User } from "@/lib/api";

type Baseline = {
  neighborhood: string;
  monthly_loss_liters: number;
  tariff_per_m3: number;
};

export default function ImpactReportsPage() {
  const [impact, setImpact] = useState<ImpactReport | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [baseline, setBaseline] = useState<Baseline>({ neighborhood: "Petrolina", monthly_loss_liters: 0, tariff_per_m3: 0 });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const [report, currentUser] = await Promise.all([
      apiRequest<ImpactReport>("/reports/impact"),
      getCurrentUser(),
    ]);
    setImpact(report);
    setUser(currentUser);
    try {
      const savedBaseline = await apiRequest<Baseline>("/reports/baseline");
      setBaseline(savedBaseline);
    } catch (requestError) {
      if (!(requestError instanceof ApiError) || requestError.status !== 404) throw requestError;
    }
  }

  useEffect(() => {
    load().catch((requestError: Error) => setError(requestError.message));
  }, []);

  async function saveBaseline(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      await apiRequest("/reports/baseline", { method: "PUT", body: JSON.stringify(baseline) });
      await load();
      setMessage("Baseline operacional atualizada.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Não foi possível salvar a baseline.");
    }
  }

  return (
    <>
      <PageHeader title="Relatórios de Impacto" icon="heart" />
      <main className="flex-1 space-y-5 p-8">
        <div><h2 className="h-display text-lg">Economia estimada no mês</h2><p className="mt-1 text-sm text-muted">A comparação usa a baseline manual e o volume estimado dos alertas registrados neste mês.</p></div>
        {error && <p role="alert" className="rounded-lg bg-danger/10 p-4 text-sm text-danger">{error}</p>}
        {message && <p role="status" className="rounded-lg bg-brand-soft p-4 text-sm text-brand-dark">{message}</p>}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="card p-5"><p className="text-sm text-muted">Baseline mensal de perdas</p><p className="mt-3 text-2xl font-bold">{impact ? `${impact.baseline_liters.toLocaleString("pt-BR")} L` : "—"}</p></div>
          <div className="card p-5"><p className="text-sm text-muted">Perdas estimadas no período</p><p className="mt-3 text-2xl font-bold text-danger">{impact ? `${impact.estimated_lost_liters.toLocaleString("pt-BR")} L` : "—"}</p></div>
          <div className="card p-5"><p className="text-sm text-muted">Volume preservado estimado</p><p className="mt-3 text-2xl font-bold text-brand">{impact ? `${impact.estimated_saved_liters.toLocaleString("pt-BR")} L` : "—"}</p></div>
          <div className="card p-5"><p className="text-sm text-muted">Economia financeira estimada</p><p className="mt-3 text-2xl font-bold text-brand">{impact ? impact.estimated_savings_brl.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "—"}</p></div>
        </section>
        <section className="card p-6">
          <h3 className="h-display text-lg">Como a estimativa é calculada</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">A perda detectada soma a vazão estimada de cada alerta pelo tempo até a resolução ou até o momento atual. O volume preservado é a diferença positiva entre a baseline mensal e as perdas estimadas; o valor financeiro usa a tarifa informada por metro cúbico. Esta métrica é indicativa, não uma medição de faturamento.</p>
          {user?.role === "admin" && (
            <form onSubmit={saveBaseline} className="mt-6 grid gap-4 border-t border-line pt-5 sm:grid-cols-3">
              <label className="text-sm font-semibold">Localidade<input required maxLength={120} value={baseline.neighborhood} onChange={(event) => setBaseline({ ...baseline, neighborhood: event.target.value })} className="mt-2 h-10 w-full rounded-lg border border-line px-3 font-normal" /></label>
              <label className="text-sm font-semibold">Baseline de perdas (litros/mês)<input required type="number" min="0" step="any" value={baseline.monthly_loss_liters} onChange={(event) => setBaseline({ ...baseline, monthly_loss_liters: Number(event.target.value) })} className="mt-2 h-10 w-full rounded-lg border border-line px-3 font-normal" /></label>
              <label className="text-sm font-semibold">Tarifa (R$/m³)<input required type="number" min="0" step="any" value={baseline.tariff_per_m3} onChange={(event) => setBaseline({ ...baseline, tariff_per_m3: Number(event.target.value) })} className="mt-2 h-10 w-full rounded-lg border border-line px-3 font-normal" /></label>
              <button className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark sm:col-span-3 sm:justify-self-end">Salvar baseline</button>
            </form>
          )}
        </section>
      </main>
    </>
  );
}
