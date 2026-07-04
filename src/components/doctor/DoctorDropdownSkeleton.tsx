export function DoctorDropdownSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full py-4 animate-pulse">
      <div className="h-3 w-40 bg-white/20 rounded-md tracking-wider" />
      
      <div className="flex items-center justify-between w-[250px] px-6 py-3 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
        
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-white/30 rounded-full" />
          <div className="h-4 w-28 bg-white/30 rounded-md" />
        </div>

        <div className="w-4 h-4 bg-white/30 rounded-md clip-chevron" />
      </div>
    </div>
  );
}
