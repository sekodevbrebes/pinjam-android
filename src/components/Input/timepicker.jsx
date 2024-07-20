import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TimeType = ({label, placeholder, ...rest}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time, setTime] = useState('');

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = date => {
    // Format waktu dalam format 24 jam
    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    setTime(formattedTime);
    hideDatePicker();
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        <Text style={styles.inputText}>{time || placeholder}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        {...rest}
      />
    </View>
  );
};

export default TimeType;

const styles = StyleSheet.create({
  input: {
    height: 48,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#F2F3F7',
    borderColor: '#D3D5E4',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
  },
  inputText: {
    color: 'grey',
  },
  label: {
    marginBottom: 8,
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  },
});
