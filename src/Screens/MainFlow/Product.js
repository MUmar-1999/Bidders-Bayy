import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

const Product = ({ route }) => {
  const { product } = route.params;
  console.log(product.userId.firstName);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleComment = () => {
    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{
              uri:
                product.images && product.images.length > 0
                  ? `http://192.168.10.2:5000/${product.images[0]}`
                  : "https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg",
            }}
            style={styles.image}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{product.title}</Text>
            <View style={styles.inspectionButtonContainer}>
              <View style={styles.inspectionButton}>
                <Text style={styles.buttonText}>Inspection</Text>
              </View>
            </View>
          </View>
          {product.productType === "Bidding Item" ? (
            <View>
              <Text style={styles.price}>
                Base Price: Rs. {product.productPrice}
              </Text>
              <View style={styles.bidContainer}>
                <TextInput
                  placeholder="Enter bid amount"
                  keyboardType="numeric"
                />
                <TouchableOpacity style={styles.bidButton}>
                  <Text style={styles.bidButtonText}>Place Bid</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Text style={styles.price}>Price: Rs. {product.productPrice}</Text>
          )}

          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.sellerContainer}>
            <View style={styles.sellerDetails}>
              <Image
                source={require("../../Images/name.png")}
                style={styles.sellerNameIcon}
              />
              <Text style={styles.sellerName}>
                {product.userId.firstName} {product.userId.lastName}
              </Text>
            </View>
            <View style={styles.sellerDetails}>
              <Image
                source={require("../../Images/phone.png")}
                style={styles.sellerPhoneIcon}
              />
              <Text style={styles.sellerPhone}>{product.userId.phoneNo}</Text>
            </View>

            <View style={styles.commentContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment"
                value={comment}
                onChangeText={setComment}
              />
              <TouchableOpacity
                style={styles.commentButton}
                onPress={handleComment}
              >
                <Text style={styles.commentButtonText}>Post</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.commentTitle}>Comments:</Text>
            {comments.map((c, index) => (
              <Text key={index} style={styles.comment}>
                {c}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 5,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  inspectionButton: {
    backgroundColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "100%",
  },
  inspectionButtonContainer: {
    width: 100,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "left",
  },
  seller: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "left",
    fontWeight: "bold",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "70%",
    height: 40,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  commentButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  comment: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "left",
  },
  sellerContainer: {
    marginTop: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  sellerDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sellerNameIcon: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  sellerPhoneIcon: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  bidButton: {
    backgroundColor: "black",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginLeft: 20,
  },
  bidButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sellerName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  sellerPhone: {
    fontSize: 16,
  },
  bidContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  bidInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 10,
    paddingHorizontal: 10,
    width: 100,
  },
});

export default Product;
