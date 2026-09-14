// Spring can send LocalDateTime either as an ISO string or as a
// [year, month, day, hour, minute, second] array depending on Jackson
// config, so handle both instead of assuming one shape.
export function formatDate(date) {
  if (!date) return "";
  const d = Array.isArray(date)
    ? new Date(date[0], date[1] - 1, date[2], date[3] || 0, date[4] || 0)
    : new Date(date);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
