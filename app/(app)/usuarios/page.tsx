"use client";

import { FormEvent, useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { apiRequest, User, UserRole } from "@/lib/api";
import ProtectedArea from "@/components/ProtectedArea";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Exclude<UserRole, "citizen">>("operator");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    setUsers(await apiRequest<User[]>("/auth/users"));
  }

  useEffect(() => {
    load().catch((requestError: Error) => setError(requestError.message));
  }, []);

  async function createUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      await apiRequest<User>("/auth/users", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role, consent_given: false }),
      });
      setName("");
      setEmail("");
      setPassword("");
      await load();
      setMessage("Usuário criado.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Não foi possível criar o usuário.");
    }
  }

  return (
    <ProtectedArea allowedRoles={["admin"]}>
      <>
      <PageHeader title="Usuários" />
      <main className="grid flex-1 items-start gap-5 p-8 lg:grid-cols-[1fr_1.2fr]">
        <form onSubmit={createUser} className="card space-y-4 p-6">
          <h2 className="h-display text-lg">Cadastrar gestor ou operador</h2>
          <label className="block text-sm font-semibold">Nome<input required minLength={2} maxLength={120} value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-line px-3 font-normal" /></label>
          <label className="block text-sm font-semibold">E-mail<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-line px-3 font-normal" /></label>
          <label className="block text-sm font-semibold">Senha inicial<input required type="password" minLength={10} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-10 w-full rounded-lg border border-line px-3 font-normal" /></label>
          <label className="block text-sm font-semibold">Perfil<select value={role} onChange={(event) => setRole(event.target.value as Exclude<UserRole, "citizen">)} className="mt-2 h-10 w-full rounded-lg border border-line bg-white px-3 font-normal"><option value="operator">Operador</option><option value="admin">Admin/Gestor</option></select></label>
          {error && <p role="alert" className="text-sm text-danger">{error}</p>}
          {message && <p role="status" className="text-sm text-brand">{message}</p>}
          <button className="h-11 w-full rounded-lg bg-brand font-semibold text-white">Criar usuário</button>
        </form>
        <section className="card p-6">
          <h2 className="h-display text-lg">Usuários cadastrados</h2>
          <div className="mt-4 divide-y divide-line">
            {users.map((user) => <article key={user.id} className="flex items-center justify-between gap-3 py-3"><div><p className="text-sm font-semibold">{user.name}</p><p className="text-xs text-muted">{user.email}</p></div><span className="rounded bg-brand-soft px-2 py-1 text-xs font-semibold text-brand-dark">{user.role === "admin" ? "Gestor" : user.role === "operator" ? "Operador" : "Cidadão"}</span></article>)}
            {users.length === 0 && <p className="py-4 text-sm text-muted">Nenhum usuário listado.</p>}
          </div>
        </section>
      </main>
      </>
    </ProtectedArea>
  );
}
