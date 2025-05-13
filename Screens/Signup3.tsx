import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { AuthNavigationProp } from '../types';
import Bottombar from './Bottombar';
import Dropdownlong from './Dropdownlong';
import SearchComponent from './SearchComponent';
import Get_Started from './Get_started';

// Route type
type Signup3RouteProp = RouteProp<{ Signup3: { gender?: string } }, 'Signup3'>;

const Signup3 = () => {
  const route = useRoute<Signup3RouteProp>();
  const navigation = useNavigation<AuthNavigationProp>();

  const gender = route?.params?.gender ?? '1';

  const [period, setPeriod] = useState(''); // for Menstrual Cycle
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // for medication
  const [frequency, setFrequency] = useState(''); // for Frequency of Medication
  const [isMedicationSelected, setIsMedicationSelected] = useState(false); // to check if medication is selected

  const daysList: string[] = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  const handleMedicationSelection = (selectedMedications: string[]) => {
    setSelectedOptions(selectedMedications);
    setIsMedicationSelected(selectedMedications.length > 0);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.topView}>
            <TouchableOpacity onPress={() => navigation.navigate('Signuptwo')}>
              <Image
                source={require('./Signuppics/vector.png')}
                style={{ position: 'relative', right: 80 }}
              />
            </TouchableOpacity>
            <Text style={styles.text}>New Account</Text>
          </View>

          <View style={styles.bar}>
            <Image source={require('./Signuppics/two.png')} />
            <Image source={require('./Signuppics/linef.png')} />
            <Image source={require('./Signup2pics/two.png')} />
            <Image source={require('./Signuppics/linef.png')} />
            <Image source={require('./Signup3pics/three.png')} />
          </View>

          <View style={styles.middlecontainer}>
            <Text style={styles.blacktext}>Name of Medication</Text>
            <View style={styles.dropdownRow}>
              <SearchComponent setSelectedOptions={handleMedicationSelection} />
            </View>

            {gender !== '1' && (
              <View style={styles.dropdownSection}>
                <Text style={styles.blacktext}>Menstrual Cycle Status</Text>
                <Dropdownlong
                  placeholder="Choose Type"
                  options={[
                    { key: 'Regular', value: 'Regular' },
                    { key: 'Irregular', value: 'Irregular' },
                    { key: 'Menopause', value: 'Menopause' },
                  ]}
                  setSelected={setPeriod}
                />
              </View>
            )}

            {/* Show selected medications and frequency */}
            {isMedicationSelected && frequency && (
              <View style={styles.selectedInfoContainer}>
                <Text style={styles.selectedText}>Selected Medications:</Text>
                {selectedOptions.map((medication, index) => (
                  <Text key={index} style={styles.medicationText}>
                    {medication} - {frequency}
                  </Text>
                ))}
              </View>
            )}

            <View style={styles.buttonContainer}>
              <Get_Started
                selectedOptions={selectedOptions}
                frequency={frequency}
                period={period}
              />
            </View>
          </View>
        </ScrollView>

        {/* Bottom bar fixed */}
        <View style={styles.bottomBarContainer}>
          <Bottombar />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Adjusted for fixed bottom bar
    alignItems: 'center',
  },
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
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 30,
    color: '#6B2A88',
    fontWeight: '600',
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
    marginBottom: 0,
  },
  dropdownRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  dropdownSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: '100%',
  },
  selectedInfoContainer: {
    marginTop: 30,
    width: '90%',
    backgroundColor: '#EABAFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6B2A88',
  },
  medicationText: {
    fontSize: 18,
    color: '#6B2A88',
  },
  buttonContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Signup3;
