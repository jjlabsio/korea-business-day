import { holidaysByYear, tradingHolidaysByYear } from "../holidays/index.ts";
import { parse, format } from "date-fns";

/**
 * 주어진 날짜가 한국의 공휴일인지 판단합니다
 * @param date - 확인할 날짜 문자열
 * @param dateFormat - 날짜 포맷 (기본값: "yyyy-MM-dd")
 * @returns 공휴일인 경우 true, 아니면 false
 * @example
 * isHoliday('2024-01-01'); // true (신정, 기본 포맷)
 * isHoliday('01/01/2024', 'dd/MM/yyyy'); // true (유럽식)
 * isHoliday('2024-01-02'); // false (평일)
 */
export const isHoliday = (
  date: string,
  dateFormat: string = "yyyy-MM-dd"
): boolean => {
  const d = parse(date, dateFormat, new Date());
  const year = d.getFullYear().toString();
  const standardDate = format(d, "yyyy-MM-dd");
  return holidaysByYear[year]?.includes(standardDate) ?? false;
};

/**
 * 주어진 날짜가 한국 주식시장 휴무일인지 판단합니다
 * @param date - 확인할 날짜 문자열
 * @param dateFormat - 날짜 포맷 (기본값: "yyyy-MM-dd")
 * @returns 거래소 휴무일인 경우 true, 아니면 false
 * @example
 * isTradingHoliday('2024-01-01'); // true (신정, 기본 포맷)
 * isTradingHoliday('01-01-2024', 'MM-dd-yyyy'); // true (미국식)
 * isTradingHoliday('2024-01-02'); // false (정상 거래일)
 */
export const isTradingHoliday = (
  date: string,
  dateFormat: string = "yyyy-MM-dd"
): boolean => {
  const d = parse(date, dateFormat, new Date());
  const year = d.getFullYear().toString();
  const standardDate = format(d, "yyyy-MM-dd");
  return tradingHolidaysByYear[year]?.includes(standardDate) ?? false;
};
