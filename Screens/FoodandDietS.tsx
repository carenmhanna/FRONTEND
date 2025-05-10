import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types'; 
import NumberBox from './Numberbox';
import Liters from './liters';
import CustomButton from './CustomButton';
import Meals from './meals';

const FoodandDietS = () => {
    const navigation = useNavigation<AuthNavigationProp>();  


    
    return(
        <SafeAreaView style={styles.container}>

        <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Step7')}>
        <Image source={require("./Loginpics/vector.png")} style={styles.image}/>
        </TouchableOpacity>
        <Text style={styles.purpleText}>Food and Diet</Text>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 30, marginTop: 30 }}>
        <Text style={styles.blackText}>Meal Frequency</Text>

        <View style={styles.boxContainer}>
        <NumberBox />
        <Meals/>
        </View>
                    
        </View>


        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 30, marginTop: 30 }}>
        <Text style={styles.blackText}>Water Intake</Text>

        <View style={styles.boxContainer}>
        <NumberBox />
        <Liters/>
        </View>
                    
        </View>


        




        <View style={{width:"70%",justifyContent:'center',alignSelf:'center',marginTop:30,}}>
        <CustomButton text="Submit" onPress={() => {}} disabled={true}/>
        </View>


        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Make the content take available space
        alignItems: 'center',
        paddingHorizontal: 20,
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
    bottomContainer: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20, 
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#EABAFF',
        borderRadius: 20,
        padding: 30,
        width: '55%', 
    },
});

export default FoodandDietS;
