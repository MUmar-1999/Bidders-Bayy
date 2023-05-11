import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import BidderApi from "../../api/BidderApi";
import { EvilIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import Card from "../../Components/Card";

const FixProduct = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [value, setValue] = React.useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await BidderApi.get("/products/used/");
      // console.log(
      //   "HOME LSIT::",
      //   JSON.stringify(res.data.data.allProducts[0], null, 2)
      // );
      setProducts(res.data.data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleProductPress = (product) => {
    navigation.navigate("Product", { product });
  };

  const addfav = async (postId) => {
    try {
      const res = await BidderApi.post("/favorite/", { postId });
      // console.log("Fav::", JSON.stringify(res, null, 2));
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
      <>
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
        </View>

        <Text
          style={{
            fontSize: 20,
            marginLeft: 20,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          Fix Price Items
        </Text>
      </>
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

export default FixProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
});
