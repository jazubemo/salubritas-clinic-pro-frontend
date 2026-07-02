import NavBar from "@/components/common/navbar/NavBar";
import ProtectedRouteGuard from "../../providers/ProtectRouteGuard";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <ProtectedRouteGuard>
      <div className="flex flex-col h-screen w-full bg-red overflow-hidden">
        <NavBar />

        <main className="flex-1 flex flex-col w-full max-w-full px-4 pb-4 pt-2 min-h-0">
          <div className="flex-1 w-full min-h-0 bg-transparent rounded-2xl shadow-xl overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRouteGuard>
  );
}
