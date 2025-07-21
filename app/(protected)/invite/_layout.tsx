import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitle: "Invite",
          headerTitleStyle: styles.headerTitle,
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Montserrat",
    fontSize: 16,
  },
});
