import { View, Text } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View
      style={{
        width: '100%',
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        borderBottomColor: 'grey',
        backgroundColor: 'lightgrey',
        paddingTop: 30,
      }}
    >
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          color: '#000',
          marginLeft: 20,
        }}
      >
        Bidders Bay
      </Text>
    </View>
  );
};

export default Header;
