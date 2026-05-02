
import type { Holiday, TradingHoliday } from "./types.ts";

// https://open.krx.co.kr/contents/MKD/01/0110/01100305/MKD01100305.jsp
export const HOLIDAY_DETAILS_2024: Holiday[] = [
  { date: "2024-01-01", name: "신정" },
  { date: "2024-02-09", name: "설날" },
  { date: "2024-02-12", name: "설날(대체휴일)" },
  { date: "2024-03-01", name: "삼일절" },
  { date: "2024-04-10", name: "임시공휴일" },
  { date: "2024-05-01", name: "근로자의날" },
  { date: "2024-05-06", name: "어린이날(대체휴일)" },
  { date: "2024-05-15", name: "석가탄신일" },
  { date: "2024-06-06", name: "현충일" },
  { date: "2024-08-15", name: "광복절" },
  { date: "2024-09-16", name: "추석" },
  { date: "2024-09-17", name: "추석" },
  { date: "2024-09-18", name: "추석" },
  { date: "2024-10-01", name: "임시공휴일" },
  { date: "2024-10-03", name: "개천절" },
  { date: "2024-10-09", name: "한글날" },
  { date: "2024-12-25", name: "성탄절" },
];

export const TRADING_HOLIDAY_DETAILS_2024: TradingHoliday[] = [
  ...HOLIDAY_DETAILS_2024,
  { date: "2024-12-31", name: "연말휴장일" },
];

export const HOLIDAYS_2024: string[] = HOLIDAY_DETAILS_2024.map(
  (holiday) => holiday.date
);

export const TRADING_HOLIDAYS_2024: string[] =
  TRADING_HOLIDAY_DETAILS_2024.map((holiday) => holiday.date);
