"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";

const alerts = [
  { t: "Av.Fernando Goés", a: "Rua Doutor Pacífico da Luz, Dom Bosco", w: "Há 12 min" },
  { t: "Bairro José e Maria", a: "Rua 15, Quadra C", w: "Há 45 min" },
  { t: "Atrás da Barca", a: "Rua Beira Rio, margem do Rio São Francisco", w: "Há 2h" },
  { t: "Cohab Massangano", a: "Av. Francisco Coelho Amorim", w: "Ontem", dim: true },
];

export default function Page() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHeader title="Painel de Alertas" />
      <div className="flex-1 p-8">
        <div className="card min-h-[700px] space-y-3 p-6">
          {alerts.map((a, i) => (
            <div key={a.t} className="rounded-lg border border-line">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center gap-3 px-4 py-4 text-left">
                <span className={`h-2.5 w-2.5 rounded-full bg-brand ${a.dim ? "opacity-60" : ""}`} />
                <span className={`text-[15px] font-bold ${a.dim ? "text-muted" : ""}`}>{a.t}</span>
                <span className="flex-1 truncate text-[13px] text-muted">{a.a}</span>
                <span className="text-xs text-muted">{a.w}</span>
              </button>
              {open === i && (
                <div className="mx-4 mb-4 space-y-3 rounded-lg bg-surface p-4 text-sm">
                  <p><b>Descrição:</b> Alerta de vazão identificado!</p>
                  <p className="font-bold text-brand-dark">Ação recomendada: Despachar equipe de manutenção preventiva para contenção.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
