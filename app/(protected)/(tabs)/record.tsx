import { useBottomSheet } from "@/context/BottomSheetContext";
import { useAudioRecorder } from "@/lib/useAudioRecorder";
import React from "react";
import { Text, View } from "react-native";
import RecordingButton from "../../../components/RecordingButton";

// Main component
export default function Tab() {
  const { showBottomSheetWithContent } = useBottomSheet();

  const handleRecordingStopped = () => {
    showBottomSheetWithContent(null); // Use default content
  };

  const { isListening, hasPermission, audioLevel, toggleRecording } = useAudioRecorder(handleRecordingStopped);

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