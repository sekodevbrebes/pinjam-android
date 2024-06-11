// App.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Button, FlatList } from 'react-native';
import { Agenda } from 'react-native-calendars';

const SelectData = () => {
  const [agendaData, setAgendaData] = useState({
    '2024-06-08': [
      { name: 'Event 1', details: 'Details about Event 1' },
      { name: 'Event 2', details: 'Details about Event 2' },
    ],
    '2024-06-09': [
      { name: 'Event 3', details: 'Details about Event 3' },
      { name: 'Event 4', details: 'Details about Event 4' },
    ],
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [newEventName, setNewEventName] = useState('');
  const [newEventDetails, setNewEventDetails] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingAgenda, setPendingAgenda] = useState([]);

  const addEvent = () => {
    if (!selectedDate || !newEventName) return;

    const newEvent = { name: newEventName, details: newEventDetails, date: selectedDate };
    setPendingAgenda([...pendingAgenda, newEvent]);
    setNewEventName('');
    setNewEventDetails('');
    setModalVisible(false);
  };

  const approveEvent = (index) => {
    const eventToApprove = pendingAgenda[index];
    const updatedAgendaData = { ...agendaData };

    if (updatedAgendaData[eventToApprove.date]) {
      updatedAgendaData[eventToApprove.date].push(eventToApprove);
    } else {
      updatedAgendaData[eventToApprove.date] = [eventToApprove];
    }

    setAgendaData(updatedAgendaData);
    const updatedPendingAgenda = [...pendingAgenda];
    updatedPendingAgenda.splice(index, 1);
    setPendingAgenda(updatedPendingAgenda);
  };

  const renderItem = (item) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemDetails}>{item.details}</Text>
    </TouchableOpacity>
  );

  const renderEmptyDate = () => (
    <View style={styles.emptyDate}>
      <Text style={styles.emptyDateText}>Tidak ada acara untuk hari ini</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Agenda
        items={agendaData}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          setModalVisible(true);
        }}
       
        style={styles.agenda}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tambahkan Acara</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama Acara"
              value={newEventName}
              onChangeText={setNewEventName}
            />
            <TextInput
              style={styles.input}
              placeholder="Detail Acara"
              value={newEventDetails}
              onChangeText={setNewEventDetails}
            />
            <Button title="Tambah" onPress={addEvent} />
            <Button title="Batal" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <View style={styles.pendingContainer}>
        <Text style={styles.pendingTitle}>Agenda yang Menunggu Persetujuan</Text>
        <FlatList
          data={pendingAgenda}
          renderItem={({ item, index }) => (
            <View style={styles.pendingItem}>
              <Text style={styles.pendingItemText}>{item.name} ({item.date})</Text>
              <Text style={styles.pendingItemDetails}>{item.details}</Text>
              <Button title="Setujui" onPress={() => approveEvent(index)} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  item: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d4150'
  },
  itemDetails: {
    fontSize: 14,
    color: '#555'
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  emptyDateText: {
    fontSize: 14,
    color: '#888'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
  agenda: {
    borderTopWidth: 1,
    borderColor: '#eee'
  },
  pendingContainer: {
    padding: 20,
    backgroundColor: '#fff'
  },
  pendingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  pendingItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  pendingItemText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  pendingItemDetails: {
    fontSize: 14,
    marginBottom: 5
  }
});

export default SelectData;
