import React, { useState, useEffect } from "react";
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

import { useForm } from "react-hook-form";
import BidderApi from "../../api/BidderApi";
import FormInputFieldd from "../../Components/Form Control/FormInputFieldd";
import SafeArea from "../../Components/Shared/SafeArea";
import { Color } from "../../Components/Shared/Color";

const Product = ({ route, navigation }) => {
  const { control, handleSubmit } = useForm();
  const { product } = route.params;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [highestBid, setHighestBid] = useState(0);

  console.log("PRODUCT:::", product._id);
  const getComments = async () => {
    try {
      const res = await BidderApi.get(`/comment/${product._id}`);
      // console.log(
      //   "GET COMMENT::",
      //   JSON.stringify(res.data.data.allCommentsOfPost, null, 2)
      // );
      setComments(res.data.data.allCommentsOfPost);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (postId, comment) => {
    // console.log(comment);
    // console.log(postId);
    try {
      const res = await BidderApi.post("/comment/", { postId, comment });
      // console.log("COMMENT::", JSON.stringify(res, null, 2));
      if (res) {
        getComments();
        setComment("");
      }
    } catch (error) {
      console.log(error.res);
    }
  };
  const handleSellerPress = (sellerProfile) => {
    navigation.navigate("SellerProfile", { sellerProfile });
  };

  async function handlePlaceBid({ bid }) {
    try {
      const { data } = await BidderApi.post("/bidding/", {
        bidingPrice: bid,
        productId: product._id,
      });
      console.log("BID POST DATA:::", JSON.stringify(data, null, 2));
      if (data.success) {
        getBid();
      }
    } catch (error) {
      console.error("BID ERRORR::", error);
    }
  }

  useEffect(() => {
    getBid();
    getComments();
  }, []);

  const getBid = async () => {
    try {
      const { data } = await BidderApi.get(`/bidding/${product._id}`);
      console.log("Bidding::", JSON.stringify(data, null, 2));
      setHighestBid(data.highestBid);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeArea>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
            <Image
              source={{
                uri:
                  product.images && product.images.length > 0
                    ? `${BASE_URL}/${product.images[0]}`
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
                <Text style={styles.price}>Highest Bid: Rs. {highestBid}</Text>
                <View style={styles.BidContainer}>
                  <View
                    style={{
                      justifyContent: "flex-start",
                      maxWidth: 100,
                    }}
                  >
                    <FormInputFieldd
                      name={"bid"}
                      control={control}
                      placeholder={"Enter Bid"}
                      keyboardType={"number-pad"}
                      rule={{
                        required: "Bid cannot be empty.",
                        validate: (value) =>
                          value > highestBid ||
                          `Bid must be greater than Rs.${highestBid}`,
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.bidButton}
                    onPress={handleSubmit(handlePlaceBid)}
                  >
                    <Text style={styles.bidButtonText}>Place Bid</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Text style={styles.price}>
                Price: Rs. {product.productPrice}
              </Text>
            )}

            <Text style={styles.description}>{product.description}</Text>
            <View style={styles.sellerContainer}>
              <View style={styles.sellerDetails}>
                <Image
                  source={require("../../Images/name.png")}
                  style={styles.sellerNameIcon}
                />
                <Text
                  style={styles.sellerName}
                  onPress={() => handleSellerPress(product)}
                >
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
                  onPress={() => handleComment(product._id, comment)}
                >
                  <Text style={styles.commentButtonText}>Post</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.commentTitle}>Comments:</Text>
              {comments.map((c, index) => (
                <Text key={index} style={styles.comment}>
                  {c.comment}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: Color.white,
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
    marginTop: 15,
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
    marginRight: 10,
  },
  BidContainer: {
    flexDirection: "row",
    marginTop: -15,
  },
  bidButton: {
    backgroundColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    width: 100,
    height: 40,
    marginLeft: 10,
  },
  bidButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
    backgroundColor: Color.white,
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
  sellerName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  sellerPhone: {
    fontSize: 16,
  },
});

export default Product;
