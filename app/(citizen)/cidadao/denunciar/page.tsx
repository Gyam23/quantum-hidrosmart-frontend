"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, apiRequest, CitizenReport } from "@/lib/api";
import dynamic from "next/dynamic";

const LocationPicker = dynamic(() => import("@/components/LocationPicker"), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse rounded-lg bg-skeleton" />,
});

export default function CitizenReportPage() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setError("Este dispositivo não disponibiliza geolocalização.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLatitude(coords.latitude.toFixed(6));
        setLongitude(coords.longitude.toFixed(6));
        setError("");
      },
      () => setError("Não foi possível obter a localização. Autorize o acesso ou informe as coordenadas."),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const body = new FormData();
      body.set("address", address);
      body.set("description", description);
      body.set("latitude", latitude);
      body.set("longitude", longitude);
      if (photo) body.set("photo", photo);
      const report = await apiRequest<CitizenReport>("/citizen-reports", { method: "POST", body });
      router.replace(`/cidadao?protocolo=${report.id}`);
    } catch (requestError) {
      setError(requestError instanceof ApiError ? requestError.message : "Não foi possível enviar a denúncia.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-8 sm:px-8">
      <Link href="/cidadao" className="text-sm font-semibold text-brand">← Voltar às minhas denúncias</Link>
      <h1 className="h-display mt-5 text-3xl">Denunciar vazamento</h1>
      <p className="mt-2 text-sm text-muted">Informe o ponto do vazamento e, se possível, envie uma foto para ajudar a equipe.</p>
      <form onSubmit={submit} className="card mt-6 space-y-5 p-5 sm:p-7">
        <div>
          <label htmlFor="address" className="block text-sm font-semibold">Endereço ou referência</label>
          <input id="address" value={address} onChange={(event) => setAddress(event.target.value)} maxLength={255} className="mt-2 h-11 w-full rounded-lg border border-line px-3 text-sm" placeholder="Rua, bairro ou ponto de referência" />
        </div>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold">Localização *</p>
            <button type="button" onClick={useCurrentLocation} className="text-sm font-semibold text-brand">Usar minha localização</button>
          </div>
          <p className="mt-1 text-xs text-muted">Toque no mapa para marcar o ponto ou use a localização do dispositivo.</p>
          <div className="mt-2 overflow-hidden rounded-lg border border-line">
            <LocationPicker
              latitude={latitude ? Number(latitude) : null}
              longitude={longitude ? Number(longitude) : null}
              onSelect={(lat, lng) => {
                setLatitude(String(lat));
                setLongitude(String(lng));
              }}
            />
          </div>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <label className="text-xs text-muted">Latitude<input required type="number" step="any" min="-90" max="90" value={latitude} onChange={(event) => setLatitude(event.target.value)} className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm text-ink" /></label>
            <label className="text-xs text-muted">Longitude<input required type="number" step="any" min="-180" max="180" value={longitude} onChange={(event) => setLongitude(event.target.value)} className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm text-ink" /></label>
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-semibold">Descrição *</label>
          <textarea id="description" required minLength={10} maxLength={4000} rows={4} value={description} onChange={(event) => setDescription(event.target.value)} className="mt-2 w-full rounded-lg border border-line p-3 text-sm" placeholder="Descreva o que observou." />
        </div>
        <div>
          <label htmlFor="photo" className="block text-sm font-semibold">Foto (opcional)</label>
          <input id="photo" type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onChange={(event) => setPhoto(event.target.files?.[0] ?? null)} className="mt-2 block w-full text-sm text-muted" />
          <p className="mt-1 text-xs text-muted">JPEG, PNG ou WebP, até 5 MB.</p>
        </div>
        {error && <p role="alert" className="rounded-lg bg-danger/10 p-3 text-sm text-danger">{error}</p>}
        <button type="submit" disabled={submitting} className="h-12 w-full rounded-lg bg-action font-semibold text-white hover:bg-action-hover disabled:opacity-60">
          {submitting ? "ENVIANDO..." : "ENVIAR DENÚNCIA"}
        </button>
      </form>
    </main>
  );
}
