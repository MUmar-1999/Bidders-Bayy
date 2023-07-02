import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import BidderApi from "../../api/BidderApi";
import SafeArea from "../../Components/Shared/SafeArea";
import SearchBar from "../../Components/SearchBar";
import Card2 from "../../Components/Card2";
import Card from "../../Components/Card";
const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getData = async () => {
    try {
      const res = await BidderApi.get("/payment-featured/featured_post/");
      setProducts(res.data.data);
      setFilteredProducts(res.data.data);
      // console.log("filter", res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [navigation])
  );
  function filtered(text, priceRange, category, subCategory, city) {
    const newData = products.reduce(function (acc, item) {
      const itemData = item.postId.title
        ? item.postId.title.toUpperCase()
        : "".toUpperCase();
      const textData = text ? text.toUpperCase() : "";
      const priceData = item.price <= priceRange;
      const categoryData = category ? item.category === category : true;
      const subCategoryData = subCategory
        ? item.subCategory === subCategory
        : true;
      const cityData = city ? item.city === city : true;

      if (
        itemData.indexOf(textData) > -1 &&
        priceData &&
        categoryData &&
        subCategoryData &&
        cityData
      ) {
        acc.push(item);
      }

      return acc;
    }, []);

    setFilteredProducts(newData.length > 0 ? newData : products);
  }
  const handleBidPress = (bidproduct) => {
    navigation.navigate("BidProduct", { bidproduct });
  };
  const handleFixPress = (fixproduct) => {
    navigation.navigate("FixProduct", { fixproduct });
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [navigation])
  );

  function Header() {
    return (
      <View>
        <SearchBar
          onChange={(txt, priceRange, category, subCategory, city) =>
            filtered(txt, priceRange, category, subCategory, city)
          }
        />
        <Image
          source={require("../../Images/Banner1.png")}
          style={styles.banner}
        />
        <View style={styles.segmentContainer}>
          <TouchableOpacity
            onPress={() => handleBidPress()}
            style={styles.segmentButton}
          >
            <Image
              source={require("../../Images/Bidd.png")}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Bidding Products</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFixPress()}
            style={styles.segmentButton}
          >
            <Image
              source={require("../../Images/Fix.png")}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Fix Price Products</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 20,
            marginLeft: 25,
            fontWeight: "400",
          }}
        >
          Feature Products
        </Text>
      </View>
    );
  }

  return (
    <SafeArea>
      <KeyboardAvoidingView style={styles.container}>
        <FlatList
          numColumns={2}
          style={styles.container}
          data={filteredProducts}
          ListHeaderComponent={Header}
          renderItem={({ item }) => {
            return (
              <Card
                item={item.postId}
                date={
                  item.postId.productType == "Bidding Item"
                    ? item.postId.createdAt
                    : null
                }
              />
            );
          }}
        />
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: "91.5%",
    height: 170,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  segmentContainer: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  segmentButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    alignItems: "center",
  },
  buttonImage: {
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 13,
    color: "#444",
    marginBottom: 5,
    fontWeight: "300",
  },
});
