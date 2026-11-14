"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Droplet, User, ShieldCheck, Eye, EyeOff, CheckCircle2, Check } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [user, setUser] = useState("bezerrinhadofla@gmail.com");
  const [pass, setPass] = useState("123456789012");
  const go = (e?: React.FormEvent) => { e?.preventDefault(); router.push("/visao-geral"); };

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
        <form onSubmit={go} className="w-full max-w-[405px]">
          <h2 className="h-display text-[32px] leading-[1.25]">Bem-vindo ao Quantum HidroSmart</h2>
          <p className="mt-3 text-sm text-muted">Faça login para acessar o painel municipal de controle.</p>

          <label className="mt-9 block text-[13px] font-semibold">Usuário ou e-mail</label>
          <div className="mt-2 flex h-[46px] items-center gap-3 rounded-lg border border-line bg-surface px-4">
            <User className="h-4 w-4 text-muted" />
            <input value={user} onChange={(e) => setUser(e.target.value)} className="w-full bg-transparent text-sm text-muted outline-none" />
          </div>

          <label className="mt-6 block text-[13px] font-semibold">Senha</label>
          <div className="mt-2 flex h-[46px] items-center gap-3 rounded-lg border border-line bg-surface px-4">
            <ShieldCheck className="h-4 w-4 text-muted" />
            <input type={show ? "text" : "password"} value={pass} onChange={(e) => setPass(e.target.value)} className="w-full bg-transparent text-sm text-muted outline-none" />
            <button type="button" onClick={() => setShow(!show)} aria-label="Mostrar senha">{show ? <EyeOff className="h-4 w-4 text-muted" /> : <Eye className="h-4 w-4 text-muted" />}</button>
          </div>

          <div className="mt-6 flex items-center justify-between text-[13px]">
            <button type="button" onClick={() => setRemember(!remember)} className="flex items-center gap-2 text-muted">
              <span className={`grid h-[18px] w-[18px] place-items-center rounded ${remember ? "bg-brand" : "border border-line bg-white"}`}>{remember && <Check className="h-3 w-3 text-white" />}</span>
              Lembrar-me
            </button>
           <Link href="/alterar-senha" className="font-semibold text-brand">Esqueceu a senha?</Link>
          </div>

          <button type="submit" className="mt-6 h-12 w-full rounded-lg bg-brand text-sm font-bold tracking-wider text-white transition hover:bg-brand-dark">ENTRAR</button>
          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted"><CheckCircle2 className="h-4 w-4" />Acesso restrito a servidores e técnicos autorizados.</p>

          <div className="mt-8 flex items-center gap-4 text-xs text-muted"><span className="h-px flex-1 bg-line" />ou<span className="h-px flex-1 bg-line" /></div>
          <p className="mt-3 text-center text-xs text-muted">Ou entre com</p>

          <button type="button" onClick={() => go()} className="mt-4 flex h-[46px] w-full items-center justify-center gap-3 rounded-lg border border-slate-400 bg-white text-sm">
            <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.7 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6C12.3 13.5 17.6 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/><path fill="#FBBC05" d="M10.4 28.8A14.5 14.5 0 0 1 9.5 24c0-1.7.3-3.3.9-4.8l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.8-6z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.4 0-11.7-4-13.6-9.5l-7.8 6C6.5 42.6 14.6 48 24 48z"/></svg>
            Continuar com Google
          </button>
          <button type="button" onClick={() => go()} className="mt-3 flex h-[46px] w-full items-center justify-center gap-3 rounded-lg bg-black text-sm text-white">
            <svg width="18" height="20" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
            Continuar com Apple
          </button>
        </form>
      </section>
    </main>
  );
}
