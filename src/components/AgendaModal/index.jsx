import React from 'react';
import {View, Modal, Text, StyleSheet, Dimensions} from 'react-native';
import Button from '../Button';
import InputType from '../Input';
import Gap from '../Gap';
import TextAreaType from '../Input/textarea';
import TimeType from '../Input/timepicker';

const {width} = Dimensions.get('window');

const AgendaModal = ({visible, onClose, newAgenda, setNewAgenda, onSubmit}) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.formTitle}>Add New</Text>
        <TimeType label="Start Time" placeholder="Type Start Time" />
        <Gap height={20} />
        <TimeType label="End Time" placeholder="Type End Time" />
        <Gap height={20} />
        <InputType
          label="Participants"
          placeholder="Type Number of Participants"
        />
        <Gap height={20} />
        <TextAreaType label="Activity" placeholder="Type Your Activity" />
        <Gap height={40} />
        <Button title="Submit" type="primary" onPress={onSubmit} />
        <Gap height={20} />
        <Button title="Cancel" type="secondary" onPress={onClose} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width - 40,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 10,
  },
  formTitle: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 40,
    fontFamily: 'Poppins-Regular',
  },
});

export default AgendaModal;
