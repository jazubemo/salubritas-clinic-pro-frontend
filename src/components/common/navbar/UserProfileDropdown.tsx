import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/lib/store";
import { ChevronDown, User } from "lucide-react";

import SignOutButton from "@/components/auth/SignOutButton";

const UserProfileDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 rounded-full p-1 pr-3 transition-colors hover:bg-white/5 focus:outline-none"
      >
        {/* Profile Avatar Grid */}
        <div className="h-9 w-9 overflow-hidden rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white">
          <User className="h-5 w-5 text-white/60" />
        </div>

        <ChevronDown
          className={`h-3 w-3 opacity-50 text-white/60 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute z-50 right-0 mt-2 w-56 origin-top-right rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 duration-100">
          <div className="px-3 py-2 border-b border-white/5 mb-1">
            <p className="text-xs text-white/40 font-medium">Signed in as</p>
            <p className="text-sm font-semibold text-white truncate">
              {user?.firstName}
            </p>
            {user?.email && (
              <p className="text-xs text-white/50 truncate mt-0.5">
                {user.email}
              </p>
            )}
          </div>

          <SignOutButton />
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
