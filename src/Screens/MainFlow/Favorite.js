import { View, Text, Image, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import BidderApi from "../../api/BidderApi";
import { EvilIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import SafeArea from "../../Components/Shared/SafeArea";
import { Color } from "../../Components/Shared/Color";
const Favorite = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // console.log("mein chal rha hun");
    try {
      const res = await BidderApi.get("/favorite/");
      console.log("Fav::", JSON.stringify(res.data.FavoritePosts, null, 2));
      setProducts(res.data.FavoritePosts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductPress = (product) => {
    // console.log(product);
    navigation.navigate("Product", { product });
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [navigation])
  );
  return (
    <SafeArea>
      <View>
        <FlatList
          numColumns={2}
          data={products}
          ListHeaderComponent={
            <>
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 20,
                  fontWeight: "bold",
                  marginTop: 10,
                }}
              >
                My Favorites
              </Text>
            </>
          }
          renderItem={({ item, index }) => {
            return (
              <View
                // key={item._id} // added unique key prop
                style={{
                  backgroundColor: Color.white,
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
                <TouchableOpacity
                  onPress={() => handleProductPress(item.postId)}
                >
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
                          item.postId.images && item.postId.images.length > 0
                            ? `http://192.168.10.2:5000/${item.postId.images[0]}`
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
                      {item.postId.title}
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
                          color: Color.black,
                        }}
                      >
                        Rs. {item.postId.productPrice}
                      </Text>
                      {item.postId.userId ? (
                        <Text style={{ fontSize: 12, color: "#aaa" }}>
                          {item.postId.userId.currentCity}
                        </Text>
                      ) : null}
                      <TouchableOpacity>
                        <EvilIcons name="heart" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </SafeArea>
  );
};

export default Favorite;
