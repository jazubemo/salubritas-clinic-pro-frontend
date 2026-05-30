import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="relative z-20 bg-white px-8 py-10 rounded-2xl max-w-md w-full shadow-2xl text-center mx-4">
      <div className="flex justify-center mb-5">
        <div className="bg-red-50 w-14 h-14 rounded-full flex items-center justify-center border border-red-100 shadow-sm">
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>

      <h1 className="font-sans text-2xl font-bold text-slate-900 tracking-tight mb-3 font-sans">
        Account Not Found
      </h1>

      <p className="font-sans text-slate-500 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
        Your Google account is not registered in the Salubritas Clinic Pro
        system. Please contact your clinic administrator to request access
        permissions.
      </p>

      <Link href="/sign-in" passHref className="w-full sm:w-auto">
        <button className="w-full sm:w-48 py-3 px-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-sm">
          Return to Sign In
        </button>
      </Link>
    </div>
  );
}
