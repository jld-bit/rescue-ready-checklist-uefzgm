
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';

interface ChecklistItemProps {
  id: string;
  label: string;
  checked: boolean;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
  isCustom?: boolean;
}

export function ChecklistItem({
  id,
  label,
  checked,
  onToggle,
  onDelete,
  isCustom,
}: ChecklistItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => onToggle(id)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && (
            <IconSymbol
              ios_icon_name="checkmark"
              android_material_icon_name="check"
              size={18}
              color="#FFFFFF"
            />
          )}
        </View>
        <Text style={[styles.label, checked && styles.labelChecked]}>
          {label}
        </Text>
      </TouchableOpacity>
      {isCustom && onDelete && (
        <TouchableOpacity
          onPress={() => onDelete(id)}
          style={styles.deleteButton}
          activeOpacity={0.7}
        >
          <IconSymbol
            ios_icon_name="trash"
            android_material_icon_name="delete"
            size={20}
            color="#FF3B30"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    marginBottom: 8,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.accent,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  labelChecked: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
});
