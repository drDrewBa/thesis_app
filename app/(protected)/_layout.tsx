import Classification from "@/components/Classification";
import { useAuth } from "@/context/AuthContext";
import {
  BottomSheetProvider,
  useBottomSheet,
} from "@/context/BottomSheetContext";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Redirect, Stack } from "expo-router";

function ProtectedLayoutContent() {
  const { isAuthenticated, loading } = useAuth();
  const { showBottomSheet, bottomSheetContent, sheetRef, hideBottomSheet } =
    useBottomSheet();
  const snapPoints = ["85%"];

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="invite" options={{ headerShown: false }} />
      </Stack>

      {showBottomSheet && (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          index={0}
          enablePanDownToClose={true}
          onClose={hideBottomSheet}
        >
          <BottomSheetView
            style={{ flex: 1, paddingHorizontal: 40, paddingVertical: 16 }}
          >
            {bottomSheetContent || (
              <Classification />
              
              // TODO: if plus button in 
              
            )}
          </BottomSheetView>
        </BottomSheet>
      )}
    </>
  );
}

export default function Layout() {
  return (
    <BottomSheetProvider>
      <ProtectedLayoutContent />
    </BottomSheetProvider>
  );
}
