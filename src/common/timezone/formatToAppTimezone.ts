import { DateTime } from "luxon";
import { DEFAULT_APP_TIMEZONE } from "../constants/timezone";

/**
 * Transforms a UTC ISO string into a localized 'YYYY-MM-DDTHH:mm:ss' format
 * safe for Next.js SSR and HTML datetime-local inputs.
 */
export function formatToAppTimezone(utc: string | null | undefined): string {
  if (!utc) return "";

  const dateTime = DateTime.fromISO(utc, { zone: "utc" })
    .setZone(DEFAULT_APP_TIMEZONE);

  if (!dateTime.isValid) {
    console.error(`Invalid date passed: ${utc}`, dateTime.invalidExplanation);
    return "";
  }

  return dateTime.toFormat("yyyy-MM-dd'T'HH:mm:ss");
}

