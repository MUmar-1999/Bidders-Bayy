import { Text, TouchableOpacity, StyleSheet } from 'react-native';

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
    backgroundColor: 'white',
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
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
