# korea-business-day

한국의 영업일, 공휴일, 주식시장 개장일을 계산하는 TypeScript 라이브러리입니다.

[![npm version](https://badge.fury.io/js/korea-business-day.svg)](https://www.npmjs.com/package/korea-business-day)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 설치

```bash
npm install korea-business-day
```

```bash
yarn add korea-business-day
```

```bash
pnpm add korea-business-day
```

## 사용법

### 전체 API 사용

```typescript
import {
  isBusinessDay,
  nextBusinessDay,
  previousBusinessDay,
  lastBusinessDay,
  isTradingDay,
  nextTradingDay,
  previousTradingDay,
  lastTradingDay,
  isHoliday,
  isTradingHoliday,
} from "korea-business-day";

// 영업일 확인
console.log(isBusinessDay("2025-01-02")); // true (목요일)
console.log(isBusinessDay("2025-01-01")); // false (신정)

// 공휴일 확인
console.log(isHoliday("2025-03-03")); // true (삼일절 대체휴일)
```

## API 문서

### Business 모듈

영업일 계산 관련 함수들입니다. 주말과 공휴일을 제외한 평일을 기준으로 합니다.

#### `isBusinessDay(date: string): boolean`

주어진 날짜가 영업일인지 판단합니다.

```typescript
import { isBusinessDay } from "korea-business-day/business";

console.log(isBusinessDay("2025-01-02")); // true (목요일, 평일)
console.log(isBusinessDay("2025-01-01")); // false (신정, 공휴일)
console.log(isBusinessDay("2025-01-04")); // false (토요일, 주말)
```

#### `nextBusinessDay(date: string, count: number = 1): string`

주어진 날짜 다음의 N번째 영업일을 반환합니다.

```typescript
import { nextBusinessDay } from "korea-business-day/business";

console.log(nextBusinessDay("2025-01-01")); // '2025-01-02' (신정 다음 첫 번째 영업일)
console.log(nextBusinessDay("2025-01-01", 2)); // '2025-01-03' (신정 다음 두 번째 영업일)
console.log(nextBusinessDay("2025-01-03")); // '2025-01-06' (금요일 다음 영업일은 월요일)
console.log(nextBusinessDay("2025-12-31", 5)); // '2026-01-09' (연말연시 다음 다섯 번째 영업일)
```

#### `previousBusinessDay(date: string, count: number = 1): string`

주어진 날짜 이전의 N번째 영업일을 반환합니다.

```typescript
import { previousBusinessDay } from "korea-business-day/business";

console.log(previousBusinessDay("2025-01-02")); // '2024-12-31' (신정 이전 첫 번째 영업일)
console.log(previousBusinessDay("2025-01-08", 2)); // '2025-01-03' (월요일 이전 두 번째 영업일)
console.log(previousBusinessDay("2025-01-06")); // '2025-01-03' (월요일 이전 영업일은 금요일)
console.log(previousBusinessDay("2025-03-04", 3)); // '2025-02-26' (삼일절 대체휴일 이전 세 번째 영업일)
```

#### `lastBusinessDay(date: string): string`

주어진 날짜를 기준으로 가장 최근 영업일을 반환합니다. 주어진 날짜가 영업일이면 그대로 반환하고, 아니면 가장 최근의 영업일을 반환합니다.

```typescript
import { lastBusinessDay } from "korea-business-day/business";

console.log(lastBusinessDay("2026-01-02")); // '2026-01-02' (금요일, 영업일)
console.log(lastBusinessDay("2026-01-01")); // '2025-12-31' (신정은 공휴일, 이전 영업일)
console.log(lastBusinessDay("2026-01-10")); // '2026-01-09' (토요일 → 금요일)
```

#### `isTradingDay(date: string): boolean`

주어진 날짜가 주식시장 개장일인지 판단합니다.

```typescript
import { isTradingDay } from "korea-business-day/business";

console.log(isTradingDay("2025-01-02")); // true (목요일, 개장일)
console.log(isTradingDay("2025-01-01")); // false (신정, 거래소 휴무)
console.log(isTradingDay("2025-12-31")); // false (연말휴장일)
```

#### `nextTradingDay(date: string, count: number = 1): string`

주어진 날짜 다음의 N번째 주식시장 개장일을 반환합니다.

```typescript
import { nextTradingDay } from "korea-business-day/business";

console.log(nextTradingDay("2025-01-01")); // '2025-01-02' (신정 다음 첫 번째 개장일)
console.log(nextTradingDay("2025-01-01", 2)); // '2025-01-03' (신정 다음 두 번째 개장일)
console.log(nextTradingDay("2025-12-30")); // '2026-01-02' (연말 다음 개장일)
console.log(nextTradingDay("2025-05-05", 3)); // '2025-05-09' (어린이날 다음 세 번째 개장일)
```

#### `previousTradingDay(date: string, count: number = 1): string`

주어진 날짜 이전의 N번째 주식시장 개장일을 반환합니다.

```typescript
import { previousTradingDay } from "korea-business-day/business";

console.log(previousTradingDay("2025-01-02")); // '2024-12-30' (신정 이전 첫 번째 개장일)
console.log(previousTradingDay("2025-01-08", 2)); // '2025-01-03' (월요일 이전 두 번째 개장일)
console.log(previousTradingDay("2025-05-07")); // '2025-05-02' (어린이날 연휴 이전 개장일)
console.log(previousTradingDay("2025-05-07", 5)); // '2025-04-30' (어린이날 연휴 이전 다섯 번째 개장일)
```

#### `lastTradingDay(date: string): string`

주어진 날짜를 기준으로 가장 최근 거래일을 반환합니다. 주어진 날짜가 거래일이면 그대로 반환하고, 아니면 가장 최근의 거래일을 반환합니다.

```typescript
import { lastTradingDay } from "korea-business-day/business";

console.log(lastTradingDay("2026-01-02")); // '2026-01-02' (금요일, 거래일)
console.log(lastTradingDay("2026-01-01")); // '2025-12-30' (신정은 휴무, 31일은 휴장일, 이전 거래일)
console.log(lastTradingDay("2026-01-10")); // '2026-01-09' (토요일 → 금요일)
```

### Holiday 모듈

공휴일 및 거래소 휴무일 확인 함수들입니다.

#### `isHoliday(date: string): boolean`

주어진 날짜가 한국의 공휴일인지 판단합니다.

```typescript
import { isHoliday } from "korea-business-day/holiday";

console.log(isHoliday("2025-01-01")); // true (신정)
console.log(isHoliday("2025-03-03")); // true (삼일절 대체휴일)
console.log(isHoliday("2025-05-05")); // true (어린이날)
console.log(isHoliday("2025-01-02")); // false (평일)
console.log(isHoliday("2025-12-31")); // false (연말휴장일은 공휴일 아님)
```

#### `isTradingHoliday(date: string): boolean`

주어진 날짜가 한국 주식시장 휴무일인지 판단합니다.

```typescript
import { isTradingHoliday } from "korea-business-day/holiday";

console.log(isTradingHoliday("2025-01-01")); // true (신정, 거래소 휴무)
console.log(isTradingHoliday("2025-12-31")); // true (연말휴장일)
console.log(isTradingHoliday("2025-03-03")); // true (삼일절 대체휴일)
console.log(isTradingHoliday("2025-01-02")); // false (정상 거래일)
```

## 지원 연도

현재 **2022년부터 2027년**까지의 휴일 데이터를 지원합니다.

- 법정공휴일
- 대체휴일
- 임시공휴일
- 한국거래소 연말휴장일

## 공휴일과 거래소 휴무일의 차이

```typescript
import { isHoliday, isTradingHoliday } from "korea-business-day";

// 연말휴장일: 거래소는 휴무이지만 법정공휴일은 아님
console.log(isHoliday("2025-12-31")); // false
console.log(isTradingHoliday("2025-12-31")); // true

// 일반 공휴일: 둘 다 true
console.log(isHoliday("2025-01-01")); // true
console.log(isTradingHoliday("2025-01-01")); // true
```

## TypeScript 지원

모든 함수는 완전한 타입 정의를 제공합니다.

```typescript
// 모든 날짜는 'YYYY-MM-DD' 형식의 문자열을 사용합니다
const date: string = "2025-01-01"; // ✅ 올바른 형식
const invalidDate: string = "25-1-1"; // 런타임에서 확인 필요
```

## 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 기여하기

이슈 리포트, 기능 제안, 풀 리퀘스트를 환영합니다!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
