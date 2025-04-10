import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#fff',
          ...(Platform.OS === 'web' ? { height: 60 } : {}),
        },
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: '#6B7280',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'MomTech',
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="babysitterverify"
        options={{
          title: 'Babysitter Verify',
          headerTitle: 'Babysitter Verification',
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="form-select" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: 'My Profile',
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}