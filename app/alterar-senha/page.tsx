"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedArea from "@/components/ProtectedArea";
import { apiRequest, clearSession } from "@/lib/api";

function ChangePasswordForm() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      await apiRequest<void>("/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
      });
      setMessage("Senha alterada. Entre novamente com a nova senha.");
      clearSession();
      router.replace("/");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Não foi possível alterar a senha.");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-5 py-8">
      <form onSubmit={submit} className="card w-full max-w-md space-y-5 p-7">
        <Link href="/visao-geral" className="text-sm font-semibold text-brand">← Voltar ao painel</Link>
        <div><h1 className="h-display mt-4 text-3xl">Alterar senha</h1><p className="mt-2 text-sm text-muted">Confirme sua senha atual e escolha uma nova senha.</p></div>
        <label className="block text-sm font-semibold">Senha atual<input required type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line px-3 font-normal" /></label>
        <label className="block text-sm font-semibold">Nova senha<input required type="password" minLength={10} maxLength={128} autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line px-3 font-normal" /><span className="mt-1 block text-xs font-normal text-muted">Mínimo de 10 caracteres.</span></label>
        {error && <p role="alert" className="text-sm text-danger">{error}</p>}
        {message && <p role="status" className="text-sm text-brand">{message}</p>}
        <button className="h-11 w-full rounded-lg bg-brand font-semibold text-white">Alterar senha</button>
      </form>
    </main>
  );
}

export default function ChangePasswordPage() {
  return <ProtectedArea allowedRoles={["admin", "operator", "citizen"]}><ChangePasswordForm /></ProtectedArea>;
}
