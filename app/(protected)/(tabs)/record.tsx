import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Audio } from 'expo-av';
import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Text, TouchableOpacity, View } from "react-native";

export default function Tab() {
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  
  // Animation value for visual feedback
  const strokeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    requestPermissions();
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  const requestPermissions = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Microphone permission is required to record audio. Please enable it in your device settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Permission request failed:', error);
      setHasPermission(false);
    }
  };

  const startRecording = async () => {
    try {
      if (!hasPermission) {
        await requestPermissions();
        if (!hasPermission) {
          return;
        }
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        onRecordingStatusUpdate,
        100 // Update every 100ms
      );

      setRecording(recording);
      setIsListening(true);
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    setIsListening(false);
    
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
      setRecording(null);
      setAudioLevel(0);
      
      // Reset stroke animation
      Animated.timing(strokeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const onRecordingStatusUpdate = (status: Audio.RecordingStatus) => {
    if (status.isRecording) {
      // Calculate audio level from metering (if available)
      let level = 0;
      if (status.metering !== undefined && status.metering !== null) {
        // Convert metering to a 0-1 scale
        // Metering typically ranges from -160 to 0 dB
        level = Math.max(0, (status.metering + 160) / 160);
        level = Math.min(1, level); // Clamp to 0-1
      }
      
      setAudioLevel(level);
      
      // Update stroke animation based on audio level
      Animated.timing(strokeAnim, {
        toValue: level,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  };

  const handlePress = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

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
    outputRange: [160, 220], // Start at button size (160) and grow to 220
  });

  return (
    <View className="container">
      <View className="h-full items-center justify-between gap-4 pb-40">
        <View className="h-full flex items-center justify-center">
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
            className="flex w-40 h-40 bg-primary-300 rounded-full items-center justify-center" 
            onPress={handlePress}
          >
            <FontAwesome 
              name={isListening ? "stop" : "microphone"} 
              size={40} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
        <Text className="font-montserrat text-slate-500 text-center px-4">
          {!hasPermission 
            ? "Microphone permission is required"
            : isListening 
              ? "Listening..."
              : "Place the microphone close to your baby."
          }
        </Text>
      </View>
    </View>
  );
}
