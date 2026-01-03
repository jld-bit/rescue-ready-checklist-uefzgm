
import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { colors } from "@/styles/commonStyles";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";

interface EmergencyCategory {
  id: string;
  title: string;
  route: string;
  iosIcon: string;
  androidIcon: keyof typeof import("@expo/vector-icons/MaterialIcons").default.glyphMap;
  color: string;
}

const categories: EmergencyCategory[] = [
  { id: "1", title: "Fire", route: "/(tabs)/fire", iosIcon: "flame.fill", androidIcon: "local-fire-department", color: "#E74C3C" },
  { id: "2", title: "Earthquake", route: "/(tabs)/earthquake", iosIcon: "waveform.path.ecg", androidIcon: "warning", color: "#8B4513" },
  { id: "3", title: "Flood", route: "/(tabs)/flood", iosIcon: "drop.fill", androidIcon: "water", color: "#3498DB" },
  { id: "4", title: "Hurricane", route: "/(tabs)/hurricane", iosIcon: "tornado", androidIcon: "cyclone", color: "#9B59B6" },
  { id: "5", title: "Power Outage", route: "/(tabs)/poweroutage", iosIcon: "bolt.slash.fill", androidIcon: "power-off", color: "#F39C12" },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleCategoryPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Emergency Preparedness</Text>
        <Text style={styles.subtitle}>Select a category to view your checklist</Text>
      </View>
      <View style={styles.grid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.card, { backgroundColor: category.color }]}
            onPress={() => handleCategoryPress(category.route)}
            activeOpacity={0.8}
          >
            <IconSymbol name={category.iosIcon} size={48} color="#FFFFFF" />
            <Text style={styles.cardTitle}>{category.title}</Text>
          </TouchableOpacity>
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
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#7F8C8D",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
