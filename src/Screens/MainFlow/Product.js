import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Product = ({ route }) => {
  const { product } = route.params;

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleComment = () => {
    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn.mos.cms.futurecdn.net/kSUXaLsWD6dMQuXrSRYMKg-1200-80.jpg.webp",
        }}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <View style={styles.inspectionButton}>
          <Text style={styles.buttonText}>Inspection</Text>
        </View>
      </View>
      <Text style={styles.price}>Price: Rs. {product.productPrice}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.sellerContainer}>
        <Text style={styles.seller}>Seller:{product.seller}</Text>
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
});

export default Product;
