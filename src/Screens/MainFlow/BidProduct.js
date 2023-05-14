import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import Card from "../../Components/Card";
import BidderApi from "../../api/BidderApi";
import SafeArea from "../../Components/Shared/SafeArea";
import SearchBar from "../../Components/SearchBar";

const BidProduct = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getData = async () => {
    try {
      const res = await BidderApi.get("/products/bid/");
      setProducts(res.data.data.allProducts);
      setFilteredProducts(res.data.data.allProducts);
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
        <FlatList
          numColumns={2}
          style={styles.container}
          data={filteredProducts}
          ListHeaderComponent={Header}
          renderItem={({ item }) => {
            return <Card item={item} />;
          }}
        />
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
});

export default BidProduct;
