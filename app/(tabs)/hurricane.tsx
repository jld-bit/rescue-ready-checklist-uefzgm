
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { ChecklistItemType, getDefaultItems } from '@/constants/DefaultChecklists';
import React, { useState, useCallback } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { AddItemModal } from '@/components/AddItemModal';
import { ChecklistItem } from '@/components/ChecklistItem';

const STORAGE_KEY = '@hurricane_checklist';
const CATEGORY = 'hurricane';

export default function HurricaneScreen() {
  const [items, setItems] = useState<ChecklistItemType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  const loadItems = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        const defaults = getDefaultItems(CATEGORY);
        setItems(defaults);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
      }
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const saveItems = async (updatedItems: ChecklistItemType[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      setItems(updatedItems);
    } catch (error) {
      console.error('Error saving items:', error);
    }
  };

  const handleToggle = (id: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    saveItems(updated);
  };

  const handleAddItem = (label: string) => {
    const newItem: ChecklistItemType = {
      id: `hurricane-custom-${Date.now()}`,
      label,
      checked: false,
      isCustom: true,
    };
    saveItems([...items, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    saveItems(updated);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow-back"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Hurricane Emergency</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <IconSymbol
            ios_icon_name="plus"
            android_material_icon_name="add"
            size={24}
            color={colors.accent}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {items.map((item) => (
          <ChecklistItem
            key={item.id}
            id={item.id}
            label={item.label}
            checked={item.checked}
            onToggle={handleToggle}
            onDelete={item.isCustom ? handleDeleteItem : undefined}
            isCustom={item.isCustom}
          />
        ))}
      </ScrollView>

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: 16,
    backgroundColor: colors.backgroundAlt,
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  addButton: {
    padding: 8,
    width: 40,
    alignItems: 'flex-end',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
});
