import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../custom/CustomTextInput";
import CustomButton from "../custom/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import CustomDate from "../custom/CustomDate";
import AsyncStorage from "@react-native-async-storage/async-storage";
let isValid = true;

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [badName, setBadName] = useState(false);
  const [badUname, setBadUname] = useState("");
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [badEmail, setBadEmail] = useState(false);
  const [phone, setPhone] = useState("");
  const [badPhone, setBadPhone] = useState("");
  const [password, setPassword] = useState("");
  const [badPassword, setBadPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [badConfirmPassword, setBadConfirmPassword] = useState(false);
  const [address, setAddress] = useState("");
  const [badAddress, setBadAddress] = useState(false);
  const [date, setDate] = useState("");
  const [badDate, setBadDate] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const signupp = () => {
    setButtonDisabled(true);
    if (name == "") {
      setBadName(true);
      setButtonDisabled(false);
    } else {
      setBadName(false);
      if (uname == "") {
        setBadUname(true);
        setButtonDisabled(false);
      } else {
        setBadUname(false);
        if (email == "") {
          setBadEmail(true);
          setButtonDisabled(false);
        } else {
          setBadEmail(false);
          if (phone == "") {
            setBadPhone(true);
            setButtonDisabled(false);
          } else if (phone.length < 10) {
            setBadPhone(true);
            setButtonDisabled(false);
          } else {
            setBadPhone(false);
            if (address == "") {
              setBadAddress(true);
              setButtonDisabled(false);
            } else {
              setBadAddress(false);
              if (password == "") {
                setBadPassword(true);
                setButtonDisabled(false);
              } else {
                setBadPassword(false);
                if (confirmPassword == "") {
                  setBadConfirmPassword(true);
                  setButtonDisabled(false);
                } else {
                  setBadConfirmPassword(false);
                  if (password !== confirmPassword) {
                    setBadConfirmPassword(true);
                    setButtonDisabled(false);
                  } else {
                    setBadConfirmPassword(false);
                    saveData();
                    // if (date == "") {
                    //   setBadDate(true);
                    //   setButtonDisabled(false);
                    // } else {
                    //   setBadDate(false);
                    // }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  const saveData = async () => {
    await AsyncStorage.setItem("Name", name);
    await AsyncStorage.setItem("User Name", uname);
    await AsyncStorage.setItem("Email", email);
    await AsyncStorage.setItem("Phone", phone);
    await AsyncStorage.setItem("Address", address);
    await AsyncStorage.setItem("Password", password);
    await AsyncStorage.setItem("Confirm Password", confirmPassword);
    navigation.goBack();
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("../images/logo.png")}
            style={{
              height: 75,
              width: 75,
              alignSelf: "center",
              marginTop: 100,
            }}
          />
          <Text
            style={{
              alignSelf: "center",
              fontSize: 24,
              fontWeight: "bold",
              color: "#000",
            }}
          >
            Signup
          </Text>
          <CustomTextInput
            placeholder={"Name"}
            value={name}
            onChangeText={(txt) => {
              setName(txt);
            }}
            icon={require("../images/name.png")}
          />
          {badName === true && (
            <Text style={{ marginTop: 10, alignSelf: "center", color: "red" }}>
              Please Enter Name
            </Text>
          )}

          <CustomTextInput
            placeholder={"User Name"}
            value={uname}
            onChangeText={(txt) => {
              setUname(txt);
            }}
            icon={require("../images/name.png")}
          />
          {badUname === true && (
            <Text style={{ marginTop: 10, alignSelf: "center", color: "red" }}>
              Please Enter User Name
            </Text>
          )}

          <CustomTextInput
            placeholder={"Email"}
            value={email}
            onChangeText={(txt) => {
              setEmail(txt);
            }}
            icon={require("../images/email.png")}
          />
          {badEmail === true && (
            <Text style={{ marginTop: 10, alignSelf: "center", color: "red" }}>
              Please Enter Email
            </Text>
          )}
          <CustomTextInput
            placeholder={"Phone Number"}
            value={phone}
            keyboardType={"number-pad"}
            onChangeText={(txt) => {
              setPhone(txt);
            }}
            icon={require("../images/phone.png")}
          />
          {badPhone === true && (
            <Text style={{ marginTop: 10, alignSelf: "center", color: "red" }}>
              Please Enter Phone Number
            </Text>
          )}

          <CustomTextInput
            placeholder={"Residential Address"}
            value={address}
            onChangeText={(txt) => {
              setAddress(txt);
            }}
            icon={require("../images/location.png")}
          />
          {badAddress === true && (
            <Text style={{ marginTop: 10, alignSelf: "center", color: "red" }}>
              Please Enter Residential Address
            </Text>
          )}
          {/* <CustomTextInput
          placeholder={"Date of Birth"}
          icon={require("../images/calendar.png")}
        /> */}
          {/* <CustomDate
            icon={require("../images/calendar.png")}
            value={date}
            onChangeText={(txt) => {
              setDate(txt);
            }}
            placeholder={"Date of Birth"}
          />
          {badDate === true && (
            <Text style={{ marginTop: 10, alignSelf: "center", color: "red" }}>
              Please Enter Date of Birth
            </Text>
          )} */}

          <CustomTextInput
            placeholder={"Password"}
            value={password}
            onChangeText={(txt) => {
              setPassword(txt);
            }}
            icon={require("../images/password.png")}
            type={"password"}
          />
          {badPassword === true && (
            <Text style={{ marginTop: 10, alignSelf: "center", color: "red" }}>
              Please Enter Password
            </Text>
          )}

          <CustomTextInput
            placeholder={"Confirm Password"}
            value={confirmPassword}
            onChangeText={(txt) => {
              setConfirmPassword(txt);
            }}
            icon={require("../images/password.png")}
            type={"password"}
          />
          {badConfirmPassword === true && (
            <Text style={{ marginTop: 10, alignSelf: "center", color: "red" }}>
              Please Enter Confirm Password
            </Text>
          )}
          <CustomButton
            title={"Signup"}
            bgcolor={buttonDisabled ? "#8e8e8e" : "black"}
            textColor={"white"}
            onPress={() => {
              signupp();
            }}
            disabled={buttonDisabled}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              alignSelf: "center",
              marginTop: 10,
              textDecorationLine: "underline",
              marginBottom: 50,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            Already have Account?
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
