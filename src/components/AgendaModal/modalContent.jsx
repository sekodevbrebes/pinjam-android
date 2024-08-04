import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Modal} from 'react-native';
import Button from '../Button';
import {formatDate, formatTime} from '../../utilities';
import {getData} from '../../utilities';
import axios from 'axios';
import {API_HOST} from '../../config';
import Gap from '../Gap';
import TextAreaType from '../Input/textarea';

const ModalContent = ({item, agenda, onClose, onUpdateAgenda}) => {
  const [userLevel, setUserLevel] = useState('');
  const [agendaStatus, setAgendaStatus] = useState(agenda.status);
  const [modalVisible, setModalVisible] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [confirmAcceptVisible, setConfirmAcceptVisible] = useState(false); // New state for confirm accept modal

  useEffect(() => {
    getData('userProfile')
      .then(response => {
        setUserLevel(response?.roles || '');
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  const updateStatus = status => {
    const data = {status};

    getData('token').then(resToken => {
      axios
        .post(`${API_HOST.url}/agendas/${agenda.id}/change-status`, data, {
          headers: {Authorization: resToken.value},
        })
        .then(response => {
          setAgendaStatus(status);
          onUpdateAgenda(status); // Notify parent to update agenda
          if (status === 'Decline') {
            // Simulate or send data to update decline reason
            axios
              .put(
                `${API_HOST.url}/agendas/${agenda.id}/reason`,
                {reason: declineReason},
                {
                  headers: {Authorization: resToken.value},
                },
              )
              .then(() => {
                console.log('Decline reason updated');
              })
              .catch(error => {
                console.error('Error updating decline reason:', error);
              });
          }
          onClose();
        })
        .catch(error => {
          console.error('Error changing status:', error);
        });
    });
  };

  const onAccept = () => {
    // Show confirmation modal
    setConfirmAcceptVisible(true);
  };

  const confirmAccept = () => {
    updateStatus('Accept');
    setConfirmAcceptVisible(false);
  };

  const cancelAccept = () => {
    setConfirmAcceptVisible(false);
  };

  const onDecline = () => {
    setModalVisible(true);
  };

  const submitDecline = () => {
    updateStatus('Decline');
  };

  const showAcceptButton = agendaStatus === 'Pending' && userLevel === 'ADMIN';
  const showDeclineButton = agendaStatus === 'Pending' && userLevel === 'ADMIN';

  return (
    <ScrollView>
      <Text style={styles.modalTitle}>Detail Booking</Text>
      <View style={styles.table}>
        <TableRow label="Nama" value={item.name} striped />
        <TableRow label="Kegiatan" value={agenda.activities} />
        <TableRow
          label="Waktu"
          value={`${formatTime(agenda.waktu_mulai)} - ${formatTime(
            agenda.waktu_selesai,
          )} WIB`}
          striped
        />
        <TableRow
          label="Pengajuan"
          value={
            agenda.created_at
              ? formatDate(agenda.created_at)
              : 'Tanggal tidak tersedia'
          }
        />
        <TableRow
          label="Pelaksanaan"
          value={
            agenda.tanggal
              ? formatDate(agenda.tanggal)
              : 'Tanggal tidak tersedia'
          }
          striped
        />
        <TableRow
          label="Instansi"
          value={agenda.user?.instansi || 'Instansi tidak ditemukan'}
        />
        <TableRow
          label="Status"
          value={agendaStatus}
          status={agendaStatus}
          striped
        />
      </View>
      <View style={styles.buttonContainer}>
        {showAcceptButton && (
          <>
            <Button title="Accept" type="danger" onPress={onAccept} />
            {showDeclineButton && <Gap height={14} />}
          </>
        )}
        {showDeclineButton && (
          <>
            <Button title="Decline" type="primary" onPress={onDecline} />
            <Gap height={14} />
          </>
        )}
        <Button title="Close" onPress={onClose} />
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextAreaType
              label="Masukkan alasan penolakan :"
              placeholder="Alasan Penolakan"
              value={declineReason}
              onChangeText={setDeclineReason}
            />
            <Gap height={12} />
            <View style={styles.modalButtons}>
              <Button
                title="Batal"
                type="secondary"
                onPress={() => setModalVisible(false)}
              />
              <Gap width={10} />
              <Button title="Kirim" type="primary" onPress={submitDecline} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={confirmAcceptVisible}
        onRequestClose={() => setConfirmAcceptVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.smallModalContent]}>
            <Text style={styles.modalText}>Yakin akan di Accept?</Text>
            <Gap height={12} />
            <View style={styles.modalButtons}>
              <Button title="Ya" type="primary" onPress={confirmAccept} />
              <Gap width={10} />
              <Button title="Tidak" type="secondary" onPress={cancelAccept} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const TableRow = ({label, value, striped, status}) => {
  const getStatusStyle = status => {
    switch (status) {
      case 'Pending':
        return styles.statusPending;
      case 'Accept':
        return styles.statusAccept;
      case 'Decline':
        return styles.statusDecline;
      case 'Finish':
        return styles.statusFinish;
      default:
        return styles.tableValueStatus;
    }
  };

  return (
    <View style={[styles.tableRow, striped && styles.tableRowStriped]}>
      <Text style={styles.tableLabel}>{label}</Text>
      <Text style={[styles.tableValue, status && getStatusStyle(status)]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
    backgroundColor: '#FFFFFF',
  },
  tableRowStriped: {
    backgroundColor: '#F5F5F5',
  },
  tableLabel: {
    flex: 1,
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
  },
  tableValue: {
    flex: 2,
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    flexWrap: 'wrap',
  },
  tableValueStatus: {
    flex: 2,
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    flexWrap: 'wrap',
  },
  statusPending: {
    color: 'red',
  },
  statusAccept: {
    color: 'orange',
  },
  statusDecline: {
    color: 'red',
  },
  statusFinish: {
    color: '#8F9BB3',
  },
  buttonContainer: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  smallModalContent: {
    width: '60%', // Smaller width for confirmation modal
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
  },
});

export default ModalContent;
