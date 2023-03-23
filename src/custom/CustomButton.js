import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomButton = ({ onPress, title, bgcolor, textColor, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        backgroundColor: bgcolor,
        justifyContent: "center",
        alignItems: "center",
        width: "75%",
        height: 45,
        alignSelf: "center",
        borderRadius: 10,
        marginTop: 25,
      }}
      onPress={() => {
        onPress();
      }}
    >
      <Text style={{ color: textColor }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
