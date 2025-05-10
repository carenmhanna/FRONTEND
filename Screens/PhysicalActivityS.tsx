import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types'; 
import RoundRadioButtons from './RoundRadioButtons';
import PlusIcon from './PlusIcon';
import CustomButton from './CustomButton';
import PhysicalModal from './PhysicalModal';

const PhysicalActivityS = () => {
    const navigation = useNavigation<AuthNavigationProp>();  
    const [exercise, setExercise] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

// Function to open the modal
const openModal = () => setIsModalVisible(true);

// Function to close the modal
const closeModal = () => setIsModalVisible(false);

    // Check if the button should be disabled
    const isButtonDisabled = exercise === '';

    // Function to open the modal

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1,backgroundColor:'white', }}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.navigate('Step7')}>
                        <Image source={require("./Loginpics/vector.png")} style={styles.image} />
                    </TouchableOpacity>
                    <Text style={styles.purpleText}>Physical Activity</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 100, marginTop: 30 }}>
                    <View style={{ flexDirection: "column", gap: 30, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.blackText}>Did You Exercise Today?</Text>
                        <RoundRadioButtons
                            options={['Yes', 'No']}
                            selectedOption={exercise}
                            onSelect={(option) => setExercise(option)}
                        />
                    </View>

                    {/* Conditionally render the plus icon when "Yes" is selected */}
                    {exercise === 'Yes' && (
                        <View style={styles.plusIconContainer}>
                            <Text style={styles.purpleText2}>Add Workout(s)</Text>
                            <PlusIcon
                                onPress={openModal} // Open modal when plus icon is clicked
                                disabled={false} // Check the alcohol state
                            />
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Use the PhysicalModal component here */}
            <PhysicalModal
  isVisible={isModalVisible}
  onClose={closeModal}
/>

            <View style={{ width: "70%", justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
                <CustomButton 
                    text="Submit" 
                    onPress={() => {}} 
                    disabled={isButtonDisabled}  // Disable button if exercise is empty
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    topBar: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginTop: 15,
        marginBottom: 30,
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
    blackText: {
        color: 'black',
        fontWeight: 500,
        fontSize: 25,
    },
    plusIconContainer: {
        marginTop: 20,  // Add space above the plus icon
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
    },
    plusText: {
        fontSize: 18,
        color: '#6B2A88',  // Adjust the color and styling as needed
        marginBottom: 10,  // Add margin below the text to space it out from the icon
    },
});

export default PhysicalActivityS;
