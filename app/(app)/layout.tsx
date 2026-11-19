import Sidebar from "@/components/Sidebar";
import ProtectedArea from "@/components/ProtectedArea";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedArea allowedRoles={["admin", "operator"]}>
      <div className="flex min-h-screen flex-col">
        <div className="h-[30px] bg-brand-dark" />
        <div className="flex flex-1"><Sidebar /><div className="flex min-w-0 flex-1 flex-col">{children}</div></div>
      </div>
    </ProtectedArea>
  );
}
