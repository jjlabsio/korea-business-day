
import type { Holiday, TradingHoliday } from "./types.ts";

// https://open.krx.co.kr/contents/MKD/01/0110/01100305/MKD01100305.jsp
export const HOLIDAY_DETAILS_2026: Holiday[] = [
  { date: "2026-01-01", name: "신정" },
  { date: "2026-02-16", name: "설날" },
  { date: "2026-02-17", name: "설날" },
  { date: "2026-02-18", name: "설날" },
  { date: "2026-03-02", name: "삼일절(대체휴일)" },
  { date: "2026-05-01", name: "근로자의날" },
  { date: "2026-05-05", name: "어린이날" },
  { date: "2026-05-25", name: "석가탄신일(대체휴일)" },
  { date: "2026-06-03", name: "임시공휴일" },
  { date: "2026-07-17", name: "제헌절" },
  { date: "2026-08-17", name: "광복절(대체휴일)" },
  { date: "2026-09-24", name: "추석" },
  { date: "2026-09-25", name: "추석" },
  { date: "2026-10-05", name: "개천절(대체휴일)" },
  { date: "2026-10-09", name: "한글날" },
  { date: "2026-12-25", name: "성탄절" },
];

export const TRADING_HOLIDAY_DETAILS_2026: TradingHoliday[] = [
  ...HOLIDAY_DETAILS_2026,
  { date: "2026-12-31", name: "연말휴장일" },
];

export const HOLIDAYS_2026: string[] = HOLIDAY_DETAILS_2026.map(
  (holiday) => holiday.date
);

export const TRADING_HOLIDAYS_2026: string[] =
  TRADING_HOLIDAY_DETAILS_2026.map((holiday) => holiday.date);
