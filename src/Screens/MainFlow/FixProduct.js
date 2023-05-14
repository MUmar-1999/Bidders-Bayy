import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

import BidderApi from "../../api/BidderApi";
import Card from "../../Components/Card";
import SafeArea from "../../Components/Shared/SafeArea";
import SearchBar from "../../Components/SearchBar";

const FixProduct = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getData = async () => {
    try {
      const res = await BidderApi.get("/products/used/");
      setProducts(res.data.data.allProducts);
      setFilteredProducts(res.data.data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [navigation])
  );

  const filterProducts = (text) => {
    if (text) {
      const newData = products.filter((item) => {
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

  const renderHeader = () => {
    return (
      <View>
        <SearchBar onChange={(txt) => filterProducts(txt)} />

        <Text style={styles.headerText}>Fixed Price Items</Text>
      </View>
    );
  };

  const renderCard = ({ item }) => {
    return <Card item={item} />;
  };

  return (
    <SafeArea>
      <KeyboardAvoidingView style={styles.container}>
        <FlatList
          numColumns={2}
          style={styles.flatList}
          data={filteredProducts}
          ListHeaderComponent={renderHeader}
          renderItem={renderCard}
        />
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default FixProduct;
