
import React from 'react';
import { Tabs } from 'expo-router/unstable-native-tabs';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              ios_icon_name="house.fill"
              android_material_icon_name="home"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              ios_icon_name="person.fill"
              android_material_icon_name="person"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="fire"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="earthquake"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="flood"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="hurricane"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="poweroutage"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
