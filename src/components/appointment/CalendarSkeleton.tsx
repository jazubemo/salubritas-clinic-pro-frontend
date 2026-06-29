import { CalendarViewType } from "./interfaces/CalendarViewType";

interface CalendarSkeletonProps {
  view: CalendarViewType;
}

export default function CalendarSkeleton({ view = "day" }: CalendarSkeletonProps) {
  const getGridConfig = () => {
    switch (view) {
      case "year":
        return { totalBlocks: 12, gridClass: "grid-cols-3 md:grid-cols-4 gap-4" }; // 12 months
      case "month":
        return { totalBlocks: 35, gridClass: "grid-cols-7 gap-2" }; // 5 weeks * 7 days
      case "week":
        return { totalBlocks: 7, gridClass: "grid-cols-7 gap-2" }; // 7 day columns
      case "day":
        return { totalBlocks: 1, gridClass: "grid-cols-1" }; // 1 full day column
    }
  };

  const { totalBlocks, gridClass } = getGridConfig();
  const isTimeBased = view === "week" || view === "day";

  return (
    <div className="w-full h-full animate-pulse p-4 flex flex-col gap-4">
      {/* 1. Header Skeleton (Shared by all views) */}
      <div className="flex justify-between items-center mb-2">
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className={`grid flex-grow h-[600px] border border-gray-100 p-2 rounded-lg ${gridClass}`}>
        {Array.from({ length: totalBlocks }).map((_, index) => (
          <div 
            key={index} 
            className="border border-gray-100 p-2 rounded bg-gray-50 flex flex-col gap-2 relative min-h-[80px]"
          >
            {/* Corner labels for year/month numbers */}
            {!isTimeBased && <div className="h-3 w-6 bg-gray-200 rounded self-end mb-1"></div>}

            {/* Simulated Time Slots/Rows for Week/Day views */}
            {isTimeBased ? (
              <div className="flex flex-col gap-3 h-full justify-between py-2">
                <div className="h-4 w-full bg-gray-100 rounded opacity-60"></div>
                <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-100 rounded opacity-60"></div>
              </div>
            ) : (
              /* Simulated Random Events for Month/Year views */
              index % 4 === 0 && <div className="h-4 w-full bg-gray-100 rounded"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

