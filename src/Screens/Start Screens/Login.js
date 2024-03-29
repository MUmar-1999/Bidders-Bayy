import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../Store/authActions";

import FormInputField from "../../Components/FormInputField";
import ErrorMessage from "../../Components/ErrorMessage";
import PrimaryButton from "../../Components/PrimaryButton";
import SecondaryButton from "../../Components/SecondaryButton";

import SafeArea from "../../Components/Shared/SafeArea";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Login = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { loading, error } = useSelector((state) => state.auth);
  //! REMOVE CONSOLE
  // console.log('LOGIN!!!!!', JSON.stringify({ loading, error }, null, 2));

  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();

  const loginPressHandler = (data) => {
    dispatch(login(data));
  };

  function newAccountHandler() {
    navigation.navigate("Signup");
  }
  function forgetPassword() {
    navigation.navigate("ForgetPass");
  }

  return (
    <SafeArea>
      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        <View style={{ flex: 1, justifyContent: "center" }}>
          {/* Header Image and Title */}
          <Image
            source={require("../../Images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.headerText}>Login</Text>

          {/* Form Start */}
          <FormInputField
            name={"email"}
            control={control}
            placeholder={"Email"}
            icon={require("../../Images/email.png")}
            rule={{
              required: "Email cannot be empty.",
              pattern: { value: EMAIL_REGEX, message: "Enter correct email." },
            }}
          />

          <FormInputField
            name={"password"}
            control={control}
            rule={{
              required: "Password cannot be empty.",
              minLength: {
                value: 3,
                message: "Password must contain 3 characters.",
              },
              maxLength: {
                value: 15,
                message: "Password cannot be more than 15 characters.",
              },
            }}
            placeholder={"Password"}
            icon={require("../../Images/password.png")}
            secureTextEntry
          />

          <Text style={styles.forgetText} onPress={forgetPassword}>
            Forgot Password?
          </Text>

          <PrimaryButton
            title={"LogIn"}
            disabled={loading}
            onPress={handleSubmit(loginPressHandler)}
          />
          {/* Form End */}
          <SecondaryButton
            title={"Create New Account"}
            onPress={newAccountHandler}
          />
          {error && <ErrorMessage err={error} />}
        </View>
      </KeyboardAvoidingView>
    </SafeArea>
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
    marginTop: 15,
    marginLeft: 50,
  },
});
