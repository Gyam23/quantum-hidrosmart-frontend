"use client";

import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/api";

export default function LogoutButton() {
  const router = useRouter();

  function logout() {
    clearSession();
    router.replace("/");
  }

  return <button onClick={logout} className="text-sm font-semibold text-white/90">Sair</button>;
}
