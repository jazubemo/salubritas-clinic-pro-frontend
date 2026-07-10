'use client';

import { AppointmentEvent } from '@/common/types/AppointmentEvent';
import { Pencil, Trash2, X, User } from 'lucide-react';

interface AppointmentPopoverCardProps {
  selectedEvent: AppointmentEvent;
  popoverPosition: { top: number; left: number };
  onClose: () => void;
  onRemove: (id: string) => Promise<void>;
}

export default function AppointmentPopoverCard({
  selectedEvent,
  popoverPosition,
  onClose,
  onRemove,
}: AppointmentPopoverCardProps) {
  return (
    <div 
      className="absolute z-50 w-80 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-5 animate-in fade-in zoom-in-95 duration-150"
      style={{
        top: `${popoverPosition.top}px`,
        left: `${popoverPosition.left}px`,
      }}
    >
      {/* Card Header & Compact Layout Icons */}
      <div className="flex justify-between items-start mb-4 gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-lg leading-tight text-slate-900 dark:text-white truncate">
            {selectedEvent.patientName}
          </h3>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold mt-1.5 ${
            selectedEvent.status === 'CONFIRMED' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
          }`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {selectedEvent.status}
          </span>
        </div>

        {/* Micro Action Buttons */}
        <div className="flex items-center gap-1 shrink-0 bg-slate-50 dark:bg-slate-900 p-1 rounded-lg border border-slate-100 dark:border-slate-800">
          <button 
            onClick={() => console.log('edit')}
            title="Edit Appointment"
            className="p-1.5 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 rounded-md hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm"
          >
            <Pencil size={16} />
          </button>
          
          <button 
            onClick={() => onRemove(selectedEvent._id)}
            title="Cancel Appointment"
            className="p-1.5 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 rounded-md hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm"
          >
            <Trash2 size={16} />
          </button>

          <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700 mx-0.5" />

          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Details Body */}
      <div className="space-y-3 text-sm border-t border-slate-100 dark:border-slate-700 pt-3">
        <div className="flex items-center gap-3">
          <User size={16} className="text-slate-400 shrink-0" />
          <div>
            <p className="text-xs text-slate-400 font-medium">Attending Doctor</p>
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              {selectedEvent.doctorName || 'Unassigned'}
            </p>
          </div>
        </div>
        
        {selectedEvent.reason && (
          <div className="border-t border-slate-50 dark:border-slate-800/50 pt-2 text-slate-600 dark:text-slate-300">
            <p className="text-xs text-slate-400 font-medium mb-0.5">Reason for Visit</p>
            <p className="italic">{selectedEvent.reason}</p>
          </div>
        )}
      </div>
    </div>
  );
}
