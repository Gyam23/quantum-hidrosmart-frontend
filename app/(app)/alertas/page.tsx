"use client";

import { FormEvent, useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Alert, apiRequest, WorkOrder } from "@/lib/api";

const severityLabel = { high: "Alta", medium: "Média", low: "Baixa" };
const statusLabel = { open: "Aberto", in_repair: "Em reparo", resolved: "Resolvido" };

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [responsible, setResponsible] = useState<Record<number, string>>({});
  const [error, setError] = useState("");

  async function load() {
    const [alertList, orderList] = await Promise.all([
      apiRequest<Alert[]>("/alerts"),
      apiRequest<WorkOrder[]>("/work-orders"),
    ]);
    setAlerts(alertList);
    setOrders(orderList);
  }

  useEffect(() => {
    load().catch((requestError: Error) => setError(requestError.message));
  }, []);

  function showError(requestError: unknown) {
    setError(requestError instanceof Error ? requestError.message : "Não foi possível atualizar o alerta.");
  }

  async function openOrder(event: FormEvent<HTMLFormElement>, alertId: number) {
    event.preventDefault();
    setError("");
    try {
      await apiRequest<WorkOrder>(`/work-orders/alerts/${alertId}`, {
        method: "POST",
        body: JSON.stringify({ responsible_name: responsible[alertId] ?? "" }),
      });
      await load();
    } catch (requestError) {
      showError(requestError);
    }
  }

  async function updateOrder(order: WorkOrder, status: WorkOrder["status"]) {
    setError("");
    try {
      await apiRequest<WorkOrder>(`/work-orders/${order.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await load();
    } catch (requestError) {
      showError(requestError);
    }
  }

  return (
    <>
      <PageHeader title="Painel de Alertas" />
      <div className="flex-1 p-8">
        <div className="card min-h-[500px] space-y-3 p-6">
          <div className="mb-5"><h2 className="h-display text-lg">Alertas operacionais</h2><p className="mt-1 text-sm text-muted">Valide o evento, abra uma OS e acompanhe o reparo até a resolução.</p></div>
          {error && <p role="alert" className="rounded-lg bg-danger/10 p-4 text-sm text-danger">{error}</p>}
          {alerts.length === 0 && !error && <p className="rounded-lg bg-surface p-4 text-sm text-muted">Nenhum alerta registrado.</p>}
          {alerts.map((alert) => {
            const order = orders.find((candidate) => candidate.alert_id === alert.id);
            return (
              <article key={alert.id} className="rounded-lg border border-line p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold">{alert.title}</h3>
                    <p className="mt-1 text-sm text-muted">{alert.address || alert.neighborhood}</p>
                    <p className="mt-1 text-xs text-muted">Detectado {new Date(alert.detected_at).toLocaleString("pt-BR")} · {alert.estimated_flow_l_min} L/min</p>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="rounded bg-danger/10 px-2 py-1 font-semibold text-danger">{severityLabel[alert.severity]}</span>
                    <span className="rounded bg-brand-soft px-2 py-1 font-semibold text-brand-dark">{statusLabel[alert.status]}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted">{alert.description}</p>
                {!order && alert.status === "open" && (
                  <form onSubmit={(event) => openOrder(event, alert.id)} className="mt-4 flex flex-wrap gap-2">
                    <input value={responsible[alert.id] ?? ""} onChange={(event) => setResponsible((current) => ({ ...current, [alert.id]: event.target.value }))} maxLength={120} placeholder="Responsável pela equipe (opcional)" className="h-10 min-w-56 flex-1 rounded-lg border border-line px-3 text-sm" />
                    <button className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">Abrir ordem de serviço</button>
                  </form>
                )}
                {order && (
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-surface p-3">
                    <div className="text-sm"><p className="font-semibold">OS #{order.id}{order.responsible_name ? ` · ${order.responsible_name}` : ""}</p><p className="text-xs text-muted">Status: {statusLabel[order.status]}</p>{order.resolution_notes && <p className="mt-1 text-xs text-muted">{order.resolution_notes}</p>}</div>
                    {order.status === "open" && <button onClick={() => updateOrder(order, "in_repair")} className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">Iniciar reparo</button>}
                    {order.status === "in_repair" && <button onClick={() => updateOrder(order, "resolved")} className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">Marcar como resolvido</button>}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
