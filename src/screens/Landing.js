import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Landing = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
      getData();
    }, 2000);
  }, []);

  const getData = async () => {
    const email = await AsyncStorage.getItem('Email');
    if (email !== null) {
      // navigation.navigate("Home");
    } else {
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {
        <Image
          source={require('../Images/logo.png')}
          style={{ width: 200, height: 200 }}
        />
      }
    </View>
  );
};

export default Landing;
