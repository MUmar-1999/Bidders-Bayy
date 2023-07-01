import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getTimeDifference, normalizeImage } from "../Utils/functions";
import { Color } from "./Shared/Color";
import { useSelector } from "react-redux";

function Comment({ item }) {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <View style={styles.dialogBox}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={
              item.userId.dp
                ? {
                    uri: normalizeImage(item.userId.dp),
                  }
                : require("../Images/dp.png")
            }
          />
          {item.userId._id && (
            <View style={styles.sellerBadgeContainer}>
              <Text style={styles.sellerBadgeText}>Seller</Text>
            </View>
          )}
        </View>
        <View style={styles.textContainer}>
          <View style={styles.nameTime}>
            <Text
              style={styles.profileTitle}
            >{`${item.userId.firstName} ${item.userId.lastName}`}</Text>
            <Text style={styles.timeStamp}>
              {getTimeDifference(item.timestamp)}
            </Text>
          </View>
          <Text style={styles.commentText}>{item.comment}</Text>
        </View>
      </View>
    </View>
  );
}

export default Comment;

const styles = StyleSheet.create({
  dialogBox: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    elevation: 2,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  sellerBadgeContainer: {
    backgroundColor: Color.grey,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  sellerBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  nameTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  timeStamp: {
    fontSize: 13,
    color: Color.grey,
  },
  commentText: {
    fontSize: 16,
    paddingLeft: 5,
  },
});
