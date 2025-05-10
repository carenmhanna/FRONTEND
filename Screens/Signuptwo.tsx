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
import Dropdownlong2 from './Dropdownlong2';
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
  const daysList = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const yearsList = Array.from({ length: currentYear - 1900 + 1 }, (_, i) =>
    (currentYear - i).toString()
  );

  const isAnyCheckboxChecked =
    focalWithAwareness || focalWithoutAwareness || generalized || nonEpileptic;
  const isFormValid = day && month && year && gender && isAnyCheckboxChecked;

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
    const handlePress = () => {
      if (onPress) {
        onPress();
      }
    };

    return (
      <TouchableOpacity
        style={[styles.nextButton, isButtonDisabled && styles.disabledButton]}
        onPress={handlePress}
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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.topView}>
            <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
              <Image
                source={require('./Signuppics/vector.png')}
                style={{ position: 'relative', right: width * 0.2 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.text}>New Account</Text>
          </View>

          <View style={styles.bar}>
            <Image source={require('./Signuppics/one.png')} resizeMode="contain" />
            <Image source={require('./Signuppics/linef.png')} resizeMode="contain" />
            <Image source={require('./Signup2pics/two.png')} resizeMode="contain" />
            <Image source={require('./Signuppics/line.png')} resizeMode="contain" />
            <Image source={require('./Signuppics/three.png')} resizeMode="contain" />
          </View>

          <View style={styles.middlecontainer}>
            <Text style={styles.blacktext}>Date of Birth</Text>
            <View style={styles.dropdownRow}>
              <Dropdownlong2 placeholder="Day" options={daysList} setSelected={setDay} />
              <Dropdownlong2 placeholder="Month" options={monthsList} setSelected={setMonth} />
              <Dropdownlong2 placeholder="Year" options={yearsList} setSelected={setYear} />
            </View>

            <View style={styles.dropdownSection2}>
              <Text style={styles.blacktext}>Gender</Text>
              <Dropdownlong2
                placeholder="Choose Gender"
                options={['Male', 'Female', 'Other', 'Prefer not to say']}
                setSelected={setGender}
              />
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
                  navigation.navigate('Signup3', { gender });
                }}
              />
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
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
});

export default Signuptwo;
