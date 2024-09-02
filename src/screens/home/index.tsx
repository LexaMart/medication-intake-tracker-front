import React, {useState} from 'react';
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
import AddMedicationModal from './components/addmedicationModal';
import {updateMedicationThunk} from '../../store/slices/app.slice';
import {MedicationDto} from '../../shared/dto/medication.dto';

// Пример данных с сервера
const medications: MedicationDto[] = [
  {
    id: 1,
    name: 'Medication 1',
    description: 'Description for Medication 1',
    dateOfIntake: new Date('2024-09-01'),
    destinationAmount: 5,
    amountOfIntakes: 2,
  },
  {
    id: 2,
    name: 'Medication 2',
    description: 'Description for Medication 2',
    dateOfIntake: new Date('2024-09-02'),
    destinationAmount: 3,
    amountOfIntakes: 1,
  },
];

const colors = ['#FFCDD2', '#C5E1A5', '#BBDEFB', '#FFECB3', '#D1C4E9'];

export default function HomeScreen() {
  const dispatch: AppDispatch = useDispatch();
  const [selectedMedication, setSelectedMedication] =
    useState<MedicationDto | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [medicationList, setMedicationList] =
    useState<MedicationDto[]>(medications);

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
            amountOfIntakes: medication.amountOfIntakes + 1,
          }),
        );
        return {
          ...medication,
          amountOfIntakes: medication.amountOfIntakes + 1,
        };
      }
      return medication;
    });
    setMedicationList(updatedList);
  };

  const decreaseCount = () => {
    if (selectedMedication && selectedMedication.amountOfIntakes > 0) {
      dispatch(
        updateMedicationThunk({
          ...selectedMedication,
          amountOfIntakes: selectedMedication.amountOfIntakes - 1,
        }),
      );
      setSelectedMedication({
        ...selectedMedication,
        amountOfIntakes: selectedMedication.amountOfIntakes - 1,
      });
    }
  };

  const increaseModalCount = () => {
    if (selectedMedication) {
      dispatch(
        updateMedicationThunk({
          ...selectedMedication,
          amountOfIntakes: selectedMedication.amountOfIntakes + 1,
        }),
      );
      setSelectedMedication({
        ...selectedMedication,
        amountOfIntakes: selectedMedication.amountOfIntakes + 1,
      });
    }
  };

  const openAddModal = () => {
    setAddModalVisible(true);
  };

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
          {item.amountOfIntakes}/{item.destinationAmount}
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
              Date of Intake: {`${selectedMedication?.dateOfIntake}`}
            </Text>
            <View style={styles.modalCounterContainer}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={decreaseCount}>
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterText}>
                {selectedMedication?.amountOfIntakes}
              </Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={increaseModalCount}>
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Button title="Close" onPress={closeModal} />
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
