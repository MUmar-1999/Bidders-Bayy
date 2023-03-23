import { View, Text, Image } from "react-native";
import React from "react";
import Header from "../custom/Header";

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Image
        source={require("../images/Banner.png")}
        style={{
          width: "95%",
          height: 180,
          borderRadius: 10,
          alignSelf: "center",
          marginTop: 10,
        }}
      />
    </View>
  );
};

export default Main;
