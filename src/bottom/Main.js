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
      <Text
        style={{
          fontSize: 24,
          marginTop: 20,
          marginLeft: 35,
          fontWeight: "bold",
        }}
      >
        Products
      </Text>
      <FlatList
        data={products}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: "80%",
                height: 220,
                backgroundColor: "white",
                alignSelf: "center",
                marginTop: 10,
                borderRadius: 10,
                flexDirection: "column",
                borderWidth: 1,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  height: 140,
                  width: 160,
                  alignSelf: "center",
                  marginTop: 10,
                  borderRadius: 10,
                }}
              />
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                {item.title}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Rs. {item.price}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Main;
