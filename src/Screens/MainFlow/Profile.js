import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateProfile } from "../../Store/authSlice";
import PrimaryButton from "../../Components/PrimaryButton";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(userInfo.dob);
  const [firstName, setFirstName] = useState(userInfo.firstName || "");
  const [lastName, setLastName] = useState(userInfo.lastName || "");
  const [email, setEmail] = useState(userInfo.email || "");
  const [phoneNo, setPhoneNo] = useState(userInfo.phoneNo || "");
  const [gender, setGender] = useState(userInfo.gender || "");
  const [dob, setDob] = useState(userInfo.dob || "");
  const [currentCity, setCurrentCity] = useState(userInfo.currentCity || "");

  function logoutHandler() {
    console.log("LOGOUT PRESSED!!!");
    dispatch(logout());
  }

  function saveHandler() {
    console.log("SAVE PRESSED!!!");
    const updatedUserInfo = {
      firstName,
      lastName,
      email,
      phoneNo,
      gender,
      dob,
      currentCity,
    };
    console.log(updatedUserInfo);
    dispatch(updateProfile(updatedUserInfo));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../Images/dp.png")} style={styles.image} />

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
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phoneNo}
        onChangeText={(text) => setPhoneNo(text)}
      />

      <Text style={styles.label}>Gender</Text>
      <TextInput
        style={styles.input}
        value={gender}
        onChangeText={(text) => setGender(text)}
      />

      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        value={dob.substring(0, 10)}
        onChangeText={(text) => setDob(text)}
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        value={currentCity}
        onChangeText={(text) => setCurrentCity(text)}
      />

      <PrimaryButton title={"Save"} onPress={saveHandler} />
      <PrimaryButton title={"Logout"} onPress={logoutHandler} />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 0.4,
  },
  label: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    marginTop: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
});
