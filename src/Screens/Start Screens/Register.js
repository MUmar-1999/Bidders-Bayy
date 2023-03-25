import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import FormInputField from '../../Components/FormInputField';
import PrimaryButton from '../../Components/PrimaryButton';
import SecondaryButton from '../../Components/SecondaryButton';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[aA-zZ\s]+$/;
const PHONE_REGEX = /^(03)[0-5]\d{8}$/;

const Register = () => {
  const navigation = useNavigation();

  const { control, handleSubmit, watch } = useForm();
  const pwd = watch('Password');
  function signUpHandler(data) {
    console.log('SignUp Pressed');
    console.log(data);
  }

  function haveAccountHandler() {
    navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 50, marginBottom: 50 }}>
          {/* Header Image and Title Text */}
          <Image
            source={require('../../Images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.headerText}>Signup</Text>
          {/* Form START */}

          <FormInputField
            name={'firstName'}
            placeholder={'FirstName'}
            control={control}
            icon={require('../../Images/name.png')}
            rule={{
              required: 'Firstname cannot be empty.',
              pattern: {
                value: NAME_REGEX,
                message: 'Firstname can only contain alphabets.',
              },
              minLength: {
                value: 3,
                message: 'Firstname must contain 3 characters.',
              },
              maxLength: {
                value: 24,
                message: 'Firstname cannot be greater than 24 characters.',
              },
            }}
          />

          <FormInputField
            name={'Lastname'}
            placeholder={'Lastname'}
            control={control}
            icon={require('../../Images/name.png')}
            rule={{
              required: 'Lastname cannot be empty.',
              pattern: {
                value: NAME_REGEX,
                message: 'Lastname can only contain alphabets.',
              },
              minLength: {
                value: 3,
                message: 'Lastname must contain 3 characters.',
              },
              maxLength: {
                value: 14,
                message: 'Lastname cannot be greater than 24 characters.',
              },
            }}
          />

          <FormInputField
            name={'Email'}
            placeholder={'Email'}
            control={control}
            icon={require('../../Images/email.png')}
            keyboardType={'email-address'}
            rule={{
              required: 'Email cannot be empty.',
              pattern: { value: EMAIL_REGEX, message: 'Enter correct email.' },
            }}
          />

          <FormInputField
            name={'Password'}
            placeholder={'Password'}
            control={control}
            icon={require('../../Images/password.png')}
            secureTextEntry
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
          />

          <FormInputField
            name={'Confirm Password'}
            placeholder={'Confirm Password'}
            control={control}
            icon={require('../../Images/password.png')}
            secureTextEntry
            rule={{
              required: 'Password cannot be empty.',
              validate: (value) => value === pwd || 'Password do not match.',
            }}
          />

          <FormInputField
            name={'Phone Number'}
            placeholder={'Phone Number'}
            control={control}
            icon={require('../../Images/phone.png')}
            keyboardType={'phone-pad'}
            rule={{
              required: 'Phone Number cannot be empty.',
              pattern: {
                value: PHONE_REGEX,
                message: 'Enter correct phone number.',
              },
              maxLength: {
                value: 11,
                message: 'Phone Number cannot contain more than 11 numbers.',
              },
            }}
          />

          <FormInputField
            name={'Address'}
            placeholder={'Address'}
            control={control}
            icon={require('../../Images/location.png')}
            rule={{ required: 'Address cannot be empty.' }}
          />

          <PrimaryButton
            title={'Signup'}
            onPress={handleSubmit(signUpHandler)}
          />

          {/* Form END */}

          <SecondaryButton
            title={'Already have Account?'}
            onPress={haveAccountHandler}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  logo: {
    height: 75,
    width: 75,
    alignSelf: 'center',
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  errorText: {
    marginTop: 10,
    alignSelf: 'center',
    color: 'red',
  },
});
