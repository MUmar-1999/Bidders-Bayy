import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BidderApi from "../../api/BidderApi";
import { AirbnbRating } from '@rneui/themed';

const SellerProfile = ({ route, navigation }) => {
  const [products, setProducts] = useState([]);
  const [rating, setRating] = useState(0);
  const { sellerProfile } = route.params;
  // console.log(JSON.stringify(sellerProfile, null, 2));
  console.log("R::", rating);


  useEffect(() => {
    getData();
    getRating();
  }, []);
  async function getRating() {
    try {
      const { data } = await BidderApi.get(`/rating/${sellerProfile.userId._id}`)
      console.log("RATING:::", data);
      setRating(data.data[0].avgRating)
    } catch (err) {
      console.error("Rating Error:::", err);
    }
  }
  async function setUserRating(rate) {
    try {
      const { data } = await BidderApi.post('/rating/', {
        sellerId: `${sellerProfile.userId._id}`,
        rating: rate
      })
      console.log("SET::RATING:::", data);
      getRating();
    } catch (err) {
      console.error("SET::Rating Error:::", err);
    }
  }
  const getData = async () => {
    try {
      const res = await BidderApi.get(
        `/products/user_product/${sellerProfile.userId._id}`
      );
      // console.log("Seller Product LIST::", JSON.stringify(res, null, 2));
      setProducts(res.data.data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProductPress = (product) => {
    navigation.navigate("Product", { product });
  };
  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        numColumns={2}
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              <Image
                source={{ uri: sellerProfile.userId.dp }}
                style={styles.profileImage}
              />
              <Text style={styles.name}>
                {sellerProfile.userId.firstName} {sellerProfile.userId.lastName}
              </Text>
              <Text style={styles.bio}>{sellerProfile.userId.phoneNo}</Text>
              <AirbnbRating defaultRating={rating} showRating={false} size={25} onFinishRating={setUserRating} />
              {/* <Text style={styles.location}>{sellerProfile.location}</Text>
              <Text style={styles.rating}>Rating: {sellerProfile.rating}</Text> */}
            </View>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 25,
                fontWeight: "400",
              }}
            >
              Seller Products
            </Text>
          </>
        }
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                backgroundColor: "white",
                width: "45%",
                margin: 8,
                borderRadius: 10,
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
              <TouchableOpacity onPress={() => handleProductPress(item)}>
                <View
                  style={{
                    height: 170,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={{
                      uri:
                        item.images && item.images.length > 0
                          ? `http://192.168.10.2:5000/${item.images[0]}`
                          : "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg",
                    }}
                    style={{ height: "100%", width: "100%" }}
                  />
                </View>
                <View style={{ padding: 12 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 8,
                    }}
                  >
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "green",
                      }}
                    >
                      Rs. {item.productPrice}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#aaa" }}>
                      {item.createdAt.substring(0, 10)}
                    </Text>
                    {/* <Text style={{ fontSize: 12, color: "#aaa" }}>
                            {item.currenCity}
                          </Text> */}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SellerProfile;
