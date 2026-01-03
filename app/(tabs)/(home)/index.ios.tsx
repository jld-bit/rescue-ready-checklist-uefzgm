
import React from "react";
import { colors } from "@/styles/commonStyles";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";

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
    id: "fire",
    title: "Fire",
    route: "/fire",
    iosIcon: "flame.fill",
    androidIcon: "local-fire-department",
    color: "#E74C3C",
  },
  {
    id: "earthquake",
    title: "Earthquake",
    route: "/earthquake",
    iosIcon: "waveform.path.ecg",
    androidIcon: "warning",
    color: "#9B59B6",
  },
  {
    id: "flood",
    title: "Flood",
    route: "/flood",
    iosIcon: "drop.fill",
    androidIcon: "water",
    color: "#3498DB",
  },
  {
    id: "hurricane",
    title: "Hurricane",
    route: "/hurricane",
    iosIcon: "tornado",
    androidIcon: "cyclone",
    color: "#1ABC9C",
  },
  {
    id: "poweroutage",
    title: "Power Outage",
    route: "/poweroutage",
    iosIcon: "bolt.slash.fill",
    androidIcon: "power-off",
    color: "#F39C12",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleCategoryPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>RescueReady</Text>
        <Text style={styles.subtitle}>Emergency Preparedness Checklists</Text>
      </View>

      <View style={styles.categoriesContainer}>
        {emergencyCategories.map((category, index) => (
          <React.Fragment key={category.id}>
            <TouchableOpacity
              style={[styles.categoryCard, { borderLeftColor: category.color }]}
              onPress={() => handleCategoryPress(category.route)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: category.color + "20" }]}>
                <IconSymbol name={category.iosIcon} size={32} color={category.color} />
              </View>
              <View style={styles.categoryTextContainer}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categorySubtitle}>Tap to view checklist</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#95A5A6" />
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#7F8C8D",
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
    color: "#95A5A6",
  },
});
