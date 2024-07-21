import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimeType = ({label, placeholder, value, onChangeText}) => {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(new Date());

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(false);
    setTime(currentTime);
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    onChangeText(formattedTime);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onFocus={() => setShow(true)}
      />
      {show && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontSize: 12,
    color: '#555555',
    fontFamily: 'Poppins-Regular',
  },
  input: {
    height: 48,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#F2F3F7',
    borderColor: '#D3D5E4',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'grey',
  },
});

export default TimeType;
