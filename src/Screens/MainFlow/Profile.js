import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Store/authSlice';

import PrimaryButton from '../../Components/PrimaryButton';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function logoutHandler() {
    console.log('LOGOUT PRESSED!!!');
    dispatch(logout());
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../Images/dp.png')} style={styles.image} />
      {userInfo && (
        <>
          <Text style={styles.text}>
            Name: {`${userInfo.firstName} ${userInfo.lastName}` || 'name'}
          </Text>
          <Text style={styles.text}>Email: {userInfo.email || 'email'}</Text>
        </>
      )}
      <PrimaryButton title={'Logout'} onPress={logoutHandler} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 0.4,
  },
  text: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});
