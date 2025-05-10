import React, { useState, useRef } from 'react';
import { View, Text, PanResponder, StyleSheet, Dimensions, PanResponderGestureState, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import RoundRadioButtons from './RoundRadioButtons';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';
import type { AuthNavigationProp } from '../types';

const MentalHealth = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [stressLevel, setStressLevel] = useState<number>(0);
  const [moodLevel, setMoodLevel] = useState<number>(0);
  const [emotionalEvent, setEmotionalEvent] = useState('');
  const [emotionValue, setEmotionValue] = useState<number>(0);
  const sliderWidth = Dimensions.get('window').width * 0.6;
  const stepWidth = sliderWidth / 10;

  const handlePanResponderMove = (setLevel: React.Dispatch<React.SetStateAction<number>>, sliderWidth: number, stepWidth: number) => {
    return (_: any, gestureState: PanResponderGestureState) => {
      const newPosition = Math.max(0, Math.min(sliderWidth, gestureState.moveX - (Dimensions.get('window').width * 0.2)));
      const newLevel = Math.round(newPosition / stepWidth);
      setLevel(newLevel);
    };
  };

  const stressPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: handlePanResponderMove(setStressLevel, sliderWidth, stepWidth),
      onPanResponderRelease: () => {},
    })
  ).current;

  const moodPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: handlePanResponderMove(setMoodLevel, sliderWidth, stepWidth),
      onPanResponderRelease: () => {},
    })
  ).current;

  const eventPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: handlePanResponderMove(setEmotionValue, sliderWidth, stepWidth),
      onPanResponderRelease: () => {},
    })
  ).current;

  // Mood Level emoji (starts with angry face)
  const getMoodEmoji = (level: number): string => {
    const emojis = ['😡', '😠', '😟', '😕', '😐', '🙂', '😊'];
    return emojis[Math.min(level, emojis.length - 1)];
  };

  // Stress Level emoji (starts with happy face)
  const getStressEmoji = (level: number): string => {
    const emojis = ['😊', '🙂', '😐', '😕', '😟', '😠', '😡'];
    return emojis[Math.min(level, emojis.length - 1)];
  };
  
  // Event Severity emoji (starts with happy face)
  const getEventEmoji = (level: number): string => {
    const emojis = ['😊', '🙂', '😐', '😕', '😟', '😠', '😡'];
    return emojis[Math.min(level, emojis.length - 1)];
  };

  const isButtonEnabled = () => {
    return emotionalEvent !== '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Step7')}>
          <Image source={require("./Loginpics/vector.png")} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.purpleText}>Mental Health</Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Mood Level */}
        <View style={styles.inputSection}>
          <Text style={styles.title}>Mood Level</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.track}>
              <View style={[styles.activeTrack, { width: `${moodLevel * 10}%` }]} />
            </View>
            <View 
              style={[styles.thumb, { left: `${moodLevel * 10}%` }]} 
              {...moodPanResponder.panHandlers}
            >
              <Text style={styles.thumbText}>{getMoodEmoji(moodLevel)}</Text>
            </View>
            <View style={styles.labelsContainer}>
              {[...Array(11)].map((_, i) => (
                <Text key={i} style={styles.label}>{i}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* Stress Level */}
        <View style={styles.inputSection}>
          <Text style={styles.title}>Stress Level</Text>
          <View style={styles.sliderContainer}>
            <View style={styles.track}>
              <View style={[styles.activeTrack, { width: `${stressLevel * 10}%` }]} />
            </View>
            <View 
              style={[styles.thumb, { left: `${stressLevel * 10}%` }]} 
              {...stressPanResponder.panHandlers}
            >
              <Text style={styles.thumbText}>{getStressEmoji(stressLevel)}</Text>
            </View>
            <View style={styles.labelsContainer}>
              {[...Array(11)].map((_, i) => (
                <Text key={i} style={styles.label}>{i}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* Emotional Event */}
        <View style={styles.inputSection}>
          <Text style={styles.title}>Significant Emotional Event Today</Text>
          <RoundRadioButtons
            options={['Yes', 'No']}
            selectedOption={emotionalEvent}
            onSelect={setEmotionalEvent}
          />
        </View>

        {/* Event Severity */}
        {emotionalEvent === 'Yes' && (
          <View style={styles.inputSection}>
            <Text style={styles.purpleText2}>Event Severity</Text>
            <View style={styles.sliderContainer}>
              <View style={styles.track}>
                <View style={[styles.activeTrack, { width: `${emotionValue * 10}%` }]} />
              </View>
              <View 
                style={[styles.thumb, { left: `${emotionValue * 10}%` }]} 
                {...eventPanResponder.panHandlers}
              >
                <Text style={styles.thumbText}>{getEventEmoji(emotionValue)}</Text>
              </View>
              <View style={styles.labelsContainer}>
                <Text style={styles.label}>No Stress</Text>
                <Text style={styles.label}>Moderate</Text>
                <Text style={styles.label}>Extremely Stressful</Text>
              </View>
            </View>
          </View>
        )}

        {/* Submit Button */}
        <View style={styles.inputSection}>
          <CustomButton
            text="Submit"
            onPress={() => navigation.navigate('Step7')}
            disabled={!isButtonEnabled()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
    marginBottom:30,
  },
  purpleText: {
    fontSize: 30,
    color: '#6B2A88',
    fontWeight: '600',
  },
  purpleText2: {
    fontSize: 20,
    color: '#B766DA',
    fontWeight: '500',
  },
  image: {
    position: 'relative',
    right: 45,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 70,
    paddingVertical: 20,
  },
  inputSection: {
    width: '80%',
    alignItems: 'center',
    gap: 10,
  },
  sliderContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    width: '100%',
    height: 10,
    backgroundColor: '#E9B7FF',
    borderRadius: 5,
    position: 'relative',
  },
  activeTrack: {
    height: 10,
    backgroundColor: '#893FAA',
    borderRadius: 5,
  },
  thumb: {
    position: 'absolute',
    top: -10,
    width: 30,
    height: 30,
    backgroundColor: '#E9B7FF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#B09ACD',
  },
  thumbText: {
    fontSize: 18,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: '#B766DA',
  },
});

export default MentalHealth;
