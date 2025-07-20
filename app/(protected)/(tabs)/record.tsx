import { Audio } from 'expo-av';
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import RecordingButton from "../../../components/RecordingButton";
import { 
  requestAudioPermissions, 
  setupAudioMode, 
  createRecording, 
  stopAndUnloadRecording, 
  calculateAudioLevel 
} from "../../../lib/actions";

// Custom hook for recording functionality
const useAudioRecorder = () => {
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    initializePermissions();
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  const initializePermissions = async () => {
    const permission = await requestAudioPermissions();
    setHasPermission(permission);
  };

  const startRecording = async () => {
    try {
      if (!hasPermission) {
        const permission = await requestAudioPermissions();
        setHasPermission(permission);
        if (!permission) return;
      }

      await setupAudioMode();
      const newRecording = await createRecording(onRecordingStatusUpdate);
      
      setRecording(newRecording);
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
      await stopAndUnloadRecording(recording);
      setRecording(null);
      setAudioLevel(0);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const onRecordingStatusUpdate = (status: Audio.RecordingStatus) => {
    if (status.isRecording) {
      const level = calculateAudioLevel(status.metering);
      setAudioLevel(level);
    }
  };

  const toggleRecording = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return {
    isListening,
    hasPermission,
    audioLevel,
    toggleRecording,
  };
};

// Main component
export default function Tab() {
  const { isListening, hasPermission, audioLevel, toggleRecording } = useAudioRecorder();

  const getStatusText = () => {
    if (!hasPermission) return "Microphone permission is required";
    if (isListening) return "Listening...";
    return "Place the microphone close to your baby.";
  };

  return (
    <View className="container">
      <View className="h-full items-center justify-between gap-4 pb-40">
        <View className="h-full flex items-center justify-center">
          <RecordingButton
            isListening={isListening}
            audioLevel={audioLevel}
            onPress={toggleRecording}
          />
        </View>
        <Text className="font-montserrat text-slate-500 text-center px-4">
          {getStatusText()}
        </Text>
      </View>
    </View>
  );
}