import React, { useState, useEffect } from 'react';
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
    const [workouts, setWorkouts] = useState<{ type: string; duration: string }[]>([]);

    // Function to open the modal
    const openModal = () => setIsModalVisible(true);

    // Function to close the modal
    const closeModal = () => setIsModalVisible(false);

    // Check if the button should be disabled
    const isButtonDisabled = exercise === '';

    // Log workouts whenever the list changes
    useEffect(() => {
        console.log('Workouts List:', workouts);
    }, [workouts]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1, backgroundColor: 'white', width: '100%' }}>
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
                                disabled={false} // Check the exercise state
                            />
                        </View>
                    )}

                    {/* Display selected workouts */}
                    {workouts.length > 0 && (
                        <View style={styles.workoutsContainer}>
                            <Text style={styles.purpleText2}>Selected Workouts</Text>
                            {workouts.map((workout, index) => (
                                <View key={index} style={styles.workoutItem}>
                                    <Text style={styles.workoutText}>{`${workout.type} | ${workout.duration}`}</Text>
                                    <TouchableOpacity onPress={() => {
                                        setWorkouts(workouts.filter((_, i) => i !== index)); // Remove workout
                                    }}>
                                        <Text style={styles.deleteText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Use the PhysicalModal component here */}
            <PhysicalModal
                visible={isModalVisible}
                onClose={closeModal}
                onSelect={(entry: any) => {
                    console.log(entry); // Add this log to check the entry being passed
                    const formattedEntry = {
                        type: entry.type || entry.value || entry.name || '',
                        duration: entry.duration || '',
                    };
                    setWorkouts((prev) => [...prev, formattedEntry]);
                    closeModal();
                }}
                title="Type of Exercise"
                title2="Duration"
                options={[
                    { key: 'walking', value: 'Walking' },
                    { key: 'running', value: 'Running' },
                    { key: 'swimming', value: 'Swimming' },
                    { key: 'cycling', value: 'Cycling' },
                    { key: 'yoga', value: 'Yoga' },
                ]}
                placeholder="Select Exercise Type"
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
        width: '100%',
        backgroundColor: 'white',
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
        fontWeight: '500',
        fontSize: 25,
    },
    plusIconContainer: {
        marginTop: 20,  // Add space above the plus icon
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
    },
    workoutsContainer: {
        marginTop: 20,
        alignItems: 'center',
        gap: 15,
    },
    workoutItem: {
        backgroundColor: '#D1C4E9',  // Light purple
        padding: 10,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    workoutText: {
        color: '#6B2A88',
        fontWeight: '500',
    },
    deleteText: {
        color: '#FF6347',
        fontWeight: '600',
    },
});

export default PhysicalActivityS;
