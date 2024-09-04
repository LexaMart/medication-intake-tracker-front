import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Modal} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getStyles, lightTheme, darkTheme} from './styles';
import {AppDispatch, RootState} from '../../../../store';
import DatePicker from 'react-native-date-picker';
import {addMedicationThunk} from '../../../../store/slices/app.slice';

export default function AddMedicationModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.app.theme)
    ? darkTheme
    : lightTheme;
  const styles = getStyles(theme);
  const user = useSelector((store: RootState) => store.auth.user);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [destinationAmount, setDestinationAmount] = useState('');
  const [intakeDate, setIntakeDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCreateMedication = () => {
    dispatch(
      addMedicationThunk({
        name,
        description,
        destinationCount: +destinationAmount || 1,
        intakeDate,
        count: 0,
      }),
    );
    onClose();
  };

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
            value={destinationAmount}
            onChangeText={setDestinationAmount}
            keyboardType="numeric"
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.buttonText}>Select Intake Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateMedication}>
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
