import React,{useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image,TextInput,TouchableOpacity,TouchableWithoutFeedback,KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types'; 
import MyCalendar from './MyCalendar';
import NoSeizures from './NoSeizures';
import Bottombar from './Bottombar';

const NoSeizure= () => {
    const navigation = useNavigation<AuthNavigationProp>();  
    
    return(
        <SafeAreaView style={styles.container}>
            <MyCalendar></MyCalendar>
            <NoSeizures></NoSeizures>

                <TouchableOpacity onPress={() => navigation.navigate('Step7')}>
                            <Image source={require('./SOSpic.png')} />
                            </TouchableOpacity>

            
            <View style={{marginHorizontal:20,}}>
            <Bottombar></Bottombar>
            </View>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        flexDirection:'column',
        gap:20,
    },
});

export default NoSeizure;