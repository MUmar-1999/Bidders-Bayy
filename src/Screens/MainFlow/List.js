import { View, Text, Image } from "react-native";
import React from "react";

const List = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        source={require("../../Images/logo.png")}
        style={{
          height: 75,
          width: 75,
          alignSelf: "center",
          marginTop: 100,
        }}
      />
    </View>
  );
};

export default List;
