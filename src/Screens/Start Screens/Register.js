import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Store/authActions";

import FormGenderField from "../../Components/FormGenderField";
import FormDateField from "../../Components/FormDateField";
import ErrorMessage from "../../Components/ErrorMessage";
import PrimaryButton from "../../Components/PrimaryButton";
import SecondaryButton from "../../Components/SecondaryButton";

import FormInputField from "../../Components/FormInputField";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[aA-zZ\s]+$/;
const PHONE_REGEX = /^(03)[0-5]\d{8}$/;

function getEighteenYearsAgo() {
  const today = new Date();
  const pastYear = today.getFullYear() - 18;
  return pastYear;
}

const Register = ({ navigation }) => {
  const { loading, error, success } = useSelector((state) => state.auth);
  //! REMOVE CONSOLELOG
  // console.log({ loading, userInfo, error, success });

  const dispatch = useDispatch();
  const { control, handleSubmit, watch } = useForm();

  const pwd = watch("password");

  useEffect(() => {
    if (success) {
      navigation.navigate("Login");
    }
  }, [success]);

  function signUpHandler(data) {
    console.log(data);

    console.log("SignUp Pressed");

    dispatch(register(data));
  }

  function haveAccountHandler() {
    navigation.navigate("Login");
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 50, marginBottom: 50 }}>
          {/* Header Text */}

          <Text style={styles.headerText}>Signup</Text>
          {/* Form START */}

          <FormInputField
            name={"firstName"}
            placeholder={"FirstName"}
            control={control}
            icon={require("../../Images/name.png")}
            rule={{
              required: "Firstname cannot be empty.",
              pattern: {
                value: NAME_REGEX,
                message: "Firstname can only contain alphabets.",
              },
              minLength: {
                value: 3,
                message: "Firstname must contain 3 characters.",
              },
              maxLength: {
                value: 24,
                message: "Firstname cannot be greater than 24 characters.",
              },
            }}
          />

          <FormInputField
            name={"lastName"}
            placeholder={"Lastname"}
            control={control}
            icon={require("../../Images/name.png")}
            rule={{
              required: "Lastname cannot be empty.",
              pattern: {
                value: NAME_REGEX,
                message: "Lastname can only contain alphabets.",
              },
              minLength: {
                value: 3,
                message: "Lastname must contain 3 characters.",
              },
              maxLength: {
                value: 14,
                message: "Lastname cannot be greater than 24 characters.",
              },
            }}
          />

          <FormGenderField
            name={"gender"}
            control={control}
            rule={{
              required: "Select a gender.",
            }}
          />

          <FormDateField
            name={"dob"}
            control={control}
            rule={{
              required: "Select Date of Birth",
              validate: (value) =>
                parseInt(value.substr(0, 4)) < getEighteenYearsAgo() ||
                "DOB must be older than 18 Years",
            }}
          />

          <FormInputField
            name={"email"}
            placeholder={"Email"}
            control={control}
            icon={require("../../Images/email.png")}
            keyboardType={"email-address"}
            rule={{
              required: "Email cannot be empty.",
              pattern: { value: EMAIL_REGEX, message: "Enter correct email." },
            }}
          />

          <FormInputField
            name={"password"}
            placeholder={"Password"}
            control={control}
            icon={require("../../Images/password.png")}
            secureTextEntry
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
          />

          <FormInputField
            name={"rePassword"}
            placeholder={"Confirm Password"}
            control={control}
            icon={require("../../Images/password.png")}
            secureTextEntry
            rule={{
              required: "Password cannot be empty.",
              validate: (value) => value === pwd || "Password do not match.",
            }}
          />

          <FormInputField
            name={"phoneNo"}
            placeholder={"Phone Number"}
            control={control}
            icon={require("../../Images/phone.png")}
            keyboardType={"phone-pad"}
            rule={{
              required: "Phone Number cannot be empty.",
              pattern: {
                value: PHONE_REGEX,
                message: "Enter correct phone number.",
              },
              maxLength: {
                value: 11,
                message: "Phone Number cannot contain more than 11 numbers.",
              },
            }}
          />

          <FormInputField
            name={"address"}
            placeholder={"Address"}
            control={control}
            icon={require("../../Images/location.png")}
            rule={{ required: "Address cannot be empty." }}
          />

          <FormInputField
            name={"currentCity"}
            placeholder={"City"}
            control={control}
            icon={require("../../Images/location.png")}
            rule={{ required: "City cannot be empty." }}
          />
          <PrimaryButton
            title={"Signup"}
            disabled={loading}
            onPress={handleSubmit(signUpHandler)}
          />

          {/* Form END */}

          <SecondaryButton
            title={"Already have Account?"}
            onPress={haveAccountHandler}
          />
          {error && <ErrorMessage err={error} />}
        </View>
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
