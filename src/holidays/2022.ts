
import type { Holiday, TradingHoliday } from "./types.ts";

// https://open.krx.co.kr/contents/MKD/01/0110/01100305/MKD01100305.jsp
export const HOLIDAY_DETAILS_2022: Holiday[] = [
  { date: "2022-01-31", name: "설날" },
  { date: "2022-02-01", name: "설날" },
  { date: "2022-02-02", name: "설날" },
  { date: "2022-03-01", name: "삼일절" },
  { date: "2022-03-09", name: "20대 대통령 선거" },
  { date: "2022-05-05", name: "어린이날" },
  { date: "2022-06-01", name: "8회 지방선거" },
  { date: "2022-06-06", name: "현충일" },
  { date: "2022-08-15", name: "광복절" },
  { date: "2022-09-09", name: "추석" },
  { date: "2022-09-12", name: "추석(대체휴일)" },
  { date: "2022-10-03", name: "개천절" },
  { date: "2022-10-10", name: "한글날(대체휴일)" },
];

export const TRADING_HOLIDAY_DETAILS_2022: TradingHoliday[] = [
  ...HOLIDAY_DETAILS_2022,
  { date: "2022-12-30", name: "연말휴장일" },
];

export const HOLIDAYS_2022: string[] = HOLIDAY_DETAILS_2022.map(
  (holiday) => holiday.date
);

export const TRADING_HOLIDAYS_2022: string[] =
  TRADING_HOLIDAY_DETAILS_2022.map((holiday) => holiday.date);
