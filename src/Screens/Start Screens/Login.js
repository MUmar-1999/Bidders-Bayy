import { View, Text, Image, StyleSheet } from "react-native";
import { useState } from "react";

import CustomTextInput from "../../custom/CustomTextInput";
import PrimaryButton from "../../Components/PrimaryButton";
import SecondaryButton from "../../Components/SecondaryButton";

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../custom/Loader";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const login = () => {
    setModalVisible(true);
    if (email == "") {
      setModalVisible(false);
      setBadEmail(true);
    } else {
      setBadEmail(false);
      if (password == "") {
        setModalVisible(false);
        setBadPassword(true);
      } else {
        setBadPassword(false);
        setTimeout(() => {
          getData();
        }, 2000);
      }
    }
  };
  const getData = async () => {
    const mEmail = await AsyncStorage.getItem("Email");
    const mPass = await AsyncStorage.getItem("Password");
    console.log(mEmail, mPass);
    if (email === mEmail && password === mPass) {
      setModalVisible(false);
      navigation.navigate("Home");
    } else {
      setModalVisible(false);
      alert("wrong password");
    }
  };
  function newAccountHandler() {
    navigation.navigate("Signup");
  }
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Image source={require("../../images/logo.png")} style={styles.logo} />
      <Text style={styles.headerText}>Login</Text>

      <CustomTextInput
        placeholder={"Email"}
        icon={require("../../images/email.png")}
        value={email}
        onChangeText={(txt) => {
          setEmail(txt);
        }}
      />
      {badEmail === true && (
        <Text style={styles.errorText}>Please Enter Email</Text>
      )}

      <CustomTextInput
        placeholder={"Password"}
        icon={require("../../images/password.png")}
        type={"password"}
        value={password}
        onChangeText={(txt) => {
          setPassword(txt);
        }}
      />
      {badPassword === true && (
        <Text style={styles.errorText}>Please Enter Password</Text>
      )}

      <Text
        style={styles.forgetText}
        onPress={() => {
          navigation.navigate("Forget");
        }}
      >
        Forgot Password?
      </Text>

      <PrimaryButton title={"LogIn"} onPress={login} />
      <SecondaryButton
        title={"Create New Account"}
        onPress={newAccountHandler}
      />
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  logo: {
    height: 125,
    width: 125,
    alignSelf: "center",
  },
  headerText: {
    marginTop: 25,
    alignSelf: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  errorText: {
    marginTop: 10,
    alignSelf: "center",
    color: "red",
  },
  forgetText: {
    fontSize: 15,
    color: "#566573",
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 50,
  },
});
