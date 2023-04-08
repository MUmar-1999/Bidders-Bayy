import { View, Text, Image } from "react-native";
import React from "react";
import CustomTextInput from "../Custom/CustomTextInput";
import CustomButton from "../Custom/CustomButton";

const List = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        source={require("../Images/logo.png")}
        style={{
          height: 75,
          width: 75,
          alignSelf: "center",
          marginTop: 100,
        }}
      />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginTop: 10,
          alignSelf: "center",
        }}
      >
        Auction Post
      </Text>
      <CustomTextInput placeholder={"Product Name"} />
      <CustomTextInput placeholder={"Product Description"} />
      <CustomTextInput
        placeholder={"Enter Base Price"}
        keyboardType={"number-pad"}
      />
      <CustomButton
        title={"Post Product"}
        bgcolor={"black"}
        textColor={"white"}
      />
    </View>
  );
};

export default List;
