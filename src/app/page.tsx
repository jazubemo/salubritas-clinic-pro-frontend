import LogoBadge from "@/components/LogoBadge";
import WelcomeActions from "@/components/WelcomeActions";

export default function Home() {
  return (
    <main className="relative z-10 w-full max-w-xl mx-auto pt-14 pb-12 px-12 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-slate-100/50 text-center">
      <LogoBadge />

      <h1 className="text-2xl font-bold text-slate-800 mb-8">
        Welcome to Salubritas Care.
      </h1>

      <p className="text-sm text-slate-700 mt-3 mb-10 max-w-sm mx-auto leading-relaxed px-4">
        <span className="font-semibold text-slate-600">
          Manage appointments and patients in one simple workspace.
        </span>
      </p>

      <WelcomeActions />
    </main>
  );
}
