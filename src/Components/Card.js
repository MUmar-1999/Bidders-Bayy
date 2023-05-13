import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";

function Card({ item }) {
  const navigation = useNavigation();

  const handleProductPress = (product) => {
    navigation.navigate("Product", { product });
  };
  // console.log('IMAGE:::', item.images);
  function normalizeImage(imagePath) {
    const baseUrl = "http://192.168.10.2:5000";
    const normalizedImagePath = imagePath
      .replace(/\\/g, "/")
      .replace(/^\//, "");
    const imageUrl = `${baseUrl}/${normalizedImagePath}`;
    return imageUrl;
  }

  const addfav = async (postId) => {
    try {
      const res = await BidderApi.post("/favorite/", { postId });
      console.log("Fav::", JSON.stringify(res, null, 2));
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
        <Text style={styles.titleText}>{item.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Rs. {item.productPrice}</Text>

          {item.userId ? (
            <Text style={styles.cityText}>{item.userId.currentCity}</Text>
          ) : null}
          <TouchableOpacity onPress={() => addfav(item._id)}>
            <EvilIcons name="heart" size={24} color="#44c234" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#46434a",
    width: "45%",
    margin: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
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
    color: "white",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#44c234",
  },
  cityText: {
    fontSize: 12,
    color: "#aaa",
  },
});
