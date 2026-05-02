import {
  holidayDetailsByYear,
  holidaysByYear,
  tradingHolidayDetailsByYear,
  tradingHolidaysByYear,
} from "../holidays/index.ts";
import type { Holiday, TradingHoliday } from "../holidays/index.ts";
import { parse, format } from "date-fns";

export type { Holiday, TradingHoliday } from "../holidays/index.ts";

/**
 * 주어진 날짜가 한국의 공휴일인지 판단합니다
 * @param dateStr - 확인할 날짜 문자열
 * @param dateFormat - 날짜 포맷 (기본값: "yyyy-MM-dd")
 * @returns 공휴일인 경우 true, 아니면 false
 * @example
 * isHoliday('2024-01-01'); // true (신정, 기본 포맷)
 * isHoliday('01/01/2024', 'dd/MM/yyyy'); // true (유럽식)
 * isHoliday('2024-01-02'); // false (평일)
 */
export const isHoliday = (
  dateStr: string,
  dateFormat: string = "yyyy-MM-dd"
): boolean => {
  const d = parse(dateStr, dateFormat, new Date());
  const year = d.getFullYear().toString();
  const standardDate = format(d, "yyyy-MM-dd");
  return holidaysByYear[year]?.includes(standardDate) ?? false;
};

/**
 * 주어진 날짜가 한국 주식시장 휴무일인지 판단합니다
 * @param dateStr - 확인할 날짜 문자열
 * @param dateFormat - 날짜 포맷 (기본값: "yyyy-MM-dd")
 * @returns 거래소 휴무일인 경우 true, 아니면 false
 * @example
 * isTradingHoliday('2024-01-01'); // true (신정, 기본 포맷)
 * isTradingHoliday('01-01-2024', 'MM-dd-yyyy'); // true (미국식)
 * isTradingHoliday('2024-01-02'); // false (정상 거래일)
 */
export const isTradingHoliday = (
  dateStr: string,
  dateFormat: string = "yyyy-MM-dd"
): boolean => {
  const d = parse(dateStr, dateFormat, new Date());
  const year = d.getFullYear().toString();
  const standardDate = format(d, "yyyy-MM-dd");
  return tradingHolidaysByYear[year]?.includes(standardDate) ?? false;
};

/**
 * 주어진 연도의 한국 공휴일 목록을 반환합니다
 * @param year - 확인할 연도
 * @returns 공휴일 목록. 지원하지 않는 연도는 빈 배열을 반환합니다.
 * @example
 * getHolidays(2025); // [{ date: '2025-01-01', name: '신정' }, ...]
 */
export const getHolidays = (year: number | string): Holiday[] => {
  return (holidayDetailsByYear[String(year)] ?? []).map((holiday) => ({
    ...holiday,
  }));
};

/**
 * 주어진 연도의 한국 주식시장 휴무일 목록을 반환합니다
 * @param year - 확인할 연도
 * @returns 거래소 휴무일 목록. 지원하지 않는 연도는 빈 배열을 반환합니다.
 * @example
 * getTradingHolidays(2025); // [{ date: '2025-01-01', name: '신정' }, ...]
 */
export const getTradingHolidays = (
  year: number | string
): TradingHoliday[] => {
  return (tradingHolidayDetailsByYear[String(year)] ?? []).map((holiday) => ({
    ...holiday,
  }));
};

/**
 * 공휴일 및 거래소 휴무일 데이터를 지원하는 연도 목록을 반환합니다
 * @returns 지원 연도 목록
 * @example
 * getSupportedHolidayYears(); // [2022, 2023, 2024, 2025, 2026, 2027]
 */
export const getSupportedHolidayYears = (): number[] => {
  return Object.keys(holidayDetailsByYear)
    .map(Number)
    .sort((a, b) => a - b);
};
