import {Schedule} from "@/types/Habit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import {useFocusEffect} from "expo-router";
import {useCallback, useState} from "react";

export function useSchedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  // const [searchText, setSearchText] = useState("");

  const loadSchedules = useCallback(() => {
    AsyncStorage.getItem("schedules").then((data) => {
      if (data) setSchedules(JSON.parse(data));
      else setSchedules([]);
    });
  }, []);

  useFocusEffect(loadSchedules);

  const addSchedule = async (title: string, date: string) => {
    const newSchedule = {
      id: Date.now(),
      title,
      targetDate: date,
      createdAt: dayjs().toISOString(),
    };

    const next = [...schedules, newSchedule];
    setSchedules(next);
    await AsyncStorage.setItem("schedules", JSON.stringify(next));
  };

  // const filteredSchedules = useMemo(() => {
  //   return schedules.filter((s) => s.title.toLowerCase().includes(searchText.toLowerCase()));
  // }, [schedules, searchText]);

  const deleteSchedules = async (ids: number[]) => {
    if (ids.length === 0) return;

    const updated = schedules.filter((s) => !ids.includes(s.id));
    setSchedules(updated);
    await AsyncStorage.setItem("schedules", JSON.stringify(updated));
  };

  return {
    schedules,
    deleteSchedules,
  };
}
