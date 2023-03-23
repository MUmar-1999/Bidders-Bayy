import { View, Text, Image } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  icon,
  type,
  keyboardType,
}) => {
  return (
    <View
      style={{
        width: "75%",
        height: 40,
        borderWidth: 0.5,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 25,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <Image source={icon} style={{ width: 25, height: 25 }} />
      <TextInput
        value={value}
        keyboardType={keyboardType ? keyboardType : "default"}
        onChangeText={(txt) => {
          onChangeText(txt);
        }}
        placeholder={placeholder}
        style={{ marginLeft: 10, marginRight: 10, width: "75%" }}
        secureTextEntry={type ? true : false}
      />
    </View>
  );
};

export default CustomTextInput;
