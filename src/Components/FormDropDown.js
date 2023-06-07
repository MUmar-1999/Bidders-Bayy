import { View, Image, TextInput, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Controller } from 'react-hook-form';

const FormDropDown = ({ control, name, rule, icon }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rule}
      render={({
        field: { value = '', onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[styles.container, { borderColor: error ? 'red' : 'black' }]}
          >
            <Image source={icon} style={{ width: 25, height: 25 }} />
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              onBlur={onBlur}
              mode="dropdown"
              style={styles.dropdown}
            >
              <Picker.Item label="Select city" value="" />
              <Picker.Item label="Lahore" value="Lahore" />
              <Picker.Item label="Karachi" value="Karachi" />
              <Picker.Item label="Faisalabad" value="Faisalabad" />
              <Picker.Item label="Islamabad" value="Islamabad" />
              <Picker.Item label="Gujranwala" value="Gujranwala" />
              <Picker.Item label="Rawalpindi" value="Rawalpindi" />
              <Picker.Item label="Hyderabad" value="Hyderabad" />
              <Picker.Item label="Multan" value="Multan" />
              <Picker.Item label="Peshawar" value="Peshawar" />
              <Picker.Item label="Quetta" value="Quetta" />
            </Picker>
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

export default FormDropDown;

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
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    width: '75%',
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
  dropdown: {
    flex: 1,
  },
});
