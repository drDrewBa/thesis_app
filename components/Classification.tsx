import React from "react";
import { Text, View } from "react-native";

export default function Classification() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-montserrat text-lg font-semibold mb-4 text-center text-slate-400">
        We heard a cry!
      </Text>
      <View className="py-10" />
      <View className="h-40 w-40 bg-slate-200 rounded-full" />
      <View className="py-10" />
      <Text className="font-semibold text-3xl text-primary-300 text-center">
        Hungry
      </Text>
      <View className="py-8" />
      <Text className="font-montserrat text-slate-400 text-center">
        Your baby may be hungry.
      </Text>
      <Text className="font-montserrat text-slate-400 text-center">
        We have notified your support.
      </Text>
      <View className="py-8" />
    </View>
  );
}
