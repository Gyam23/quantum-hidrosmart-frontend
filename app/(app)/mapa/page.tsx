"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import OsmMap from "@/components/OsmMap";
import { Alert, apiRequest, Sensor } from "@/lib/api";
import { MapMarker } from "@/components/LeafletMap";

export default function NetworkMapPage() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([apiRequest<Sensor[]>("/sensors"), apiRequest<Alert[]>("/alerts")])
      .then(([sensorList, alertList]) => {
        setSensors(sensorList);
        setAlerts(alertList.filter((alert) => alert.status !== "resolved"));
      })
      .catch((requestError: Error) => setError(requestError.message));
  }, []);

  const markers: MapMarker[] = [
    ...sensors.map((sensor) => ({
      id: `sensor-${sensor.id}`,
      latitude: sensor.latitude,
      longitude: sensor.longitude,
      title: sensor.name,
      description: `${sensor.neighborhood} · Limite noturno ${sensor.night_flow_limit_l_min} L/min`,
    })),
    ...alerts
      .filter((alert) => alert.latitude !== null && alert.longitude !== null)
      .map((alert) => ({
        id: `alert-${alert.id}`,
        latitude: alert.latitude!,
        longitude: alert.longitude!,
        title: alert.title,
        description: `${alert.address} · ${alert.status}`,
        severity: alert.severity,
      })),
  ];

  return (
    <>
      <PageHeader title="Mapa da Rede" />
      <div className="grid flex-1 gap-5 p-5 lg:grid-cols-[1fr_308px]">
        <div className="min-h-[600px] overflow-hidden rounded-2xl border border-line"><OsmMap markers={markers} /></div>
        <aside className="card self-start p-5">
          <h2 className="h-display text-lg">Pontos monitorados</h2>
          {error && <p role="alert" className="mt-3 text-sm text-danger">{error}</p>}
          <div className="mt-4 space-y-4">
            {sensors.map((sensor) => (
              <article key={sensor.id} className="border-b border-line pb-3">
                <p className="text-sm font-bold">{sensor.name}</p>
                <p className="mt-1 text-xs text-muted">{sensor.neighborhood} · {sensor.address}</p>
                <p className="mt-1 text-xs text-muted">Vazão: {sensor.latest_flow_l_min ?? "Sem leitura"} L/min</p>
              </article>
            ))}
            {alerts.map((alert) => (
              <article key={`a-${alert.id}`} className="rounded-lg bg-danger/5 p-3">
                <p className="text-sm font-bold text-danger">{alert.title}</p>
                <p className="mt-1 text-xs text-muted">{alert.address || alert.neighborhood}</p>
              </article>
            ))}
            {!error && sensors.length === 0 && alerts.length === 0 && <p className="text-sm text-muted">Nenhum sensor cadastrado ou alerta ativo.</p>}
          </div>
        </aside>
      </div>
    </>
  );
}
