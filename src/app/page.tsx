import AppLogo from "@/components/AppLogo";
import { SubHeading } from "@/components/SubHeading";
import WelcomeActions from "@/components/WelcomeActions";

export default function Home() {
  return (
    <main className="relative z-10 w-full max-w-lg mx-auto pt-14 pb-12 px-12 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-slate-100/50 text-center">
      <AppLogo header="Welcome to Salubritas Clinic Pro" />

      <SubHeading>Manage appointments and patients in one simple workspace</SubHeading>

      <WelcomeActions />
    </main>
  );
}
