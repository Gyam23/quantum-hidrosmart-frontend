"use client";

import { useEffect, useState } from "react";
import { apiRequestBlob } from "@/lib/api";

export default function ProtectedImage({ path, alt, className }: { path: string; alt: string; className: string }) {
  const [src, setSrc] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let objectUrl: string | null = null;
    apiRequestBlob(path)
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        setSrc(objectUrl);
      })
      .catch(() => setFailed(true));
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [path]);

  if (failed) return <div role="status" className={`${className} grid place-items-center bg-skeleton p-2 text-center text-xs text-muted`}>Foto indisponível</div>;
  if (!src) return <div aria-label="Carregando foto" className={`${className} animate-pulse bg-skeleton`} />;
  return <img src={src} alt={alt} className={className} />;
}
