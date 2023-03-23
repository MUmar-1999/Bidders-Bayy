import { View, Text, Image } from 'react-native';
import React from 'react';
import Header from '../Custom/Header';

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Image
        source={require('../Images/Banner.png')}
        style={{
          width: '95%',
          height: 180,
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: 10,
        }}
      />
    </View>
  );
};

export default Main;
