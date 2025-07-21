import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import React, { useState } from "react";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native";

export default function scan() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-center">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View className="flex-1">
      <CameraView
        style={{ flex: 1, width: "100%", height: "100%" }}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={(event) => {
          Alert.alert('Barcode Scanned', event.data);
        }}
      >
        <View className="absolute top-10 right-10 z-10">
          <TouchableOpacity
            className="bg-white/80 p-4 rounded-full"
            onPress={toggleCameraFacing}
          >
            <FontAwesome name="refresh" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
