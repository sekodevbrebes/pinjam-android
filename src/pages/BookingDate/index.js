import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Header} from '../../components';

const dataArray = [
  {
    date: '2024-06-08',
    description: 'Rakor PPPA',
    selected: true,
    marked: true,
    selectedColor: 'red',
  },
  {
    date: '2024-06-11',
    description: 'Rakor PPPA',
    selected: true,
    marked: true,
    selectedColor: 'red',
  },
  {
    date: '2024-06-12',
    description: 'Rakor PPPA',
    selected: true,
    marked: true,
    selectedColor: 'red',
  },
  // Add more objects as needed
];

const transformDataForCalendar = dataArray => {
  const markedDates = {};
  dataArray.forEach(item => {
    markedDates[item.date] = {
      selected: item.selected,
      marked: item.marked,
      selectedColor: item.selectedColor,
    };
  });
  return markedDates;
};

const markedDates = transformDataForCalendar(dataArray);

export default function BookingDate({navigation}) {
  const [selected, setSelected] = useState('');
  return (
    <View>
      <Header
        title="Date"
        subTitle="Select Date"
        onPress={() => navigation.goBack()}
      />
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={markedDates}
      />

      <View>
        <View>
          <Text style={{fontSize: 24}}>{selected}</Text>
          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    marginTop: 14,
  },
});
