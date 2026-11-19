"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { apiRequest, CitizenReport } from "@/lib/api";
import ProtectedImage from "@/components/ProtectedImage";

const statusLabel: Record<CitizenReport["status"], string> = {
  received: "Aguardando validação",
  validated: "Validada pela equipe",
  resolved: "Resolvida",
};

export default function CitizenReportsPage() {
  const [reports, setReports] = useState<CitizenReport[]>([]);
  const [error, setError] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);

  async function load() {
    setReports(await apiRequest<CitizenReport[]>("/citizen-reports"));
  }

  useEffect(() => {
    load().catch((requestError: Error) => setError(requestError.message));
  }, []);

  async function validate(reportId: number) {
    setError("");
    setLoadingId(reportId);
    try {
      await apiRequest(`/citizen-reports/${reportId}/validate`, {
        method: "POST",
        body: JSON.stringify({
          severity: "medium",
          title: "Vazamento reportado por cidadão",
          estimated_flow_l_min: 0,
        }),
      });
      await load();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Não foi possível validar a denúncia.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <>
      <PageHeader title="Cidadãos e Denúncias" icon="heart" />
      <main className="flex-1 space-y-4 p-8">
        <div><h2 className="h-display text-lg">Denúncias recebidas</h2><p className="mt-1 text-sm text-muted">Denúncias próximas são agrupadas; valide para criar um alerta operacional.</p></div>
        {error && <p role="alert" className="rounded-lg bg-danger/10 p-4 text-sm text-danger">{error}</p>}
        {reports.length === 0 && !error && <div className="card p-5 text-sm text-muted">Nenhuma denúncia foi registrada.</div>}
        {reports.map((report) => (
          <article key={report.id} className="card flex flex-col gap-4 p-5 sm:flex-row">
            {report.photo_url && <ProtectedImage path={report.photo_url} alt="Foto enviada pelo cidadão" className="h-32 w-full rounded-lg object-cover sm:w-40" />}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-bold">{report.address || `${report.latitude.toFixed(5)}, ${report.longitude.toFixed(5)}`}</h3><span className="rounded bg-brand-soft px-2 py-1 text-xs font-semibold text-brand-dark">{statusLabel[report.status]}</span></div>
              <p className="mt-2 text-sm text-muted">{report.description}</p>
              <p className="mt-2 text-xs text-muted">Denúncia #{report.id} · {new Date(report.created_at).toLocaleString("pt-BR")}{report.duplicate_of_id ? ` · Agrupada com #${report.duplicate_of_id}` : ""}</p>
              {report.status === "received" && <button disabled={loadingId === report.id} onClick={() => validate(report.id)} className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{loadingId === report.id ? "Validando..." : "Validar e gerar alerta"}</button>}
            </div>
          </article>
        ))}
      </main>
    </>
  );
}
