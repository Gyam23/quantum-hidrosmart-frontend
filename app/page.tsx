"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Droplet, User, ShieldCheck, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { ApiError, login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(email, password);
      router.replace(user.role === "citizen" ? "/cidadao" : "/visao-geral");
    } catch (requestError) {
      setError(requestError instanceof ApiError ? requestError.message : "Não foi possível conectar à API.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen">
      <section className="hidden w-[44%] flex-col bg-gradient-to-b from-brand-dark to-brand-navy px-[58px] py-[58px] lg:flex">
        <div className="flex items-center gap-4">
          <div className="grid h-[46px] w-[46px] place-items-center rounded-full bg-white"><Droplet className="h-5 w-5 fill-sky-300 text-sky-500" /></div>
          <div className="leading-tight"><p className="text-[18px] font-bold tracking-wide text-white">QUANTUM</p><p className="text-[11px] font-semibold tracking-wider text-sky-200">HIDROSMART</p></div>
        </div>
        <div className="my-auto pb-10">
          <div className="mb-6 h-[3px] w-[61px] rounded bg-brand-sky" />
          <h1 className="max-w-[420px] font-display text-[40px] font-bold leading-[1.28] text-white">Monitoramento inteligente de redes hídricas</h1>
          <p className="mt-8 max-w-[470px] text-[15px] leading-relaxed text-sky-200/90">Tecnologia para detectar vazamentos e apoiar a gestão eficiente do abastecimento municipal.</p>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center bg-white px-6">
        <form onSubmit={submit} className="w-full max-w-[405px]">
          <h2 className="h-display text-[32px] leading-[1.25]">Bem-vindo ao Quantum HidroSmart</h2>
          <p className="mt-3 text-sm text-muted">Entre para acessar o painel ou acompanhar sua denúncia.</p>

          <label htmlFor="email" className="mt-9 block text-[13px] font-semibold">E-mail</label>
          <div className="mt-2 flex h-[46px] items-center gap-3 rounded-lg border border-line bg-surface px-4">
            <User className="h-4 w-4 text-muted" />
            <input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent text-sm outline-none" />
          </div>

          <label htmlFor="password" className="mt-6 block text-[13px] font-semibold">Senha</label>
          <div className="mt-2 flex h-[46px] items-center gap-3 rounded-lg border border-line bg-surface px-4">
            <ShieldCheck className="h-4 w-4 text-muted" />
            <input id="password" type={show ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-transparent text-sm outline-none" />
            <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Ocultar senha" : "Mostrar senha"}>{show ? <EyeOff className="h-4 w-4 text-muted" /> : <Eye className="h-4 w-4 text-muted" />}</button>
          </div>

          {error && <p role="alert" className="mt-3 rounded-lg bg-danger/10 p-3 text-sm text-danger">{error}</p>}
          <button type="submit" disabled={submitting} className="mt-6 h-12 w-full rounded-lg bg-brand text-sm font-bold tracking-wider text-white transition hover:bg-brand-dark disabled:opacity-60">
            {submitting ? "ENTRANDO..." : "ENTRAR"}
          </button>
          <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted"><CheckCircle2 className="h-4 w-4" />Acesso municipal restrito a usuários autorizados.</p>
          <div className="mt-8 border-t border-line pt-5 text-center text-sm text-muted">
            Cidadão? <Link href="/cadastro-cidadao" className="font-semibold text-brand">Crie sua conta para denunciar um vazamento</Link>
          </div>
        </form>
      </section>
    </main>
  );
}
