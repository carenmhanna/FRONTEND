import React,{useState} from 'react';
import { View, StyleSheet, Dimensions,Text, TouchableOpacity,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../types'; 

const { width } = Dimensions.get('window'); 
//en cas de probleme change the settings of the view wrapper
 
const NoSeizures = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  
  return (
  <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:30,}}>
  <View style={styles.circle}>
    <Text style={styles.txt}>No seizure today.</Text>
    <Text style={styles.txt}>Don’t forget to</Text>
    <Text style={styles.txt}>complete your logs</Text>
    <Text style={styles.txt}>of the day!</Text>

    <View style={{flexDirection:'row',gap:20,marginTop:10,}}>

      <TouchableOpacity style={styles.whitebutton} onPress={() => navigation.navigate('Step7')}>
        <Text style={styles.whitetxt}>Log Your Day</Text>
      </TouchableOpacity>


      
    </View>

  </View>
  </View>
  );
};

const styles = StyleSheet.create({
  whitebutton: {
    backgroundColor: '#EABAFF',
    width: width * 0.38,  // reduced from 0.42
    height: width * 0.18, // reduced from 0.22
    borderRadius: (width * 0.18) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },  
  today:{
    fontWeight:500,
    fontSize:48,
    marginTop:10,
    color:'#EABAFF',
  },
  circle: {
    width: width * 0.75, 
    height: width * 0.75, 
    borderRadius: (width * 0.75) / 2, 
    backgroundColor: '#6B2A88',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  txt:{
    fontWeight:500,
    fontSize:24,
    color:'#EABAFF',
  },
  whitetxt:{
    fontWeight:500,
    fontSize:22,
    color:'#6B2A88',

  },
});

export default NoSeizures;
