import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/authSlice";
import { update } from "../../Store/authActions";
import PrimaryButton from "../../Components/PrimaryButton";
import SecondaryButton from "../../Components/SecondaryButton";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import SafeArea from "../../Components/Shared/SafeArea";
import { Color } from "../../Components/Shared/Color";
import { normalizeImage } from "../../Utils/functions";

const Profile = ({ navigation }) => {
  const { userInfo } = useSelector((state) => state.auth);
  // console.log("USER_INFO:::", JSON.stringify(userInfo, null, 2));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(userInfo.firstName || "");
  const [lastName, setLastName] = useState(userInfo.lastName || "");
  const [phoneNo, setPhoneNo] = useState(userInfo.phoneNo || "");
  const [currentCity, setCurrentCity] = useState(userInfo.currentCity || "");
  const [profile_picture, setProfilePicture] = useState(
    userInfo.dp === "" ? null : { dp: userInfo.dp }
  );

  function logoutHandler() {
    navigation.reset({
      index: 0,
      routes: [{ name: "Bidders Bay" }],
    });
    dispatch(logout());
  }

  async function saveHandler() {
    let formData = new FormData();
    if (profile_picture.file) {
      formData.append("profile_picture", {
        uri: profile_picture.file,
        type: "image/jpeg",
        name: "profile.jpg",
      });
    }
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phoneNo", phoneNo);
    formData.append("currentCity", currentCity);
    // console.log("SAVE");

    dispatch(update({ formData, role: userInfo.role }));
    setIsModalVisible(true);
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

    if (
      result &&
      !result.canceled &&
      result.assets &&
      result.assets.length > 0
    ) {
      setProfilePicture({ file: result.assets[0].uri });
    }
  };
  const handleSellerPress = (sellerProfile) => {
    // console.log(sellerProfile);
    navigation.navigate("SellerProfile", { sellerProfile });
  };

  return (
    <SafeArea>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileImageContainer}>
          <Image
            source={
              profile_picture
                ? {
                    uri: profile_picture.dp
                      ? normalizeImage(profile_picture.dp)
                      : profile_picture.file,
                  }
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
          userInfo.hasOwnProperty("cnicFront") ? (
            <Text style={{ alignSelf: "center", color: "blue" }}>
              Under Review
            </Text>
          ) : (
            <SecondaryButton
              title={"Become a Seller"}
              onPress={handleBecomeSeller}
            />
          )
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
          editable={userInfo.role === "seller" ? false : true}
          onChangeText={(text) => setFirstName(text)}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          editable={userInfo.role === "seller" ? false : true}
          onChangeText={(text) => setLastName(text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={userInfo.email}
          editable={false}
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
            <Picker.Item label="Select City" value="" />
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
        <Modal visible={isModalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Profile edited successfully!</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeArea>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Color.white,
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
    height: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Color.black,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
