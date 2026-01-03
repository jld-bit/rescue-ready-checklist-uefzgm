
import React from "react";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { IconSymbol } from "@/components/IconSymbol";

interface EmergencyCategory {
  id: string;
  title: string;
  route: string;
  iosIcon: string;
  androidIcon: string;
  color: string;
}

const categories: EmergencyCategory[] = [
  { id: 'fire', title: 'Fire', route: '/fire', iosIcon: 'flame.fill', androidIcon: 'local-fire-department', color: '#E74C3C' },
  { id: 'earthquake', title: 'Earthquake', route: '/earthquake', iosIcon: 'waveform.path.ecg', androidIcon: 'warning', color: '#8B4513' },
  { id: 'flood', title: 'Flood', route: '/flood', iosIcon: 'drop.fill', androidIcon: 'water', color: '#3498DB' },
  { id: 'hurricane', title: 'Hurricane', route: '/hurricane', iosIcon: 'tornado', androidIcon: 'cyclone', color: '#9B59B6' },
  { id: 'poweroutage', title: 'Power Outage', route: '/poweroutage', iosIcon: 'bolt.slash.fill', androidIcon: 'power-off', color: '#F39C12' },
];

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  const handleCategoryPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Emergency Preparedness
      </Text>
      <Text style={[styles.subtitle, { color: theme.dark ? '#98989D' : '#666' }]}>
        Select a category to view your checklist
      </Text>

      <View style={styles.grid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.card, { backgroundColor: category.color }]}
            onPress={() => handleCategoryPress(category.route)}
            activeOpacity={0.8}
          >
            <IconSymbol 
              ios_icon_name={category.iosIcon} 
              android_material_icon_name={category.androidIcon}
              color="#FFFFFF" 
              size={40} 
            />
            <Text style={styles.cardText}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
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
