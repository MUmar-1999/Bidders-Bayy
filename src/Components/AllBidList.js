import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Linking,
  FlatList,
} from "react-native";
import BidderApi from "../api/BidderApi";
import { Color } from "./Shared/Color";

function AllBidList({ id, user }) {
  const [allBid, setAllBid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBidData();
  }, []);

  async function getBidData() {
    try {
      const { data } = await BidderApi(`/bidding/${id}`);
      setAllBid(data.allBidsOfPost);
    } catch (err) {
      console.error("Error fetching bid data:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const handlePhoneNumberPress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const renderBid = ({ item, index }) => (
    <View>
      <Text style={styles.heading}>Bid {index + 1}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Name: </Text>
        <Text style={styles.data}>
          {item.userId.firstName} {item.userId.lastName}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Bid Entered: </Text>
        <Text style={styles.data}>{item.bidingPrice}</Text>
      </View>

      {user && (
        <View style={styles.row}>
          <Text style={styles.label}>Phone Number: </Text>
          <Text
            style={styles.data}
            onPress={() => handlePhoneNumberPress(item.userId.phoneNo)}
          >
            {item.userId.phoneNo}
          </Text>
        </View>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.indicatorContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Color.white} />
      ) : (
        <Text style={styles.emptyText}>NO BIDS</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Bids</Text>
      <FlatList
        data={allBid}
        renderItem={renderBid}
        ListEmptyComponent={renderEmpty}
        style={styles.listContainer}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
    color: Color.white,
    marginVertical: 10,
    marginLeft: 10,
  },
  listContainer: {
    flex: 1,
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "white",
  },
  heading: {
    fontWeight: "bold",
    color: "white",
    marginRight: 5,
    marginTop: 5,
  },
  data: {
    color: "white",
    marginRight: 25,
  },
  label: {
    fontWeight: "bold",
    color: "white",
  },
  row: {
    flexDirection: "row",
    marginVertical: 5,
  },
});

export default AllBidList;
