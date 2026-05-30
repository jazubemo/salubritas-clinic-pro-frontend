"use client";

import Link from "next/link";

export default function WelcomeActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
      <Link href="/register-clinic" passHref className="w-full sm:w-auto">
        <button className="w-full sm:w-48 py-3 px-4 border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition-colors">
          Register New Clinic
        </button>
      </Link>
      <Link href="/sign-in" passHref className="w-full sm:w-auto">
        <button className="w-full sm:w-48 py-3 px-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-sm">
          Sign In
        </button>
      </Link>
    </div>
  );
}
