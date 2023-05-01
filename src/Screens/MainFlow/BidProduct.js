import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import BidderApi from "../../api/BidderApi";

const BidProduct = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [value, setValue] = React.useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await BidderApi.get("/product/bid/");
      console.log(
        "HOME LSIT::",
        JSON.stringify(res.data.data.allProducts[0], null, 2)
      );
      setProducts(res.data.data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleProductPress = (product) => {
    navigation.navigate("Product", { product });
  };
  return (
    <View>
      <FlatList
        numColumns={2}
        data={filteredProducts}
        ListHeaderComponent={
          <>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 16,
                  marginTop: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                  overflow: "hidden",
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
                <TextInput
                  placeholder="Search products..."
                  value={searchQuery}
                  onChangeText={(query) => setSearchQuery(query)}
                  style={{
                    flex: 1,
                    height: 45,
                    paddingHorizontal: 16,
                    fontSize: 16,
                  }}
                />
                <TouchableOpacity
                  onPress={() => setSearchQuery("")}
                  style={{
                    backgroundColor: "#ddd",
                    borderRadius: 5,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    marginRight: 3,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>X</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={{
                fontSize: 20,
                marginLeft: 20,
                fontWeight: "bold",
                marginTop: 10,
              }}
            >
              Bidding Items
            </Text>
          </>
        }
        renderItem={({ item, index }) => {
          return (
            <View
              key={item._id} // added unique key prop
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
                    <Text style={{ fontSize: 12, color: "#aaa" }}>
                      {item.city}
                    </Text>
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

export default BidProduct;
