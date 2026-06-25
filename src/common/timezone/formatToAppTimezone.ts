import { DEFAULT_APP_TIMEZONE } from "../constants/timezone";

/**
 * Formats a UTC ISO date string into the application's default timezone.
 */
export function formatToAppTimezone(utcIsoString: string): string {
  if (!utcIsoString) return ""; 

  const date = new Date(utcIsoString);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid UTC date string provided: ${utcIsoString}`);
  }

  return date.toLocaleString("es-HN", {
    timeZone: DEFAULT_APP_TIMEZONE,
    dateStyle: "long",
    timeStyle: "short",
  });
}

