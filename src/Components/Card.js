import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Card({ item }) {
  const handleProductPress = (product) => {
    navigation.navigate('Product', { product });
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
                ? `http://192.168.10.2:5000/${item.images[0]}`
                : 'https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg',
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
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    width: '45%',
    margin: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  imageContainer: {
    height: 170,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    padding: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'green',
  },
  cityText: {
    fontSize: 12,
    color: '#aaa',
  },
});
