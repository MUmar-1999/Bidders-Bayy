import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import BidderApi from '../../api/BidderApi';
import Card from '../../Components/Card';

const SellerProfile = ({ route }) => {
  const [products, setProducts] = useState([]);
  const { sellerProfile } = route.params;
  // console.log(sellerProfile);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await BidderApi.get(
        `/product/user_product/${sellerProfile.userId._id}`
      );
      console.log('Seller Product LIST::', JSON.stringify(res, null, 2));
      setProducts(res.data.data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            {/* <Text style={styles.location}>{sellerProfile.location}</Text>
      <Text style={styles.rating}>Rating: {sellerProfile.rating}</Text> */}
          </View>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 25,
              fontWeight: '400',
            }}
          >
            Seller Products
          </Text>
        </>
      }
      renderItem={({ item, index }) => {
        return <Card item={item} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
});

export default SellerProfile;
