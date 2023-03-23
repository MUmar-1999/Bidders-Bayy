import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../Custom/CustomButton';
import { useNavigation } from '@react-navigation/native';
let name = '';
let email = '';
const Profile = () => {
  const navigation = useNavigation();
  useEffect(() => {
    getData();
  });
  const getData = async () => {
    name = await AsyncStorage.getItem('Name');
    email = await AsyncStorage.getItem('Email');
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          width: '100%',
          height: 70,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      ></View>
      <Image
        source={require('../Images/dp.png')}
        style={{
          width: 100,
          height: 100,
          alignSelf: 'center',
          marginTop: 50,
          borderRadius: 50,
          borderColor: 'black',
          borderWidth: 0.4,
        }}
      />
      <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 18 }}>
        Name:{name}
      </Text>
      <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 18 }}>
        Email:{email}
      </Text>
      <CustomButton
        title={'Logout'}
        bgcolor={'black'}
        textColor={'white'}
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

export default Profile;
