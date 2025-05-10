import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

type NumberBoxProps = {
  option: string;  // Pass the option (e.g., 'Wine', 'Beer') as a prop
  onSave: (quantity: number, option: string) => void; // Callback to save the number and option
};

const NumberBox: React.FC<NumberBoxProps> = ({ option, onSave }) => {
  const [value, setValue] = useState(0);

  const increment = () => {
    setValue(value + 1);
    onSave(value + 1, option); // Save the new value and option
  };

  const decrement = () => {
    if (value > 0) {
      setValue(value - 1);
      onSave(value - 1, option); // Save the new value and option
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.numberBox}>
          <Text style={styles.number}>{value}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={increment} style={styles.button}>
            <Image source={require('./uparrow.png')} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={decrement} style={styles.button}>
            <Image source={require('./downarrow.png')} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 20,  // Reduced size to ensure proper fit
    width: 20,   // Reduced size to ensure proper fit
  },
  box: {
    backgroundColor: '#EABAFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,  // Added padding to create space between elements
  },
  numberBox: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderColor: '#B766DA',
    backgroundColor: '#F2D6FF',
    marginRight: 10,  // Small margin to separate the box from buttons
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B766DA',
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',  // Ensures buttons are centered vertically
  },
  button: {
    marginVertical: 5,  // Adds space between the up and down buttons
  },
});

export default NumberBox;
