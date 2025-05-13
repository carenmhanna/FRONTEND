import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Image, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types';
import MyCalendar from './MyCalendar';
import SeizureComp from './SeizureComp';
import Bottombar from './Bottombar';

const YesSeizure = () => {
    const navigation = useNavigation<AuthNavigationProp>();  

    return (
        <SafeAreaView style={styles.container}>
            <MyCalendar onDateSelect={function (date: string): void {
            }} />

            <View style={styles.seizureContainer}>
                <SeizureComp />
            </View>


            <View style={styles.bottomBarWrapper}>
                <Bottombar />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Space out the components
        alignItems: 'center',
        padding: 20,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    seizureContainer: {
        flex: 1,
        justifyContent: 'center', // Ensure that Seizure takes enough space
        alignItems: 'center',
        marginBottom: 50, // Add margin at the bottom to give space above the Bottombar
    },
    bottomBarWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: Platform.OS === 'ios' ? 15 : 10, // Adjust padding based on platform
    },
});

export default YesSeizure;
