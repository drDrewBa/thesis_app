import { Audio } from 'expo-av';
import { Alert } from 'react-native';

export interface RecordingState {
  isListening: boolean;
  hasPermission: boolean;
  audioLevel: number;
}

export const requestAudioPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await Audio.requestPermissionsAsync();
    const hasPermission = status === 'granted';
    
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Microphone permission is required to record audio. Please enable it in your device settings.',
        [{ text: 'OK' }]
      );
    }
    
    return hasPermission;
  } catch (error) {
    console.error('Permission request failed:', error);
    return false;
  }
};

export const setupAudioMode = async (): Promise<void> => {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  });
};

export const createRecording = async (
  onStatusUpdate: (status: Audio.RecordingStatus) => void
): Promise<Audio.Recording> => {
  const { recording } = await Audio.Recording.createAsync(
    Audio.RecordingOptionsPresets.HIGH_QUALITY,
    onStatusUpdate,
    100
  );
  return recording;
};

export const stopAndUnloadRecording = async (recording: Audio.Recording): Promise<string | null> => {
  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  console.log('Recording stopped and stored at', uri);
  return uri;
};

export const calculateAudioLevel = (metering: number | undefined | null): number => {
  if (metering === undefined || metering === null) return 0;
  // Convert metering to a 0-1 scale (typically ranges from -160 to 0 dB)
  return Math.max(0, Math.min(1, (metering + 160) / 160));
}; 