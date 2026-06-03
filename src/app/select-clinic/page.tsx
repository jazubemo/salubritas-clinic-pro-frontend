import ClinicCardContainer from "@/components/ClinicCardContainer";
import LogoBadge from "@/components/AppLogo";
import SignOutButton from "@/components/SignOutButton";

export default function SelectClinicPage() {
  return (
    <div className="relative z-50 pointer-events-auto w-[450px] max-w-[90%] bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center text-center gap-6">
      <LogoBadge />
      <ClinicCardContainer />

      <SignOutButton />
    </div>
  );
}
