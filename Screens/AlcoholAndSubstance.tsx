import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types';
import CustomButton from './CustomButton';
import RoundRadioButtons from './RoundRadioButtons';
import PlusIcon from './PlusIcon';
import AlcoholModal from './AlcoholModal';
import NarguilehModal from './NarguilehModal';
import SubstanceModal from './SubstanceModal';

type SubstanceEntry = {
  substance: string;
  quantity: number;
  drinkType: string;
};

const AlcoholAndSubstance = () => {
  const navigation = useNavigation<AuthNavigationProp>();

  const [alcohol, setAlcohol] = useState('');
  const [smoking, setSmoking] = useState('');
  const [narguileh, setNarguileh] = useState('');
  const [caffeine, setCaffeine] = useState('');
  const [energyDrinks, setEnergyDrinks] = useState('');
  const [recreationalDrugs, setRecreationalDrugs] = useState('');

  const [alcoholDetails, setAlcoholDetails] = useState<string[]>([]);
  const [smokingDetails, setSmokingDetails] = useState<string[]>([]);
  const [narguilehDetails, setNarguilehDetails] = useState<string[]>([]);
  const [caffeineDetails, setCaffeineDetails] = useState<string[]>([]);
  const [energyDrinksDetails, setEnergyDrinksDetails] = useState<string[]>([]);
  const [recreationalDrugsDetails, setRecreationalDrugsDetails] = useState<string[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalTitle2, setModalTitle2] = useState('');
  const [modalType, setModalType] = useState('');
  const [modalOptions, setModalOptions] = useState<{ key: string; value: string }[]>([]);

  const alcoholOptions = ['Wine', 'Beer', 'Vodka', 'Whiskey', 'Arak'];
  const nicotineOptions = ['Cigarettes', 'Vape', 'Nicotine Pouches'];
  const caffeineOptions = ['Espresso', 'Americano', 'Latte', 'Turkish Coffee'];
  const energyDrinkOptions = ['Red Bull', 'Monster', 'Other'];
  const narguilehOptions = ['Grape Mint', 'Double Apple', 'Watermelon', 'Other'];
  const recreationalDrugOptions = ['Cannabis', 'MDMA', 'LSD', 'Cocaine', 'Other'];
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track which index is being edited


const handleEdit = (index: number) => {
  // Remove the existing entry at the given index
  switch (modalType) {
    case 'Alcohol':
      setAlcoholDetails(prev => prev.filter((_, i) => i !== index)); // Remove the entry
      break;
    case 'Smoking':
      setSmokingDetails(prev => prev.filter((_, i) => i !== index));
      break;
    case 'Narguileh':
      setNarguilehDetails(prev => prev.filter((_, i) => i !== index));
      break;
    case 'Caffeine':
      setCaffeineDetails(prev => prev.filter((_, i) => i !== index));
      break;
    case 'Energy Drinks':
      setEnergyDrinksDetails(prev => prev.filter((_, i) => i !== index));
      break;
    case 'Recreational Drugs':
      setRecreationalDrugsDetails(prev => prev.filter((_, i) => i !== index));
      break;
    default:
      return;
  }

  // Open the modal with no predefined values (empty state)
  setEditIndex(null);  // Reset the edit index
  setModalTitle('Add New Substance');
  setModalTitle2('Enter Quantity');
  setIsModalVisible(true); // Open the modal for the user to enter new data
};



  const openModal = (title: string, title2: string, type: string, options: string[]) => {
    setModalTitle(title);
    setModalTitle2(title2);
    setModalType(type);
    setModalOptions(options.map(option => ({ key: option, value: option })));
    setIsModalVisible(true);
  };

  const handleModalSelection = (selectedOption: SubstanceEntry) => {
  if (selectedOption.substance && selectedOption.quantity > 0 && selectedOption.drinkType) {
    const formatted = `${selectedOption.substance} | ${selectedOption.quantity} ${selectedOption.drinkType}`;
    console.log(`Selected ${modalType}: ${formatted}`);  // Log selection details
    
    switch (modalType) {
      case 'Alcohol':
        setAlcoholDetails(prev => {
          console.log(`Alcohol details before: ${JSON.stringify(prev)}`);
          const newDetails = [...prev, formatted];
          console.log(`Alcohol details after: ${JSON.stringify(newDetails)}`);
          return newDetails;
        });
        break;
      case 'Smoking':
        setSmokingDetails(prev => {
          console.log(`Smoking details before: ${JSON.stringify(prev)}`);
          const newDetails = [...prev, formatted];
          console.log(`Smoking details after: ${JSON.stringify(newDetails)}`);
          return newDetails;
        });
        break;
      case 'Narguileh':
        setNarguilehDetails(prev => {
          console.log(`Narguileh details before: ${JSON.stringify(prev)}`);
          const newDetails = [...prev, formatted];
          console.log(`Narguileh details after: ${JSON.stringify(newDetails)}`);
          return newDetails;
        });
        break;
      case 'Caffeine':
        setCaffeineDetails(prev => {
          console.log(`Caffeine details before: ${JSON.stringify(prev)}`);
          const newDetails = [...prev, formatted];
          console.log(`Caffeine details after: ${JSON.stringify(newDetails)}`);
          return newDetails;
        });
        break;
      case 'Energy Drinks':
        setEnergyDrinksDetails(prev => {
          console.log(`Energy Drinks details before: ${JSON.stringify(prev)}`);
          const newDetails = [...prev, formatted];
          console.log(`Energy Drinks details after: ${JSON.stringify(newDetails)}`);
          return newDetails;
        });
        break;
      case 'Recreational Drugs':
        setRecreationalDrugsDetails(prev => {
          console.log(`Recreational Drugs details before: ${JSON.stringify(prev)}`);
          const newDetails = [...prev, formatted];
          console.log(`Recreational Drugs details after: ${JSON.stringify(newDetails)}`);
          return newDetails;
        });
        break;
    }
  }
  setIsModalVisible(false);
};


  const isButtonEnabled = () => {
    return (
      alcohol !== '' &&
      smoking !== '' &&
      narguileh !== '' &&
      caffeine !== '' &&
      energyDrinks !== '' &&
      recreationalDrugs !== ''
    );
  };

  const renderSubstanceSection = (
    label: string,
    stateValue: string,
    setStateValue: React.Dispatch<React.SetStateAction<string>>,
    details: string[],
    setDetails: React.Dispatch<React.SetStateAction<string[]>>,
    modalTypeKey: string,
    options: string[]
  ) => (
    <View style={styles.sectionWrapper}>
      <Text style={styles.blackText}>{label}</Text>
      <RoundRadioButtons
        options={['Yes', 'No']}
        selectedOption={stateValue}
        onSelect={(value) => {
  setStateValue(value);
  if (value === 'No') {
    setDetails([]); // Efface les entrées si "No" est sélectionné
  }
}}

      />
      <PlusIcon
        onPress={() => {
          if (modalTypeKey === 'Recreational Drugs') {
            setModalType('Recreational Drugs');
            setModalTitle('Substance Type');
            setModalTitle2('Enter Substance Details');
            setModalOptions(recreationalDrugOptions.map(option => ({ key: option, value: option })));
            setIsModalVisible(true);
          } else if (modalTypeKey === 'Narguileh') {
            setModalType('Narguileh');
            setModalTitle('Quantity');
            setModalTitle2('Enter Quantity');
            setModalOptions(narguilehOptions.map(option => ({ key: option, value: option })));
            setIsModalVisible(true);
          } else {
            openModal('Type', 'Quantity', modalTypeKey, options);
          }
        }}
        disabled={stateValue !== 'Yes'}
      />

      {details.length > 0 && (
  <View style={styles.entryList}>
    {details.map((entry, index) => (
      <View key={index} style={styles.entryContainer}>
        <Text style={styles.entryText}>{entry}</Text>
        <View style={styles.entryActions}>
          <TouchableOpacity onPress={() => handleEdit(index)} style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDetails(prev => prev.filter((_, i) => i !== index))}>
            <Text style={styles.deleteText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </View>
)}


    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Step7')}>
            <Image source={require('./Loginpics/vector.png')} style={styles.image} />
          </TouchableOpacity>
          <View>
            <Text style={styles.purpleText}>Alcohol</Text>
            <Text style={styles.purpleText}>& Substance use</Text>
          </View>
        </View>

        <View style={styles.columnWrapper}>
          {renderSubstanceSection('Alcohol', alcohol, setAlcohol, alcoholDetails, setAlcoholDetails, 'Alcohol', alcoholOptions)}
          {renderSubstanceSection('Smoking or Nicotine Use', smoking, setSmoking, smokingDetails, setSmokingDetails, 'Smoking', nicotineOptions)}
          {renderSubstanceSection('Narguileh', narguileh, setNarguileh, narguilehDetails, setNarguilehDetails, 'Narguileh', narguilehOptions)}
          {renderSubstanceSection('Caffeine', caffeine, setCaffeine, caffeineDetails, setCaffeineDetails, 'Caffeine', caffeineOptions)}
          {renderSubstanceSection('Energy Drinks', energyDrinks, setEnergyDrinks, energyDrinksDetails, setEnergyDrinksDetails, 'Energy Drinks', energyDrinkOptions)}
          {renderSubstanceSection('Recreational Substance Use', recreationalDrugs, setRecreationalDrugs, recreationalDrugsDetails, setRecreationalDrugsDetails, 'Recreational Drugs', recreationalDrugOptions)}
        </View>

        <View style={styles.submitWrapper}>
          <CustomButton
            text="Submit"
            onPress={() => navigation.navigate('Step7')}
            disabled={!isButtonEnabled()}
          />
        </View>
      </ScrollView>

      {/* Shared AlcoholModal (used for multiple types) */}
      <AlcoholModal
        visible={
          isModalVisible &&
          modalType !== 'Narguileh' &&
          modalType !== 'Recreational Drugs'
        }
        title={modalTitle}
        title2={modalTitle2}
        onClose={() => setIsModalVisible(false)}
        onSelect={handleModalSelection}
        options={modalOptions}
        placeholder="Select type"
        showType={true}
      />

      {/* Narguileh Modal */}
      <NarguilehModal
        visible={isModalVisible && modalType === 'Narguileh'}
        title={modalTitle}
        title2={modalTitle2}
        onClose={() => setIsModalVisible(false)}
        onSelect={handleModalSelection}
        showType={false}
      />

      {/* Recreational Drugs Modal */}
      <SubstanceModal
        visible={isModalVisible && modalType === 'Recreational Drugs'}
        title={modalTitle}
        title2={modalTitle2}
        onClose={() => setIsModalVisible(false)}
        onSelect={handleModalSelection}
        placeholder="Enter substance"
        showType={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 20, backgroundColor:'white',},
  topBar: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
    marginBottom: 70,
    backgroundColor:'white',
  },
  purpleText: {
    fontSize: 30,
    color: '#6B2A88',
    fontWeight: '600',
    textAlign: 'center',
  },
  image: {
    position: 'relative',
    right: 45,
  },
  blackText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 24,
    marginBottom: 10,
  },
  sectionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  columnWrapper: {
    flexDirection: 'column',
    gap: 50,
  },
  submitWrapper: {
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  entryList: {
    width: '100%',
    gap: 10,
    marginTop: 15,
  },
  entryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F2D6FF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  entryText: {
    color: '#6B2A88',
    fontWeight: '500',
  },
  entryActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#B766DA',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  editText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#B766DA',
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});

export default AlcoholAndSubstance;


