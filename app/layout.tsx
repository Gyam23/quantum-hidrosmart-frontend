import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import ServiceWorker from "@/components/ServiceWorker";
import "./globals.css";
const display = Fraunces({ subsets: ["latin"], variable: "--font-display", weight: ["600", "700"] });
const body = Public_Sans({ subsets: ["latin"], variable: "--font-body" });
export const metadata: Metadata = {
  title: "Quantum HidroSmart",
  description: "Monitoramento inteligente de redes hídricas",
  applicationName: "Quantum HidroSmart",
  appleWebApp: { capable: true, title: "HidroSmart", statusBarStyle: "default" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body><ServiceWorker />{children}</body>
    </html>
  );
}
