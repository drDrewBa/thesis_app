import Carousel from "@/components/Carousel";
import { useAuth } from "@/context/AuthContext";
import slides from "@/data/slides";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/(protected)/(tabs)/record');
    }
  }, [isAuthenticated, loading]);

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <View className="container justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  // If authenticated, don't render anything (will redirect)
  if (isAuthenticated) {
    return null;
  }

  // Show onboarding for non-authenticated users
  return (
    <View className="container justify-between">
      <Carousel data={slides} />
      <Pressable className="button" onPress={() => router.navigate('/sign-in' as any)}>
        <Text className="button-text">Get Started!</Text>
      </Pressable>
    </View>
  );
}
