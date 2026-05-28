import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-4">
        Welcome!
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center p-6 bg-slate-50 rounded-xl">
        <Link href="/register-clinic" passHref className="w-full sm:w-auto">
          <button className="w-full sm:w-auto px-6 py-3 font-semibold text-sm bg-sky-100 text-sky-900 border border-sky-300 rounded-lg shadow-sm transition-all duration-200 hover:bg-sky-200 hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2" disabled>
            Register New Clinic
          </button>
        </Link>
        <Link href="/sign-in" passHref className="w-full sm:w-auto">
        <button className="w-full sm:w-auto px-6 py-3 font-semibold text-sm bg-slate-900 text-white rounded-lg shadow-md transition-all duration-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
          Sign In
        </button>
      </Link>
      </div>
    </main>
  );
}
