import { Audio } from 'expo-av';
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  calculateAudioLevel,
  createRecording,
  requestAudioPermissions,
  setupAudioMode,
  stopAndUnloadRecording
} from "./actions";

// Custom hook for recording functionality
export const useAudioRecorder = (onRecordingStopped?: () => void) => {
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
      // Call the callback when recording stops
      onRecordingStopped?.();
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