import ProtectedArea from "@/components/ProtectedArea";
import LogoutButton from "@/components/LogoutButton";
import ThemeToggle from "@/components/ThemeToggle";

export default function CitizenLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedArea allowedRoles={["citizen"]}>
      <div className="min-h-screen bg-surface">
        <header className="flex items-center justify-between bg-brand-navy px-5 py-4 text-white sm:px-8">
          <a href="/cidadao" className="font-display text-lg font-bold">QUANTUM HIDROSMART</a>
          <div className="flex items-center gap-3">
            <a href="/cidadao/denunciar" className="text-sm font-semibold">Denunciar vazamento</a>
            <ThemeToggle />
            <LogoutButton />
          </div>
        </header>
        {children}
      </div>
    </ProtectedArea>
  );
}
