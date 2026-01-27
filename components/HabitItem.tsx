import {Habit} from "@/types/Habit";
import styled from "styled-components/native";

interface Props {
  habit: Habit;
  isEditMode: boolean;
  selected: boolean;
  onPress: () => void;
}

export default function HabitItem({habit, isEditMode, selected, onPress}: Props) {
  return (
    <Item onPress={onPress} selected={selected} isEditMode={isEditMode}>
      {isEditMode && <Checkbox selected={selected} />}
      <Title>{habit.title}</Title>
      <Title>🔥 D+{habit.streak}</Title>
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
