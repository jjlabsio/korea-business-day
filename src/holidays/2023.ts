
import type { Holiday, TradingHoliday } from "./types.ts";

// https://open.krx.co.kr/contents/MKD/01/0110/01100305/MKD01100305.jsp
export const HOLIDAY_DETAILS_2023: Holiday[] = [
  { date: "2023-01-23", name: "설날" },
  { date: "2023-01-24", name: "설날(대체휴일)" },
  { date: "2023-03-01", name: "삼일절" },
  { date: "2023-05-01", name: "근로자의날" },
  { date: "2023-05-05", name: "어린이날" },
  { date: "2023-05-29", name: "석가탄신일(대체휴일)" },
  { date: "2023-06-06", name: "현충일" },
  { date: "2023-08-15", name: "광복절" },
  { date: "2023-09-28", name: "추석" },
  { date: "2023-09-29", name: "추석" },
  { date: "2023-10-02", name: "임시공휴일" },
  { date: "2023-10-03", name: "개천절" },
  { date: "2023-10-09", name: "한글날" },
  { date: "2023-12-25", name: "성탄절" },
];

export const TRADING_HOLIDAY_DETAILS_2023: TradingHoliday[] = [
  ...HOLIDAY_DETAILS_2023,
  { date: "2023-12-29", name: "연말휴장일" },
];

export const HOLIDAYS_2023: string[] = HOLIDAY_DETAILS_2023.map(
  (holiday) => holiday.date
);

export const TRADING_HOLIDAYS_2023: string[] =
  TRADING_HOLIDAY_DETAILS_2023.map((holiday) => holiday.date);
