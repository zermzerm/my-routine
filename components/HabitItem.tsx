import {Habit, Schedule} from "@/types/Habit";
import dayjs from "dayjs";
import styled from "styled-components/native";

interface Props {
  type: "habit" | "schedule";
  habit?: Habit;
  schedule?: Schedule;
  isEditMode: boolean;
  selected: boolean;
  onPress: () => void;
}

export default function HabitItem({type, habit, schedule, isEditMode, selected, onPress}: Props) {
  const today = dayjs();

  let Dday = 0;
  if (type === "schedule" && schedule?.targetDate) {
    Dday = dayjs(schedule.targetDate, "YYYY-MM-DD").diff(today, "day");
  }

  return (
    <Item onPress={onPress} selected={selected} isEditMode={isEditMode}>
      {isEditMode && <Checkbox selected={selected} />}
      <Title>{type === "habit" ? habit?.title : schedule?.title}</Title>
      <Title>🔥 D{type === "habit" ? "+" + habit?.streak : Dday === 0 ? "-day" : "-" + Dday}</Title>
    </Item>
  );
}

const Title = styled.Text`
  color: ${({theme}) => theme.text};
`;

const Item = styled.TouchableOpacity<{isEditMode: boolean; selected: boolean}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  border-radius: 8px;

  background-color: ${({selected, isEditMode, theme}) => {
    if (isEditMode) {
      return selected ? theme.primaryLight : theme.subBackground;
    }
    return theme.subBackground;
  }};

  border: 1px solid
    ${({selected, isEditMode, theme}) => (isEditMode && selected ? theme.primary : theme.border)};
`;

const Checkbox = styled.View<{selected: boolean}>`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  border-radius: 4px;
  border: 2px solid ${({theme}) => theme.primary};
  background-color: ${({selected, theme}) => (selected ? theme.primary : "transparent")};
`;
