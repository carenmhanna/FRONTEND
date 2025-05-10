import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types'; 
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';

const Bottombar = () => {    
    const navigation = useNavigation<AuthNavigationProp>();  
  
    return(
        <View style={styles.bar}>
          <TouchableOpacity onPress={() => navigation.navigate('Login1')}>
          <Image source={require('./Bottombarpics/Home.png')} style={styles.image}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login1')}>
          <Image source={require('./Bottombarpics/Calendar.png')} style={styles.image}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login1')}>
          <Image source={require('./Bottombarpics/Contact.png')} style={styles.image}/>
          </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  image:{
    height:24,
    width:24,
  },
  bar:{
    backgroundColor:'#6B2A88',
    flexDirection:'row',
    gap:120,
    borderRadius:20,
    paddingHorizontal:30,
    paddingVertical:20,
    width:'100%',

  },
});

export default Bottombar;