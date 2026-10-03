export const HALLOWEEN_CAMPAIGN = {
  startDate: "2026-10-01",
  endDateExclusive: "2026-11-02",
  timeZone: "Europe/Madrid"
} as const;

export function isHalloweenCampaignActive(now = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: HALLOWEEN_CAMPAIGN.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(now);
  const date = `${parts.find((part) => part.type === "year")?.value}-${parts.find((part) => part.type === "month")?.value}-${parts.find((part) => part.type === "day")?.value}`;
  return date >= HALLOWEEN_CAMPAIGN.startDate && date < HALLOWEEN_CAMPAIGN.endDateExclusive;
}
