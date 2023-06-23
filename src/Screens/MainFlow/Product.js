import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import BidderApi from "../../api/BidderApi";
import FormInputFieldd from "../../Components/Form Control/FormInputFieldd";
import SafeArea from "../../Components/Shared/SafeArea";
import { Color } from "../../Components/Shared/Color";
import { BASE_URL } from "../../api/BidderApi";
import { Modal, Portal, Button, PaperProvider } from "react-native-paper";
import AllBidList from "../../Components/AllBidList";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Comment from "../../Components/Comment";
import Count from "../../Components/Count";

const Product = ({ route, navigation }) => {
  const { control, handleSubmit } = useForm();
  const { product } = route.params;
  console.log("Nice jee", product.createdAt);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [highestBid, setHighestBid] = useState(0);
  const { userInfo } = useSelector((state) => state.auth);

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(!visible);

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

  const featurePress = (featurePost) => {
    navigation.navigate("FeaturePost", { featurePost });
  };
  const inspectionPress = (Inspection) => {
    navigation.navigate("Inspection", { Inspection });
  };
  const editPress = (EditPost) => {
    navigation.navigate("EditPost", { EditPost });
  };

  async function handlePlaceBid({ bid }) {
    try {
      const { data } = await BidderApi.post("/bidding/", {
        bidingPrice: bid,
        productId: product._id,
      });
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
      setHighestBid(data.highestBid);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeArea>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <PaperProvider>
          <View style={styles.container}>
            <FlatList
              data={comments.sort(
                (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Comment item={item} />}
              ListHeaderComponent={
                <View style={{ flex: 1 }}>
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
                    {product.userId._id === userInfo._id ? (
                      <View style={styles.inspectionButtonContainer}>
                        <View style={styles.inspectionButton}>
                          <Text
                            style={styles.buttonText}
                            onPress={() => featurePress(product)}
                          >
                            Feature Post
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.inspectionButtonContainer}>
                        <View style={styles.inspectionButton}>
                          <Text
                            style={styles.buttonText}
                            onPress={() => inspectionPress(product)}
                          >
                            Inspection
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                  {product.productType === "Bidding Item" &&
                  product.userId._id !== userInfo._id ? (
                    <View>
                      <Text style={styles.price}>
                        Base Price: Rs. {product.productPrice}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          flexWrap: "wrap",
                        }}
                      >
                        <Text style={styles.price}>
                          Highest Bid: Rs. {highestBid}
                        </Text>
                        <View
                          style={{
                            width: "100%",
                          }}
                        >
                          <Text style={styles.time}>
                            {/* <MaterialCommunityIcons
                              name="clock-outline"
                              size={16}
                              color="black"
                            />{" "} */}
                            <Count time={product.createdAt} />
                          </Text>
                        </View>
                      </View>
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
                                highestBid === 0
                                  ? value > product.productPrice ||
                                    `Bid must be greater than Rs.${product.productPrice}`
                                  : value > highestBid ||
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
                    <>
                      <Text style={styles.price}>
                        Price: Rs. {product.productPrice}
                      </Text>
                    </>
                  )}
                  {product.userId._id === userInfo._id && (
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 8,
                        marginBottom: -10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => editPress(product)}
                        style={styles.uploadButton}
                      >
                        <Entypo name="edit" size={18} color="white" />
                        <Text style={styles.uploadButtonText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.uploadButton}>
                        <MaterialIcons name="delete" size={18} color="white" />
                        <Text style={styles.uploadButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {product.productType === "Bidding Item" && (
                    <>
                      <Portal>
                        <Modal
                          visible={visible}
                          onDismiss={showModal}
                          contentContainerStyle={styles.modal}
                        >
                          <AllBidList id={product._id} />
                        </Modal>
                      </Portal>
                      <TouchableOpacity
                        onPress={showModal}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: Color.black,
                          borderRadius: 10,
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                          marginTop: 6,
                          width: "100%",
                          height: 45,
                          alignSelf: "center",
                        }}
                      >
                        <Entypo name="eye" size={24} color="white" />
                        <Text style={styles.viewBidText}>View Bids</Text>
                      </TouchableOpacity>
                    </>
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
                      <Text style={styles.sellerPhone}>
                        {product.userId.phoneNo}
                      </Text>
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
                  </View>
                </View>
              }
              showsVerticalScrollIndicator={false}
            />
          </View>
        </PaperProvider>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: Color.white,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
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
    backgroundColor: Color.black,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "100%",
  },
  inspectionButtonContainer: {
    width: 100,
    justifyContent: "flex-start",
  },
  buttonText: {
    alignSelf: "center",
    color: Color.white,
    fontWeight: "bold",
    fontSize: 12,
  },
  price: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },

  time: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    width: "100%",
    paddingVertical: 5,
  },

  description: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 6,
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
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  BidContainer: {
    flexDirection: "row",
    marginTop: -30,
  },
  bidButton: {
    backgroundColor: Color.black,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    width: 100,
    height: 40,
    marginLeft: 10,
  },
  bidButtonText: {
    color: Color.white,
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
    backgroundColor: Color.black,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  commentButtonText: {
    color: Color.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  commentText: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 8,
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
  modal: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    padding: 20,
    backgroundColor: Color.black,
    maxHeight: 400,
    width: "90%",
    borderRadius: 20,
  },
  uploadButton: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.black,
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "40%",
    height: 35,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Color.white,
    marginLeft: 10,
  },
  viewBidText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Color.white,
    marginLeft: 10,
  },
});

export default Product;
