"use client";

import { useEffect } from "react";
import { CircleMarker, MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";

const PETROLINA_CENTER: [number, number] = [-9.3893, -40.5031];

function MapClickHandler({ onSelect }: { onSelect: (latitude: number, longitude: number) => void }) {
  useMapEvents({
    click(event) {
      onSelect(Number(event.latlng.lat.toFixed(6)), Number(event.latlng.lng.toFixed(6)));
    },
  });
  return null;
}

function Recenter({ latitude, longitude }: { latitude: number; longitude: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([latitude, longitude]);
  }, [map, latitude, longitude]);
  return null;
}

export default function LocationPicker({
  latitude,
  longitude,
  onSelect,
}: {
  latitude: number | null;
  longitude: number | null;
  onSelect: (latitude: number, longitude: number) => void;
}) {
  const position: [number, number] = latitude === null || longitude === null
    ? PETROLINA_CENTER
    : [latitude, longitude];

  return (
    <MapContainer center={position} zoom={15} className="h-64 w-full rounded-lg">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onSelect={onSelect} />
      <Recenter latitude={position[0]} longitude={position[1]} />
      {latitude !== null && longitude !== null && (
        <CircleMarker center={[latitude, longitude]} radius={9} pathOptions={{ color: "#1283ad", fillOpacity: 0.8 }} />
      )}
    </MapContainer>
  );
}
