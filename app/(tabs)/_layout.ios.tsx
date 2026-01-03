
import React from 'react';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'home',
      label: 'Home',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person',
      label: 'Profile',
    },
  ];

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen key="home" name="(home)" />
        <Stack.Screen key="profile" name="profile" />
        <Stack.Screen key="fire" name="fire" />
        <Stack.Screen key="earthquake" name="earthquake" />
        <Stack.Screen key="flood" name="flood" />
        <Stack.Screen key="hurricane" name="hurricane" />
        <Stack.Screen key="poweroutage" name="poweroutage" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
