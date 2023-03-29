import { View, StyleSheet, Text } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';

import { Controller } from 'react-hook-form';

const FormGenderField = ({ control, name, rule }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rule}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <View
            style={[styles.container, { borderColor: error ? 'red' : 'black' }]}
          >
            <Ionicons name="ios-male-female" size={25} color="black" />
            <CheckBox
              checked={value === 'male'}
              title="Male"
              onPress={() => {
                onChange('male');
              }}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              containerStyle={{
                backgroundColor: 'transparent',
                paddingBottom: -10,
                paddingTop: -10,
              }}
              textStyle={{ color: 'black' }}
            />
            <View style={{ height: 25, borderLeftWidth: 1 }} />
            <CheckBox
              checked={value === 'female'}
              title="Female"
              onPress={() => {
                onChange('female');
              }}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              containerStyle={{
                backgroundColor: 'transparent',
                paddingBottom: -10,
                paddingTop: -10,
              }}
              textStyle={{ color: 'black' }}
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

export default FormGenderField;

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
    paddingLeft: 8,
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
