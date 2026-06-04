import AppLogo from "@/components/common/AppLogo";
import { SubHeading } from "@/components/common/SubHeading";
import WelcomeActions from "@/components/welcome/WelcomeActions";

export default function Home() {
  return (
    <main className="relative z-10 w-full max-w-lg mx-auto pt-14 pb-12 px-12 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-slate-100/50 text-center">
      <AppLogo header="Welcome to Salubritas Clinic Pro" />

      <SubHeading>Manage appointments and patients in one simple workspace</SubHeading>

      <WelcomeActions />
    </main>
  );
}
