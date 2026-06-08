import NavBar from "@/components/common/NavBar";
import ProtectedRouteGuard from "../../providers/ProtectRouteGuard"; // Your guard path

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <ProtectedRouteGuard>
      <div className="flex flex-col h-screen w-full bg-slate-900 overflow-hidden">
        <NavBar />
        <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 h-[calc(100vh-64px)]">
          <div className="flex-1 w-full bg-white rounded-2xl shadow-xl p-6 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRouteGuard>
  );
}
