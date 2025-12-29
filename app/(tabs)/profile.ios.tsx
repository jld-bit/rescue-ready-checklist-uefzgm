
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { GlassView } from "expo-glass-effect";
import { useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const theme = useTheme();
  const [stats, setStats] = useState({
    totalItems: 0,
    completedItems: 0,
    completionPercentage: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const categories = ['fire', 'earthquake', 'flood', 'hurricane', 'poweroutage'];
      let total = 0;
      let completed = 0;

      for (const category of categories) {
        const data = await AsyncStorage.getItem(`checklist_${category}`);
        if (data) {
          const items = JSON.parse(data);
          total += items.length;
          completed += items.filter((item: any) => item.checked).length;
        }
      }

      setStats({
        totalItems: total,
        completedItems: completed,
        completionPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      });
    } catch (error) {
      console.log('Error loading stats:', error);
    }
  };

  const handleResetAll = () => {
    Alert.alert(
      'Reset All Checklists',
      'Are you sure you want to reset all checklists? This will uncheck all items and remove custom items.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              const categories = ['fire', 'earthquake', 'flood', 'hurricane', 'poweroutage'];
              for (const category of categories) {
                await AsyncStorage.removeItem(`checklist_${category}`);
              }
              loadStats();
              Alert.alert('Success', 'All checklists have been reset.');
            } catch (error) {
              console.log('Error resetting checklists:', error);
              Alert.alert('Error', 'Failed to reset checklists.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>Emergency Preparedness</Text>

        <GlassView style={styles.statsCard} glassEffectStyle="regular">
          <View style={styles.statRow}>
            <IconSymbol ios_icon_name="checkmark.circle.fill" android_material_icon_name="check-circle" size={40} color="#1ABC9C" />
            <View style={styles.statContent}>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{stats.completionPercentage}%</Text>
              <Text style={[styles.statLabel, { color: theme.dark ? '#98989D' : '#666' }]}>Overall Completion</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.text }]}>{stats.completedItems}</Text>
              <Text style={[styles.statLabel, { color: theme.dark ? '#98989D' : '#666' }]}>Items Ready</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.text }]}>{stats.totalItems - stats.completedItems}</Text>
              <Text style={[styles.statLabel, { color: theme.dark ? '#98989D' : '#666' }]}>Items Needed</Text>
            </View>
          </View>
        </GlassView>

        <GlassView style={styles.section} glassEffectStyle="regular">
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleResetAll}>
            <IconSymbol ios_icon_name="arrow.counterclockwise" android_material_icon_name="refresh" size={24} color={theme.dark ? '#98989D' : '#666'} />
            <Text style={[styles.actionText, { color: theme.colors.text }]}>Reset All Checklists</Text>
          </TouchableOpacity>
        </GlassView>

        <GlassView style={styles.section} glassEffectStyle="regular">
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>About</Text>
          
          <View style={styles.infoRow}>
            <IconSymbol ios_icon_name="info.circle" android_material_icon_name="info" size={20} color={theme.dark ? '#98989D' : '#666'} />
            <Text style={[styles.infoText, { color: theme.dark ? '#98989D' : '#666' }]}>RescueReady Checklist v1.0</Text>
          </View>
          
          <Text style={[styles.description, { color: theme.dark ? '#98989D' : '#666' }]}>
            Stay prepared for emergencies with comprehensive checklists for fire, earthquake, flood, hurricane, and power outage scenarios.
          </Text>
        </GlassView>

        <GlassView style={styles.section} glassEffectStyle="regular">
          <View style={styles.disclaimerHeader}>
            <IconSymbol ios_icon_name="exclamationmark.triangle" android_material_icon_name="warning" size={20} color="#FF9500" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Disclaimer</Text>
          </View>
          
          <Text style={[styles.disclaimerText, { color: theme.dark ? '#98989D' : '#666' }]}>
            This checklist is provided for general guidance and informational purposes only. It is not an official emergency plan and does not guarantee safety or survival in any disaster or emergency situation. Users are responsible for preparing and following official guidance from local authorities and emergency services.
          </Text>
        </GlassView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsCard: {
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    gap: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  disclaimerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  disclaimerText: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
