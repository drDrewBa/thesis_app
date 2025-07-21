import SupportPerson from "@/components/SupportPerson";
import support from "@/data/support";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Tab() {
  return (
    <View className="container">
      <View className="flex-row w-full px-10 justify-between items-center">
        <Text className="text-3xl font-semibold text-primary-300">Support</Text>
        <View className="flex-row gap-2">
          <TouchableOpacity 
          className="w-10 h-10 bg-primary-100/70 rounded-lg items-center justify-center"
          onPress={() => router.push("/invite/generate" as any)}
          >
            <FontAwesome name="user-plus" size={18} color="#6BB2FA" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="separator my-8 w-96" />
      <FlatList
        className="w-96 flex"
        data={support}
        renderItem={({ item }) => <SupportPerson item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
}
