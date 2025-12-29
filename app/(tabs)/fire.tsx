
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { ChecklistItem } from '@/components/ChecklistItem';
import { AddItemModal } from '@/components/AddItemModal';
import { ChecklistItemType, getDefaultItems } from '@/constants/DefaultChecklists';

const STORAGE_KEY = 'fire_checklist';

export default function FireScreen() {
  const router = useRouter();
  const [items, setItems] = useState<ChecklistItemType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      console.log('Fire screen focused, reloading items...');
      loadItems();
    }, [refreshKey])
  );

  const loadItems = async () => {
    try {
      console.log('Loading fire checklist items...');
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log(`Loaded ${parsedData.length} items from storage`);
        const checkedCount = parsedData.filter((item: ChecklistItemType) => item.checked).length;
        console.log(`${checkedCount} items are checked`);
        setItems([...parsedData]);
      } else {
        console.log('No saved data found, loading defaults');
        const defaultItems = getDefaultItems('fire');
        setItems([...defaultItems]);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultItems));
      }
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const saveItems = async (updatedItems: ChecklistItemType[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      console.log('Saved fire checklist items');
    } catch (error) {
      console.error('Error saving items:', error);
    }
  };

  const handleToggle = (id: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const handleAddItem = (label: string) => {
    const newItem: ChecklistItemType = {
      id: `fire-custom-${Date.now()}`,
      label,
      checked: false,
      isCustom: true,
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Checklist',
      'Are you sure you want to reset this checklist? This will uncheck all items and remove custom items.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('=== RESETTING FIRE CHECKLIST ===');
              
              // Step 1: Remove from AsyncStorage
              await AsyncStorage.removeItem(STORAGE_KEY);
              console.log('Cleared existing data from AsyncStorage');
              
              // Step 2: Get fresh default items
              const resetItems = getDefaultItems('fire');
              console.log(`Created ${resetItems.length} reset items, all unchecked: ${resetItems.every(item => !item.checked)}`);
              
              // Step 3: Save to AsyncStorage
              await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(resetItems));
              console.log('Saved reset items to AsyncStorage');
              
              // Step 4: Force state update with new array reference
              setItems([...resetItems]);
              console.log('Updated state with reset items');
              
              // Step 5: Force refresh
              setRefreshKey(prev => prev + 1);
              
              console.log('=== RESET COMPLETE ===');
              Alert.alert('Success', 'Checklist has been reset.');
            } catch (error) {
              console.error('Error resetting checklist:', error);
              Alert.alert('Error', 'Failed to reset checklist.');
            }
          },
        },
      ]
    );
  };

  const checkedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <IconSymbol
              ios_icon_name="chevron.left"
              android_material_icon_name="chevron-left"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleReset}
            activeOpacity={0.7}
          >
            <IconSymbol
              ios_icon_name="arrow.counterclockwise"
              android_material_icon_name="refresh"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <IconSymbol
              ios_icon_name="flame.fill"
              android_material_icon_name="local-fire-department"
              size={28}
              color="#E74C3C"
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Fire Emergency</Text>
            <Text style={styles.headerSubtitle}>
              {checkedCount} of {totalCount} items ready
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{Math.round(progress)}% Complete</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item, index) => (
          <ChecklistItem
            key={`${item.id}-${refreshKey}`}
            item={item}
            onToggle={handleToggle}
            onDelete={item.isCustom ? handleDeleteItem : undefined}
            isCustom={item.isCustom}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <IconSymbol
          ios_icon_name="plus"
          android_material_icon_name="add"
          size={28}
          color={colors.card}
        />
      </TouchableOpacity>

      <AddItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 48 : 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  resetButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E74C3C20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.card,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 6,
  },
});
