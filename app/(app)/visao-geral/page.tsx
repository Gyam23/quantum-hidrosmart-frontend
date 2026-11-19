"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import OsmMap from "@/components/OsmMap";
import Fab from "@/components/Fab";
import { Alert, apiRequest, DashboardSummary, Sensor } from "@/lib/api";
import { MapMarker } from "@/components/LeafletMap";

export default function OverviewPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      apiRequest<DashboardSummary>("/dashboard/summary"),
      apiRequest<Alert[]>("/alerts"),
      apiRequest<Sensor[]>("/sensors"),
    ])
      .then(([dashboard, recentAlerts, sensorList]) => {
        setSummary(dashboard);
        setAlerts(recentAlerts.slice(0, 4));
        setSensors(sensorList);
      })
      .catch((requestError: Error) => setError(requestError.message));
  }, []);

  const markers: MapMarker[] = [
    ...sensors.map((sensor) => ({
      id: `sensor-${sensor.id}`,
      latitude: sensor.latitude,
      longitude: sensor.longitude,
      title: sensor.name,
      description: `${sensor.neighborhood} · ${sensor.latest_flow_l_min ?? "Sem"} L/min`,
    })),
    ...alerts
      .filter((alert) => alert.latitude !== null && alert.longitude !== null && alert.status !== "resolved")
      .map((alert) => ({
        id: `alert-${alert.id}`,
        latitude: alert.latitude!,
        longitude: alert.longitude!,
        title: alert.title,
        description: alert.address,
        severity: alert.severity,
      })),
  ];

  return (
    <>
      <PageHeader title="Visão Geral" />
      <div className="flex-1 space-y-5 p-8">
        {error && <p role="alert" className="rounded-lg bg-danger/10 p-4 text-sm text-danger">{error}</p>}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="card p-5"><p className="text-[13px] text-muted">Vazamentos ativos</p><p className="mt-3 text-[32px] font-bold leading-none">{summary?.open_alerts ?? "—"}</p></div>
          <div className="card p-5"><p className="text-[13px] text-muted">Prioridade alta</p><p className="mt-3 text-[32px] font-bold leading-none text-danger">{summary?.high_priority_alerts ?? "—"}</p></div>
          <div className="card p-5"><p className="text-[13px] text-muted">Sensores ativos</p><p className="mt-3 text-[32px] font-bold leading-none">{summary?.active_sensors ?? "—"}</p></div>
          <div className="card p-5"><p className="text-[13px] text-muted">Água preservada estimada</p><p className="mt-3 text-[32px] font-bold leading-none text-brand">{summary ? `${Math.round(summary.estimated_saved_liters).toLocaleString("pt-BR")} L` : "—"}</p></div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1fr_404px]">
          <section className="card p-6">
            <div className="mb-4 flex items-center justify-between"><h2 className="h-display text-[17px]">Rede e pontos monitorados</h2><Link href="/mapa" className="text-xs font-semibold text-brand">Abrir mapa</Link></div>
            <div className="h-[495px] overflow-hidden rounded-xl border border-line"><OsmMap markers={markers} /></div>
          </section>
          <section className="card p-6">
            <div className="mb-4 flex items-center justify-between"><h2 className="h-display text-[17px]">Alertas recentes</h2><Link href="/alertas" className="text-xs font-semibold text-brand">Ver todos</Link></div>
            <div className="space-y-3">
              {alerts.length === 0 && <p className="text-sm text-muted">Nenhum alerta registrado.</p>}
              {alerts.map((alert) => (
                <article key={alert.id} className="rounded-lg border border-line px-4 py-3">
                  <div className="flex items-center justify-between gap-2"><p className="text-sm font-bold">{alert.title}</p><span className="text-xs text-danger">{alert.severity === "high" ? "Alta" : alert.severity === "medium" ? "Média" : "Baixa"}</span></div>
                  <p className="mt-1 text-xs text-muted">{alert.address || alert.neighborhood}</p>
                  <p className="mt-1 text-[11px] text-muted">{new Date(alert.detected_at).toLocaleString("pt-BR")}</p>
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
