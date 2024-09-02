import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Modal} from 'react-native';
import {useSelector} from 'react-redux';
import {getStyles, lightTheme, darkTheme} from './styles';
import {RootState} from '../../../../store';
import DatePicker from 'react-native-date-picker';

export default function AddMedicationModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const theme = useSelector((state: RootState) => state.app.theme)
    ? darkTheme
    : lightTheme;
  const styles = getStyles(theme);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [destinationCount, setDestinationCount] = useState('');
  const [intakeDate, setIntakeDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Medication</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#888"
          />

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#888"
          />

          <TextInput
            style={styles.input}
            placeholder="Number of Intakes"
            value={destinationCount}
            onChangeText={setDestinationCount}
            keyboardType="numeric"
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.buttonText}>Select Intake Date</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Add Medication</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DatePicker
              modal
              open={showDatePicker}
              date={intakeDate}
              onConfirm={setIntakeDate}
              onCancel={() => setShowDatePicker(false)}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}
