export const FULLCALENDAR_VIEWS = {
  MULTI_MONTH_YEAR: "year",
  DAY_GRID_MONTH: "month",
  TIME_GRID_WEEK: "week",
  TIME_GRID_DAY: "day",
} as const;

export type CalendarViewType = typeof FULLCALENDAR_VIEWS[keyof typeof FULLCALENDAR_VIEWS];
