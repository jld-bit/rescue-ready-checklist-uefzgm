
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '@/styles/commonStyles';

interface AddItemModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (label: string) => void;
}

export function AddItemModal({ visible, onClose, onAdd }: AddItemModalProps) {
  const [itemText, setItemText] = useState('');

  const handleAdd = () => {
    if (itemText.trim()) {
      console.log('Adding item:', itemText);
      onAdd(itemText.trim());
      setItemText('');
      onClose();
    }
  };

  const handleClose = () => {
    setItemText('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.modalContainer}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add Custom Item</Text>
                <Text style={styles.modalSubtitle}>
                  Enter the name of the item you want to add to your checklist
                </Text>
                
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Extra batteries"
                  placeholderTextColor={colors.textLight}
                  value={itemText}
                  onChangeText={setItemText}
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={handleAdd}
                />

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={handleClose}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.button, styles.addButton]}
                    onPress={handleAdd}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.addButtonText}>Add Item</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 20,
    lineHeight: 20,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.background,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
});
