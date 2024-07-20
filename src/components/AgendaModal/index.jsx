import React from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Button from '../Button';

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
        <TextInput
          style={styles.input}
          placeholder="Start Time"
          value={newAgenda.startTime}
          onChangeText={text => setNewAgenda({...newAgenda, startTime: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="End Time"
          value={newAgenda.endTime}
          onChangeText={text => setNewAgenda({...newAgenda, endTime: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Activity"
          value={newAgenda.activity}
          onChangeText={text => setNewAgenda({...newAgenda, activity: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Peminjam"
          value={newAgenda.peminjam}
          onChangeText={text => setNewAgenda({...newAgenda, peminjam: text})}
        />
        <Button title="Submit" type="primary" onPress={onSubmit} />
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
    fontFamily: 'Poppins-Bold',
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
