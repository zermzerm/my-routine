import {useRouter} from "expo-router";
import {FlatList} from "react-native";
import styled from "styled-components/native";

import HabitItem from "@/components/HabitItem";
import PrimaryButton from "@/components/PrimaryButton";
import {useHabit} from "@/hooks/useHabit";
import {useSchedule} from "@/hooks/useSchedule";

export default function HomeScreen() {
  const router = useRouter();

  const {
    today,
    searchText,
    setSearchText,
    isEditMode,
    setIsEditMode,
    filteredHabits,
    selectedIds,
    setSelectedIds,
    handlePressHabit,
    deleteSelectedHabits,
  } = useHabit();

  const {
    searchText: scheduleSearch,
    setSearchText: setScheduleSearch,
    filteredSchedules,
  } = useSchedule();

  return (
    <Container>
      <PrimaryButton title="루틴 및 일정 추가" onPress={() => router.push("/add")} />

      <Section>
        <SectionTitle>루틴</SectionTitle>
        <SearchInput placeholder="루틴 검색" value={searchText} onChangeText={setSearchText} />
        <Header>
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
        </Header>

        <FlatList
          data={filteredHabits}
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
        {isEditMode && (
          <DeleteBar>
            <SelectedCount>{selectedIds.length}개 선택됨</SelectedCount>

            <DeleteButton disabled={selectedIds.length === 0} onPress={deleteSelectedHabits}>
              <DeleteButtonText>삭제하기</DeleteButtonText>
            </DeleteButton>
          </DeleteBar>
        )}
      </Section>

      <Divider />

      {/* ===== 일정 영역 ===== */}
      <Section>
        <SectionTitle>일정</SectionTitle>

        <SearchInput
          placeholder="일정 검색"
          value={scheduleSearch}
          onChangeText={setScheduleSearch}
        />

        <FlatList
          data={filteredSchedules}
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
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 25px;
  padding: 16px;
  background-color: ${({theme}) => theme.background};
`;

const Section = styled.View`
  flex: 1;
  gap: 12px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #8b8b8b;
  margin: 8px 0;
  opacity: 0.6;
  margin: 0 -16px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${({theme}) => theme.text};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const ActionButton = styled.TouchableOpacity`
  height: 48px;
  width: 150px;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  background-color: ${({theme}) => theme.primary};
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
