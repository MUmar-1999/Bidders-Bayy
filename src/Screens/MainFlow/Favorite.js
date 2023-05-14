import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState, useCallback } from "react";
import BidderApi from "../../api/BidderApi";
import { useFocusEffect } from "@react-navigation/native";
import SafeArea from "../../Components/Shared/SafeArea";
import Card from '../../Components/Card'

const Favorite = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // console.log("mein chal rha hun");
    try {
      const res = await BidderApi.get("/favorite/");
      // console.log("Fav::", JSON.stringify(res.data.FavoritePosts, null, 2));
      setProducts(res.data.FavoritePosts);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [navigation])
  );
  return (
    <SafeArea>
      <View>
        <FlatList
          numColumns={2}
          data={products}
          ListHeaderComponent={
            <Text
              style={{
                fontSize: 30,
                marginTop: 20,
                marginBottom: 20,
                fontWeight: "bold",
                textAlign: 'center'
              }}
            >
              My Favorites
            </Text>
          }
          renderItem={({ item }) => <Card item={item.postId} />}
        />
      </View>
    </SafeArea>
  );
};

export default Favorite;
