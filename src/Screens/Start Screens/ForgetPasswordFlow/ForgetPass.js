import { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../../Store/authActions";

import SafeArea from "../../../Components/Shared/SafeArea";
import FormInputField from "../../../Components/FormInputField";
import PrimaryButton from "../../../Components/PrimaryButton";
import ErrorMessage from "../../../Components/ErrorMessage";
import { resetSuccess } from "../../../Store/authSlice";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgetPass = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm();
  const email = watch('email');
  const { loading, error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(success);
    if (success) {
      dispatch(resetSuccess());
      navigation.navigate("OTPscreen", { e: email });
    }
  }, [success]);

  function handleForget(data) {
    dispatch(forgetPassword(data));
  };

  return (
    <SafeArea>
      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            source={require("../../../Images/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.headerText}>Forget Password</Text>
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 20,
              marginBottom: -20,
              fontSize: 16,
              fontWeight: "400",
            }}
          >
            Enter your Email Address
          </Text>

          <FormInputField
            name={"email"}
            control={control}
            placeholder={"Email"}
            icon={require("../../../Images/email.png")}
            rule={{
              required: "Email cannot be empty.",
              pattern: { value: EMAIL_REGEX, message: "Enter correct email." },
            }}
          />

          <PrimaryButton title={"Confirm"} disabled={loading} onPress={handleSubmit(handleForget)} />
          {error && <ErrorMessage err={error} />}
        </View>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

export default ForgetPass;

const styles = StyleSheet.create({
  logo: {
    marginTop: -100,
    height: 125,
    width: 125,
    alignSelf: "center",
  },
  headerText: {
    marginTop: 0,
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
