import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Text, View } from "react-native";

export default function TabIcon({
  name,
  color,
  focused,
  title,
  variant,
}: {
  name: string;
  color: string;
  focused: boolean;
  title: string;
  variant: "icon" | "text";
}) {
  return (
    <>
      {variant === "icon" && (
        <View
          className={`flex-row w-24 rounded-full h-12 items-center justify-center ${focused ? "bg-white" : "bg-transparent"}`}
        >
          <FontAwesome
            size={28}
            name={name as any}
            color={focused ? color : "#CEE5FD"}
          />
        </View>
      )}
      {variant === "text" && (
        <View className={`flex-row w-36 rounded-full h-12 items-center justify-center ${focused ? "bg-primary-300" : "bg-primary-100"}`}>
          <Text className={`font-montserrat text-sm font-semibold ${focused ? "text-white" : "text-primary-400"}`}>{title}</Text>
        </View>
      )}
    </>
  );
}
