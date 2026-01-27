import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from "expo-router";
import {useState} from "react";
import styled from "styled-components/native";

import PrimaryButton from "@/components/PrimaryButton";
import {Habit, Schedule} from "@/types/Habit";
import dayjs from "dayjs";

export default function AddScreen() {
  const [habitText, setHabitText] = useState("");
  const [scheduleText, setScheduleText] = useState("");
  const today = dayjs().format("YYYY-MM-DD");

  const [scheduleDate, setScheduleDate] = useState(today);
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();

  const addHabit = async () => {
    if (!habitText) return;

    const data = await AsyncStorage.getItem("habits");
    const habits: Habit[] = data ? JSON.parse(data) : [];

    await AsyncStorage.setItem(
      "habits",
      JSON.stringify([
        ...habits,
        {
          id: Date.now(),
          title: habitText,
          createdAt: dayjs().toISOString(),
          startDate: today,
          streak: 1,
          lastCalculatedDate: today,
          resetHistory: [],
        },
      ]),
    );

    setHabitText("");
    router.back();
  };

  const addSchedule = async () => {
    if (!scheduleText) return;

    const data = await AsyncStorage.getItem("schedules");
    const schedules: Schedule[] = data ? JSON.parse(data) : [];

    await AsyncStorage.setItem(
      "schedules",
      JSON.stringify([
        ...schedules,
        {
          id: Date.now(),
          title: scheduleText,
          targetDate: scheduleDate,
          createdAt: dayjs().toISOString(),
        },
      ]),
    );

    setScheduleText("");
    router.back();
  };

  return (
    <Container>
      <Section>
        <Title>루틴 추가</Title>
        <Input
          autoFocus
          placeholder="새 루틴 입력"
          value={habitText}
          onChangeText={setHabitText}
          onSubmitEditing={addHabit}
        />
        <PrimaryButton title="저장" onPress={addHabit} />
      </Section>
      <Divider />
      <Section>
        <Title>일정 추가</Title>
        <Input
          placeholder="새 일정 입력"
          value={scheduleText}
          onChangeText={setScheduleText}
          onSubmitEditing={addSchedule}
        />
        <PrimaryButton title="저장" onPress={addSchedule} />
      </Section>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  gap: 75px;
  padding: 16px;
  background-color: ${({theme}) => theme.background};
`;

const Section = styled.View`
  gap: 12px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${({theme}) => theme.text};
`;

const Input = styled.TextInput`
  border: 1px solid ${({theme}) => theme.border};
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #8b8b8b;
  margin: 8px 0;
  opacity: 0.6;
  margin: 0 -16px;
`;
