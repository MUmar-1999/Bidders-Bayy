import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const PrimaryButton = ({ onPress, title, textColor, disabled }) => (
  <TouchableOpacity
    disabled={disabled}
    style={styles.button}
    onPress={() => {
      onPress();
    }}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    height: 45,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 25,
    borderWidth: 2,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
