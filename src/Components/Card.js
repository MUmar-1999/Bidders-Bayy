import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Color } from "./Shared/Color";
import { normalizeImage } from "../Utils/functions";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Count from "./Count";

function Card({ item, isFeatured }) {
  const { userInfo } = useSelector((state) => state.auth);
  const MAX_TITLE_LENGTH = 12;
  const truncatedTitle = item.title;
  // .length > MAX_TITLE_LENGTH
  // ? `${item.title.substring(0, MAX_TITLE_LENGTH)}...`
  // : item.title;
  const navigation = useNavigation();

  const handleProductPress = (product) => {
    navigation.navigate("Product", { product });
  };

  const [favorites, setFavorites] = useState([]);
  const [check, setCheck] = useState(0);
  useEffect(() => {
    setCheck(0);
    getData(item);
    // console.log("HELLO", JSON.stringify(item, null, 2));
  }, [item]);

  const getData = async (p) => {
    try {
      const res = await BidderApi.get("/favorite/");
      setFavorites(res.data.FavoritePosts);
      if (res) {
        favorites.map((item) => {
          if (item._id == p._id) {
            setCheck(1);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addfav = async (postId) => {
    try {
      const res = await BidderApi.post("/favorite/", { postId });
    } catch (error) {
      console.log(error.res);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handleProductPress(item)}
      style={styles.cardContainer}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              item.images && item.images.length > 0
                ? normalizeImage(item.images[0])
                : "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        {item.productType == "Bidding Item" ? (
          <View style={styles.countContainer}>
            <Count
              time={item.createdAt}
              style={{
                fontSize: 10,
                color: "black",
                fontWeight: "bold",
                width: "100%",
                paddingVertical: 5,
              }}
              style2={{
                fontSize: 12,
                color: "red",
              }}
            />
          </View>
        ) : null}
        {userInfo._id === item.userId._id ? (
          <View style={styles.featuredContainer}>
            {/* <Text style={styles.featuredText}>FEATURED</Text> */}
            <Text style={styles.featuredText}>
              {" "}
              {item.StatusOfActive ? "Active" : "Not Active"}
            </Text>
          </View>
        ) : null}
        {item.featured !== undefined ? (
          <View style={styles.trueContainer}>
            <Text style={styles.featuredText}>FEATURED</Text>
          </View>
        ) : null}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={{ width: "92%" }}>
            <Text style={styles.titleText} numberOfLines={1}>
              {truncatedTitle}
            </Text>
          </View>
          <View style={{ width: "20%", marginTop: 1.2 }}>
            <TouchableOpacity onPress={() => addfav(item._id)}>
              {check !== 0 ? (
                <AntDesign name="heart" size={20} color={Color.black} />
              ) : (
                <AntDesign name="hearto" size={20} color={Color.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Rs. {item.productPrice}</Text>

          {item.userId ? (
            <Text style={styles.cityText}>{item.userId.currentCity}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    width: "45.5%",
    margin: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 3,
  },
  imageContainer: {
    height: 170,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  textContainer: {
    padding: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: Color.black,
    paddingLeft: 5,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#52616B",
  },
  cityText: {
    fontSize: 12,
    color: "#aaa",
  },

  featuredContainer: {
    position: "absolute",
    top: -165,
    right: 5,
    backgroundColor: Color.blue,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    elevation: 6,
  },
  countContainer: {
    position: "absolute",
    top: -165,
    left: 5,
    backgroundColor: Color.white,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    elevation: 6,
    width: "45%",
    height: 30,
  },
  trueContainer: {
    position: "absolute",
    bottom: 75,
    right: 5,
    backgroundColor: Color.black,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    elevation: 6,
  },
  featuredText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Color.white,
  },
});
