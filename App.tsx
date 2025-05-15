import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Optional: optimize navigation with react-native-screens
import { enableScreens } from 'react-native-screens';
enableScreens();

// Import screens
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import Step7 from './Screens/Step7';
import Signup3 from './Screens/Signup3';
import Login1 from './Screens/Login1';
import MedicationAdherenceS from './Screens/MedicationAdherenceS';
import MenstrualCycleS from './Screens/MenstrualCycleS';
import PhysicalActivityS from './Screens/PhysicalActivityS';
import FoodandDietS from './Screens/FoodandDietS';
import AlcoholAndSubstance from './Screens/AlcoholAndSubstance';
import SeizureTrackingS from './Screens/SeizureTracking';
import NoSeizure from './Screens/NoSeizure';
import MentalHealth from './Screens/MentalHealth';
import Seizure from './Screens/Seziure';
import YesSeizure from './Screens/YesSeizure';
import Signuptwo from './Screens/Signuptwo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Signuptwo" component={Signuptwo} />
          <Stack.Screen name="Signup3" component={Signup3} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Login1" component={Login1} />
          <Stack.Screen name="MenstrualCycleS" component={MenstrualCycleS} />
          <Stack.Screen name="YesSeizure" component={YesSeizure} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="PhysicalActivityS" component={PhysicalActivityS} />
          <Stack.Screen name="FoodandDietS" component={FoodandDietS} />
          <Stack.Screen name="MedicationAdherenceS" component={MedicationAdherenceS} />
          <Stack.Screen name="MentalHealth" component={MentalHealth} />
          <Stack.Screen name="AlcoholAndSubstance" component={AlcoholAndSubstance} />
          <Stack.Screen name="Step7" component={Step7} />
          <Stack.Screen name="NoSeizure" component={NoSeizure} />
          <Stack.Screen name="Seizure" component={Seizure} />
          <Stack.Screen name="SeizureTrackingS" component={SeizureTrackingS} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
