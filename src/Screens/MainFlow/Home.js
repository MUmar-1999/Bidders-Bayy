import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Card from "../../Components/Card";
import BidderApi from "../../api/BidderApi";
const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getData = async () => {
    try {
      const res = await BidderApi.get("/products/bid/");
      // console.log('HOME LSIT::', JSON.stringify(res.data, null, 2));
      setProducts(res.data.data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [navigation])
  );
  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleBidPress = (bidproduct) => {
    navigation.navigate("BidProduct", { bidproduct });
  };
  const handleFixPress = (fixproduct) => {
    navigation.navigate("FixProduct", { fixproduct });
  };

  const addfav = async (postId) => {
    try {
      const res = await BidderApi.post("/favorite/", { postId });
      // console.log('Fav::', JSON.stringify(res, null, 2));
      if (res) {
        getData();
      }
    } catch (error) {
      console.log(error.res);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [navigation])
  );

  function Header() {
    return (
      <View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 16,
              marginTop: 10,
              backgroundColor: "white",
              borderRadius: 10,
              overflow: "hidden",
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
            <TextInput
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={(query) => setSearchQuery(query)}
              style={{
                flex: 1,
                height: 45,
                paddingHorizontal: 16,
                fontSize: 16,
              }}
            />
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={{
                backgroundColor: "#ddd",
                borderRadius: 5,
                paddingHorizontal: 12,
                paddingVertical: 8,
                marginRight: 3,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>X</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require("../../Images/Banner1.png")}
            style={{
              width: "91.5%",
              height: 170,
              borderRadius: 10,
              alignSelf: "center",
              marginTop: 10,
            }}
          />
        </View>
        <View
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => handleBidPress()}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              marginHorizontal: 10,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../Images/Bidd.png")}
                style={{ borderRadius: 40, width: 80, height: 80 }}
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
            onPress={() => handleFixPress()}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              marginHorizontal: 10,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../Images/Fix.png")}
                style={{ borderRadius: 40, width: 80, height: 80 }}
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
            fontSize: 20,
            marginLeft: 25,
            fontWeight: "400",
          }}
        >
          Products
        </Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        numColumns={2}
        data={filteredProducts}
        ListHeaderComponent={Header}
        renderItem={({ item }) => {
          return <Card item={item} />;
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
});
