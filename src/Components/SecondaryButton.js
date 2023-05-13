import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from './Shared/Color';

const SecondaryButton = ({ onPress, title, disabled }) => {
  return (
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
};

export default SecondaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    height: 45,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 25,
    borderWidth: 2,
    borderColor: Color.black,
    elevation: 5,
  },
  text: {
    color: Color.black,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
