import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Controller } from 'react-hook-form';

import { FontAwesome5 } from '@expo/vector-icons';

const FormDateField = ({ control, name, rule }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const handleConfirm = (date) => {
    let dat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return dat;
    showDatePicker();
  };
  return (
    <Controller
      control={control}
      name={name}
      rules={rule}
      render={({
        field: { value = 'Select Date of Birth', onChange },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[styles.container, { borderColor: error ? 'red' : 'black' }]}
          >
            <FontAwesome5 name="calendar-alt" size={24} color="black" />
            <TouchableOpacity
              onPress={() => {
                showDatePicker();
              }}
              style={{ flex: 1, height: 40, justifyContent: 'center' }}
            >
              <Text style={styles.text}>{value}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => onChange(handleConfirm(date))}
              onCancel={showDatePicker}
            />
          </View>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.error}>{error.message || 'Error'}</Text>
            </View>
          )}
        </>
      )}
    />
  );
};

export default FormDateField;

const styles = StyleSheet.create({
  container: {
    width: '75%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
    width: '100%',
    fontSize: 14,
  },
  errorContainer: {
    width: '75%',
    alignSelf: 'center',
    marginBottom: -20,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
});
