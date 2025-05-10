import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import SearchComponent from './SearchComponent';


const { width, height } = Dimensions.get('window');

interface CenteredModalProps {
  isVisible: boolean; // Receive the visibility state as a prop
  onClose: () => void; // Receive the function to close the modal
}

const PhysicalModal: React.FC<CenteredModalProps> = ({ isVisible, onClose }) => {
  const [period, setPeriod] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [frequency, setFrequency] = useState('');
  const [isMedicationSelected, setIsMedicationSelected] = useState(false);

  const handleMedicationSelection = (selectedMedications: string[]) => {
    setSelectedOptions(selectedMedications);
    setIsMedicationSelected(selectedMedications.length > 0);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.blacktext}>Type of Activity</Text>
          <View style={styles.dropdownRow}>
            <SearchComponent setSelectedOptions={handleMedicationSelection} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Confirm" onPress={onClose} color="#ffffff" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  blacktext: {
    fontSize: 27,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
  },
  middlecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    gap: 10,
  },
  dropdownRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  buttonContainer: {
    backgroundColor: '#6B2A88',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4E1D74',
    width: 200,
    marginTop: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(107, 42, 136, 0.55)',
  },
  modalContainer: {
    flexDirection: 'column',
    width: width * 0.9,
    height: height * 0.3,
    padding: 20,
    backgroundColor: '#EABAFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  modalText: {
    fontSize: 20,
    fontWeight: '500',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PhysicalModal;
