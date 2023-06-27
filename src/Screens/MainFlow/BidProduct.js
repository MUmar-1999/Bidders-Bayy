import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import Card from "../../Components/Card";
import BidderApi from "../../api/BidderApi";
import SafeArea from "../../Components/Shared/SafeArea";
import SearchBar from "../../Components/SearchBar";
import { FontAwesome } from "@expo/vector-icons";
import { Color } from "../../Components/Shared/Color";

const BidProduct = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const res = await BidderApi.get("/products/bid/");
      setProducts(res.data.data.allProducts);
      setFilteredProducts(res.data.data.allProducts);
      // console.log("chup", JSON.stringify(res.data.data.allProducts, null, 2));
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = (text) => {
    if (text) {
      const newData = products.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredProducts(newData);
    } else {
      setFilteredProducts(products);
    }
  };

  const Header = () => {
    return (
      <View>
        <SearchBar onChange={(txt) => filtered(txt)} />
        <Text style={styles.headerText}>Bidding Items</Text>
        {filteredProducts.length === 0 ? (
          <View style={styles.centeredContainer}>
            <View style={styles.notAvailableContainer}>
              <FontAwesome
                name="exclamation-triangle"
                size={40}
                color="#C62828"
              />
              <Text style={styles.notAvailableText}>
                Sorry, we couldn't find any products.
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [navigation])
  );

  return (
    <SafeArea>
      <KeyboardAvoidingView style={styles.container}>
        {products.length !== 0 ? (
          <FlatList
            numColumns={2}
            style={styles.container}
            data={filteredProducts}
            ListHeaderComponent={Header}
            renderItem={({ item }) => {
              return <Card item={item} isFeatured={true} />;
            }}
          />
        ) : (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Color.black} />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notAvailableContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBE9E7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  notAvailableText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#C62828",
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BidProduct;
