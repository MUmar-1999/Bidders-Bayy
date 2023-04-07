import { View, Text, Image, TextInput } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../custom/CustomTextInput";
import CustomButton from "../custom/CustomButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../custom/Loader";

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
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../images/logo.png")}
        style={{ height: 125, width: 125, alignSelf: "center", marginTop: 100 }}
      />
      <Text
        style={{
          marginTop: 25,
          alignSelf: "center",
          fontSize: 24,
          fontWeight: "bold",
          color: "#000",
        }}
      >
        Login
      </Text>
      <CustomTextInput
        placeholder={"Email"}
        icon={require("../images/email.png")}
        value={email}
        onChangeText={(txt) => {
          setEmail(txt);
        }}
      />
      {badEmail === true && (
        <Text style={{ marginTop: 10, alignSelf: "center", color: "red" }}>
          Please Enter Email
        </Text>
      )}
      <CustomTextInput
        placeholder={"Password"}
        icon={require("../images/password.png")}
        type={"password"}
        value={password}
        onChangeText={(txt) => {
          setPassword(txt);
        }}
      />
      {badPassword === true && (
        <Text style={{ marginTop: 10, alignSelf: "center", color: "red" }}>
          Please Enter Password
        </Text>
      )}
      <Text
        style={{
          fontSize: 15,
          color: "blue",
          fontWeight: "bold",
          marginTop: 10,
          marginLeft: 45,
          textDecorationLine: "underline",
        }}
        onPress={() => {
          navigation.navigate("Forget");
        }}
      >
        Forget Password
      </Text>

      <CustomButton
        title={"Login"}
        bgcolor={"black"}
        textColor={"white"}
        onPress={() => {
          login();
        }}
      />
      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          alignSelf: "center",
          marginTop: 10,
          textDecorationLine: "underline",
        }}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        Create New Account
      </Text>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default Login;
