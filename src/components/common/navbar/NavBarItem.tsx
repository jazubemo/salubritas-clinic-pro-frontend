import Link from "next/link";
import { ReactNode } from "react";

export enum NavBarTitle {
  Appointments = "Appointments",
  Patients = "Patients",
}

interface NavBarItemProps {
  clinicId: string;
  currentPathname: string;
  title: NavBarTitle;
  Icon: ReactNode;
}

const NavBarItem = ({
  clinicId,
  currentPathname,
  title,
  Icon,
}: NavBarItemProps) => {
  const appointmentsPath = `/clinic/${clinicId}/appointments`;
  const patientsPath = `/clinic/${clinicId}/patients`;

  const itemPath =
    title === NavBarTitle.Appointments ? appointmentsPath : patientsPath;
  const isActive = itemPath === currentPathname;

  return (
    <Link
      href={itemPath}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
        isActive
          ? "bg-white/10 text-white shadow-sm ring-1 ring-white/20"
          : "text-white/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      {Icon}
      {title}
    </Link>
  );
};

export default NavBarItem;
