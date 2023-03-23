import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@expo/vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import Feather from '@expo/vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import { Context as AuthContext } from '../../Context/AuthContext';
import { Dialog } from '@rneui/themed';

const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email can't be empty.";
  if (!re.test(email)) return 'Ooops! We need a valid email address.';
  return '';
};
const passwordValidator = (password) => {
  if (!password) return "Password can't be empty.";
  if (password.length < 8)
    return 'Password must be at least 8 characters long.';
  return '';
};

const SignIn = ({ navigation }) => {
  const { state, signin } = useContext(AuthContext);
  const [visible3, setVisible3] = useState(false);
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [errorEmailMessage, setEmailErrorMessage] = useState('');
  const [errorPasswordMessage, setPasswordErrorMessage] = useState('');

  if (state.errorMessage != '') {
    Alert(state.errorMessage);
  }

  const textInputChange = (value) => {
    if (emailValidator(value) == '') {
      setData({
        ...data,
        email: value,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        check_textInputChange: false,
        isValidUser: false,
      });
      setEmailErrorMessage(emailValidator(value));
    }
  };
  const handlePasswordChange = (value) => {
    if (passwordValidator(value) == '') {
      setData({
        ...data,
        password: value,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: value,
        isValidPassword: false,
      });
      setPasswordErrorMessage(passwordValidator(value));
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const toggleDialog3 = () => {
    setVisible3(!visible3);
  };

  return (
    <ScrollView>
      <LinearGradient colors={['#052A37', '#12DFEB']} style={styles.container}>
        <StatusBar />
        <View style={styles.header}>
          <Animatable.View animation="fadeIn" duration={2000}>
            <Image
              style={{
                tintColor: 'white',
                alignSelf: 'center',
                marginTop: 50,
                width: 200,
                height: 200,
              }}
              source={require('../../../Images/loginpage.png')}
            />
          </Animatable.View>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Text style={styles.text_header}>Login</Text>

          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <Icon color="grey" name="person-outline" size={25} />
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(value) => textInputChange(value)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{errorEmailMessage}</Text>
            </Animatable.View>
          )}

          <Text style={[styles.text_footer, { marginTop: 20 }]}>Password</Text>

          <View style={styles.action}>
            <Icon color="grey" name="lock-outline" size={25} />
            <TextInput
              style={styles.textInput}
              secureTextEntry={data.secureTextEntry ? true : false}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(value) => handlePasswordChange(value)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{errorPasswordMessage}</Text>
            </Animatable.View>
          )}
          <Dialog isVisible={visible3} onBackdropPress={toggleDialog3}>
            <Dialog.Loading />
          </Dialog>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.SignIn}
              onPress={() => {
                toggleDialog3();
                signin({ email: data.email, password: data.password });
              }}
            >
              <LinearGradient style={styles.SignIn} colors={['grey', 'teal']}>
                <Text style={styles.textSign}>SignIn</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.SignIn,
                { borderColor: 'grey', borderWidth: 1, marginTop: 15 },
              ]}
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              <Text style={[styles.textSign, { color: 'teal' }]}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </LinearGradient>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
  header: {
    height: 250,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
    marginTop: 70,
  },
  footer: {
    height: 550,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  text_header: {
    color: 'teal',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 25,
  },
  text_footer: {
    color: 'grey',
    fontSize: 15,
  },

  title: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },

  text: {
    color: 'grey',
    marginTop: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.os === 'ios' ? 0 : -4,
    paddingLeft: 10,
    color: 'grey',
  },
  errorMsg: {
    color: 'red',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },

  SignIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
