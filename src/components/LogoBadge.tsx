import { HeartPulse } from 'lucide-react'; 

export default function LogoBadge() {
  return (
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-600 mb-6 text-white shadow-lg shadow-indigo-100 border border-indigo-400/20">
      <HeartPulse 
        className="w-8 h-8" 
        strokeWidth={2.2} 
        color="currentColor" 
      />
    </div>
  );
}
