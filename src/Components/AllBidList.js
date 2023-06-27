import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from "react-native";
import BidderApi from "../api/BidderApi";
import { Color } from "./Shared/Color";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";

function AllBidList({ id, user }) {
  const [allBid, setAllBid] = useState({ success: false });
  useEffect(() => {
    getBidData();
  }, []);
  async function getBidData() {
    try {
      const { data } = await BidderApi(`/bidding/${id}`);
      // const { data } = await BidderApi(`/bidding/6463bb3d82ce9b8ab4774c92`);
      // console.log("ALLBID:::", data.allBidsOfPost);
      setAllBid(data.allBidsOfPost);
    } catch (err) {
      console.error("ALLBID:::", err);
    }
  }
  function renderBid({ item, index }) {
    const handlePhoneNumberPress = () => {
      const phoneNumber = item.userId.phoneNo;
      Linking.openURL(`tel:${phoneNumber}`);
    };
    return (
      <View>
        <Text style={styles.heading}>Bid {index + 1}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>Name: </Text>
          <Text style={styles.data}>
            {item.userId.firstName} {item.userId.lastName}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>Bid Entered: </Text>
          <Text style={styles.data}>{item.bidingPrice}</Text>
        </View>

        {user && <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>Phone Number: </Text>
          <Text style={styles.data} onPress={handlePhoneNumberPress}>
            {item.userId.phoneNo}
          </Text>
        </View>}

      </View>
    );
  }

  function renderEmpty() {
    return (
      <View style={styles.indicatorContainer}>
        {allBid.success && allBid.allBidsOfPost.length === 0 ? (
          <Text style={{ color: "white" }}>NO BIDS</Text>
        ) : (
          <ActivityIndicator size="large" color={Color.white} />
        )}
      </View>
    );
  }
  useEffect(() => {
    // console.log("ALL BID DATA", allBid);
  }, [allBid]);
  return (
    <>
      <Text style={styles.title}>All Bids</Text>

      <FlatList
        data={allBid}
        renderItem={renderBid}
        ListEmptyComponent={renderEmpty}
        style={{ flex: 1 }}
      />
    </>
  );
}

export default AllBidList;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 26,
    color: Color.white,
  },
  indicatorContainer: {
    justifyContent: "center",
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
});
