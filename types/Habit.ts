export interface Habit {
  id: number;
  title: string;

  startDate: string; // 최초 시작일
  streak: number; // 현재 연속 일수
  lastCalculatedDate: string; // 마지막으로 D+ 계산한 날짜

  resetHistory: string[]; // 실패 선언한 날짜들
}
