import { account } from "@/lib/appwriteConfig";
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await account.create('unique()', email, password);
      // After successful signup, redirect to sign-in
      router.replace('/sign-in');
    } catch (error: any) {
      console.log('Sign up error:', error);
      setError(error.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="container justify-between">
      <View className="items-center">
        <View className="mt-12 flex gap-4">
          <Text className="title">Get Started! ✨</Text>
          <Text className="desc">Create a new account to continue.</Text>
        </View>
        <View className="mt-12">
          <View className=" bg-slate-300/60 w-80 h-px" />
        </View>
        <View className="flex gap-10 mt-12">
          <View className="flex gap-2">
            <Text className="font-montserrat font-semibold text-slate-500/70">
              Email
            </Text>
            <TextInput
              onPress={() => {}}
              placeholder="enter your email..."
              placeholderTextColor={"#94a3b8"}
              className="bg-slate-200/60 p-4 w-96 rounded-lg text-slate-500 font-montserrat"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View className="flex gap-2">
            <Text className="font-montserrat font-semibold text-slate-500/70">
              Password
            </Text>
            <TextInput
              onPress={() => {}}
              placeholder="enter your password..."
              placeholderTextColor={"#94a3b8"}
              className="bg-slate-200/60 p-4 w-96 rounded-lg text-slate-500 font-montserrat"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View className="flex gap-2">
            <Text className="font-montserrat font-semibold text-slate-500/70">
              Confirm Password
            </Text>
            <TextInput
              onPress={() => {}}
              placeholder="confirm your password..."
              placeholderTextColor={"#94a3b8"}
              className="bg-slate-200/60 p-4 w-96 rounded-lg text-slate-500 font-montserrat"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          {error ? (
            <Text className="text-red-500 font-montserrat text-center">{error}</Text>
          ) : null}
        </View>
      </View>
      <View className="flex gap-8 items-center mb-4">
        <Pressable 
          className="button" 
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text className="button-text">{loading ? "Creating Account..." : "Sign Up"}</Text>
        </Pressable>
        <View className="flex flex-row gap-2">
          <Text className="desc">Already have an account?</Text>
          <Link
            href={"/sign-in"}
            className="desc font-semibold text-primary-300"
          >
            Sign in
          </Link>
        </View>
      </View>
    </View>
  )
}

export default Index