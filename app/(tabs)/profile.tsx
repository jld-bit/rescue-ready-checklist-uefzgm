
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { GlassView } from "expo-glass-effect";
import { useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

interface CategoryStats {
  name: string;
  displayName: string;
  icon: string;
  androidIcon: string;
  color: string;
  totalItems: number;
  completedItems: number;
  completionPercentage: number;
}

export default function ProfileScreen() {
  const theme = useTheme();
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  const loadStats = async () => {
    try {
      const categories = [
        { 
          name: 'fire', 
          displayName: 'Fire Emergency',
          icon: 'flame.fill',
          androidIcon: 'local-fire-department',
          color: '#E74C3C'
        },
        { 
          name: 'earthquake', 
          displayName: 'Earthquake',
          icon: 'waveform.path.ecg',
          androidIcon: 'warning',
          color: '#8E44AD'
        },
        { 
          name: 'flood', 
          displayName: 'Flood',
          icon: 'drop.fill',
          androidIcon: 'water',
          color: '#3498DB'
        },
        { 
          name: 'hurricane', 
          displayName: 'Hurricane',
          icon: 'wind',
          androidIcon: 'air',
          color: '#16A085'
        },
        { 
          name: 'poweroutage', 
          displayName: 'Power Outage',
          icon: 'bolt.slash.fill',
          androidIcon: 'power-off',
          color: '#F39C12'
        },
      ];

      const stats: CategoryStats[] = [];

      for (const category of categories) {
        const data = await AsyncStorage.getItem(`${category.name}_checklist`);
        let total = 0;
        let completed = 0;

        if (data) {
          const items = JSON.parse(data);
          total = items.length;
          completed = items.filter((item: any) => item.checked).length;
        }

        stats.push({
          name: category.name,
          displayName: category.displayName,
          icon: category.icon,
          androidIcon: category.androidIcon,
          color: category.color,
          totalItems: total,
          completedItems: completed,
          completionPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        });
      }

      setCategoryStats(stats);
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
                const data = await AsyncStorage.getItem(`${category}_checklist`);
                if (data) {
                  const items = JSON.parse(data);
                  // Keep only non-custom items and reset their checked state
                  const resetItems = items
                    .filter((item: any) => !item.isCustom)
                    .map((item: any) => ({
                      ...item,
                      checked: false
                    }));
                  await AsyncStorage.setItem(`${category}_checklist`, JSON.stringify(resetItems));
                }
              }
              await loadStats();
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

  const handleResetCategory = (categoryName: string, displayName: string) => {
    Alert.alert(
      `Reset ${displayName}`,
      `Are you sure you want to reset the ${displayName} checklist? This will uncheck all items and remove custom items.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              const data = await AsyncStorage.getItem(`${categoryName}_checklist`);
              if (data) {
                const items = JSON.parse(data);
                // Keep only non-custom items and reset their checked state
                const resetItems = items
                  .filter((item: any) => !item.isCustom)
                  .map((item: any) => ({
                    ...item,
                    checked: false
                  }));
                await AsyncStorage.setItem(`${categoryName}_checklist`, JSON.stringify(resetItems));
              }
              await loadStats();
              Alert.alert('Success', `${displayName} checklist has been reset.`);
            } catch (error) {
              console.log('Error resetting checklist:', error);
              Alert.alert('Error', 'Failed to reset checklist.');
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
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>Emergency Preparedness</Text>

        <Text style={[styles.sectionHeader, { color: theme.colors.text }]}>Category Progress</Text>

        {categoryStats.map((category, index) => (
          <GlassView 
            key={index}
            style={[
              styles.categoryCard,
              Platform.OS !== 'ios' && { backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
            ]} 
            glassEffectStyle="regular"
          >
            <View style={styles.categoryHeader}>
              <View style={styles.categoryTitleRow}>
                <View style={[styles.categoryIconContainer, { backgroundColor: `${category.color}20` }]}>
                  <IconSymbol 
                    ios_icon_name={category.icon} 
                    android_material_icon_name={category.androidIcon} 
                    size={24} 
                    color={category.color} 
                  />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={[styles.categoryName, { color: theme.colors.text }]}>{category.displayName}</Text>
                  <Text style={[styles.categorySubtext, { color: theme.dark ? '#98989D' : '#666' }]}>
                    {category.completedItems} of {category.totalItems} items ready
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={() => handleResetCategory(category.name, category.displayName)}
                style={styles.resetButton}
              >
                <IconSymbol 
                  ios_icon_name="arrow.counterclockwise" 
                  android_material_icon_name="refresh" 
                  size={20} 
                  color={theme.dark ? '#98989D' : '#666'} 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${category.completionPercentage}%`,
                      backgroundColor: category.color
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.progressPercentage, { color: theme.colors.text }]}>
                {category.completionPercentage}%
              </Text>
            </View>
          </GlassView>
        ))}

        <GlassView style={[
          styles.section,
          Platform.OS !== 'ios' && { backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
        ]} glassEffectStyle="regular">
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleResetAll}>
            <IconSymbol ios_icon_name="arrow.counterclockwise" android_material_icon_name="refresh" size={24} color={theme.dark ? '#98989D' : '#666'} />
            <Text style={[styles.actionText, { color: theme.colors.text }]}>Reset All Checklists</Text>
          </TouchableOpacity>
        </GlassView>

        <GlassView style={[
          styles.section,
          Platform.OS !== 'ios' && { backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
        ]} glassEffectStyle="regular">
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>About</Text>
          
          <View style={styles.infoRow}>
            <IconSymbol ios_icon_name="info.circle" android_material_icon_name="info" size={20} color={theme.dark ? '#98989D' : '#666'} />
            <Text style={[styles.infoText, { color: theme.dark ? '#98989D' : '#666' }]}>RescueReady Checklist v1.0</Text>
          </View>
          
          <Text style={[styles.description, { color: theme.dark ? '#98989D' : '#666' }]}>
            Stay prepared for emergencies with comprehensive checklists for fire, earthquake, flood, hurricane, and power outage scenarios.
          </Text>
        </GlassView>

        <GlassView style={[
          styles.section,
          Platform.OS !== 'ios' && { backgroundColor: theme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
        ]} glassEffectStyle="regular">
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
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoryCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  categorySubtext: {
    fontSize: 13,
  },
  resetButton: {
    padding: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 45,
    textAlign: 'right',
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
