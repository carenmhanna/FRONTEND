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
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types';
import Bottombar from './Bottombar';
import Dropdownlong from './Dropdownlong';
import CheckboxWithLabel from './CheckboxWithLabel';

const { width } = Dimensions.get('window');

const Signuptwo = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [focalWithAwareness, setFocalWithAwareness] = useState(false);
  const [focalWithoutAwareness, setFocalWithoutAwareness] = useState(false);
  const [generalized, setGeneralized] = useState(false);
  const [nonEpileptic, setNonEpileptic] = useState(false);

  const navigation = useNavigation<AuthNavigationProp>();

  const currentYear = new Date().getFullYear();
  const daysList = Array.from({ length: 31 }, (_, i) => ({
    key: (i + 1).toString(),
    value: (i + 1).toString(),
  }));
  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ].map((month, i) => ({ key: `${i + 1}`, value: month }));
  const yearsList = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => {
    const year = (currentYear - i).toString();
    return { key: year, value: year };
  });

  const genderList = ['Male', 'Female', 'Other', 'Prefer not to say'].map((g, i) => ({
    key: `${i}`,
    value: g,
  }));

  const isAnyCheckboxChecked =
    focalWithAwareness || focalWithoutAwareness || generalized || nonEpileptic;
  const isFormValid = day && month && year && gender && isAnyCheckboxChecked;
  const selectedSeizureTypes: string[] = [];

if (focalWithAwareness) selectedSeizureTypes.push('Focal With Loss of Awareness');
if (focalWithoutAwareness) selectedSeizureTypes.push('Focal Without Loss of Awareness');
if (generalized) selectedSeizureTypes.push('Generalized');
if (nonEpileptic) selectedSeizureTypes.push('Non-Epileptic');

console.log('Selected Seizure Types:', selectedSeizureTypes);


  const selectedTypes = [
    focalWithAwareness && 'Focal With Loss of Awareness',
    focalWithoutAwareness && 'Focal Without Loss of Awareness',
    generalized && 'Generalized',
    nonEpileptic && 'Non-Epileptic',
  ]
    .filter(Boolean)
    .join(', ');

  const NextButton = ({
    day,
    month,
    year,
    gender,
    type,
    isButtonDisabled,
    onPress,
  }: {
    day: string;
    month: string;
    year: string;
    gender: string;
    type: string;
    isButtonDisabled: boolean;
    onPress?: () => void;
  }) => {
    return (
      <TouchableOpacity
        style={[styles.nextButton, isButtonDisabled && styles.disabledButton]}
        onPress={onPress}
        disabled={isButtonDisabled}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    );
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
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
              style={styles.backButton}
            >
              <Image
                source={require('./Signuppics/vector.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={[styles.text, { fontSize: width * 0.08 }]}>
              New Account
            </Text>
          </View>

          <View style={styles.bar}>
            <Image source={require('./Signuppics/one.png')} style={styles.stepImage} />
            <Image source={require('./Signuppics/line.png')} style={styles.stepLine} />
            <Image source={require('./Signuppics/two.png')} style={styles.stepImage} />
            <Image source={require('./Signuppics/line.png')} style={styles.stepLine} />
            <Image source={require('./Signuppics/three.png')} style={styles.stepImage} />
          </View>

          <View style={styles.middlecontainer}>
            <Text style={styles.blacktext}>Date of Birth</Text>
            <View style={styles.dropdownRow}>
              <Dropdownlong placeholder="Day" options={daysList} setSelected={setDay} />
              <Dropdownlong placeholder="Month" options={monthsList} setSelected={setMonth} />
              <Dropdownlong placeholder="Year" options={yearsList} setSelected={setYear} />
            </View>

            <View style={styles.dropdownSection2}>
              <Text style={styles.blacktext}>Gender</Text>
              <Dropdownlong placeholder="Choose Gender" options={genderList} setSelected={setGender} />
            </View>

            <View style={styles.dropdownSection}>
              <Text style={styles.blacktext}>Type of Seizure</Text>
              <CheckboxWithLabel
                label="Focal With Loss of Awareness"
                checked={focalWithAwareness}
                onToggle={() => setFocalWithAwareness(!focalWithAwareness)}
              />
              <CheckboxWithLabel
                label="Focal Without Loss of Awareness"
                checked={focalWithoutAwareness}
                onToggle={() => setFocalWithoutAwareness(!focalWithoutAwareness)}
              />
              <CheckboxWithLabel
                label="Generalized"
                checked={generalized}
                onToggle={() => setGeneralized(!generalized)}
              />
              <CheckboxWithLabel
                label="Non-Epileptic"
                checked={nonEpileptic}
                onToggle={() => setNonEpileptic(!nonEpileptic)}
              />
            </View>

            <View style={styles.buttonContainer}>
              <NextButton
                day={day}
                month={month}
                year={year}
                gender={gender}
                type={selectedTypes}
                isButtonDisabled={!isFormValid}
                onPress={() => {
  const selectedSeizureTypes: string[] = [];

  if (focalWithAwareness) selectedSeizureTypes.push('Focal With Loss of Awareness');
  if (focalWithoutAwareness) selectedSeizureTypes.push('Focal Without Loss of Awareness');
  if (generalized) selectedSeizureTypes.push('Generalized');
  if (nonEpileptic) selectedSeizureTypes.push('Non-Epileptic');

  console.log('Form Submission:');
  console.log('Date of Birth:', `${day}-${month}-${year}`);
  console.log('Gender:', gender);
  console.log('Selected Seizure Types:', selectedSeizureTypes);

  navigation.navigate('Signup3', { gender });
}}

              />
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
    fontSize: width * 0.065,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
  },
  middlecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: width * 0.08,
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
  backButton: {
    position: 'relative',
    right: 30,
  },
  dropdownRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: '100%',
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
  nextButtonText: {
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#6B2A88',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 10,
    width: '50%',
  },
  disabledButton: {
    backgroundColor: '#d3d3d3',
  },
  buttonContainer: {
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain',
  },
  stepImage: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain',
  },
  stepLine: {
    width: width * 0.2,
    height: 17,
    resizeMode: 'contain',
  },
});

export default Signuptwo;
