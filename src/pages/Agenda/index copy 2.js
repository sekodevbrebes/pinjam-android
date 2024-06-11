import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Agenda } from 'react-native-calendars';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';

const initialAgendaData = {
  '2024-06-08': [
    { id: 1, startTime: '10:00', endTime: '11:00', activity: 'Meeting with Team' },
    { id: 2, startTime: '14:00', endTime: '15:00', activity: 'Presentation to Client' },
  ],
  '2024-06-09': [
    { id: 3, startTime: '09:30', endTime: '10:30', activity: 'Project Planning' },
    { id: 4, startTime: '13:00', endTime: '14:00', activity: 'Lunch Break' },
  ],
};


const AgendaCalendar = () => {
  const [agendaData, setAgendaData] = useState(initialAgendaData);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [newAgenda, setNewAgenda] = useState({ startTime: '', endTime: '', activity: '' });
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddAgenda = () => {
    const updatedAgenda = { ...agendaData };
    if (!updatedAgenda[selectedDate]) {
      updatedAgenda[selectedDate] = [];
    }
    updatedAgenda[selectedDate].push({ id: Date.now(), ...newAgenda });
    setAgendaData(updatedAgenda);
    setModalVisible(false);
    setNewAgenda({ startTime: '', endTime: '', activity: '' });
  };

  const renderItem = (item) => (
    <View style={styles.item}>
      <Text style={styles.time}>{item.startTime} - {item.endTime}</Text>
      <Text style={styles.activity}>{item.activity}</Text>
    </View>
  );

  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const time = selectedTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setNewAgenda({ ...newAgenda, startTime: time });
    }
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const time = selectedTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setNewAgenda({ ...newAgenda, endTime: time });
    }
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={agendaData}
        renderItem={renderItem}
        onDayPress={handleDayPress}
      />
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Agenda</Text>
          <Text style={styles.selectedDate}>{selectedDate}</Text>
          <Button title="Select Start Time" onPress={() => setShowStartTimePicker(true)} />
          {showStartTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              onChange={handleStartTimeChange}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Start Time"
            value={newAgenda.startTime}
            editable={false}
          />
          <Button title="Select End Time" onPress={() => setShowEndTimePicker(true)} />
          {showEndTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              onChange={handleEndTimeChange}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="End Time"
            value={newAgenda.endTime}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Activity"
            value={newAgenda.activity}
            onChangeText={(text) => setNewAgenda({ ...newAgenda, activity: text })}
          />
          <Button title="Add Agenda" onPress={handleAddAgenda} />
          <Button title="Cancel" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#f9c2ff',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activity: {
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#f9c2ff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AgendaCalendar;
