
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { ChecklistItem } from '@/components/ChecklistItem';
import { AddItemModal } from '@/components/AddItemModal';

interface ChecklistItemType {
  id: string;
  label: string;
  checked: boolean;
  isCustom?: boolean;
}

const DEFAULT_ITEMS: ChecklistItemType[] = [
  { id: 'power-1', label: 'Flashlights', checked: false },
  { id: 'power-2', label: 'Extra Batteries', checked: false },
  { id: 'power-3', label: 'Battery-powered Radio', checked: false },
  { id: 'power-4', label: 'Candles & Matches', checked: false },
  { id: 'power-5', label: 'Portable Phone Chargers', checked: false },
  { id: 'power-6', label: 'Non-perishable Food', checked: false },
  { id: 'power-7', label: 'Manual Can Opener', checked: false },
  { id: 'power-8', label: 'Bottled Water', checked: false },
  { id: 'power-9', label: 'First Aid Kit', checked: false },
  { id: 'power-10', label: 'Blankets', checked: false },
  { id: 'power-11', label: 'Generator (if available)', checked: false },
  { id: 'power-12', label: 'Fuel for Generator', checked: false },
  { id: 'power-13', label: 'Ice Packs for Cooler', checked: false },
];

const STORAGE_KEY = 'poweroutage_checklist';

export default function PowerOutageScreen() {
  const router = useRouter();
  const [items, setItems] = useState<ChecklistItemType[]>(DEFAULT_ITEMS);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (!loading) {
      saveItems();
    }
  }, [items, loading]);

  const loadItems = async () => {
    try {
      console.log('Loading power outage checklist items...');
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log('Loaded items:', parsedData.length);
        setItems(parsedData);
      }
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveItems = async () => {
    try {
      console.log('Saving power outage checklist items...');
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving items:', error);
    }
  };

  const handleToggle = (id: string) => {
    console.log('Toggling item:', id);
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAddItem = (label: string) => {
    console.log('Adding custom item:', label);
    const newItem: ChecklistItemType = {
      id: `power-custom-${Date.now()}`,
      label,
      checked: false,
      isCustom: true,
    };
    setItems(prevItems => [...prevItems, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    console.log('Deleting item:', id);
    setItems(prevItems => prevItems.filter(item => item.id !== id));
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
              console.log('Resetting power outage checklist...');
              const resetItems = DEFAULT_ITEMS.map(item => ({ ...item, checked: false }));
              await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(resetItems));
              setItems(resetItems);
              Alert.alert('Success', 'Checklist has been reset.');
            } catch (error) {
              console.log('Error resetting checklist:', error);
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
              ios_icon_name="bolt.slash.fill"
              android_material_icon_name="power-off"
              size={28}
              color="#F39C12"
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Power Outage</Text>
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
            key={index}
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
    backgroundColor: '#F39C1220',
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
