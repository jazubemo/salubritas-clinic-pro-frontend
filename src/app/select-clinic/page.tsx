"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function SelectClinicPage() {
    const router = useRouter();
    
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log('click');
            
            router.replace("/sign-in");
        } catch (error) {
            console.log(`Error`, error);
        }
    }
  return (
    <div className="relative z-50 pointer-events-auto w-[450px] max-w-[90%] bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center text-center gap-6">
      <h2 className="text-xl font-bold text-slate-800">
        Select one or more clinics
      </h2>


      <button
        onClick={() => handleSignOut()}
        className="mt-2 text-sm text-red-500 underline cursor-pointer hover:text-red-600 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}


