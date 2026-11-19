import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import ServiceWorker from "@/components/ServiceWorker";
import "./globals.css";
const display = Fraunces({ subsets: ["latin"], variable: "--font-display", weight: ["600", "700"] });
const body = Public_Sans({ subsets: ["latin"], variable: "--font-body" });
const themeScript = `(() => {
  const savedTheme = localStorage.getItem("hidrosmart.theme");
  const theme = savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
})();`;
export const metadata: Metadata = {
  title: "Quantum HidroSmart",
  description: "Monitoramento inteligente de redes hídricas",
  applicationName: "Quantum HidroSmart",
  appleWebApp: { capable: true, title: "HidroSmart", statusBarStyle: "default" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`} data-theme="light" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body><ServiceWorker />{children}</body>
    </html>
  );
}
