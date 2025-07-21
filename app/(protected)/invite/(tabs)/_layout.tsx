import TabIcon from "@/components/TabItem";
import { PlatformPressable } from "@react-navigation/elements";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: "#6BB2FA", 
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#CEE5FD",
        borderRadius: 100,
        marginHorizontal: 56,
        marginBottom: 64,
        position: "absolute",
        height: 56,
        elevation: 0,
        paddingTop: 8,
        paddingHorizontal: 4,
      },
    }}>
      <Tabs.Screen
        name="generate"
        options={{
          title: "Generate",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="heart" color={color} focused={focused} title="My QR" variant="text" />
          ),
          tabBarButton: (props) => (
            <PlatformPressable
              {...props}
              android_ripple={{ color: 'transparent' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="microphone" color={color} focused={focused} title="Scan QR" variant="text" />
          ),
          tabBarButton: (props) => (
            <PlatformPressable
              {...props}
              android_ripple={{ color: 'transparent' }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
