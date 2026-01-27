import {Ionicons} from "@expo/vector-icons";
import {Tabs} from "expo-router";
import {useTheme} from "styled-components/native";

export default function TabLayout() {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 70, // 탭 높이 키우기
          backgroundColor: theme.tab,
          borderTopColor: theme.border,
        },
        headerStyle: {
          backgroundColor: theme.header,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: "600",
        },
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.subText,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "루틴",
          tabBarIcon: ({color, size}) => <Ionicons name="list" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: "루틴 추가",
          tabBarIcon: ({color, size}) => <Ionicons name="add" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="stats"
        options={{
          title: "통계",
          tabBarIcon: ({color, size}) => <Ionicons name="stats-chart" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "설정",
          tabBarIcon: ({color, size}) => <Ionicons name="settings" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
