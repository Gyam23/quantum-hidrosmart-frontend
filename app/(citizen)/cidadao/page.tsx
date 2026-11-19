"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiRequest, CitizenReport } from "@/lib/api";
import ProtectedImage from "@/components/ProtectedImage";

const statusLabels: Record<CitizenReport["status"], string> = {
  received: "Recebida",
  validated: "Validada pela equipe",
  resolved: "Resolvida",
};

export default function CitizenHomePage() {
  const [reports, setReports] = useState<CitizenReport[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest<CitizenReport[]>("/citizen-reports")
      .then(setReports)
      .catch((requestError: Error) => setError(requestError.message));
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="h-display text-3xl">Minhas denúncias</h1><p className="mt-2 text-sm text-muted">Acompanhe o andamento dos vazamentos que você reportou.</p></div>
        <Link href="/cidadao/denunciar" className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark">Nova denúncia</Link>
      </div>
      {error && <p role="alert" className="mt-6 rounded-lg bg-danger/10 p-4 text-sm text-danger">{error}</p>}
      <section className="mt-6 space-y-4">
        {reports.length === 0 && !error && <div className="card p-6 text-sm text-muted">Você ainda não registrou denúncias.</div>}
        {reports.map((report) => (
          <article key={report.id} className="card flex flex-col gap-4 p-5 sm:flex-row">
            {report.photo_url && <ProtectedImage path={report.photo_url} alt="Foto enviada na denúncia" className="h-28 w-full rounded-lg object-cover sm:w-36" />}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold">{report.address || "Localização informada no mapa"}</h2>
                <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-dark">{statusLabels[report.status]}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{report.description}</p>
              <p className="mt-2 text-xs text-muted">Protocolo #{report.id} · {new Date(report.created_at).toLocaleString("pt-BR")}</p>
              {report.duplicate_of_id && <p className="mt-2 text-xs text-brand">Agrupada com a denúncia #{report.duplicate_of_id} do mesmo ponto.</p>}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
