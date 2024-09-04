import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getStyles, lightTheme, darkTheme} from './styles';
import {AppDispatch, RootState} from '../../store';
import AddMedicationModal from './components/addMedicationModal';
import {
  getMedicationThunk,
  setMedicationsList,
  updateMedicationThunk,
} from '../../store/slices/app.slice';
import {MedicationDto} from '../../shared/dto/medication.dto';
import {loadUserSession} from '../../store/slices/auth.slice';

const colors = ['#FFCDD2', '#C5E1A5', '#BBDEFB', '#FFECB3', '#D1C4E9'];

export default function HomeScreen() {
  const dispatch: AppDispatch = useDispatch();
  const medicationList = useSelector(
    (store: RootState) => store.app.medications,
  );
  const user = useSelector((store: RootState) => store.auth.user);

  const [selectedMedication, setSelectedMedication] =
    useState<MedicationDto | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const theme = useSelector((state: RootState) => state.app.theme)
    ? darkTheme
    : lightTheme;
  const styles = getStyles(theme);

  const openModal = (medication: any) => {
    setSelectedMedication(medication);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedMedication(null);
    setModalVisible(false);
  };

  const increaseCount = (id: number) => {
    const updatedList = medicationList.map(medication => {
      if (medication.id === id) {
        dispatch(
          updateMedicationThunk({
            ...medication,
            count: medication.count + 1,
          }),
        );
        return {
          ...medication,
          count: medication.count + 1,
        };
      }
      return medication;
    });
    dispatch(setMedicationsList(updatedList));
  };

  const decreaseCount = () => {
    if (selectedMedication && selectedMedication.count > 0) {
      dispatch(
        updateMedicationThunk({
          ...selectedMedication,
          count: selectedMedication.count - 1,
        }),
      );
      setSelectedMedication({
        ...selectedMedication,
        count: selectedMedication.count - 1,
      });
    }
  };

  const increaseModalCount = () => {
    if (selectedMedication) {
      dispatch(
        updateMedicationThunk({
          ...selectedMedication,
          count: selectedMedication.count + 1,
        }),
      );
      setSelectedMedication({
        ...selectedMedication,
        count: selectedMedication.count + 1,
      });
    }
  };

  const openAddModal = () => {
    setAddModalVisible(true);
  };

  useEffect(() => {
    dispatch(loadUserSession());
  }, []);

  useEffect(() => {
    dispatch(getMedicationThunk());
  }, [user]);

  const renderMedicationItem = ({item, index}: any) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.listItem,
        {backgroundColor: colors[index % colors.length]},
      ]}
      onPress={() => openModal(item)}>
      <Text style={styles.listItemText}>{item.name}</Text>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {item.count}/{item.destinationCount}
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => increaseCount(item.id)}>
          <Text style={styles.addButtonText}>+1</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme === darkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={theme.backgroundColor}
      />
      <FlatList
        data={medicationList}
        renderItem={renderMedicationItem}
        keyExtractor={item => `${item.id}`}
      />
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedMedication?.name}</Text>
            <Text style={styles.modalDescription}>
              {selectedMedication?.description}
            </Text>
            <Text style={styles.modalDate}>
              Date of Intake:{' '}
              {`${new Date(
                selectedMedication?.intakeDate || '',
              ).toDateString()}`}
            </Text>
            <View style={styles.modalCounterContainer}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={decreaseCount}>
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterText}>
                {selectedMedication?.count}
              </Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={increaseModalCount}>
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.counterButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.addButtonFloating} onPress={openAddModal}>
        <Text style={styles.addButtonFloatingText}>+</Text>
      </TouchableOpacity>
      <AddMedicationModal
        isVisible={isAddModalVisible}
        onClose={() => setAddModalVisible(false)}
        // onSave={}
      />
    </View>
  );
}
