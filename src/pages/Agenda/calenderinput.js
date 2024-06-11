import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';

const initialAgendaData = {
  '2024-06-10': [
    { id: 1, startTime: '10:00', endTime: '11:00', activity: 'Meeting with Team' },
    { id: 2, startTime: '14:00', endTime: '15:00', activity: 'Presentation to Client' },
  ],
  '2024-06-12': [
    { id: 3, startTime: '09:30', endTime: '10:30', activity: 'Project Planning' },
    { id: 4, startTime: '13:00', endTime: '14:00', activity: 'Lunch Break' },
  ],
};


const AgendaCalendar = () => {
  const [agendaData, setAgendaData] = useState(initialAgendaData);
  const [selectedDate, setSelectedDate] = useState('');
  const [newAgenda, setNewAgenda] = useState({ startTime: '', endTime: '', activity: '' });

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleAddAgenda = () => {
    const updatedAgenda = { ...agendaData };
    if (!updatedAgenda[selectedDate]) {
      updatedAgenda[selectedDate] = [];
    }
    updatedAgenda[selectedDate].push({ id: Date.now(), ...newAgenda });
    setAgendaData(updatedAgenda);
    setNewAgenda({ startTime: '', endTime: '', activity: '' });
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={agendaData}
      />
      {selectedDate && !agendaData[selectedDate] && (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Add New Agenda</Text>
          <TextInput
            style={styles.input}
            placeholder="Start Time"
            value={newAgenda.startTime}
            onChangeText={(text) => setNewAgenda({ ...newAgenda, startTime: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="End Time"
            value={newAgenda.endTime}
            onChangeText={(text) => setNewAgenda({ ...newAgenda, endTime: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Activity"
            value={newAgenda.activity}
            onChangeText={(text) => setNewAgenda({ ...newAgenda, activity: text })}
          />
          <Button title="Add Agenda" onPress={handleAddAgenda} />
        </View>
      )}
      {selectedDate && agendaData[selectedDate] && (
        <View style={styles.agendaContainer}>
          <Text style={styles.agendaTitle}>Agenda for {selectedDate}</Text>
          {agendaData[selectedDate].map((item) => (
            <View key={item.id} style={styles.agendaItem}>
              <Text>{item.startTime} - {item.endTime}</Text>
              <Text>{item.activity}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  agendaContainer: {
    padding: 20,
  },
  agendaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  agendaItem: {
    marginBottom: 10,
  },
});

export default AgendaCalendar;
