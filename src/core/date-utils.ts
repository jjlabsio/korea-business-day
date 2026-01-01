import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { isSaturday, isSunday, parse } from "date-fns";

/**
 * 날짜 문자열을 한국 표준시(KST) Date 객체로 변환합니다
 * @param dateStr - 변환할 날짜 문자열 (YYYY-MM-DD 형식)
 * @returns 한국 표준시로 변환된 Date 객체
 */
export const toDate = (dateStr: string): Date => {
  const utc = new Date(`${dateStr}T00:00:00Z`); // UTC 자정
  const kstTime = utc.getTime() + 9 * 60 * 60 * 1000; // KST로 변환
  const kstDate = new Date(kstTime);

  return kstDate;
};

/**
 * Date 객체를 YYYY-MM-DD 형식의 날짜 문자열로 변환합니다
 * @param date - 변환할 Date 객체
 * @returns YYYY-MM-DD 형식의 날짜 문자열
 */
export const toDateString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * UTC Date 객체를 한국 시간(KST) 기준 날짜 문자열로 변환합니다
 * @param d - 변환할 Date 객체
 * @returns 한국 시간 기준 YYYY-MM-DD 형식의 날짜 문자열
 * @example
 * const utcDate = new Date("2025-12-31T15:00:00.000Z");
 * toKstString(utcDate); // "2026-01-01" (KST는 UTC+9)
 */
export const toKstString = (d: Date): string =>
  formatInTimeZone(d, "Asia/Seoul", "yyyy-MM-dd");

/**
 * 날짜 문자열을 한국 시간(KST) 기준 자정의 UTC Date 객체로 변환합니다
 * @param date - 변환할 날짜 문자열 (YYYY-MM-DD 형식)
 * @returns 한국 시간 기준 해당 날짜 자정(00:00)을 나타내는 UTC Date 객체
 * @example
 * kstMidnightToUtc("2026-01-01"); // 2025-12-31T15:00:00.000Z (한국 2026-01-01 00:00)
 */
export const kstMidnightToUtc = (date: string): Date =>
  fromZonedTime(`${date} 00:00`, "Asia/Seoul");

/**
 * 주어진 날짜가 주말(토요일 또는 일요일)인지 판단합니다
 * @param date - 확인할 날짜 문자열
 * @param format - 날짜 포맷 (기본값: "yyyy-MM-dd")
 * @returns 주말인 경우 true, 아니면 false
 * @example
 * isWeekend("2025-12-27"); // true (기본 포맷)
 * isWeekend("27/12/2025", "dd/MM/yyyy"); // true (유럽식)
 * isWeekend("12-27-2025", "MM-dd-yyyy"); // true (미국식)
 */
export const isWeekend = (
  date: string,
  format: string = "yyyy-MM-dd"
): boolean => {
  const d = parse(date, format, new Date());
  return isSaturday(d) || isSunday(d);
};
