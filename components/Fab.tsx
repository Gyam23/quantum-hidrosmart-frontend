import { Plus } from "lucide-react";
export default function Fab() {
  return <button aria-label="Novo" className="fixed bottom-8 right-10 grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-lg transition hover:bg-brand-dark"><Plus className="h-6 w-6" /></button>;
}
