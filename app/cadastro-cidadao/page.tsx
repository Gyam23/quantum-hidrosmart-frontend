"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, apiRequest, login, User } from "@/lib/api";
import ThemeToggle from "@/components/ThemeToggle";

export default function CitizenRegistrationPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await apiRequest<User>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, consent_given: consent }),
      });
      await login(email, password);
      router.replace("/cidadao");
    } catch (requestError) {
      setError(requestError instanceof ApiError ? requestError.message : "Não foi possível criar a conta.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-5 py-8">
      <ThemeToggle className="fixed right-4 top-4 z-50" />
      <form onSubmit={submit} className="card w-full max-w-lg space-y-5 p-6 sm:p-8">
        <Link href="/" className="text-sm font-semibold text-brand">← Voltar ao login</Link>
        <div><h1 className="h-display mt-4 text-3xl">Conta de cidadão</h1><p className="mt-2 text-sm text-muted">Cadastre-se para reportar vazamentos e acompanhar as atualizações.</p></div>
        <label className="block text-sm font-semibold">Nome completo<input required minLength={2} maxLength={120} value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line px-3 font-normal" /></label>
        <label className="block text-sm font-semibold">E-mail<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line px-3 font-normal" /></label>
        <label className="block text-sm font-semibold">Senha<input required type="password" autoComplete="new-password" minLength={10} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-line px-3 font-normal" /><span className="mt-1 block text-xs font-normal text-muted">Mínimo de 10 caracteres.</span></label>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input required type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1" />
          <span>Concordo com o uso dos meus dados de contato, localização e denúncia para o atendimento do serviço, conforme a LGPD.</span>
        </label>
        {error && <p role="alert" className="rounded-lg bg-danger/10 p-3 text-sm text-danger">{error}</p>}
        <button type="submit" disabled={submitting} className="h-12 w-full rounded-lg bg-action font-semibold text-white hover:bg-action-hover disabled:opacity-60">{submitting ? "CRIANDO CONTA..." : "CRIAR CONTA"}</button>
      </form>
    </main>
  );
}
