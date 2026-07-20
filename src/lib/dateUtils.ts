const MYSQL_DATETIME_PATTERN = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?$/;

export function parseApiDate(value?: string | null) {
  if (!value) return null;

  const mysqlParts = value.trim().match(MYSQL_DATETIME_PATTERN);
  if (mysqlParts) {
    const [, year, month, day, hour, minute, second, fraction = "0"] = mysqlParts;
    const milliseconds = Number(fraction.slice(0, 3).padEnd(3, "0"));
    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second),
      milliseconds
    );
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatApiDate(value?: string | null, options?: Intl.DateTimeFormatOptions) {
  const date = parseApiDate(value);
  if (!date) return value || "Not available";
  return date.toLocaleDateString("en-GB", options);
}

export function getApiDateTimestamp(value?: string | null) {
  return parseApiDate(value)?.getTime() ?? 0;
}
