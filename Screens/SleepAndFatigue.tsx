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
import RoundRadioButtons from './RoundRadioButtons';

const SleepAndFatigue = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [stateValue, setStateValue] = useState<string | null>(null);
  const [details, setDetails] = useState<any[]>([]);

  const isAlcoholYes = stateValue === 'Yes';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('./Loginpics/vector.png')} style={styles.image} />
          </TouchableOpacity>
          <View>
            <Text style={styles.purpleText}>Alcohol</Text>
            <Text style={styles.purpleText}>& Substance use</Text>
          </View>
        </View>

        {/* Alcohol Section */}
        <View style={styles.middlebar}>
          <View style={styles.item}>
            <Text style={styles.blackText}>Alcohol</Text>
            <RoundRadioButtons
              options={['Yes', 'No']}
              selectedOption={stateValue ?? ''}
              onSelect={(value) => {
                setStateValue(value);
                if (value === 'No') {
                  setDetails([]);
                }
              }}
            />

            {/* Plus Button - only active if "Yes" is selected */}
            <TouchableOpacity
              disabled={!isAlcoholYes}
              style={[
                styles.shadowButton,
                !isAlcoholYes && styles.disabledButton,
              ]}
              onPress={() => {
                // Your logic for opening AlcoholModal, etc.
                console.log('Open Alcohol Modal');
              }}
            >
              <Image
                source={require('./AlcoholPics/PlusButton.png')}
                style={[
                  styles.plusIcon,
                  !isAlcoholYes && { opacity: 0.4 },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBar: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
    marginBottom: 70,
    backgroundColor: 'white',
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
  middlebar: {
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  disabledButton: {
    shadowColor: 'transparent',
    backgroundColor: '#f2f2f2',
  },
  plusIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default SleepAndFatigue;
