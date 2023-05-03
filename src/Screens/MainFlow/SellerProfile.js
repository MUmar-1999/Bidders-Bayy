import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import BidderApi from "../../api/BidderApi";
import { FlatList } from "react-native-gesture-handler";

const SellerProfile = ({ route }) => {
  const [products, setProducts] = useState([]);
  const { sellerProfile } = route.params;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await BidderApi.get("/product/bid/");
      console.log(
        "Seller Product LIST::",
        JSON.stringify(res.data.data.allProducts[0], null, 2)
      );
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
      <View style={styles.container}>
        <Image
          source={{ uri: sellerProfile.userId.dp }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {sellerProfile.userId.firstName} {sellerProfile.userId.lastName}
        </Text>
        <Text style={styles.bio}>{sellerProfile.userId.phoneNo}</Text>
        {/* <Text style={styles.location}>{sellerProfile.location}</Text>
      <Text style={styles.rating}>Rating: {sellerProfile.rating}</Text> */}
      </View>
      <FlatList
        numColumns={2}
        ListHeaderComponent={
          <>
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
                        item.sellerProfile.images &&
                        item.sellerProfile.images.length > 0
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
                    {item.sellerProfile.title}
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
                      Rs. {item.sellerProfile.productPrice}
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
