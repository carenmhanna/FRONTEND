import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types';
import CustomButton from './CustomButton';
import MissedDoses from './misseddoses';
import ChangeMedModal from './ChangeMedModal';
import RoundRadioButtons from './RoundRadioButtons';

const MedicationAdherenceS = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [showMissedDosesModal, setShowMissedDosesModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Define modal visibility
  const [medicationAnswers, setMedicationAnswers] = useState({
    onTime: '',
    missedDoses: '',
  });

  type SubstanceEntry = {
    substance: string;
    quantity: number;
    drinkType: string; // You can change this to 'glass', 'shot', or any other type you may have
  };

  const [missedDosesQuantity, setMissedDosesQuantity] = useState(0);
  const [missedDosesQuantityOnly, setMissedDosesQuantityOnly] = useState(0);
  const [missedDosesPills, setMissedDosesPills] = useState(0);
  const [selectedFrequency, setSelectedFrequency] = useState('');

  const [medicationList, setMedicationList] = useState([
    { name: 'Clonazepam', id: 1 },
    { name: 'Phenytoin', id: 2 },
    { name: 'Lamictal', id: 3 },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<any>(null);
  const [newMedicationName, setNewMedicationName] = useState('');

  const handleSelect = (question: string, answer: string) => {
    setMedicationAnswers((prevState) => ({
      ...prevState,
      [question]: answer,
    }));

    if (question === 'missedDoses' && answer === 'Yes') {
      setShowMissedDosesModal(true);
    }
  };

  const handleMissedDosesSave = (entry: { quantity: number, pills: number }) => {
    const combinedValue = entry.quantity + (entry.pills / 10);
    setMissedDosesQuantity(combinedValue);
    setMissedDosesQuantityOnly(entry.quantity);
    setMissedDosesPills(entry.pills);
    setShowMissedDosesModal(false);
  };

  const handleEditMedication = (medication: any) => {
    setIsEditing(true);
    setSelectedMedication(medication);
    setNewMedicationName(medication.name);  // Pre-fill with current medication name
    setIsModalVisible(true); // <-- Add this line to open the modal
  };

  const handleDeleteMedication = (id: number) => {
    setMedicationList(medicationList.filter(med => med.id !== id));
  };

  const handleSaveEdit = () => {
    if (selectedMedication) {
      const updatedList = medicationList.map(med =>
        med.id === selectedMedication.id ? { ...med, name: newMedicationName } : med
      );
      setMedicationList(updatedList);
      setIsEditing(false);
      setSelectedMedication(null);
      setNewMedicationName('');
      setIsModalVisible(false); // <-- Close modal after saving
    }
  };

  const isFormComplete = medicationAnswers.onTime && medicationAnswers.missedDoses;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Step7')}>
            <Image source={require("./Loginpics/vector.png")} style={styles.image} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.purpleText}>Medication</Text>
            <Text style={styles.purpleText}>Adherence</Text>
          </View>
        </View>

        {/* Existing Sections for onTime and missedDoses */}
        <View style={styles.sectionContainer}>
          <Text style={styles.blackText}>Medication</Text>
          <Text style={styles.blackText}>taken on time</Text>
          <RoundRadioButtons
            options={['Yes', 'No']}
            selectedOption={medicationAnswers.onTime}
            onSelect={(answer) => handleSelect('onTime', answer)}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.blackText}>Missed doses</Text>
          <RoundRadioButtons
            options={['Yes', 'No']}
            selectedOption={medicationAnswers.missedDoses}
            onSelect={(answer) => handleSelect('missedDoses', answer)}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.purpleText2}>Medication List</Text>
          <View style={styles.medicationList}>
            {medicationList.map((med) => (
              <Text key={med.id}>{med.name}</Text>
            ))}
          </View>
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={styles.changeText}>Change Medication List</Text>
          </TouchableOpacity>
        </View>

        {/* If Editing, show the edit block with delete and edit options */}
        {isEditing && (
          <View style={styles.editSection}>
            {medicationList.map((med) => (
              <View key={med.id} style={styles.medicationItem}>
                <Text>{med.name}</Text>
                <TouchableOpacity onPress={() => handleEditMedication(med)}>
                  <Text style={styles.changeText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteMedication(med.id)}>
                  <Text style={styles.changeText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}

            <ChangeMedModal
              visible={isModalVisible}
              title="Frequency"
              title2="Quantity"
              onClose={() => setIsModalVisible(false)}
              onSelect={(entry: SubstanceEntry) => {
                console.log('Selected entry:', entry);
                setSelectedFrequency(entry.substance); // Set the selected substance
              }}
              options={[{ key: 'Rarely', value: 'Rarely' }, { key: 'As needed', value: 'As needed' }, { key: 'Daily', value: 'Daily' }]}
              placeholder="Choose a frequency"
            />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <CustomButton
            text="Submit"
            onPress={() => navigation.navigate('Step7')}
            disabled={!isFormComplete}
          />
        </View>

        <MissedDoses
          visible={showMissedDosesModal}
          title="Number of Pills Missed"
          onClose={() => setShowMissedDosesModal(false)}
          onSelect={handleMissedDosesSave}
          missedDosesQuantityOnly={missedDosesQuantityOnly}
          missedDosesPills={missedDosesPills}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: 10,
  },
  scrollViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  topBar: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
    marginBottom: 10,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  purpleText: {
    fontSize: 28,
    color: '#6B2A88',
    fontWeight: '600',
  },
  image: {
    position: 'relative',
    right: 45,
    resizeMode: 'contain',
  },
  blackText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 5,
  },
  purpleText2: {
    color: '#B766DA',
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 5,
  },
  sectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 60,
    width: '100%',
  },
  medicationList: {
    backgroundColor: '#F1E1F1',
    padding: 10,
    borderRadius: 10,
    width: '90%',
    marginVertical: 10,
  },
  editSection: {
    backgroundColor: '#F1E1F1',  // Same as original block color
    padding: 10,
    borderRadius: 10,
    width: '90%',
    marginVertical: 10,
  },
  medicationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  changeText: {
    color: '#B766DA',
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#6B2A88',
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 40,
  },

  // Modal Styling
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Background overlay
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,  // for Android shadow effect
  },
});

export default MedicationAdherenceS;
