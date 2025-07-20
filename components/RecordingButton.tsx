import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

interface RecordingButtonProps {
  isListening: boolean;
  audioLevel: number;
  onPress: () => void;
  size?: number;
  iconSize?: number;
  className?: string;
}

export default function RecordingButton({
  isListening,
  audioLevel,
  onPress,
  size = 160,
  iconSize = 40,
  className = "bg-primary-300"
}: RecordingButtonProps) {
  const strokeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(strokeAnim, {
      toValue: audioLevel,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [audioLevel]);

  const strokeWidth = strokeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  const strokeOpacity = strokeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
  });

  const strokeSize = strokeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [size, size + 60], // Grow by 60px when active
  });

  return (
    <View className="flex items-center justify-center">
      <Animated.View
        style={{
          position: 'absolute',
          width: strokeSize,
          height: strokeSize,
          borderRadius: strokeSize,
          borderWidth: strokeWidth,
          borderColor: '#3b82f6',
          opacity: strokeOpacity,
          alignSelf: 'center',
        }}
      />
      <TouchableOpacity 
        className={`flex rounded-full items-center justify-center ${className}`}
        style={{ width: size, height: size }}
        onPress={onPress}
      >
        <FontAwesome 
          name={isListening ? "stop" : "microphone"} 
          size={iconSize} 
          color="white" 
        />
      </TouchableOpacity>
    </View>
  );
} 