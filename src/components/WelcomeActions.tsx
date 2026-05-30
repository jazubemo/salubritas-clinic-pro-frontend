"use client";

import Link from "next/link";

export default function WelcomeActions() {
  return (
    <div className="flex items-center justify-center gap-6">
      <Link href="/register-clinic" passHref className="w-full sm:w-auto">
        <button className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500">
          Register New Clinic
        </button>
      </Link>

      <Link href="/sign-in" passHref className="w-full sm:w-auto">
        <button className="px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:bg-black transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900">
          Sign In
        </button>
      </Link>
    </div>
  );
}
