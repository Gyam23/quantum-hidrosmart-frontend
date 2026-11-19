"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearSession, getCurrentUser, getSessionUser, User, UserRole } from "@/lib/api";

export default function ProtectedArea({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checked, setChecked] = useState(false);
  const allowedRolesKey = allowedRoles.join(",");

  useEffect(() => {
    const cached = getSessionUser();
    if (!cached) {
      router.replace("/");
      return;
    }
    getCurrentUser()
      .then((current) => {
        setUser(current);
        if (!allowedRoles.includes(current.role)) router.replace(current.role === "citizen" ? "/cidadao" : "/visao-geral");
      })
      .catch(() => {
        clearSession();
        router.replace("/");
      })
      .finally(() => setChecked(true));
  }, [allowedRolesKey, router]);

  if (!checked || !user || !allowedRolesKey.split(",").includes(user.role)) {
    return <main className="grid min-h-screen place-items-center text-sm text-muted">Verificando acesso...</main>;
  }
  return children;
}
