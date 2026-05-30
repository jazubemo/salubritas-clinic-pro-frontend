import ClientAuthContainer from "@/components/ClientAuthContainer";
import LogoBadge from "@/components/LogoBadge";

export default function SignIn() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
    >
      <main className="relative z-10 w-full max-w-xl mx-auto pt-14 pb-12 px-12 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-slate-100/50 text-center">
        <LogoBadge />
        <h1 className="text-2xl font-bold mb-4">
          Let&apos;s get started
        </h1>
        <ClientAuthContainer />
      </main>
    </div>
  );
}
