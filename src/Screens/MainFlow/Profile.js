import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateProfile } from '../../Store/authSlice';
import PrimaryButton from '../../Components/PrimaryButton';
import SecondaryButton from '../../Components/SecondaryButton';
import { Feather } from '@expo/vector-icons';

const Profile = ({ navigation }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(userInfo.firstName || '');
  const [lastName, setLastName] = useState(userInfo.lastName || '');
  const [phoneNo, setPhoneNo] = useState(userInfo.phoneNo || '');

  function logoutHandler() {
    console.log('LOGOUT PRESSED!!!');
    dispatch(logout());
  }

  function saveHandler() {
    console.log('SAVE PRESSED!!!');
    // const updatedUserInfo = {
    //   firstName,
    //   lastName,
    //   email,
    //   phoneNo,
    //   gender,
    //   dob,
    //   currentCity,
    // };
    // console.log(updatedUserInfo);
    // dispatch(updateProfile(updatedUserInfo));
  }
  const handleBecomeSeller = (becomeSeller) => {
    navigation.navigate('BecomeSeller', { becomeSeller });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../../Images/dp.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={{ marginLeft: -10, alignSelf: 'flex-end' }}>
          <Feather name="upload" size={34} color="black" />
        </TouchableOpacity>
      </View>
      {userInfo.role === 'buyer' && (
        <PrimaryButton title={'Become a Seller'} onPress={handleBecomeSeller} />
      )}

      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={userInfo.email} editable={false} />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phoneNo}
        onChangeText={(text) => setPhoneNo(text)}
      />

      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        value={userInfo.gender}
        editable={false}
      />

      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        value={userInfo.dob.substring(0, 10)}
        editable={false}
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        value={userInfo.currentCity}
        editable={false}
      />

      <SecondaryButton title={'Save'} onPress={saveHandler} />
      <PrimaryButton title={'Logout'} onPress={logoutHandler} />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  profileImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },

  profileImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 0.4,
  },
  label: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
});
