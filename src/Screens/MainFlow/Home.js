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
import Card from "../../Components/Card";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../Store/filterSlice";
import { FontAwesome } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const { subCategory, city, selectedRange } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      const res = await BidderApi.get("/payment-featured/featured_post/");
      const feature = res.data.data.filter(
        (product) => product.postId.StatusOfActive === true
      );
      setProducts(feature);
      setFilteredProducts(feature);
      // console.log("filter", res.data.data);
    } catch (error) {
      // console.log(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, [navigation])
  );
  useEffect(() => {
    filtered({ text: search, subCategory, city, price: selectedRange });
  }, [search, subCategory, city, selectedRange]);
  function filtered({ text, price, subCategory, city }) {
    const filteredProducts = products.reduce(function (acc, item) {
      item = item.postId ?? item;
      if (text) {
        const itemData = item.title.toUpperCase();
        const textData = text.toUpperCase();
        if (!itemData.includes(textData)) {
          return acc;
        }
      }

      // Apply additional filters if other props are received

      if (price) {
        if (!(item.productPrice <= price)) {
          return acc;
        }
      }

      if (subCategory) {
        if (item.subcategoryId !== subCategory) {
          return acc;
        }
      }

      if (city) {
        if (item.userId.currentCity !== city) {
          return acc;
        }
      }

      return acc.concat(item);
    }, []);

    setFilteredProducts(filteredProducts);
  }
  const handleBidPress = (bidproduct) => {
    navigation.navigate("BidProduct", { bidproduct });
    dispatch(reset());
  };
  const handleFixPress = (fixproduct) => {
    navigation.navigate("FixProduct", { fixproduct });
    dispatch(reset());
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [navigation])
  );

  function Header() {
    return (
      <View>
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
  }

  return (
    <SafeArea>
      <KeyboardAvoidingView style={styles.container}>
        <SearchBar search={search} onChange={setSearch} />

        <FlatList
          numColumns={2}
          style={styles.container}
          data={filteredProducts}
          ListHeaderComponent={Header}
          renderItem={({ item }) => {
            return (
              <Card item={item.postId ?? item} date={item?.postId?.createdAt} />
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
});
