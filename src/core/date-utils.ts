import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import {
  isSaturday,
  isSunday,
  parse,
  addDays,
  subDays,
  format,
} from "date-fns";

export type Predicate = (dateStr: string, format?: string) => boolean;

/**
 * UTC Date 객체를 한국 시간(KST) 기준 날짜 문자열로 변환합니다
 * @param d - 변환할 Date 객체
 * @param format - 출력 날짜 포맷 (기본값: "yyyy-MM-dd")
 * @returns 한국 시간 기준 지정된 형식의 날짜 문자열
 * @example
 * const utcDate = new Date("2025-12-31T15:00:00.000Z");
 * toKstString(utcDate); // "2026-01-01" (KST는 UTC+9)
 * toKstString(utcDate, "yyyy/MM/dd"); // "2026/01/01"
 * toKstString(utcDate, "MM-dd-yyyy"); // "01-01-2026"
 */
export const toKstString = (d: Date, format: string = "yyyy-MM-dd"): string =>
  formatInTimeZone(d, "Asia/Seoul", format);

/**
 * 임의의 형식의 날짜 문자열을 표준 형식(yyyy-MM-dd)으로 정규화합니다
 * @param dateStr - 변환할 날짜 문자열
 * @param dateFormat - 입력 날짜의 포맷 (기본값: "yyyy-MM-dd")
 * @returns 표준 형식(yyyy-MM-dd)의 날짜 문자열
 * @example
 * normalizeToStandardFormat("2026-01-01"); // "2026-01-01"
 * normalizeToStandardFormat("01/01/2026", "MM/dd/yyyy"); // "2026-01-01"
 * normalizeToStandardFormat("2026년 1월 1일", "yyyy년 M월 d일"); // "2026-01-01"
 */
export const normalizeToStandardFormat = (
  dateStr: string,
  dateFormat: string = "yyyy-MM-dd"
): string => {
  const parsed = parse(dateStr, dateFormat, new Date());
  return format(parsed, "yyyy-MM-dd");
};

/**
 * 날짜 문자열을 한국 시간(KST) 기준 자정의 UTC Date 객체로 변환합니다
 * @param dateStr - 변환할 날짜 문자열
 * @param format - 날짜 포맷 (기본값: "yyyy-MM-dd")
 * @returns 한국 시간 기준 해당 날짜 자정(00:00)을 나타내는 UTC Date 객체
 * @example
 * kstMidnightToUtc("2026-01-01"); // 2025-12-31T15:00:00.000Z (한국 2026-01-01 00:00)
 * kstMidnightToUtc("01/01/2026", "MM/dd/yyyy"); // 2025-12-31T15:00:00.000Z
 * kstMidnightToUtc("2026년 1월 1일", "yyyy년 M월 d일"); // 2025-12-31T15:00:00.000Z
 */
export const kstMidnightToUtc = (
  dateStr: string,
  dateFormat: string = "yyyy-MM-dd"
): Date => {
  const normalizedDate = normalizeToStandardFormat(dateStr, dateFormat);
  return fromZonedTime(`${normalizedDate} 00:00`, "Asia/Seoul");
};

/**
 * 주어진 날짜가 주말(토요일 또는 일요일)인지 판단합니다
 * @param dateStr - 확인할 날짜 문자열
 * @param format - 날짜 포맷 (기본값: "yyyy-MM-dd")
 * @returns 주말인 경우 true, 아니면 false
 * @example
 * isWeekend("2025-12-27"); // true (기본 포맷)
 * isWeekend("27/12/2025", "dd/MM/yyyy"); // true (유럽식)
 * isWeekend("12-27-2025", "MM-dd-yyyy"); // true (미국식)
 */
export const isWeekend = (
  dateStr: string,
  format: string = "yyyy-MM-dd"
): boolean => {
  const d = parse(dateStr, format, new Date());
  return isSaturday(d) || isSunday(d);
};

/**
 * count가 양수인지 검증합니다
 * @param count - 검증할 숫자
 * @throws count가 0 이하일 경우 에러 발생
 */
const validateCount = (count: number): void => {
  if (count <= 0) {
    throw new Error("count must be a positive number");
  }
};

/**
 * 주어진 날짜 다음의 N번째 조건을 만족하는 날짜를 찾습니다
 * @param dateStr - 기준 날짜 문자열
 * @param count - 몇 번째 날짜인지
 * @param predicate - 날짜 조건 판별 함수
 * @param format - 날짜 포맷 (기본값: "yyyy-MM-dd")
 * @returns N번째 다음 조건 만족 날짜 (지정된 형식)
 */
export const findNextDate = (
  dateStr: string,
  count: number,
  predicate: Predicate,
  format: string = "yyyy-MM-dd"
): string => {
  validateCount(count);

  let d = kstMidnightToUtc(dateStr, format);
  let foundCount = 0;

  while (foundCount < count) {
    d = addDays(d, 1);
    const kstString = toKstString(d);

    if (predicate(kstString)) {
      foundCount++;
    }
  }

  return toKstString(d, format);
};

/**
 * 주어진 날짜 이전의 N번째 조건을 만족하는 날짜를 찾습니다
 * @param dateStr - 기준 날짜 문자열
 * @param count - 몇 번째 날짜인지
 * @param predicate - 날짜 조건 판별 함수
 * @param format - 날짜 포맷 (기본값: "yyyy-MM-dd")
 * @returns N번째 이전 조건 만족 날짜 (지정된 형식)
 */
export const findPreviousDate = (
  dateStr: string,
  count: number,
  predicate: Predicate,
  format: string = "yyyy-MM-dd"
): string => {
  validateCount(count);

  let d = kstMidnightToUtc(dateStr, format);
  let foundCount = 0;

  while (foundCount < count) {
    d = subDays(d, 1);
    const kstString = toKstString(d);

    if (predicate(kstString)) {
      foundCount++;
    }
  }

  return toKstString(d, format);
};

/**
 * 주어진 날짜를 기준으로 가장 최근 조건을 만족하는 날짜를 찾습니다
 * @param dateStr - 기준 날짜 문자열
 * @param predicate - 날짜 조건 판별 함수
 * @param format - 날짜 포맷 (기본값: "yyyy-MM-dd")
 * @returns 가장 최근 조건 만족 날짜 (지정된 형식)
 */
export const findLastDate = (
  dateStr: string,
  predicate: Predicate,
  format: string = "yyyy-MM-dd"
): string => {
  // 주어진 날짜가 조건을 만족하면 그대로 반환
  if (predicate(dateStr, format)) {
    return dateStr;
  }

  let d = kstMidnightToUtc(dateStr, format);

  while (true) {
    d = subDays(d, 1);
    const kstString = toKstString(d);

    if (predicate(kstString)) {
      return toKstString(d, format);
    }
  }
};
