import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Tab() {
  const { user, signout } = useAuth();

  const handleSignOut = async () => {
    await signout();
    router.replace("/sign-in");
  };

  return (
    <View className="container">
      {user && (
        <View className="my-20 items-center justify-center gap-10">
          <View className="w-40 h-40 bg-slate-300 rounded-full items-center justify-center">
            <Text className="text-6xl font-semibold text-slate-400">
              {user.email.slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <View className="items-center justify-center gap-2">
            <Text className="text-2xl font-semibold text-slate-500 text-center">
              {user.name}
            </Text>
            <Text className="text-base font-montserrat text-slate-400 text-center">
              {user.email}
            </Text>
          </View>
          <View className="separator"/>
          <Pressable className="flex-row gap-2 items-center justify-center p-4 rounded-lg" onPress={handleSignOut}>
            {/* <FontAwesome name="sign-out" size={24} color="#94a3b8"/> */}
            <Text className="text-slate-400 font-montserrat font-semibold">Sign Out</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
