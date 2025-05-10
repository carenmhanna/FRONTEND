
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types'; 
import CustomButton from './CustomButton';

const MedicationAdherenceS = () => {
    const navigation = useNavigation<AuthNavigationProp>();  


    
    return(
        <SafeAreaView style={styles.container}>

        <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Step7')}>
        <Image source={require("./Loginpics/vector.png")} style={styles.image}/>
        </TouchableOpacity > 
        <Text style={styles.purpleText}>Food and Diet</Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 30, marginTop: 30 }}>
        <Text style={styles.blackText}>Meal Frequency</Text>
        
                    
        </View>




        <View style={{width:"70%",justifyContent:'center',alignSelf:'center',marginTop:30,}}>
        <CustomButton text="Submit" onPress={() => {}} />
        </View>


        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 80,
    },
    topBar: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginTop: 15,
    },
    purpleText: {
        fontSize: 30,
        color: '#6B2A88',
        fontWeight: '600',
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
    purple:{
        color: '#B766DA',
        fontWeight: 500,
        fontSize: 25,
    },
    underlinedtext:{
        fontSize:12,
        color:'#826E8E',
        fontWeight:600,
    },

});

export default MedicationAdherenceS;