
import type { Holiday, TradingHoliday } from "./types.ts";

// https://open.krx.co.kr/contents/MKD/01/0110/01100305/MKD01100305.jsp
export const HOLIDAY_DETAILS_2027: Holiday[] = [
  { date: "2027-01-01", name: "신정" },
  { date: "2027-02-08", name: "설날" },
  { date: "2027-02-09", name: "설날(대체휴일)" },
  { date: "2027-03-01", name: "삼일절" },
  { date: "2027-05-05", name: "어린이날" },
  { date: "2027-05-13", name: "석가탄신일" },
  { date: "2027-08-16", name: "광복절(대체휴일)" },
  { date: "2027-09-14", name: "추석" },
  { date: "2027-09-15", name: "추석" },
  { date: "2027-09-16", name: "추석" },
  { date: "2027-10-04", name: "개천절(대체휴일)" },
  { date: "2027-10-11", name: "한글날(대체휴일)" },
  { date: "2027-12-27", name: "성탄절(대체휴일)" },
];

export const TRADING_HOLIDAY_DETAILS_2027: TradingHoliday[] = [
  ...HOLIDAY_DETAILS_2027,
  { date: "2027-12-31", name: "연말휴장일" },
];

export const HOLIDAYS_2027: string[] = HOLIDAY_DETAILS_2027.map(
  (holiday) => holiday.date
);

export const TRADING_HOLIDAYS_2027: string[] =
  TRADING_HOLIDAY_DETAILS_2027.map((holiday) => holiday.date);
