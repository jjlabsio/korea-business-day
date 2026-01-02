import {
  isWeekend,
  findNextDate,
  findPreviousDate,
  findLastDate,
  Predicate,
} from "./date-utils.ts";
import { isTradingHoliday } from "./holiday.ts";

/**
 * 주어진 날짜가 한국 주식시장 개장일인지 판단합니다 (주말 및 거래소 휴무일 제외)
 * @param dateStr - 확인할 날짜 문자열
 * @param format - 날짜 포맷 (기본값: "yyyy-MM-dd")
 * @returns 개장일인 경우 true, 아니면 false
 * @example
 * isTradingDay('2024-01-02'); // true (화요일, 개장일)
 * isTradingDay('2024-01-01'); // false (신정, 거래소 휴무)
 * isTradingDay('12/31/2024', 'MM/dd/yyyy'); // false (미국식 포맷, 연말 특별휴무일)
 * isTradingDay('2024-12-31'); // false (연말 특별휴무일)
 * isTradingDay('2024-01-06'); // false (토요일, 주말)
 */
export const isTradingDay: Predicate = (dateStr, format = "yyyy-MM-dd") => {
  return !isWeekend(dateStr, format) && !isTradingHoliday(dateStr, format);
};

/**
 * 주어진 날짜 다음의 N번째 주식시장 개장일을 반환합니다
 * @param dateStr - 기준 날짜 문자열
 * @param options - 옵션 객체
 * @param options.count - 몇 번째 개장일인지 (기본값: 1)
 * @param options.format - 날짜 포맷 (기본값: "yyyy-MM-dd")
 * @returns N번째 다음 개장일 날짜 (format 파라미터로 지정된 형식)
 * @example
 * getNextTradingDay('2024-01-01'); // '2024-01-02' (신정 다음 첫 번째 개장일)
 * getNextTradingDay('2024-01-01', { count: 2 }); // '2024-01-03' (신정 다음 두 번째 개장일)
 * getNextTradingDay('01/01/2024', { count: 1, format: 'MM/dd/yyyy' }); // '01/02/2024' (미국식 포맷 입출력)
 * getNextTradingDay('2024-12-29', { count: 3 }); // '2025-01-06' (연말특별휴무 다음 세 번째 개장일)
 * getNextTradingDay('2024-05-03', { count: 5 }); // '2024-05-13' (어린이날 연휴 다음 다섯 번째 개장일)
 */
export const getNextTradingDay = (
  dateStr: string,
  options: {
    count?: number;
    format?: string;
  } = {}
): string => {
  const { count = 1, format = "yyyy-MM-dd" } = options;
  return findNextDate(dateStr, isTradingDay, { count, format });
};

/**
 * 주어진 날짜 이전의 N번째 주식시장 개장일을 반환합니다
 * @param dateStr - 기준 날짜 문자열
 * @param options - 옵션 객체
 * @param options.count - 몇 번째 개장일인지 (기본값: 1)
 * @param options.format - 날짜 포맷 (기본값: "yyyy-MM-dd")
 * @returns N번째 이전 개장일 날짜 (format 파라미터로 지정된 형식)
 * @example
 * getPreviousTradingDay('2024-01-02'); // '2023-12-29' (신정 이전 첫 번째 개장일)
 * getPreviousTradingDay('2024-01-08', { count: 2 }); // '2024-01-04' (월요일 이전 두 번째 개장일)
 * getPreviousTradingDay('01/06/2025', { count: 3, format: 'MM/dd/yyyy' }); // '12/27/2024' (미국식 포맷 입출력)
 * getPreviousTradingDay('2025-01-06', { count: 3 }); // '2024-12-27' (연말 이전 세 번째 개장일)
 * getPreviousTradingDay('2024-05-07', { count: 5 }); // '2024-04-30' (어린이날 연휴 이전 다섯 번째 개장일)
 */
export const getPreviousTradingDay = (
  dateStr: string,
  options: {
    count?: number;
    format?: string;
  } = {}
): string => {
  const { count = 1, format = "yyyy-MM-dd" } = options;
  return findPreviousDate(dateStr, isTradingDay, { count, format });
};

/**
 * 주어진 날짜를 기준으로 가장 최근 거래일을 반환합니다
 * 주어진 날짜가 거래일이면 그대로 반환하고, 아니면 가장 최근의 거래일을 반환합니다
 * @param dateStr - 기준 날짜 문자열
 * @param options - 옵션 객체
 * @param options.format - 날짜 포맷 (기본값: "yyyy-MM-dd")
 * @returns 가장 최근 거래일 (format 파라미터로 지정된 형식)
 * @example
 * getLastTradingDay('2026-01-02'); // '2026-01-02' (금요일, 거래일)
 * getLastTradingDay('2026-01-01'); // '2025-12-30' (신정은 휴무, 31일은 휴장일, 이전 거래일)
 * getLastTradingDay('01/10/2026', { format: 'MM/dd/yyyy' }); // '01/09/2026' (미국식 포맷 입출력)
 * getLastTradingDay('2026-01-10'); // '2026-01-09' (토요일 → 금요일)
 */
export const getLastTradingDay = (
  dateStr: string,
  options: {
    format?: string;
  } = {}
): string => {
  const { format = "yyyy-MM-dd" } = options;
  return findLastDate(dateStr, isTradingDay, { format });
};
