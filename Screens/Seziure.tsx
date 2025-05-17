import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types';

const { width } = Dimensions.get('window');

const Seizure = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [noPressed, setNoPressed] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
      <View style={styles.circle}>
        {noPressed ? (
          <>
            <Text style={styles.txt}>No seizure today.</Text>
            <Text style={styles.txt}>Don’t forget to</Text>
            <Text style={styles.txt}>complete your logs</Text>
            <Text style={styles.txt}>of the day!</Text>

            <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
              <TouchableOpacity
                style={[styles.whitebutton, { width: width * 0.38, height: width * 0.18, borderRadius: (width * 0.18) / 2 }]}
                onPress={() => navigation.navigate('Step7')}
              >
                <Text style={styles.whitetxt}>Log Your Day</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.txt}>Did you experience</Text>
            <Text style={styles.txt}>a seizure</Text>
            <Text style={styles.today}>Today?</Text>

            <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
              <TouchableOpacity
                style={styles.whitebutton}
                onPress={() => navigation.navigate('SeizureTrackingS')}
              >
                <Text style={styles.whitetxt}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.whitebutton}
                onPress={() => setNoPressed(true)}
              >
                <Text style={styles.whitetxt}>No</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  whitebutton: {
    backgroundColor: '#EABAFF',
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: (width * 0.12) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  today: {
    fontWeight: '500',
    fontSize: 48,
    marginTop: 10,
    color: '#EABAFF',
  },
  circle: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: (width * 0.75) / 2,
    backgroundColor: '#6B2A88',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontWeight: '500',
    fontSize: 24,
    color: '#EABAFF',
    textAlign: 'center',
  },
  whitetxt: {
    fontWeight: '500',
    fontSize: 22,
    color: '#6B2A88',
  },
});

export default Seizure;
