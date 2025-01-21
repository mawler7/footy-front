export const TIMEZONES = [...Array.from({ length: 27 }, (_, i) => `GMT${i - 12 > 0 ? '+' : ''}${i - 12}:00`)];
