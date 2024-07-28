import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Button from '../Button';
import {formatDate, formatTime} from '../../utilities';

const ModalContent = ({item, agenda, onClose}) => {
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
          value={agenda.status}
          status={agenda.status}
          striped
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Close" onPress={onClose} />
      </View>
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
  statusFinish: {
    color: '#8F9BB3',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ModalContent;
