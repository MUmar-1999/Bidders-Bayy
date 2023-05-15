import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import { Color } from "./Shared/Color";
import { normalizeImage } from "../Utils/functions";
import { useEffect } from "react";
import { useState } from "react";

function Card({ item }) {
  const MAX_TITLE_LENGTH = 15;
  const truncatedTitle =
    item.title.length > MAX_TITLE_LENGTH
      ? `${item.title.substring(0, MAX_TITLE_LENGTH)}...`
      : item.title;
  const navigation = useNavigation();

  const handleProductPress = (product) => {
    navigation.navigate("Product", { product });
  };
  // console.log('IMAGE:::', JSON.stringify(item.postId, null, 2));

  const [favorites, setFavorites] = useState([]);
  const [check, setCheck] = useState(0);
  useEffect(() => {
    setCheck(0);
    getData(item);
  }, [item]);

  const getData = async (p) => {
    // console.log("mein chal rha hun");
    try {
      const res = await BidderApi.get("/favorite/");
      // console.log("Fav::", JSON.stringify(res.data.FavoritePosts, null, 2));
      setFavorites(res.data.FavoritePosts);
      if (res) {
        favorites.map((item) => {
          if (item.postId._id == p._id) {
            console.log("mae chala");
            console.log(p.title);
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
      // console.log("Fav::", JSON.stringify(res, null, 2));
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
        <Text style={styles.titleText}>{truncatedTitle}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Rs. {item.productPrice}</Text>

          {item.userId ? (
            <Text style={styles.cityText}>{item.userId.currentCity}</Text>
          ) : null}
          <TouchableOpacity onPress={() => addfav(item._id)}>
            {check !== 0 ? (
              <EvilIcons name="heart" size={24} color="red" />
            ) : (
              <EvilIcons name="heart" size={24} color={Color.black} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    width: "45%",
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
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#52616B",
  },
  cityText: {
    fontSize: 10,
    color: "#aaa",
  },
});
