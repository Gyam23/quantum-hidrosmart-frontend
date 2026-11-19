"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, ChartScatter, Bell, Users, FileBarChart, FileUp, LogOut } from "lucide-react";
import { clearSession, getSessionUser, User } from "@/lib/api";

const items = [
  { href: "/visao-geral", label: "Visão geral", icon: LayoutGrid },
  { href: "/mapa", label: "Mapa da rede", icon: ChartScatter },
  { href: "/leituras", label: "Importar leituras", icon: FileUp },
  { href: "/alertas", label: "Alertas", icon: Bell },
  { href: "/cidadaos", label: "Cidadãos", icon: Users },
  { href: "/relatorios", label: "Relatórios", icon: FileBarChart },
];

export default function Sidebar() {
  const path = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const senhaAtiva = path === "/alterar-senha";
  useEffect(() => setUser(getSessionUser()), []);
  const visibleItems = user?.role === "admin"
    ? [...items, { href: "/usuarios", label: "Usuários", icon: Users }]
    : items;

  function logout() {
    clearSession();
    router.replace("/");
  }

  return (
    <aside className="hidden w-[227px] shrink-0 flex-col bg-brand-soft px-4 pb-4 pt-8 md:flex">
      <Link href="/visao-geral" className="mb-8 block px-2 leading-tight">
        <p className="font-display text-[19px] font-bold text-brand-dark">QUANTUM</p>
        <p className="text-[11px] font-bold tracking-[0.28em] text-brand">HIDROSMART</p>
      </Link>
      <nav className="flex flex-col gap-1.5">
        {visibleItems.map(({ href, label, icon: Icon }) => {
          const active = path === href;
          return (
            <Link key={href} href={href} className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm ${active ? "bg-card font-semibold text-brand-dark shadow-sm" : "text-ink hover:bg-card/60"}`}>
              <Icon className={`h-[18px] w-[18px] ${active ? "text-brand" : "text-muted"}`} />
              <span className="flex-1">{label}</span>
            </Link>
          );
        })}
      </nav>
      <Link
        href="/alterar-senha"
        className={`mt-auto flex items-center gap-3 rounded-lg border bg-card p-2.5 transition hover:border-brand ${senhaAtiva ? "border-brand" : "border-line"}`}
      >
        <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-action text-[11px] font-bold text-white">{user?.name.slice(0, 2).toUpperCase() ?? "QH"}</span>
        <div className="min-w-0 flex-1 leading-tight"><p className="truncate text-xs font-semibold">{user?.name ?? "Usuário"}</p><p className="text-[11px] text-muted">{user?.role === "admin" ? "Gestor" : "Operador"}</p></div>
      </Link>
      <button onClick={logout} className="mt-3 flex items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold text-muted hover:bg-card">
        <LogOut className="h-4 w-4" /> Sair
      </button>
    </aside>
  );
}