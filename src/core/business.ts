import { isWeekend, kstMidnightToUtc, toKstString } from "./date-utils.ts";
import { isHoliday } from "./holiday.ts";
import { addDays, subDays } from "date-fns";

/**
 * 주어진 날짜가 영업일인지 판단합니다 (주말 및 공휴일 제외)
 * @param date - 확인할 날짜 (YYYY-MM-DD 형식)
 * @returns 영업일인 경우 true, 아니면 false
 * @example
 * isBusinessDay('2024-01-02'); // true (화요일, 평일)
 * isBusinessDay('2024-01-01'); // false (신정, 공휴일)
 * isBusinessDay('2024-01-06'); // false (토요일, 주말)
 */
export const isBusinessDay = (date: string): boolean => {
  return !isWeekend(date) && !isHoliday(date);
};

/**
 * 주어진 날짜 다음의 N번째 영업일을 반환합니다
 * @param date - 기준 날짜 (YYYY-MM-DD 형식)
 * @param count - 몇 번째 영업일인지 (기본값: 1)
 * @returns N번째 다음 영업일 날짜 (YYYY-MM-DD 형식)
 * @example
 * getNextBusinessDay('2024-01-01'); // '2024-01-02' (신정 다음 첫 번째 영업일)
 * getNextBusinessDay('2024-01-01', 2); // '2024-01-03' (신정 다음 두 번째 영업일)
 * getNextBusinessDay('2024-01-05', 3); // '2024-01-10' (금요일 다음 세 번째 영업일)
 * getNextBusinessDay('2024-12-31', 5); // '2025-01-08' (연말연시 다음 다섯 번째 영업일)
 */
export const getNextBusinessDay = (date: string, count: number = 1): string => {
  if (count <= 0) {
    throw new Error("count must be a positive number");
  }

  let d = kstMidnightToUtc(date);
  let foundCount = 0;

  while (foundCount < count) {
    d = addDays(d, 1);
    const kstString = toKstString(d);

    if (isBusinessDay(kstString)) {
      foundCount++;
    }
  }

  return toKstString(d);
};

/**
 * 주어진 날짜 이전의 N번째 영업일을 반환합니다
 * @param date - 기준 날짜 (YYYY-MM-DD 형식)
 * @param count - 몇 번째 영업일인지 (기본값: 1)
 * @returns N번째 이전 영업일 날짜 (YYYY-MM-DD 형식)
 * @example
 * getPreviousBusinessDay('2024-01-02'); // '2023-12-29' (신정 이전 첫 번째 영업일)
 * getPreviousBusinessDay('2024-01-08', 2); // '2024-01-04' (월요일 이전 두 번째 영업일)
 * getPreviousBusinessDay('2024-03-04', 3); // '2024-02-27' (삼일절 대체휴일 이전 세 번째 영업일)
 * getPreviousBusinessDay('2024-05-07', 5); // '2024-04-30' (어린이날 연휴 이전 다섯 번째 영업일)
 */
export const getPreviousBusinessDay = (
  date: string,
  count: number = 1
): string => {
  if (count <= 0) {
    throw new Error("count must be a positive number");
  }

  let d = kstMidnightToUtc(date);
  let foundCount = 0;

  while (foundCount < count) {
    d = subDays(d, 1);
    const kstString = toKstString(d);

    if (isBusinessDay(kstString)) {
      foundCount++;
    }
  }

  return toKstString(d);
};

/**
 * 주어진 날짜를 기준으로 가장 최근 영업일을 반환합니다
 * 주어진 날짜가 영업일이면 그대로 반환하고, 아니면 가장 최근의 영업일을 반환합니다
 * @param date - 기준 날짜 (YYYY-MM-DD 형식)
 * @returns 가장 최근 영업일 (YYYY-MM-DD 형식)
 * @example
 * getLastBusinessDay('2026-01-02'); // '2025-01-02' (금요일, 영업일)
 * getLastBusinessDay('2026-01-01'); // '2025-12-31' (신정은 공휴일, 이전 영업일)
 * getLastBusinessDay('2026-01-10'); // '2026-01-09' (토요일 → 금요일)
 */
export const getLastBusinessDay = (date: string): string => {
  // 주어진 날짜가 영업일이면 그대로 반환
  if (isBusinessDay(date)) {
    return date;
  }

  let d = kstMidnightToUtc(date);
  d = subDays(d, 1);

  while (!isBusinessDay(toKstString(d))) {
    d = subDays(d, 1);
  }

  return toKstString(d);
};
