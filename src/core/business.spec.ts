import { describe, expect, it } from "vitest";
import {
  isBusinessDay,
  lastBusinessDay,
  nextBusinessDay,
  previousBusinessDay,
} from "./business.ts";

describe("business", () => {
  describe("isBusinessDay", () => {
    it("주말은 영업일이 아니어야 함", () => {
      expect(isBusinessDay("2025-08-24")).toEqual(false); // 일요일
      expect(isBusinessDay("2025-08-23")).toEqual(false); // 토요일
    });

    it("공휴일은 영업일이 아니어야 함", () => {
      expect(isBusinessDay("2025-08-15")).toEqual(false); // 광복절
      expect(isBusinessDay("2025-01-01")).toEqual(false); // 신정
      expect(isBusinessDay("2025-03-03")).toEqual(false); // 삼일절(대체휴일)
    });

    it("평일이고 공휴일이 아니면 영업일이어야 함", () => {
      expect(isBusinessDay("2025-08-25")).toEqual(true); // 월요일
      expect(isBusinessDay("2025-08-26")).toEqual(true); // 화요일
      expect(isBusinessDay("2025-08-27")).toEqual(true); // 수요일
      expect(isBusinessDay("2025-08-28")).toEqual(true); // 목요일
      expect(isBusinessDay("2025-08-29")).toEqual(true); // 금요일
    });
  });

  describe("nextBusinessDay", () => {
    it("평일의 다음 영업일은 다음 날이어야 함", () => {
      expect(nextBusinessDay("2025-08-25")).toEqual("2025-08-26"); // 월요일 → 화요일
      expect(nextBusinessDay("2025-08-26")).toEqual("2025-08-27"); // 화요일 → 수요일
    });

    it("금요일의 다음 영업일은 월요일이어야 함", () => {
      expect(nextBusinessDay("2025-08-29")).toEqual("2025-09-01"); // 금요일 → 월요일
    });

    it("주말의 다음 영업일은 월요일이어야 함", () => {
      expect(nextBusinessDay("2025-08-23")).toEqual("2025-08-25"); // 토요일 → 월요일
      expect(nextBusinessDay("2025-08-24")).toEqual("2025-08-25"); // 일요일 → 월요일
    });

    it("공휴일 다음의 첫 번째 영업일을 반환해야 함", () => {
      expect(nextBusinessDay("2025-08-15")).toEqual("2025-08-18"); // 광복절(금) → 월요일
      expect(nextBusinessDay("2025-01-01")).toEqual("2025-01-02"); // 신정(수) → 목요일
    });

    it("연휴 기간의 다음 영업일을 정확히 계산해야 함", () => {
      expect(nextBusinessDay("2025-01-27")).toEqual("2025-01-31"); // 임시공휴일 → 설 연휴 후 첫 영업일
    });

    describe("with count parameter", () => {
      it("count=1일 때 기본 동작과 동일해야 함", () => {
        expect(nextBusinessDay("2025-08-25", 1)).toEqual("2025-08-26"); // 월요일 → 화요일
        expect(nextBusinessDay("2025-01-01", 1)).toEqual("2025-01-02"); // 신정 → 목요일
      });

      it("count=2일 때 두 번째 영업일을 반환해야 함", () => {
        expect(nextBusinessDay("2025-08-25", 2)).toEqual("2025-08-27"); // 월요일 → 수요일
        expect(nextBusinessDay("2025-08-29", 2)).toEqual("2025-09-02"); // 금요일 → 화요일 (주말 건너뜀)
      });

      it("count=3일 때 세 번째 영업일을 반환해야 함", () => {
        expect(nextBusinessDay("2025-08-25", 3)).toEqual("2025-08-28"); // 월요일 → 목요일
        expect(nextBusinessDay("2025-08-29", 3)).toEqual("2025-09-03"); // 금요일 → 수요일
      });

      it("count=5일 때 다섯 번째 영업일을 반환해야 함", () => {
        expect(nextBusinessDay("2025-08-25", 5)).toEqual("2025-09-01"); // 월요일 → 다음주 월요일
        expect(nextBusinessDay("2025-01-01", 5)).toEqual("2025-01-08"); // 신정 → 5번째 영업일
      });

      it("연휴 기간에서 count를 사용해야 함", () => {
        expect(nextBusinessDay("2025-01-27", 2)).toEqual("2025-02-03"); // 임시공휴일 → 설 연휴 후 두 번째 영업일
        expect(nextBusinessDay("2025-01-27", 3)).toEqual("2025-02-04"); // 임시공휴일 → 설 연휴 후 세 번째 영업일
      });

      it("잘못된 count 값에 대해 에러를 발생시켜야 함", () => {
        expect(() => nextBusinessDay("2025-08-25", 0)).toThrow("count must be a positive number");
        expect(() => nextBusinessDay("2025-08-25", -1)).toThrow("count must be a positive number");
        expect(() => nextBusinessDay("2025-08-25", -5)).toThrow("count must be a positive number");
      });
    });
  });

  describe("previousBusinessDay", () => {
    it("평일의 이전 영업일은 전날이어야 함", () => {
      expect(previousBusinessDay("2025-08-26")).toEqual("2025-08-25"); // 화요일 → 월요일
      expect(previousBusinessDay("2025-08-27")).toEqual("2025-08-26"); // 수요일 → 화요일
    });

    it("월요일의 이전 영업일은 금요일이어야 함", () => {
      expect(previousBusinessDay("2025-08-25")).toEqual("2025-08-22"); // 월요일 → 금요일
    });

    it("주말의 이전 영업일은 금요일이어야 함", () => {
      expect(previousBusinessDay("2025-08-23")).toEqual("2025-08-22"); // 토요일 → 금요일
      expect(previousBusinessDay("2025-08-24")).toEqual("2025-08-22"); // 일요일 → 금요일
    });

    it("공휴일 이전의 마지막 영업일을 반환해야 함", () => {
      expect(previousBusinessDay("2025-08-15")).toEqual("2025-08-14"); // 광복절 → 목요일
      expect(previousBusinessDay("2025-01-01")).toEqual("2024-12-31"); // 신정 → 화요일
    });

    it("연휴 기간의 이전 영업일을 정확히 계산해야 함", () => {
      expect(previousBusinessDay("2025-01-28")).toEqual("2025-01-24"); // 설날 → 금요일
    });

    describe("with count parameter", () => {
      it("count=1일 때 기본 동작과 동일해야 함", () => {
        expect(previousBusinessDay("2025-08-26", 1)).toEqual("2025-08-25"); // 화요일 → 월요일
        expect(previousBusinessDay("2025-01-02", 1)).toEqual("2024-12-31"); // 신정 다음 날 → 전년 마지막 영업일
      });

      it("count=2일 때 두 번째 이전 영업일을 반환해야 함", () => {
        expect(previousBusinessDay("2025-08-27", 2)).toEqual("2025-08-25"); // 수요일 → 월요일
        expect(previousBusinessDay("2025-08-25", 2)).toEqual("2025-08-21"); // 월요일 → 목요일 (주말 건너뜀)
      });

      it("count=3일 때 세 번째 이전 영업일을 반환해야 함", () => {
        expect(previousBusinessDay("2025-08-28", 3)).toEqual("2025-08-25"); // 목요일 → 월요일
        expect(previousBusinessDay("2025-08-25", 3)).toEqual("2025-08-20"); // 월요일 → 수요일
      });

      it("count=5일 때 다섯 번째 이전 영업일을 반환해야 함", () => {
        expect(previousBusinessDay("2025-09-01", 5)).toEqual("2025-08-25"); // 월요일 → 전주 월요일
        expect(previousBusinessDay("2025-01-08", 5)).toEqual("2024-12-31"); // 5번째 이전 영업일 (연도 넘어감)
      });

      it("연휴 기간에서 count를 사용해야 함", () => {
        expect(previousBusinessDay("2025-01-31", 2)).toEqual("2025-01-23"); // 설 연휴 후 첫 영업일 → 두 번째 이전 영업일
        expect(previousBusinessDay("2025-01-31", 3)).toEqual("2025-01-22"); // 세 번째 이전 영업일
      });

      it("잘못된 count 값에 대해 에러를 발생시켜야 함", () => {
        expect(() => previousBusinessDay("2025-08-25", 0)).toThrow("count must be a positive number");
        expect(() => previousBusinessDay("2025-08-25", -1)).toThrow("count must be a positive number");
        expect(() => previousBusinessDay("2025-08-25", -5)).toThrow("count must be a positive number");
      });
    });
  });

  describe("lastBusinessDay", () => {
    it("영업일이면 그대로 반환해야 함", () => {
      expect(lastBusinessDay("2026-01-02")).toEqual("2026-01-02"); // 금요일, 영업일
    });

    it("공휴일이면 이전 영업일을 반환해야 함", () => {
      expect(lastBusinessDay("2026-01-01")).toEqual("2025-12-31"); // 신정은 공휴일, 이전 영업일
    });

    it("주말이면 이전 영업일을 반환해야 함", () => {
      expect(lastBusinessDay("2026-01-10")).toEqual("2026-01-09"); // 토요일 → 금요일
    });
  });

  describe("edge cases", () => {
    it("년도 경계를 넘나드는 경우를 처리해야 함", () => {
      // 2024년 말 → 2025년 초
      expect(nextBusinessDay("2024-12-31")).toEqual("2025-01-02"); // 화요일(성탄절 대체휴일) → 목요일
      expect(previousBusinessDay("2025-01-02")).toEqual("2024-12-31"); // 목요일 → 월요일
    });

    it("대체휴일이 적용된 공휴일을 정확히 처리해야 함", () => {
      expect(isBusinessDay("2025-03-03")).toEqual(false); // 삼일절 대체휴일(월요일)
      expect(nextBusinessDay("2025-03-01")).toEqual("2025-03-04"); // 삼일절(토) → 화요일
    });
  });
});
