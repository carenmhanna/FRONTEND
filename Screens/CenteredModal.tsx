import React from 'react';
import { Modal, View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import NumberBox from './Numberbox';
import Pillsbox from './pillsbox';

const { width, height } = Dimensions.get('window');

interface CenteredModalProps {
  isVisible: boolean; // Receive the visibility state as a prop
  onClose: () => void; // Receive the function to close the modal
}

const CenteredModal: React.FC<CenteredModalProps> = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Current Dose</Text>
          <View style={styles.boxContainer}>
            <NumberBox />
            <Text style={{ fontSize: 50, color: 'white', }}>.</Text>
            <NumberBox />
            <Pillsbox />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Confirm" onPress={onClose} color="#ffffff" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#6B2A88',  // Purple background color
    borderRadius: 10,
    borderWidth: 2,               // Border around the button
    borderColor: '#4E1D74',       // Darker purple border color
    width: 200,                   // Width of the button container
    marginTop: 20,                // Space above the button
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(107, 42, 136, 0.55)',
  },
  modalContainer: {
    flexDirection: 'column',
    width: width * 0.9,
    height: height * 0.3, 
    padding: 20,
    backgroundColor: '#EABAFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  modalText: {
    fontSize: 20,
    fontWeight: '500',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CenteredModal;
