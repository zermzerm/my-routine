export interface Habit {
  id: number;
  title: string;
  createdAt: string;

  startDate: string; // 최초 시작일 YYYY-MM-DD
  streak: number; // 현재 연속 일수
  lastCalculatedDate: string; // 마지막으로 D+ 계산한 날짜 YYYY-MM-DD

  resetHistory: string[]; // 실패 선언한 날짜들 YYYY-MM-DD
}

export interface Schedule {
  id: number;
  title: string;
  targetDate: string; // D-day YYYY-MM-DD
  createdAt: string;
}
