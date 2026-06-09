import { Calendar, Users } from "lucide-react";
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
}

const NavBarItem = ({
  clinicId,
  currentPathname,
  title,
}: NavBarItemProps) => {
  const appointmentsPath = `/clinic/${clinicId}/appointments`;
  const patientsPath = `/clinic/${clinicId}/patients`;

  const itemPath =
    title === NavBarTitle.Appointments ? appointmentsPath : patientsPath;
  const isActive = itemPath === currentPathname;

  const getIcon = (): ReactNode => {
    switch (title) {
      case NavBarTitle.Appointments:
        return (
          <Calendar
            className={`h-4 w-4 ${currentPathname === appointmentsPath ? "text-cyan-400" : "text-white/50"}`}
          />
        );
      case NavBarTitle.Patients:
        return (
          <Users
            className={`h-4 w-4 ${currentPathname === patientsPath ? "text-cyan-400" : "text-white/50"}`}
          />
        );
      default:

    }
  };

  return (
    <Link
      href={itemPath}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
        isActive
          ? "bg-white/10 text-white/90 font-semibold shadow-sm ring-1 ring-white/20"
          : "text-white/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      {getIcon()}
      {title}
    </Link>
  );
};

export default NavBarItem;
