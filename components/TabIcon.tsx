import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { View } from "react-native";

export default function TabIcon({ name, color, focused }: { name: string, color: string, focused: boolean }) {
  return (
    <View className={`flex-row w-24 rounded-full h-12 items-center justify-center ${focused ? "bg-white" : "bg-transparent"}`}>
      <FontAwesome size={28} name={name as any} color={focused ? color : "#CEE5FD"} />
    </View>
  );
}
