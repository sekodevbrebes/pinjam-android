import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ICTime} from '../../assets';
import Button from '../Button';

const formatTime = timeString => {
  const [hours, minutes] = timeString.split(':');
  const time = new Date();
  time.setHours(hours, minutes, 0, 0);
  return time.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
};

const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const AgendaList = ({selectedDate, agendaData, item}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState(null);

  const handleOpenModal = agenda => {
    setSelectedAgenda(agenda);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAgenda(null);
  };

  return (
    <View style={styles.agendaContainer}>
      <Text style={styles.agendaTitle}>Tempat {item.name}</Text>
      {agendaData[selectedDate].map((agenda, index) => (
        <TouchableOpacity
          key={index}
          style={styles.agendaItem}
          onPress={() => handleOpenModal(agenda)}>
          <View style={styles.timeContainer}>
            <ICTime />
            <Text style={styles.time}>
              {formatTime(agenda.waktu_mulai)} -{' '}
              {formatTime(agenda.waktu_selesai)} WIB
            </Text>
          </View>
          <View style={styles.activityContainer}>
            <Text style={styles.activity}>{agenda.activities}</Text>
            <Text style={styles.peminjam}>
              Instansi {agenda.user?.instansi || 'Instansi tidak ditemukan'}
            </Text>
            <Text style={styles.status}>
              Status{' '}
              <Text
                style={[
                  styles.status,
                  agenda.status === 'Pending'
                    ? styles.statusPending
                    : agenda.status === 'Accept'
                    ? styles.statusAccept
                    : agenda.status === 'Finish'
                    ? styles.statusFinish
                    : styles.status, // fallback for unknown statuses
                ]}>
                {agenda.status}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Modal untuk detail booking */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedAgenda && (
              <ScrollView>
                <Text style={styles.modalTitle}>Detail Booking</Text>
                <View style={styles.table}>
                  <View style={[styles.tableRow, styles.tableRowStriped]}>
                    <Text style={styles.tableLabel}>Nama</Text>
                    <Text style={styles.tableValue}>{item.name}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>Kegiatan</Text>
                    <Text style={styles.tableValue}>
                      {selectedAgenda.activities}
                    </Text>
                  </View>
                  <View style={[styles.tableRow, styles.tableRowStriped]}>
                    <Text style={styles.tableLabel}>Waktu Mulai</Text>
                    <Text style={styles.tableValue}>
                      {formatTime(selectedAgenda.waktu_mulai)} WIB
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>Waktu Selesai</Text>
                    <Text style={styles.tableValue}>
                      {formatTime(selectedAgenda.waktu_selesai)} WIB
                    </Text>
                  </View>
                  <View style={[styles.tableRow, styles.tableRowStriped]}>
                    <Text style={styles.tableLabel}>Pengajuan</Text>
                    <Text style={styles.tableValue}>
                      {selectedAgenda.created_at
                        ? formatDate(selectedAgenda.created_at)
                        : 'Tanggal tidak tersedia'}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>Pelaksanaan</Text>
                    <Text style={styles.tableValue}>
                      {selectedAgenda.tanggal
                        ? formatDate(selectedAgenda.tanggal)
                        : 'Tanggal tidak tersedia'}
                    </Text>
                  </View>
                  <View style={[styles.tableRow, styles.tableRowStriped]}>
                    <Text style={styles.tableLabel}>Instansi</Text>
                    <Text style={styles.tableValue}>
                      {selectedAgenda.user?.instansi ||
                        'Instansi tidak ditemukan'}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>Status</Text>
                    <Text style={styles.tableValue}>
                      {selectedAgenda.status}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            )}

            <Button title="Close" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  agendaContainer: {
    padding: 12,
  },
  agendaTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#FFFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    textAlign: 'center',
  },
  agendaItem: {
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  activity: {
    fontFamily: 'Poppins-Regular',
    color: '#8F9BB3',
    lineHeight: 24,
  },
  peminjam: {
    fontFamily: 'Poppins-Regular',
    color: '#8F9BB3',
    textDecorationLine: 'underline',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityContainer: {
    paddingLeft: 30,
    justifyContent: 'space-between',
  },
  time: {
    fontFamily: 'Poppins-Regular',
    color: '#8F9BB3',
    paddingLeft: 14,
  },
  status: {
    fontFamily: 'Poppins-Regular',
    color: '#8F9BB3',
    lineHeight: 24,
  },
  statusPending: {
    color: 'orange',
  },
  statusAccept: {
    color: 'blue',
  },
  statusFinish: {
    fontFamily: 'Poppins-Regular',
    color: '#8F9BB3',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Default background for even rows
  },
  tableRowStriped: {
    backgroundColor: '#F5F5F5', // Background for odd rows
  },
  tableLabel: {
    flex: 1,
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
  },
  tableValue: {
    flex: 2,
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
    flexWrap: 'wrap', // Allow the text to wrap if it's too long
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  closeButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default AgendaList;
