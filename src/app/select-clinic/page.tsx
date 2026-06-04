import ClinicCardContainer from "@/components/clinic/ClinicCardContainer";
import LogoBadge from "@/components/common/AppLogo";
import SignOutButton from "@/components/auth/SignOutButton";

export default function SelectClinicPage() {
  return (
    <div className="relative z-50 pointer-events-auto w-[450px] max-w-[90%] bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center text-center gap-6">
      <LogoBadge />
      <ClinicCardContainer />

      <SignOutButton />
    </div>
  );
}
