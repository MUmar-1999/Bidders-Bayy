import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Card from "../../Components/Card";
import BidderApi from "../../api/BidderApi";
import SafeArea from "../../Components/Shared/SafeArea";
import SearchBar from "../../Components/SearchBar";
const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getData = async () => {
    try {
      const res = await BidderApi.get("/products/bid/");
      setProducts(res.data.data.allProducts);
      setFilteredProducts(res.data.data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [navigation])
  );

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
      setSearchQuery(text);
    } else {
      setFilteredProducts(products);
      setSearchQuery(text);
    }
  };
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
    useCallback(() => {
      getData();
    }, [navigation])
  );

  function Header() {
    return (
      <View>
        <View>
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
    <SafeArea>
      <SearchBar value={searchQuery} onChange={filtered} />
      <KeyboardAvoidingView>
        <FlatList
          numColumns={2}
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
