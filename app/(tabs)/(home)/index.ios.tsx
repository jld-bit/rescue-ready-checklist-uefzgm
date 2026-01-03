
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

const categories = [
  { id: 'fire', name: 'Fire', icon: 'flame.fill', androidIcon: 'local_fire_department', color: '#E74C3C', route: '/fire' },
  { id: 'earthquake', name: 'Earthquake', icon: 'exclamationmark.triangle.fill', androidIcon: 'warning', color: '#8B4513', route: '/earthquake' },
  { id: 'flood', name: 'Flood', icon: 'water.waves', androidIcon: 'waves', color: '#3498DB', route: '/flood' },
  { id: 'hurricane', name: 'Hurricane', icon: 'hurricane', androidIcon: 'cyclone', color: '#9B59B6', route: '/hurricane' },
  { id: 'poweroutage', name: 'Power Outage', icon: 'bolt.slash.fill', androidIcon: 'power_off', color: '#F39C12', route: '/poweroutage' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'RescueReady',
          headerLargeTitle: true,
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Emergency{'\n'}Preparedness</Text>
          <Text style={styles.subtitle}>Select a category to view your checklist</Text>
        </View>

        <View style={styles.grid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.card, { backgroundColor: category.color }]}
              onPress={() => router.push(category.route as any)}
              activeOpacity={0.8}
            >
              <IconSymbol
                name={category.icon}
                size={48}
                color="#FFFFFF"
                ios_icon_name={category.icon}
                android_material_icon_name={category.androidIcon}
              />
              <Text style={styles.cardText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
});
