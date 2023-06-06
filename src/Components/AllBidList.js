import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import BidderApi from '../api/BidderApi';
import { Color } from './Shared/Color';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

function AllBidList({ id }) {
    const [allBid, setAllBid] = useState([])
    useEffect(() => {
        getBidData()
    }, [])
    async function getBidData() {
        try {
            // const { data } = await BidderApi(`/bidding/${id}`);
            const { data } = await BidderApi(`/bidding/6463bb3d82ce9b8ab4774c92`);
            console.log("ALLBID:::", data);
            setAllBid(data.allBidsOfPost);
        } catch (err) {
            console.error("ALLBID:::", err);
        }
    }
    function renderBid({ item }) {
        return (
            <Text>{item.bidingPrice}</Text>
        )
    }
    function renderEmpty() {
        return (
            <View style={styles.indicatorContainer}>
                <ActivityIndicator size="large" color={Color.white} />
            </View>
        )
    }
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
};

export default AllBidList;

const styles = StyleSheet.create({
    title:
    {
        fontWeight: "bold",
        fontSize: 26,
        color: Color.white
    },
    indicatorContainer: {
        justifyContent: 'center',

    }

});