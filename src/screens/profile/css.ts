/** useCSSVariable có thể trả về number — Lucide cần string. */
export function cssColor(
  value: string | number | undefined,
  fallback: string
): string {
  if (value === undefined || value === null) return fallback;
  return String(value);
}
