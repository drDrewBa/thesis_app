import Carousel from "@/components/Carousel";
import slides from "@/data/slides";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-between my-20">
      <Carousel data={slides} />
      <Pressable className="button">
        <Text className="button-text">Sign in with Google</Text>
      </Pressable>
    </View>
  );
}
