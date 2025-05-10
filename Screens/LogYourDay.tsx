import React,{useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image,TextInput,TouchableOpacity,TouchableWithoutFeedback,KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types'; 
import MyCalendar from './MyCalendar';
import NoSeizures from './NoSeizures';
import Bottombar from './Bottombar';

const LogYourDay = () => {
    const navigation = useNavigation<AuthNavigationProp>();  
    
    return(
        <SafeAreaView style={styles.container}>
            <MyCalendar></MyCalendar>
            <NoSeizures></NoSeizures>

            <TouchableOpacity onPress={() => navigation.navigate('Step7')} style={styles.button}>
                        <Text style={styles.buttonText}>Log your day</Text>
                    </TouchableOpacity>

            <View style={{marginHorizontal:20,}}>
            <Bottombar></Bottombar>
            </View>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6B2A88',  // Background color
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25, // Round edges
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',  // You can adjust width as needed
        marginVertical: 10, // Spacing between buttons
    },
    buttonText: {
        color: 'white',  // Text color
        fontSize: 24,
        fontWeight: '500',
    },
    disabled: {
        backgroundColor: '#B0A0C3',  // Lighter background for disabled state
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        flexDirection:'column',
        gap:20,
    },
});

export default LogYourDay;