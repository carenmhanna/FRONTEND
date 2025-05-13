import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import NumberBox from './Numberbox';
import Pillsbox from './pillsbox';
import Dropdownlong from './Dropdownlong';

const { width, height } = Dimensions.get('window');

interface MissedDosesProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (quantity: number, pills: number) => void;
  missedDosesQuantityOnly: number;
  missedDosesPills: number;
}

const CenteredModal: React.FC<MissedDosesProps> = ({
  isVisible,
  onClose,
  onSave,
  missedDosesQuantityOnly,
  missedDosesPills,
}) => {
  const [quantity, setQuantity] = useState(missedDosesQuantityOnly);
  const [pills, setPills] = useState(missedDosesPills);
  const [frequency, setFrequency] = useState('');

  useEffect(() => {
    if (isVisible) {
      setQuantity(missedDosesQuantityOnly);
      setPills(missedDosesPills);
    }
  }, [isVisible, missedDosesQuantityOnly, missedDosesPills]);

  const handleSaveQuantity = (newValue: number, option: string) => {
    if (option === 'Quantity') {
      setQuantity(newValue);
    } else if (option === 'Pills') {
      setPills(newValue);
    }
  };

  const handleConfirm = () => {
    onSave(quantity, pills);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent visible={isVisible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.dropdownSection}>
              <Text style={styles.label}>Frequency of Medication</Text>
              <Dropdownlong
                placeholder="Choose Frequency"
                options={[
                  { key: 'Daily', value: 'Daily' },
                  { key: 'As needed', value: 'As needed' },
                  { key: 'Rarely', value: 'Rarely' },
                ]}
                setSelected={setFrequency}
              />
            </View>

            {frequency === 'Daily' && (
              <>
                <Text style={styles.label}>Daily Dose</Text>
                <View style={styles.boxContainer}>
                  <NumberBox option="Quantity" onSave={handleSaveQuantity} initialValue={quantity} />
                  <Text style={{ fontSize: 60, color: 'white' }}> .</Text>
                  <NumberBox option="Pills" onSave={handleSaveQuantity} initialValue={pills} />
                </View>
                <Pillsbox />
              </>
            )}

            <View style={styles.buttonContainer}>
              <Button title="Confirm" onPress={handleConfirm} color="#ffffff" />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(107, 42, 136, 0.55)',
  },
  modalContainer: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    backgroundColor: '#EABAFF',
    borderRadius: 15,
    padding: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  dropdownSection: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#4E1D74',
    textAlign: 'center',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: '#6B2A88',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4E1D74',
    width: 180,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default CenteredModal;
