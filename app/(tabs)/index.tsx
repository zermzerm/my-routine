import {useRouter} from "expo-router";
import {FlatList} from "react-native";
import styled from "styled-components/native";

import HabitItem from "@/components/HabitItem";
import PrimaryButton from "@/components/PrimaryButton";
import {useHabit} from "@/hooks/useHabit";
import {useSchedule} from "@/hooks/useSchedule";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {useState} from "react";

export default function HomeScreen() {
  const [selectedHabitIds, setSelectedHabitIds] = useState<number[]>([]);
  const [selectedScheduleIds, setSelectedScheduleIds] = useState<number[]>([]);
  const tabBarHeight = useBottomTabBarHeight();
  const router = useRouter();

  const {
    habits,
    isEditMode,
    setIsEditMode,
    selectedIds,
    setSelectedIds,
    handlePressHabit,
    deleteSelectedHabits,
  } = useHabit();

  const {schedules} = useSchedule();

  return (
    <Container contentContainerStyle={{paddingBottom: tabBarHeight + 16}}>
      <Section>
        <Header>
          <SectionTitle>루틴</SectionTitle>
          <ButtonContainer>
            <PrimaryButton title="추가" onPress={() => router.push("/add")} size="small" />
            {!isEditMode ? (
              <ActionButton onPress={() => setIsEditMode(true)}>
                <ActionText>삭제</ActionText>
              </ActionButton>
            ) : (
              <ActionButton
                onPress={() => {
                  setIsEditMode(false);
                  setSelectedIds([]);
                }}
              >
                <ActionText edit={isEditMode}>취소</ActionText>
              </ActionButton>
            )}
          </ButtonContainer>
        </Header>

        <FlatList
          data={habits}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <HabitItem
              type="habit"
              habit={item}
              isEditMode={isEditMode}
              selected={selectedIds.includes(item.id)}
              onPress={() => handlePressHabit(item.id)}
            />
          )}
        />
      </Section>

      {/* <Divider /> */}

      {/* ===== 일정 영역 ===== */}
      <Section>
        <SectionTitle>일정</SectionTitle>
        {/* <Header>
          <PrimaryButton title="추가" onPress={() => router.push("/add")} size="small" />
          {!isEditMode ? (
            <ActionButton onPress={() => setIsEditMode(true)}>
              <ActionText>삭제</ActionText>
            </ActionButton>
          ) : (
            <ActionButton
              onPress={() => {
                setIsEditMode(false);
                setSelectedIds([]);
              }}
            >
              <ActionText edit={isEditMode}>취소</ActionText>
            </ActionButton>
          )}
        </Header> */}
        <FlatList
          data={schedules}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <HabitItem
              type="schedule"
              schedule={item}
              isEditMode={isEditMode}
              selected={selectedIds.includes(item.id)}
              onPress={() => handlePressHabit(item.id)}
            />
          )}
        />
      </Section>
      {isEditMode && (
        <DeleteBar>
          <SelectedCount>{selectedIds.length}개 선택됨</SelectedCount>

          <DeleteButton disabled={selectedIds.length === 0} onPress={deleteSelectedHabits}>
            <DeleteButtonText>삭제하기</DeleteButtonText>
          </DeleteButton>
        </DeleteBar>
      )}
    </Container>
  );
}

const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
  flex: 1;
  gap: 25px;
  padding: 16px;
  background-color: ${({theme}) => theme.background};
`;

const Section = styled.View`
  gap: 12px;
  padding-bottom: 20px;
`;

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #8b8b8b;
  opacity: 0.6;
  margin: 16px -16px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${({theme}) => theme.text};
`;

const ActionButton = styled.TouchableOpacity`
  height: 37px;
  width: 100px;
  border-radius: 8px;
  background-color: ${({theme}) => theme.primary};
  justify-content: center;
  align-items: center;
`;

const ActionText = styled.Text<{edit?: boolean}>`
  font-size: 16px;
  font-weight: 600;
  color: ${({edit}) => (edit ? "#ef4444" : "#ffffff")};
`;

const SearchInput = styled.TextInput`
  background-color: white;
  border: 1px solid ${({theme}) => theme.border};
  padding: 10px;
  border-radius: 8px;
  margin-top: 12px;
`;

const DeleteBar = styled.View`
  padding: 12px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.subBackground};
`;

const SelectedCount = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.text};
`;

const DeleteButton = styled.TouchableOpacity<{disabled: boolean}>`
  padding: 10px 16px;
  border-radius: 8px;
  background-color: ${({disabled}) => (disabled ? "#d1d5db" : "#ef4444")};
  opacity: ${({disabled}) => (disabled ? 0.6 : 1)};
`;

const DeleteButtonText = styled.Text`
  color: white;
  font-weight: 600;
`;
