"use client";
import { useState } from "react";
import Link from "next/link";
import { Droplet, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErro("Informe um e-mail válido.");
      return;
    }
    setErro("");
    setEnviado(true);
  };

  return (
    <main className="flex min-h-screen">
      <section className="hidden w-[44%] flex-col bg-gradient-to-b from-brand-dark to-brand-navy px-[58px] py-[58px] lg:flex">
        <div className="flex items-center gap-4">
          <div className="grid h-[46px] w-[46px] place-items-center rounded-full bg-white"><Droplet className="h-5 w-5 fill-sky-300 text-sky-500" /></div>
          <div className="leading-tight">
            <p className="text-[18px] font-bold tracking-wide text-white">QUANTUM</p>
            <p className="text-[11px] font-semibold tracking-wider text-sky-200">HIDROSMART</p>
          </div>
        </div>
        <div className="my-auto pb-10">
          <div className="mb-6 h-[3px] w-[61px] rounded bg-brand-sky" />
          <h1 className="max-w-[420px] font-display text-[40px] font-bold leading-[1.28] text-white">Monitoramento inteligente de redes hídricas</h1>
          <p className="mt-8 max-w-[470px] text-[15px] leading-relaxed text-sky-200/90">Tecnologia avançada de sensoriamento e controle para a gestão eficiente do abastecimento municipal.</p>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center bg-white px-6">
        <div className="w-full max-w-[405px]">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-[13px] font-semibold text-brand">
            <ArrowLeft className="h-4 w-4" /> Voltar para o login
          </Link>

          <h2 className="h-display text-[32px] leading-[1.25]">Recuperar senha</h2>

          {enviado ? (
            <div className="mt-6">
              <div className="flex items-start gap-3 rounded-lg bg-brand-soft p-4 text-sm text-brand-dark">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <p>Se o e-mail <b>{email}</b> estiver cadastrado, você receberá as instruções para criar uma nova senha.</p>
              </div>
              <Link href="/" className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-brand text-sm font-bold tracking-wider text-white transition hover:bg-brand-dark">
                VOLTAR PARA O LOGIN
              </Link>
            </div>
          ) : (
            <form onSubmit={enviar}>
              <p className="mt-3 text-sm text-muted">Informe o e-mail da sua conta para receber o link de redefinição.</p>

              <label className="mt-9 block text-[13px] font-semibold">E-mail</label>
              <div className={`mt-2 flex h-[46px] items-center gap-3 rounded-lg border bg-surface px-4 ${erro ? "border-danger" : "border-line"}`}>
                <Mail className="h-4 w-4 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
              {erro && <p className="mt-1.5 text-xs text-danger">{erro}</p>}

              <button type="submit" className="mt-6 h-12 w-full rounded-lg bg-brand text-sm font-bold tracking-wider text-white transition hover:bg-brand-dark">
                ENVIAR LINK
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}