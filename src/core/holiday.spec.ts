import { describe, expect, it } from "vitest";
import {
  getHolidays,
  getSupportedHolidayYears,
  getTradingHolidays,
  isHoliday,
  isTradingHoliday,
} from "./holiday.ts";

describe("holiday", () => {
  describe("isHoliday", () => {
    it("공휴일을 정확히 인식해야 함", () => {
      expect(isHoliday("2025-01-01")).toEqual(true); // 신정
      expect(isHoliday("2025-03-03")).toEqual(true); // 삼일절(대체휴일)
      expect(isHoliday("2025-08-15")).toEqual(true); // 광복절
    });

    it("공휴일이 아닌 날을 정확히 인식해야 함", () => {
      expect(isHoliday("2025-08-25")).toEqual(false); // 평일
      expect(isHoliday("2025-08-24")).toEqual(false); // 주말
    });

    it("지원하지 않는 연도에 대해서는 false를 반환해야 함", () => {
      expect(isHoliday("2021-12-25")).toEqual(false); // 2021년 데이터 없음
    });

    describe("다양한 포맷 지원", () => {
      it("유럽식 포맷 (dd/MM/yyyy)", () => {
        expect(isHoliday("01/01/2025", "dd/MM/yyyy")).toEqual(true); // 신정
        expect(isHoliday("15/08/2025", "dd/MM/yyyy")).toEqual(true); // 광복절
        expect(isHoliday("25/08/2025", "dd/MM/yyyy")).toEqual(false); // 평일
      });

      it("미국식 포맷 (MM-dd-yyyy)", () => {
        expect(isHoliday("01-01-2025", "MM-dd-yyyy")).toEqual(true); // 신정
        expect(isHoliday("08-15-2025", "MM-dd-yyyy")).toEqual(true); // 광복절
        expect(isHoliday("08-25-2025", "MM-dd-yyyy")).toEqual(false); // 평일
      });

      it("숫자만 포맷 (yyyyMMdd)", () => {
        expect(isHoliday("20250101", "yyyyMMdd")).toEqual(true); // 신정
        expect(isHoliday("20250815", "yyyyMMdd")).toEqual(true); // 광복절
        expect(isHoliday("20250825", "yyyyMMdd")).toEqual(false); // 평일
      });
    });
  });

  describe("isTradingHoliday", () => {
    it("거래소 휴무일을 정확히 인식해야 함", () => {
      expect(isTradingHoliday("2025-01-01")).toEqual(true); // 신정
      expect(isTradingHoliday("2025-08-15")).toEqual(true); // 광복절
      expect(isTradingHoliday("2025-12-31")).toEqual(true); // 연말휴장일
    });

    it("거래소 휴무일이 아닌 날을 정확히 인식해야 함", () => {
      expect(isTradingHoliday("2025-08-25")).toEqual(false); // 평일
      expect(isTradingHoliday("2025-08-24")).toEqual(false); // 주말
    });

    it("지원하지 않는 연도에 대해서는 false를 반환해야 함", () => {
      expect(isTradingHoliday("2021-12-31")).toEqual(false); // 2021년 데이터 없음
    });

    describe("다양한 포맷 지원", () => {
      it("유럽식 포맷 (dd/MM/yyyy)", () => {
        expect(isTradingHoliday("01/01/2025", "dd/MM/yyyy")).toEqual(true); // 신정
        expect(isTradingHoliday("31/12/2025", "dd/MM/yyyy")).toEqual(true); // 연말휴장일
        expect(isTradingHoliday("25/08/2025", "dd/MM/yyyy")).toEqual(false); // 평일
      });

      it("미국식 포맷 (MM-dd-yyyy)", () => {
        expect(isTradingHoliday("01-01-2025", "MM-dd-yyyy")).toEqual(true); // 신정
        expect(isTradingHoliday("12-31-2025", "MM-dd-yyyy")).toEqual(true); // 연말휴장일
        expect(isTradingHoliday("08-25-2025", "MM-dd-yyyy")).toEqual(false); // 평일
      });

      it("숫자만 포맷 (yyyyMMdd)", () => {
        expect(isTradingHoliday("20250101", "yyyyMMdd")).toEqual(true); // 신정
        expect(isTradingHoliday("20251231", "yyyyMMdd")).toEqual(true); // 연말휴장일
        expect(isTradingHoliday("20250825", "yyyyMMdd")).toEqual(false); // 평일
      });
    });
  });

  describe("공휴일과 거래소 휴무일의 차이", () => {
    it("연말휴장일은 거래소 휴무일이지만 공휴일은 아님", () => {
      expect(isHoliday("2025-12-31")).toEqual(false); // 공휴일 아님
      expect(isTradingHoliday("2025-12-31")).toEqual(true); // 거래소 휴무일임
    });
  });

  describe("getHolidays", () => {
    it("지원하는 연도의 공휴일 목록을 날짜와 이름으로 반환해야 함", () => {
      expect(getHolidays(2025)).toContainEqual({
        date: "2025-01-01",
        name: "신정",
      });
      expect(getHolidays(2025)).toContainEqual({
        date: "2025-03-03",
        name: "삼일절(대체휴일)",
      });
      expect(getHolidays(2025)).toContainEqual({
        date: "2025-06-03",
        name: "임시공휴일",
      });
      expect(getHolidays(2025)).not.toContainEqual({
        date: "2025-12-31",
        name: "연말휴장일",
      });
    });

    it("문자열 연도 입력도 지원해야 함", () => {
      expect(getHolidays("2026")).toContainEqual({
        date: "2026-05-25",
        name: "석가탄신일(대체휴일)",
      });
    });

    it("지원하지 않는 연도에 대해서는 빈 배열을 반환해야 함", () => {
      expect(getHolidays(2021)).toEqual([]);
    });

    it("반환한 배열과 객체를 수정해도 내부 데이터에 영향을 주지 않아야 함", () => {
      const holidays = getHolidays(2025);
      holidays.push({ date: "2025-01-02", name: "테스트 휴일" });
      holidays[0].name = "수정된 이름";

      expect(getHolidays(2025)).not.toContainEqual({
        date: "2025-01-02",
        name: "테스트 휴일",
      });
      expect(getHolidays(2025)[0].name).not.toEqual("수정된 이름");
    });
  });

  describe("getTradingHolidays", () => {
    it("지원하는 연도의 거래소 휴무일 목록을 날짜와 이름으로 반환해야 함", () => {
      expect(getTradingHolidays(2025)).toContainEqual({
        date: "2025-01-01",
        name: "신정",
      });
      expect(getTradingHolidays(2025)).toContainEqual({
        date: "2025-06-03",
        name: "임시공휴일",
      });
      expect(getTradingHolidays(2025)).toContainEqual({
        date: "2025-12-31",
        name: "연말휴장일",
      });
    });

    it("거래소 휴무일 목록은 일반 공휴일 목록을 포함해야 함", () => {
      const holidays = getHolidays(2026);
      const tradingHolidays = getTradingHolidays(2026);

      holidays.forEach((holiday) => {
        expect(tradingHolidays).toContainEqual(holiday);
      });
    });

    it("문자열 연도 입력도 지원해야 함", () => {
      expect(getTradingHolidays("2026")).toContainEqual({
        date: "2026-12-31",
        name: "연말휴장일",
      });
    });

    it("지원하지 않는 연도에 대해서는 빈 배열을 반환해야 함", () => {
      expect(getTradingHolidays(2021)).toEqual([]);
    });

    it("반환한 배열과 객체를 수정해도 내부 데이터에 영향을 주지 않아야 함", () => {
      const tradingHolidays = getTradingHolidays(2025);
      tradingHolidays.push({ date: "2025-01-02", name: "테스트 휴장일" });
      tradingHolidays[0].name = "수정된 이름";

      expect(getTradingHolidays(2025)).not.toContainEqual({
        date: "2025-01-02",
        name: "테스트 휴장일",
      });
      expect(getTradingHolidays(2025)[0].name).not.toEqual("수정된 이름");
    });
  });

  describe("getSupportedHolidayYears", () => {
    it("지원하는 공휴일 데이터 연도 목록을 오름차순으로 반환해야 함", () => {
      expect(getSupportedHolidayYears()).toEqual([
        2022, 2023, 2024, 2025, 2026, 2027,
      ]);
    });

    it("반환한 배열을 수정해도 내부 데이터에 영향을 주지 않아야 함", () => {
      const supportedYears = getSupportedHolidayYears();
      supportedYears.push(2028);

      expect(getSupportedHolidayYears()).toEqual([
        2022, 2023, 2024, 2025, 2026, 2027,
      ]);
    });
  });
});
