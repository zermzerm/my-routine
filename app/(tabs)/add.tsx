import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from "expo-router";
import {useState} from "react";
import styled from "styled-components/native";

import PrimaryButton from "@/components/PrimaryButton";
import {Habit} from "@/types/Habit";
import dayjs from "dayjs";

export default function AddScreen() {
  const [text, setText] = useState("");
  const router = useRouter();

  const today = dayjs().format("YYYY-MM-DD");

  const addHabit = async () => {
    if (!text) return;

    const data = await AsyncStorage.getItem("habits");
    const habits: Habit[] = data ? JSON.parse(data) : [];

    await AsyncStorage.setItem(
      "habits",
      JSON.stringify([
        ...habits,
        {
          id: Date.now(),
          title: text,
          startDate: today,
          streak: 1,
          lastCalculatedDate: today,
          resetHistory: [],
        },
      ]),
    );

    setText("");
    router.back();
  };

  return (
    <Container>
      <Input
        autoFocus
        placeholder="새 루틴 입력"
        value={text}
        onChangeText={setText}
        onSubmitEditing={addHabit}
      />
      <PrimaryButton title="저장" onPress={addHabit} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${({theme}) => theme.background};
`;

const Input = styled.TextInput`
  border: 1px solid ${({theme}) => theme.border};
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
`;
