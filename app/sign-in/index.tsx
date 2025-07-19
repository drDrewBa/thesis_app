import { useAuth } from "@/context/AuthContext";
import { Link, Redirect, router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

function Index() {
  
  const { isAuthenticated, signin, loading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    const result = await signin({ email, password });
    
    if (result.success) {
      router.replace('/(protected)/(tabs)/record');
    } else {
      setError(result.error || "Sign in failed");
    }
  };

  if (isAuthenticated) {
    return <Redirect href="/(protected)/(tabs)/record" />;
  }

  return (
    <View className="container justify-between">
      <View className="items-center">
        <View className="mt-12 flex gap-4">
          <Text className="title">Welcome! ✨</Text>
          <Text className="desc">Enter your account details to continue.</Text>
        </View>
        <View className="mt-12">
          <View className=" separator" />
        </View>
        <View className="flex gap-10 mt-12">
          <View className="flex gap-2">
            <Text className="font-montserrat font-semibold text-slate-500/70">
              Email
            </Text>
            <TextInput
              onPress={() => { } }
              placeholder="enter your email..."
              placeholderTextColor={"#94a3b8"}
              className="bg-slate-200/60 p-4 w-96 rounded-lg text-slate-500 font-montserrat"
              value={email}
              onChangeText={setEmail} />
          </View>
          <View className="flex gap-2">
            <Text className="font-montserrat font-semibold text-slate-500/70">
              Password
            </Text>
            <TextInput
              onPress={() => { } }
              placeholder="enter your password..."
              placeholderTextColor={"#94a3b8"}
              className="bg-slate-200/60 p-4 w-96 rounded-lg text-slate-500 font-montserrat"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword} />
          </View>
          {error ? (
            <Text className="text-red-500 font-montserrat text-center">{error}</Text>
          ) : null}
        </View>
      </View>
      <View className="flex gap-8 items-center mb-4">
        <Pressable 
          className="button" 
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="button-text">{loading ? "Signing In..." : "Sign In"}</Text>
        </Pressable>
        {/* <View className="flex flex-row gap-2">
          <Text className="desc">Don't have an account?</Text>
          <Link
            href={"/sign-up"}
            className="desc font-semibold text-primary-300"
          >
            Sign up
          </Link>
        </View> */}
      </View>
    </View>
  );
};

export default Index;
