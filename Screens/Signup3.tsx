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
import Dropdownlong2 from './Dropdownlong2';
import SearchComponent from './SearchComponent';
import Get_Started from './Get_started';

// Route type
type Signup3RouteProp = RouteProp<{ Signup3: { gender?: string } }, 'Signup3'>;

const Signup3 = () => {
  const route = useRoute<Signup3RouteProp>();
  const navigation = useNavigation<AuthNavigationProp>();

  // Safely access gender with fallback
  const gender = route?.params?.gender ?? '1';

  const [period, setPeriod] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [frequency, setFrequency] = useState('');
  const [isMedicationSelected, setIsMedicationSelected] = useState(false);

  // Debugging
  console.log('Selected Gender:', gender);

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
      <SafeAreaView style={{ flex: 1 ,backgroundColor:'white',}}>
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
            <Image source={require('./Signuppics/one.png')} />
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

            {isMedicationSelected && (
              <View style={styles.dropdownSection2}>
                <Text style={styles.blacktext}>Frequency of Medication</Text>
                <Dropdownlong2
                  placeholder="Choose Frequency"
                  options={['Daily', 'As needed', 'Rarely']}
                  setSelected={setFrequency}
                />
              </View>
            )}

            {gender !== '1' && (
              <View style={styles.dropdownSection}>
                <Text style={styles.blacktext}>Menstrual Cycle Status</Text>
                <Dropdownlong2
                  placeholder="Choose Type"
                  options={['Regular', 'Irregular', 'Menopause']}
                  setSelected={setPeriod}
                />
              </View>
            )}

            <View
              style={{
                marginTop: 40,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Get_Started
                selectedOptions={selectedOptions}
                frequency={frequency}
                period={period}
              />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginTop: 40 }}>
              <Bottombar />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,
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
  dropdownSection2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
});

export default Signup3;
