import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
<<<<<<< HEAD
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { SegmentedButtons, Surface } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";
=======
  FlatList,
} from 'react-native';
import { useEffect, useState } from 'react';
import { SegmentedButtons, Surface } from 'react-native-paper';
import BidderApi from '../../api/BidderApi';
import Card from '../../Components/Card';
>>>>>>> 26c05f2eaa1ef7b06812c966b7e7e836f7eec60e

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await BidderApi.get('/product/bid/');
      //! Remove Console
      console.log(
        'HOME LSIT::',
        JSON.stringify(res.data.data.allProducts[0].userId.currentCity, null, 2)
      );
      setProducts(res.data.data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleBidPress = (bidproduct) => {
    navigation.navigate('BidProduct', { bidproduct });
  };
  const handleFixPress = (fixproduct) => {
    navigation.navigate('FixProduct', { fixproduct });
  };

  return (
    <View>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        ListHeaderComponent={
          <>
            <View>
              <View style={styles.searchContainer}>
                <TextInput
                  placeholder="Search products..."
                  value={searchQuery}
                  onChangeText={(query) => setSearchQuery(query)}
                  style={styles.searchInput}
                />
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  style={styles.searchButton}
                >
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>X</Text>
                </TouchableOpacity>
              </View>

              <Image
                source={require('../Images/Banner.png')}
                style={styles.bannerImage}
              />
            </View>
            <View style={styles.segmentContainer}>
              <TouchableOpacity
                onPress={() => handleBidPress()}
                style={styles.segmentButton}
              >
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('./../Images/Bid.webp')}
                    style={{ borderRadius: 40, width: 80, height: 80 }}
                  />
                  <Text style={styles.buttonText}>Bidding Products</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFixPress()}
                style={styles.segmentButton}
              >
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('./../Images/purchase.webp')}
                    style={{ borderRadius: 40, width: 80, height: 80 }}
                  />
                  <Text style={styles.buttonText}>Fix Price Products</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.subHeader}>Products</Text>
          </>
        }
<<<<<<< HEAD
        renderItem={({ item, index }) => {
          console.log("item value", item);
          return (
            <View
              // key={item._id} // added unique key prop
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

                    {item.userId ? (
                      <Text style={{ fontSize: 12, color: "#aaa" }}>
                        {item.userId.currentCity}
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
=======
        renderItem={({ item }) => {
          return <Card item={item} />;
>>>>>>> 26c05f2eaa1ef7b06812c966b7e7e836f7eec60e
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  searchInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: '91.5%',
    height: 160,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  segmentContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  segmentButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 13,
    color: '#444',
    marginBottom: 5,
    fontWeight: '300',
  },
  subHeader: {
    fontSize: 20,
    marginLeft: 25,
    fontWeight: '400',
  },
});
