import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { useState } from 'react';

import FormInputField from '../../Components/FormInputField';
import PrimaryButton from '../../Components/PrimaryButton';
import SecondaryButton from '../../Components/SecondaryButton';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import Loader from '../../Custom/Loader';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Login = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const { control, handleSubmit } = useForm();

  const loginPressHandler = (data) => {
    console.log('LOGIN PRESSED');
    console.log(data);
  };

  function newAccountHandler() {
    navigation.navigate('Signup');
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* Header Image and Title */}
        <Image source={require('../../Images/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Login</Text>

        {/* Form Start */}
        <FormInputField
          name={'email'}
          control={control}
          placeholder={'Email'}
          icon={require('../../Images/email.png')}
          rule={{
            required: 'Email cannot be empty.',
            pattern: { value: EMAIL_REGEX, message: 'Enter correct email.' },
          }}
        />

        <FormInputField
          name={'password'}
          control={control}
          rule={{
            required: 'Password cannot be empty.',
            minLength: {
              value: 3,
              message: 'Password must contain 3 characters.',
            },
            maxLength: {
              value: 15,
              message: 'Password cannot be more than 15 characters.',
            },
          }}
          placeholder={'Password'}
          icon={require('../../Images/password.png')}
          secureTextEntry
        />

        <Text
          style={styles.forgetText}
          onPress={() => console.log('Forget Pressed!!!')}
        >
          Forgot Password?
        </Text>

        <PrimaryButton
          title={'LogIn'}
          onPress={() => {
            handleSubmit(loginPressHandler)();
            console.log('log');
          }}
        />
        {/* Form End */}
        <SecondaryButton
          title={'Create New Account'}
          onPress={newAccountHandler}
        />
        <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  logo: {
    height: 125,
    width: 125,
    alignSelf: 'center',
  },
  headerText: {
    marginTop: 25,
    alignSelf: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  errorText: {
    marginTop: 10,
    alignSelf: 'center',
    color: 'red',
  },
  forgetText: {
    fontSize: 15,
    color: '#566573',
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 50,
  },
});
