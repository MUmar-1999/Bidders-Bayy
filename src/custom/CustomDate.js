import { View, Text, Image } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React, { useState } from 'react';

const CustomDate = ({ icon, onChangeText }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Date of Birth');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    console.warn('A date has been picked: ', date);
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    console.log(x1[2] + '/' + x1[1] + '/' + x1[0]);
    setSelectedDate(x1[2] + '/' + x1[1] + '/' + x1[0]);
    hideDatePicker();
  };
  return (
    <View
      style={{
        width: '75%',
        height: 40,
        borderWidth: 0.5,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <Image source={icon} style={{ width: 25, height: 25 }} />
      <TouchableOpacity
        onPress={() => {
          showDatePicker();
        }}
      >
        <Text
          style={{ marginLeft: 10, marginRight: 10, width: '100%' }}
          onChangeText={(txt) => {
            onChangeText(txt);
          }}
        >
          {selectedDate}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default CustomDate;
