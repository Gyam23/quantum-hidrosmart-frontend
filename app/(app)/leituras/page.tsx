"use client";

import { FormEvent, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { apiRequest } from "@/lib/api";

type ImportResult = { imported: number; alerts_created: number; errors: string[] };

export default function ImportReadingsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return;
    setSubmitting(true);
    setError("");
    setResult(null);
    const body = new FormData();
    body.set("file", file);
    try {
      setResult(await apiRequest<ImportResult>("/measurements/import", { method: "POST", body }));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Não foi possível importar as leituras.");
    } finally {
      setSubmitting(false);
    }
  }

  function downloadExample() {
    const example = [
      "sensor_id,flow_l_min,pressure_bar,recorded_at",
      "1,35.0,2.4,2026-11-18T02:00:00-03:00",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([example], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "exemplo-leituras-hidrosmart.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <PageHeader title="Importar leituras" />
      <main className="flex-1 p-8">
        <section className="card mx-auto max-w-3xl p-6 sm:p-8">
          <h2 className="h-display text-xl">Importar leituras de vazão e pressão</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">Use um CSV UTF-8 com os IDs dos sensores cadastrados. Todas as linhas são validadas antes de confirmar: se alguma for inválida, nenhuma leitura do arquivo será gravada.</p>
          <div className="mt-5 rounded-lg bg-surface p-4 text-sm">
            <p className="font-semibold">Cabeçalho obrigatório</p>
            <code className="mt-1 block break-all text-xs text-muted">sensor_id,flow_l_min,pressure_bar,recorded_at</code>
            <p className="mt-2 text-xs text-muted">Data e hora ISO 8601 com fuso, por exemplo 2026-11-18T02:00:00-03:00. A vazão acima do limite entre 22h e 6h pode gerar um alerta automaticamente.</p>
          </div>
          <button type="button" onClick={downloadExample} className="mt-4 text-sm font-semibold text-brand">Baixar CSV de exemplo</button>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block text-sm font-semibold">Arquivo CSV<input required type="file" accept=".csv,text/csv" onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="mt-2 block w-full rounded-lg border border-line p-3 text-sm text-muted" /></label>
            <button type="submit" disabled={!file || submitting} className="h-11 rounded-lg bg-action px-5 text-sm font-semibold text-white hover:bg-action-hover disabled:opacity-60">{submitting ? "VALIDANDO..." : "VALIDAR E IMPORTAR"}</button>
          </form>
          {error && <p role="alert" className="mt-4 rounded-lg bg-danger/10 p-4 text-sm text-danger">{error}</p>}
          {result && (
            <div role="status" className="mt-4 rounded-lg bg-brand-soft p-4 text-sm text-brand-dark">
              <p>{result.imported} leitura(s) importada(s); {result.alerts_created} alerta(s) criado(s).</p>
              {result.errors.map((line) => <p key={line} className="mt-2 text-danger">{line}</p>)}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
