
import type { Holiday, TradingHoliday } from "./types.ts";

// https://open.krx.co.kr/contents/MKD/01/0110/01100305/MKD01100305.jsp
export const HOLIDAY_DETAILS_2025: Holiday[] = [
  { date: "2025-01-01", name: "신정" },
  { date: "2025-01-27", name: "임시공휴일" },
  { date: "2025-01-28", name: "설날" },
  { date: "2025-01-29", name: "설날" },
  { date: "2025-01-30", name: "설날" },
  { date: "2025-03-03", name: "삼일절(대체휴일)" },
  { date: "2025-05-01", name: "근로자의날" },
  { date: "2025-05-05", name: "석가탄신일" },
  { date: "2025-05-06", name: "어린이날(대체휴일)" },
  { date: "2025-06-03", name: "임시공휴일" },
  { date: "2025-06-06", name: "현충일" },
  { date: "2025-08-15", name: "광복절" },
  { date: "2025-10-03", name: "개천절" },
  { date: "2025-10-06", name: "추석" },
  { date: "2025-10-07", name: "추석" },
  { date: "2025-10-08", name: "추석(대체휴일)" },
  { date: "2025-10-09", name: "한글날" },
  { date: "2025-12-25", name: "성탄절" },
];

export const TRADING_HOLIDAY_DETAILS_2025: TradingHoliday[] = [
  ...HOLIDAY_DETAILS_2025,
  { date: "2025-12-31", name: "연말휴장일" },
];

export const HOLIDAYS_2025: string[] = HOLIDAY_DETAILS_2025.map(
  (holiday) => holiday.date
);

export const TRADING_HOLIDAYS_2025: string[] =
  TRADING_HOLIDAY_DETAILS_2025.map((holiday) => holiday.date);
