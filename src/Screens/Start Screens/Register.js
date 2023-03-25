import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState } from "react";

import CustomTextInput from "../../custom/CustomTextInput";
import PrimaryButton from "../../Components/PrimaryButton";
import SecondaryButton from "../../Components/SecondaryButton";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
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
    await AsyncStorage.setItem("User", {
      name,
      uname,
      email,
      phone,
      address,
      password,
      confirmPassword,
    });
    navigation.goBack();
  };

  function haveAccountHandler() {
    navigation.navigate("Login");
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        paddingTop: 50,
      }}
      enabled
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Image source={require("../../images/logo.png")} style={styles.logo} />
        <Text style={styles.headerText}>Signup</Text>

        <CustomTextInput
          placeholder={"Name"}
          value={name}
          onChangeText={(txt) => {
            setName(txt);
          }}
          icon={require("../../images/name.png")}
        />
        {badName === true && (
          <Text style={styles.errorText}>Please Enter Name</Text>
        )}

        <CustomTextInput
          placeholder={"User Name"}
          value={uname}
          onChangeText={(txt) => {
            setUname(txt);
          }}
          icon={require("../../images/name.png")}
        />
        {badUname === true && (
          <Text style={styles.errorText}>Please Enter User Name</Text>
        )}

        <CustomTextInput
          placeholder={"Email"}
          value={email}
          onChangeText={(txt) => {
            setEmail(txt);
          }}
          icon={require("../../images/email.png")}
        />
        {badEmail === true && (
          <Text style={styles.errorText}>Please Enter Email</Text>
        )}
        <CustomTextInput
          placeholder={"Phone Number"}
          value={phone}
          keyboardType={"number-pad"}
          onChangeText={(txt) => {
            setPhone(txt);
          }}
          icon={require("../../images/phone.png")}
        />
        {badPhone === true && (
          <Text style={styles.errorText}>Please Enter Phone Number</Text>
        )}

        <CustomTextInput
          placeholder={"Residential Address"}
          value={address}
          onChangeText={(txt) => {
            setAddress(txt);
          }}
          icon={require("../../images/location.png")}
        />
        {badAddress === true && (
          <Text style={styles.errorText}>Please Enter Residential Address</Text>
        )}

        <CustomTextInput
          placeholder={"Password"}
          value={password}
          onChangeText={(txt) => {
            setPassword(txt);
          }}
          icon={require("../../images/password.png")}
          type={"password"}
        />
        {badPassword === true && (
          <Text style={styles.errorText}>Please Enter Password</Text>
        )}

        <CustomTextInput
          placeholder={"Confirm Password"}
          value={confirmPassword}
          onChangeText={(txt) => {
            setConfirmPassword(txt);
          }}
          icon={require("../../images/password.png")}
          type={"password"}
        />
        {badConfirmPassword === true && (
          <Text style={styles.errorText}>Please Enter Confirm Password</Text>
        )}

        <PrimaryButton
          title={"Signup"}
          onPress={signupp}
          disabled={buttonDisabled}
        />
        <SecondaryButton
          title={"Already have Account?"}
          onPress={haveAccountHandler}
          disabled={buttonDisabled}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  logo: {
    height: 75,
    width: 75,
    alignSelf: "center",
  },
  headerText: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  errorText: {
    marginTop: 10,
    alignSelf: "center",
    color: "red",
  },
});
