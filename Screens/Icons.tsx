import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); 

interface IconsProps {
  text1: string;
  text2: string;
  imageSource: any;
  destination: string; // new prop
}

const Icons = ({ text1, text2, imageSource, destination }: IconsProps) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate(destination as never)}>
        <View style={styles.box}>
          <Text style={styles.txt}>{text1}</Text>
          <Text style={styles.txt}>{text2}</Text>
          <Image source={imageSource}/>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: width * 0.4, 
    height: width * 0.35, 
    backgroundColor: '#EABAFF',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontWeight: '500',
    fontSize: 24,
    color: '#6B298A',
  },
});

export default Icons;
