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
import SleepQualitySelector from './SleepQualitySelector';
import SleepModal from './SleepModal'; // Make sure this returns start & end times
import { useStep } from './StepContext';

const SleepAndFatigue = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const { setStepValue, stepNb, setStepNb } = useStep();

  const [sleepQuality, setSleepQuality] = useState<number>(0);
  const [fatigue, setFatigue] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [naps, setNaps] = useState<{ start: string; end: string }[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    console.log(
      `Deleting nap ${index + 1}:`,
      naps[index],
      'Current Sleep Quality:',
      sleepQuality
    );
    setNaps(naps.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    console.log(
      `Editing nap ${index + 1}:`,
      naps[index],
      'Current Sleep Quality:',
      sleepQuality
    );
    setEditIndex(index);
    setModalVisible(true);
  };

  const handleModalSubmit = (nap: { start: string; end: string }) => {
    if (editIndex !== null) {
      const updated = [...naps];
      updated[editIndex] = nap;
      setNaps(updated);
      setEditIndex(null);
    } else {
      setNaps([...naps, nap]);
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('./Loginpics/vector.png')} style={styles.image} />
          </TouchableOpacity>
          <View>
            <Text style={styles.purpleText}>Sleep and Fatigue</Text>
          </View>
        </View>

        <View style={styles.middlebar}>
          <View style={styles.item}>
            <Text style={styles.blackText}>Sleep Schedule</Text>

            <View style={{ flexDirection: 'row', gap: 20 }}>
              <TouchableOpacity style={styles.purplebox}>
                <Text style={styles.purpletextt}>Access Google Fit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.purplebox}>
                <Text style={styles.purpletextt}>Input Manually</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.item}>
            <Text style={styles.blackText}>Sleep Quality</Text>
            <SleepQualitySelector
              value={sleepQuality}
              onChange={setSleepQuality}
              getEmoji={(level) => {
                const emojis = ['🥱', '😴', '😓', '😟', '😐', '🙂', '😊', '😌', '😍', '🌟'];
                return emojis[level - 1];
              }}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.blackText}>Daytime fatigue</Text>
            <SleepQualitySelector
              value={fatigue}
              onChange={setFatigue}
              getEmoji={(level) => {
                const emojis = ['🌟', '😍', '😌', '😊', '🙂', '😐', '😟', '😓', '😴', '🥱'];
                return emojis[level - 1];
              }}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.blackText}>Nap</Text>
            <TouchableOpacity onPress={() => { setModalVisible(true); setEditIndex(null); }}>
              <Image source={require('./AlcoholPics/PlusButton.png')} />
            </TouchableOpacity>

            <View style={{ width: '90%', gap: 10 }}>
              {naps.map((nap, index) => (
                <View key={index} style={styles.napBox}>
                  <Text style={styles.napText}>Nap {index + 1} | {nap.start} - {nap.end}</Text>
                  <View style={styles.napButtons}>
                    <TouchableOpacity onPress={() => handleEdit(index)}>
                      <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(index)}>
                      <Text style={styles.deleteText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginVertical: 30 }}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              setStepValue('sleepFatigue', true);  // <-- set context here
              navigation.navigate('Step7');
              setStepNb(stepNb + 1);
            }}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {modalVisible && (
          <SleepModal
            visible={modalVisible}
            onClose={() => { setModalVisible(false); setEditIndex(null); }}
            onSubmit={handleModalSubmit}
            defaultData={editIndex !== null ? naps[editIndex] : null}
          />
        )}
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
    gap: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  purplebox: {
    backgroundColor: '#EABAFF',
    padding: 10,
    borderRadius: 30,
  },
  purpletextt: {
    color: '#6B2A88',
    fontSize: 16,
    fontWeight: '500',
  },
  napBox: {
    backgroundColor: '#EABAFF',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#6B2A88',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  napText: {
    color: '#6B2A88',
    fontWeight: '500',
  },
  napButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  editText: {
    textDecorationLine: 'underline',
    color: '#6B2A88',
    fontWeight: '600',
  },
  deleteText: {
    color: '#6B2A88',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SleepAndFatigue;
