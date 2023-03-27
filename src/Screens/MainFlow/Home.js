import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import Main from '../../Bottom/Main';
import Search from '../../Bottom/Search';
import List from '../../Bottom/List';
import Favorite from '../../Bottom/Favorite';
import Profile from './Profile';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={{ flex: 1 }}>
      {selectedTab == 0 ? (
        <Main />
      ) : selectedTab == 1 ? (
        <Search />
      ) : selectedTab == 2 ? (
        <List />
      ) : selectedTab == 3 ? (
        <Favorite />
      ) : (
        <Profile />
      )}
      <View
        style={{
          width: '100%',
          height: 70,
          backgroundColor: 'lightgrey',
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 23,
          }}
          onPress={() => {
            setSelectedTab(0);
          }}
        >
          <Image
            source={require('../../Images/home1.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: selectedTab == 0 ? 'green' : 'black',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 23,
          }}
          onPress={() => {
            setSelectedTab(1);
          }}
        >
          <Image
            source={require('../../Images/search.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: selectedTab == 1 ? 'green' : 'black',
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              backgroundColor: 'black',
              borderRadius: 20,
              justifyContent: 'center',
              padding: 7.5,
              backgroundColor: selectedTab == 2 ? 'green' : 'black',
            }}
            onPress={() => {
              setSelectedTab(2);
            }}
          >
            <Image
              source={require('../../Images/list.png')}
              style={{ width: 25, height: 25, tintColor: 'white' }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 23,
          }}
          onPress={() => {
            setSelectedTab(3);
          }}
        >
          <Image
            source={require('../../Images/favorite.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: selectedTab == 3 ? 'green' : 'black',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 23,
          }}
          onPress={() => {
            setSelectedTab(4);
          }}
        >
          <Image
            source={require('../../Images/name.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: selectedTab == 4 ? 'green' : 'black',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
