import { describe, expect, it } from "vitest";
import { isWeekend, toKstString, kstMidnightToUtc } from "./date-utils.ts";

describe("date-utils", () => {
  describe("isWeekend", () => {
    it("토요일은 주말이어야 함", () => {
      expect(isWeekend("2025-12-27")).toBe(true); // 토요일
      expect(isWeekend("2026-01-03")).toBe(true); // 토요일
    });

    it("일요일은 주말이어야 함", () => {
      expect(isWeekend("2025-12-28")).toBe(true); // 일요일
      expect(isWeekend("2026-01-04")).toBe(true); // 일요일
    });

    it("평일은 주말이 아니어야 함", () => {
      expect(isWeekend("2025-12-29")).toBe(false); // 월요일
      expect(isWeekend("2025-12-30")).toBe(false); // 화요일
      expect(isWeekend("2025-12-31")).toBe(false); // 수요일
      expect(isWeekend("2026-01-02")).toBe(false); // 금요일
      expect(isWeekend("2026-01-05")).toBe(false); // 월요일
    });

    describe("다양한 포맷 지원", () => {
      it("유럽식 포맷 (dd/MM/yyyy)", () => {
        expect(isWeekend("27/12/2025", "dd/MM/yyyy")).toBe(true); // 토요일
        expect(isWeekend("28/12/2025", "dd/MM/yyyy")).toBe(true); // 일요일
        expect(isWeekend("29/12/2025", "dd/MM/yyyy")).toBe(false); // 월요일
      });

      it("미국식 포맷 (MM-dd-yyyy)", () => {
        expect(isWeekend("12-27-2025", "MM-dd-yyyy")).toBe(true); // 토요일
        expect(isWeekend("12-28-2025", "MM-dd-yyyy")).toBe(true); // 일요일
        expect(isWeekend("12-29-2025", "MM-dd-yyyy")).toBe(false); // 월요일
      });

      it("숫자만 포맷 (yyyyMMdd)", () => {
        expect(isWeekend("20251227", "yyyyMMdd")).toBe(true); // 토요일
        expect(isWeekend("20251228", "yyyyMMdd")).toBe(true); // 일요일
        expect(isWeekend("20251229", "yyyyMMdd")).toBe(false); // 월요일
      });

      it("점 구분 포맷 (yyyy.MM.dd)", () => {
        expect(isWeekend("2025.12.27", "yyyy.MM.dd")).toBe(true); // 토요일
        expect(isWeekend("2025.12.29", "yyyy.MM.dd")).toBe(false); // 월요일
      });
    });
  });

  describe("toKstString", () => {
    it("UTC Date를 한국 시간 문자열로 변환해야 함", () => {
      const utcDate = new Date("2025-12-31T15:00:00.000Z"); // UTC
      expect(toKstString(utcDate)).toBe("2026-01-01"); // KST 다음날 00:00
    });
  });

  describe("kstMidnightToUtc", () => {
    it("한국 자정을 UTC Date로 변환해야 함", () => {
      const utcDate = kstMidnightToUtc("2026-01-01");
      expect(utcDate.toISOString()).toBe("2025-12-31T15:00:00.000Z");
    });
  });
});
