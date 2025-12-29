
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
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
  { id: 'earthquake-1', label: '3-day Water Supply', checked: false },
  { id: 'earthquake-2', label: '3-day Food Supply', checked: false },
  { id: 'earthquake-3', label: 'First Aid Kit', checked: false },
  { id: 'earthquake-4', label: 'Flashlight & Extra Batteries', checked: false },
  { id: 'earthquake-5', label: 'Battery-powered Radio', checked: false },
  { id: 'earthquake-6', label: 'Emergency Whistle', checked: false },
  { id: 'earthquake-7', label: 'Dust Masks', checked: false },
  { id: 'earthquake-8', label: 'Plastic Sheeting & Duct Tape', checked: false },
  { id: 'earthquake-9', label: 'Wrench or Pliers', checked: false },
  { id: 'earthquake-10', label: 'Manual Can Opener', checked: false },
  { id: 'earthquake-11', label: 'Local Maps', checked: false },
  { id: 'earthquake-12', label: 'Cell Phone with Chargers', checked: false },
];

const STORAGE_KEY = 'earthquake_checklist';

export default function EarthquakeScreen() {
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
      console.log('Loading earthquake checklist items...');
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
      console.log('Saving earthquake checklist items...');
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
      id: `earthquake-custom-${Date.now()}`,
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

  const checkedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <IconSymbol
              ios_icon_name="waveform.path.ecg"
              android_material_icon_name="warning"
              size={28}
              color="#8E44AD"
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Earthquake</Text>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8E44AD20',
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
