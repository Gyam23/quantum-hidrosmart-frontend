"use client";

import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

export type MapMarker = {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  severity?: "low" | "medium" | "high";
};

export default function LeafletMap({
  markers,
  className = "",
}: {
  markers: MapMarker[];
  className?: string;
}) {
  return (
    <MapContainer center={[-9.3893, -40.5031]} zoom={14} scrollWheelZoom className={`h-full w-full ${className}`}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => {
        const color = marker.severity ? "#dc4b4b" : "#1283ad";
        return (
          <CircleMarker
            key={marker.id}
            center={[marker.latitude, marker.longitude]}
            radius={marker.severity ? 9 : 7}
            pathOptions={{ color, fillColor: color, fillOpacity: 0.75 }}
          >
            <Popup><strong>{marker.title}</strong><br />{marker.description}</Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
