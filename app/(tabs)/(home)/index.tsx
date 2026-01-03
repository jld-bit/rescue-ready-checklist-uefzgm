
import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

interface EmergencyCategory {
  id: string;
  title: string;
  route: string;
  iosIcon: string;
  androidIcon: keyof typeof import("@expo/vector-icons/MaterialIcons").default.glyphMap;
  color: string;
}

const emergencyCategories: EmergencyCategory[] = [
  {
    id: 'fire',
    title: 'Fire',
    route: '/(tabs)/fire',
    iosIcon: 'flame.fill',
    androidIcon: 'local-fire-department',
    color: '#E74C3C',
  },
  {
    id: 'earthquake',
    title: 'Earthquake',
    route: '/(tabs)/earthquake',
    iosIcon: 'waveform.path.ecg',
    androidIcon: 'warning',
    color: '#8E44AD',
  },
  {
    id: 'flood',
    title: 'Flood',
    route: '/(tabs)/flood',
    iosIcon: 'drop.fill',
    androidIcon: 'water',
    color: '#3498DB',
  },
  {
    id: 'hurricane',
    title: 'Hurricane',
    route: '/(tabs)/hurricane',
    iosIcon: 'wind',
    androidIcon: 'air',
    color: '#16A085',
  },
  {
    id: 'poweroutage',
    title: 'Power Outage',
    route: '/(tabs)/poweroutage',
    iosIcon: 'bolt.slash.fill',
    androidIcon: 'power-off',
    color: '#F39C12',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleCategoryPress = (route: string) => {
    console.log('Navigating to:', route);
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>RescueReady</Text>
          <Text style={styles.headerSubtitle}>Emergency Preparedness Checklists</Text>
        </View>

        <View style={styles.grid}>
          {emergencyCategories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryCard, { borderLeftColor: category.color }]}
              onPress={() => handleCategoryPress(category.route)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: category.color + '20' }]}>
                <IconSymbol
                  ios_icon_name={category.iosIcon}
                  android_material_icon_name={category.androidIcon}
                  size={32}
                  color={category.color}
                />
              </View>
              <View style={styles.categoryTextContainer}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categorySubtitle}>Tap to view checklist</Text>
              </View>
              <IconSymbol
                ios_icon_name="chevron.right"
                android_material_icon_name="chevron-right"
                size={24}
                color={colors.textLight}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Stay prepared for any emergency. Check off items as you gather them.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? 48 : 20,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
  },
  grid: {
    gap: 16,
  },
  categoryCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  footer: {
    marginTop: 32,
    padding: 20,
    backgroundColor: colors.card,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
});
