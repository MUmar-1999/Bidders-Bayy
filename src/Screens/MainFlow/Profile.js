import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateProfile } from "../../Store/authSlice";
import PrimaryButton from "../../Components/PrimaryButton";
import SecondaryButton from "../../Components/SecondaryButton";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import BidderApi from "../../api/BidderApi";

const Profile = ({ navigation }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // TODO: make all these states into 1 && Update IMAGE URI to display image recieved from backend
  const [firstName, setFirstName] = useState(userInfo.firstName || "");
  const [lastName, setLastName] = useState(userInfo.lastName || "");
  const [phoneNo, setPhoneNo] = useState(userInfo.phoneNo || "");
  const [currentCity, setCurrentCity] = useState(userInfo.currentCity || "");
  const [profile_picture, setProfilePicture] = useState(
    userInfo.profile_picture || undefined
  );

  function logoutHandler() {
    console.log("LOGOUT PRESSED!!!");
    dispatch(logout());
  }

  async function saveHandler() {
    console.log("SAVE PRESSED!!!");
    const updatedUserInfo = {
      profile_picture,
      firstName,
      lastName,
      phoneNo,
      dob: userInfo.dob,
      currentCity,
    };
    let formData = new FormData();
    formData.append("profile_picture", profile_picture);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phoneNo", phoneNo);
    formData.append("dob", userInfo.dob);
    formData.append("currentCity", currentCity);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const result = await BidderApi.post("/users/edit/", formData, config);
      console.log("UPDATEUSERINFO:::", JSON.stringify(result.data, null, 2));
    } catch (error) {
      console.log(error.res);
    }

    // console.log('UserINFO:::', JSON.stringify(updatedUserInfo, null, 2));
    // dispatch(updateProfile(updatedUserInfo));
  }

  const handleBecomeSeller = (becomeSeller) => {
    navigation.navigate("BecomeSeller", { becomeSeller });
  };

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 0.5,
      allowsMultipleSelection: false,
    });

    console.log("total:::", result.assets[0].uri);

    if (
      result &&
      !result.canceled &&
      result.assets &&
      result.assets.length > 0
    ) {
      setProfilePicture({
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "profile.jpg",
      });
    }
  };
  const handleSellerPress = (sellerProfile) => {
    console.log(sellerProfile);
    navigation.navigate("SellerProfile", { sellerProfile });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          source={
            profile_picture
              ? { uri: profile_picture.uri }
              : require("../../Images/dp.png")
          }
          style={styles.profileImage}
        />
        <TouchableOpacity
          style={{ marginLeft: -10, alignSelf: "flex-end" }}
          onPress={chooseImage}
        >
          <Feather name="upload" size={34} color="black" />
        </TouchableOpacity>
      </View>
      {userInfo.role === "buyer" ? (
        <SecondaryButton
          title={"Become a Seller"}
          onPress={handleBecomeSeller}
        />
      ) : (
        <SecondaryButton
          title={"My Products"}
          onPress={() => handleSellerPress({ userId: userInfo })}
        />
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
      <View style={[styles.input, { padding: 0 }]}>
        <Picker
          selectedValue={currentCity}
          onValueChange={(itemValue) => setCurrentCity(itemValue)}
          mode="dropdown"
          style={{ flex: 1 }}
        >
          <Picker.Item label="Select type" value="" />
          <Picker.Item label="Lahore" value="Lahore" />
          <Picker.Item label="Karachi" value="Karachi" />
          <Picker.Item label="Faisalabad" value="Faisalabad" />
          <Picker.Item label="Islamabad" value="Islamabad" />
          <Picker.Item label="Gujranwala" value="Gujranwala" />
          <Picker.Item label="Rawalpindi" value="Rawalpindi" />
          <Picker.Item label="Hyderabad" value="Hyderabad" />
          <Picker.Item label="Multan" value="Multan" />
          <Picker.Item label="Peshawar" value="Peshawar" />
          <Picker.Item label="Quetta" value="Quetta" />
        </Picker>
      </View>
      <SecondaryButton title={"Save"} onPress={saveHandler} />
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
  profileImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },

  profileImage: {
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius: 75,
    borderColor: "black",
    borderWidth: 0,
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
