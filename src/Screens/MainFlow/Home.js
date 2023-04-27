import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";

import axios from "axios";
import BidderApi from "../../api/BidderApi";
const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await BidderApi.get("/product/");
      setProducts(res.data.data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };
  // const getData = () => {
  //   axios
  //     .get("http://192.168.10.2:5000/product/", {
  //       headers: {
  //         Authorization:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im05QGdtYWlsLmNvbSIsImlkIjoiNjQzMTdmMDgzZWEzNWQ2ZTk2YjY5ZGQ5IiwiaWF0IjoxNjgxNTkyMDc3fQ.jayQZq6p8mPy2it_z1gPkIufE-1g0Q6SHz4TQHEz-Gw",
  //       },
  //     })
  //     .then((response) => {
  //       setProducts(response.data.data.allProducts);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  });
  const handleProductPress = (product) => {
    navigation.navigate("Product", { product });
  };

  return (
    <ScrollView>
      <View style={{ height: 200 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 16,
            marginTop: 10,
          }}
        >
          <TextInput
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={(query) => setSearchQuery(query)}
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 16,
            }}
          />

          <TouchableOpacity
            onPress={() => setSearchQuery("")}
            style={{
              backgroundColor: "#ddd",
              borderRadius: 10,
              marginLeft: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
          >
            <Text>Clear</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../Images/Banner.png")}
          style={{
            width: "95%",
            height: 160,
            borderRadius: 10,
            alignSelf: "center",
            marginTop: 10,
          }}
        />
      </View>
      <View
        style={{
          marginVertical: 30,
          marginHorizontal: 10,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginHorizontal: 10,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("./../Images/Bid.webp")}
              style={{ borderRadius: 30, width: 60, height: 60 }}
            />
            <Text
              style={{
                marginTop: 10,
                fontSize: 13,
                color: "#444",
                marginBottom: 5,
                fontWeight: "300",
              }}
            >
              Bidding Products
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginHorizontal: 10,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("./../Images/purchase.webp")}
              style={{ borderRadius: 30, width: 60, height: 60 }}
            />
            <Text
              style={{
                marginTop: 10,
                fontSize: 13,
                color: "#444",
                marginBottom: 5,
                fontWeight: "300",
              }}
            >
              Fix Price Products
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: 24,
          marginLeft: 35,
          fontWeight: "bold",
        }}
      >
        Products
      </Text>
      <FlatList
        numColumns={2}
        data={filteredProducts}
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
              <TouchableOpacity onPress={() => handleProductPress(item)}>
                <View>
                  <Image
                    source={{
                      uri: "https://reactnative.dev/img/tiny_logo.png",
                    }}
                    style={{
                      height: 180,
                      width: "100%",
                      alignSelf: "center",
                      marginTop: 10,
                      borderRadius: 10,
                    }}
                  />
                </View>
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
                  Rs. {item.productPrice}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

export default Home;
