import { View, Text, Image } from "react-native";
import Header from "../Custom/Header";
import { FlatList } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";

const Main = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Image
        source={require("../Images/Banner.png")}
        style={{
          width: "95%",
          height: 180,
          borderRadius: 10,
          alignSelf: "center",
          marginTop: 10,
        }}
      />
      <FlatList
        data={products}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: "90%",
                height: 100,
                backgroundColor: "grey",
                alignSelf: "center",
              }}
            >
              <Text>Hello</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Main;
