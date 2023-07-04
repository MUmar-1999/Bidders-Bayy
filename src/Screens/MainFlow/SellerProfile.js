import { useState, useLayoutEffect, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Linking } from "react-native";
import BidderApi from "../../api/BidderApi";
import { AirbnbRating } from "@rneui/themed";
import { Color } from "../../Components/Shared/Color";
import { normalizeImage } from "../../Utils/functions";
import Card from "../../Components/Card";
import SafeArea from "../../Components/Shared/SafeArea";

const SellerProfile = ({ route, navigation }) => {
  const [products, setProducts] = useState([]);
  const [rating, setRating] = useState(0);
  const { sellerProfile } = route.params;

  useEffect(() => {
    getData();
    getRating();
  }, [sellerProfile]);

  async function getRating() {
    try {
      const { data } = await BidderApi.get(
        `/rating/${sellerProfile.userId._id}`
      );
      setRating(data.data[0]?.avgRating || 0);
    } catch (err) {
      console.error("Rating Error:::", err);
    }
  }
  async function setUserRating(rate) {
    try {
      const { data } = await BidderApi.post("/rating/", {
        sellerId: `${sellerProfile.userId._id}`,
        rating: rate,
      });
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
      // console.log("Seller Product LIST::", JSON.stringify(res.data, null, 2));
      setProducts(res.data.data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePhoneNumberPress = () => {
    const phoneNumber = sellerProfile.userId.phoneNo;
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <SafeArea>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        numColumns={2}
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              <Image
                source={{
                  uri: normalizeImage(sellerProfile.userId.dp || "/dp"),
                }}
                style={styles.profileImage}
              />

              <Text style={styles.name}>
                {sellerProfile.userId.firstName} {sellerProfile.userId.lastName}
              </Text>
              <Text style={styles.bio} onPress={handlePhoneNumberPress}>
                {sellerProfile.userId.phoneNo}
              </Text>
              <AirbnbRating
                defaultRating={rating}
                showRating={false}
                size={25}
                onFinishRating={setUserRating}
              />
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
        renderItem={({ item }) => <Card item={item} isFeatured={true} />}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    backgroundColor: Color.white,
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
