import Link from "next/link";
import { Bell } from "lucide-react";
export default function Fab() {
  return <Link href="/alertas" aria-label="Abrir alertas operacionais" className="fixed bottom-8 right-10 grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-lg transition hover:bg-brand-dark"><Bell className="h-6 w-6" /></Link>;
}
