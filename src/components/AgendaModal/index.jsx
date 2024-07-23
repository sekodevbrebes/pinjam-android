import React from 'react';
import {View, Modal, Text, StyleSheet, Dimensions} from 'react-native';
import Button from '../Button';
import InputType from '../Input';
import Gap from '../Gap';
import TextAreaType from '../Input/textarea';
import TimeType from '../Input/timepicker';
import moment from 'moment';
import 'moment/locale/id'; // Import locale Indonesia untuk moment

const {width} = Dimensions.get('window');

const AgendaModal = ({visible, onClose, onSubmit, form, setForm}) => {
  // Format tanggal untuk tampilan dan untuk penyimpanan di database MySQL
  const formattedDate = moment(form.tanggal).locale('id').format('D MMMM YYYY');
  const mysqlFormattedDate = moment(form.tanggal).format('YYYY-MM-DD'); // Format MySQL

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.formTitle}>Add New</Text>
          <InputType
            label="Date"
            placeholder="Selected Date"
            value={formattedDate}
            editable={false} // Membuat input tidak bisa diedit
          />
          <Gap height={12} />
          <View style={styles.hidden}>
            <InputType
              label="Room ID"
              placeholder="Room ID"
              value={form.room_id}
              editable={false} // Membuat input tidak bisa diedit
            />
          </View>
          <Gap height={12} />
          <TimeType
            label="Start Time"
            placeholder="Type Start Time"
            value={form.waktu_mulai}
            onChangeText={value => setForm('waktu_mulai', value)}
          />
          <Gap height={12} />
          <TimeType
            label="End Time"
            placeholder="Type End Time"
            value={form.waktu_selesai}
            onChangeText={value => setForm('waktu_selesai', value)}
          />
          <Gap height={12} />
          <InputType
            label="Participants"
            placeholder="Type Number of Participants"
            value={form.peserta}
            onChangeText={value => setForm('peserta', value)}
          />
          <Gap height={12} />
          <TextAreaType
            label="Activity"
            placeholder="Type Your Activity"
            value={form.activities}
            onChangeText={value => setForm('activities', value)}
          />
          <Gap height={40} />
          <Button
            title="Submit"
            type="primary"
            onPress={() => onSubmit(mysqlFormattedDate)}
          />
          <Gap height={12} />
          <Button title="Cancel" type="secondary" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

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
  hidden: {
    display: 'none', // Properti untuk menyembunyikan input Room ID
  },
});

export default AgendaModal;
