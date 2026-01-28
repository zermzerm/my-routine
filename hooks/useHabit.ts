import {Habit} from "@/types/Habit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import {useFocusEffect} from "expo-router";
import {useCallback, useState} from "react";
import {Alert} from "react-native";

export function useHabit() {
  // 저장된 모든 습관 목록
  const [habits, setHabits] = useState<Habit[]>([]);
  // 습관 검색 입력값
  // const [searchText, setSearchText] = useState("");
  // 삭제 모드 여부 (true면 체크박스 + 삭제 바 표시)
  const [isEditMode, setIsEditMode] = useState(false);
  // 삭제 모드에서 선택된 습관 id 목록
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const today = dayjs().format("YYYY-MM-DD");

  // 검색 기능
  // const filteredHabits = habits.filter((habit) =>
  //   habit.title.toLowerCase().includes(searchText.toLowerCase()),
  // );

  const handlePressHabit = async (id: number) => {
    // 삭제 모드일 때는 바로 선택 토글
    if (isEditMode) {
      setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
      return;
    } else {
      // D-day 초기화 확인
      Alert.alert("습관 초기화", "오늘 실패로 처리할까요?\nD+1부터 다시 시작합니다.", [
        {text: "취소", style: "cancel"},
        {
          text: "초기화",
          style: "destructive",
          onPress: async () => {
            const updated = habits.map((habit) => {
              if (habit.id !== id) return habit;

              return {
                ...habit,
                streak: 1,
                startDate: today,
                lastCalculatedDate: today,
                resetHistory: [...habit.resetHistory, today],
              };
            });

            setHabits(updated);
            await AsyncStorage.setItem("habits", JSON.stringify(updated));
            return;
          },
        },
      ]);
    }
  };

  //  AsyncStorage에 저장된 습관 목록을 불러오는 함수
  // 화면에 다시 포커스될 때마다 실행됨
  // lastCalculatedDate와 today를 비교해서 D-day 계산
  const loadHabits = useCallback(() => {
    AsyncStorage.getItem("habits").then((data) => {
      if (data) {
        setHabits(
          JSON.parse(data).map((h: Habit) => {
            const diffD = dayjs(today).diff(dayjs(h.lastCalculatedDate), "day");
            if (diffD <= 0) return h;
            else {
              return {
                ...h,
                streak: h.streak + diffD,
                lastCalculatedDate: today,
              };
            }
          }),
        );
      } else setHabits([]);
    });
  }, []);

  // 홈 화면에 들어올 때마다 습관 목록 로드
  useFocusEffect(loadHabits);

  // 삭제 모드에서 선택된 습관들을
  // 한 번에 삭제하는 함수
  const deleteSelectedHabits = async () => {
    if (selectedIds.length === 0) return;
    // 선택되지 않은 습관만 남김
    Alert.alert("루틴 삭제", `${selectedIds.length}개의 루틴을 삭제하시겠습니까?`, [
      {text: "취소", style: "cancel"},
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          const updated = habits.filter((h) => !selectedIds.includes(h.id));
          setHabits(updated);
          setSelectedIds([]);
          setIsEditMode(false);

          await AsyncStorage.setItem("habits", JSON.stringify(updated));
        },
      },
    ]);
  };

  return {
    habits,
    isEditMode,
    setIsEditMode,
    selectedIds,
    setSelectedIds,
    handlePressHabit,
    deleteSelectedHabits,
  };
}
