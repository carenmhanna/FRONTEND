import React from 'react';
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types'; 
import Icons from './Icons';
import Bottombar from './Bottombar';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const Step7 = () => {
  const navigation = useNavigation<AuthNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
          <Text style={styles.logText}>You’ve completed <Text style={styles.completedText}>0/7</Text> logs today</Text>
          <Image source={require('./Stepspics/Step7.png')} style={styles.stepImage} />
          <Text style={styles.title}>Daily Health Tracker</Text>
        </View>

        <View style={styles.row}>
          <Icons text1="Sleep" text2="and Fatigue" imageSource={require('./Iconpics/bed.png')} destination="MentalHealth" />
          <Icons text1="Medication" text2="Adherence" imageSource={require('./Iconpics/medication.png')} destination="MedicationAdherenceS" />
        </View>

        <View style={styles.row}>
          <Icons text1="Mental" text2="Health" imageSource={require('./Iconpics/smily.png')} destination="MentalHealth" />
          <Icons text1="Alcohol &" text2="Substance Use" imageSource={require('./Iconpics/alcohol.png')} destination="AlcoholAndSubstance" />
        </View>

        <View style={styles.row}>
          <Icons text1="Physical" text2="Activity" imageSource={require('./Iconpics/sport.png')} destination="PhysicalActivityS" />
          <Icons text1="Food" text2="and Diet" imageSource={require('./Iconpics/food.png')} destination="FoodandDietS" />
        </View>

        <View style={[styles.row, { flexWrap: 'wrap' }]}>
          <Icons text1="Menstrual" text2="Cycle" imageSource={require('./Iconpics/pregnancy.png')} destination="MenstrualCycleS" />
        </View>
        
        {/* Keep the Bottombar at the bottom */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      <Bottombar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  scrollContent: {
    flexGrow: 1,
    gap: height * 0.02, // Responsive gap between sections
    paddingBottom: height * 0.05, // Add padding at the bottom for spacing before bottom bar
    backgroundColor:'white',
  },
  logText: {
    marginTop: height * 0.01, // Adjust top margin
    marginBottom: height * 0.01, // Adjust bottom margin
    fontSize: width * 0.05, // Responsive font size
  },
  completedText: {
    color: '#6B2A88',
  },
  stepImage: {
    width: width * 0.7, // Adjusted the width to make the image smaller
    height: height * 0.05, // Adjusted the height to fit better
    marginBottom: height * 0.02, // Space after the image
  },
  title: {
    fontWeight: '600',
    color: '#6B2A88',
    fontSize: width * 0.06, // Responsive font size for the title
    marginTop: height * 0.02,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.03, // Adjust margin bottom to provide space between rows
  },
  bottomSpacing: {
    height: height * 0.1, // Add some extra space at the bottom to avoid overlap with the bottom bar
  },
});

export default Step7;
