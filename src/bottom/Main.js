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
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
        numColumns={2}
        data={products}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                padding: 12,
                paddingBottom: 18,
                backgroundColor: "white",
                width: "45%",
                margin: 8,
                borderRadius: 10,
                flexDirection: "column",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,

                elevation: 15,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  height: 180,
                  width: "100%",
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
