// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   KeyboardAvoidingView,
//   ActivityIndicator,
// } from "react-native";
// import { FlatList } from "react-native-gesture-handler";
// import { useFocusEffect } from "@react-navigation/native";
// import { FontAwesome } from "@expo/vector-icons";

// import BidderApi from "../../api/BidderApi";
// import Card from "../../Components/Card";
// import SafeArea from "../../Components/Shared/SafeArea";
// import SearchBar from "../../Components/SearchBar";
// import { Color } from "../../Components/Shared/Color";

// const FixProduct = ({ navigation }) => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const getData = async () => {
//     try {
//       const res = await BidderApi.get("/products/used/");
//       setProducts(res.data.data.allProducts);
//       setFilteredProducts(res.data.data.allProducts);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const filtered = (text) => {
//     if (text) {
//       const newData = products.filter(function (item) {
//         const itemData = item.title
//           ? item.title.toUpperCase()
//           : "".toUpperCase();
//         const textData = text.toUpperCase();
//         return itemData.indexOf(textData) > -1;
//       });
//       setFilteredProducts(newData);
//     } else {
//       setFilteredProducts(products);
//     }
//   };

//   const Header = () => {
//     return (
//       <View>
//         <SearchBar onChange={(txt) => filtered(txt)} />
//         <Text style={styles.headerText}>Fix Price Products</Text>
//         {filteredProducts.length === 0 ? (
//           <View style={styles.centeredContainer}>
//             <View style={styles.notAvailableContainer}>
//               <FontAwesome
//                 name="exclamation-triangle"
//                 size={40}
//                 color="#C62828"
//               />
//               <Text style={styles.notAvailableText}>
//                 Sorry, we couldn't find any products.
//               </Text>
//             </View>
//           </View>
//         ) : null}
//       </View>
//     );
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       getData();
//     }, [navigation])
//   );

//   return (
//     <SafeArea>
//       <KeyboardAvoidingView style={styles.container}>
//         {products.length !== 0 ? (
//           <FlatList
//             numColumns={2}
//             style={styles.container}
//             data={filteredProducts}
//             ListHeaderComponent={Header}
//             renderItem={({ item }) => {
//               return <Card item={item} />;
//             }}
//           />
//         ) : (
//           <View style={styles.loaderContainer}>
//             <ActivityIndicator size="large" color={Color.black} />
//           </View>
//         )}
//       </KeyboardAvoidingView>
//     </SafeArea>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   flatList: {
//     flex: 1,
//   },
//   headerText: {
//     fontSize: 20,
//     marginLeft: 20,
//     fontWeight: "bold",
//     marginTop: 10,
//   },
//   notAvailableContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FBE9E7",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   notAvailableText: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: "#C62828",
//   },
//   loaderContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default FixProduct;
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import Card from "../../Components/Card";
import BidderApi from "../../api/BidderApi";
import SafeArea from "../../Components/Shared/SafeArea";
import SearchBar from "../../Components/SearchBar";
import { FontAwesome } from "@expo/vector-icons";
import { Color } from "../../Components/Shared/Color";

const FixProduct = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [Feature, SetFeature] = useState(null);
  const [filter, setFilter] = useState(null);

  const getData = async () => {
    try {
      const res = await BidderApi.get("/products/used/");
      setProducts(res.data.data.allProducts);

      // console.log("chup", JSON.stringify(res.data.data.allProducts, null, 2));
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await BidderApi.get("/payment-featured/featured_post/");
      // setProducts(res.data.data);
      // setFilteredProducts(res.data.data);
      SetFeature(res.data.data);
      // console.log("filter", res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = (text) => {
    if (text) {
      const newData = filter.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredProducts(newData);
    } else {
      setFilteredProducts(filter);
    }
  };

  const Header = () => {
    return (
      <View>
        <SearchBar onChange={(txt) => filtered(txt)} />
        <Text style={styles.headerText}>Fix Price Product</Text>
        {filteredProducts.length === 0 ? (
          <View style={styles.centeredContainer}>
            <View style={styles.notAvailableContainer}>
              <FontAwesome
                name="exclamation-triangle"
                size={40}
                color="#C62828"
              />
              <Text style={styles.notAvailableText}>
                Sorry, we couldn't find any products.
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [navigation])
  );

  useEffect(() => {
    if (Feature !== null && products !== null) {
      console.log("Teri", JSON.stringify(Feature, null, 2));
      const converted = Feature.map((feature) => {
        return ChangeObject(feature);
      }).filter((obj) => obj !== null);
      console.log("Abdullah", JSON.stringify(converted, null, 2));
      setFilter(converted);
      setFilteredProducts(converted);
      const filteredProducts = products.filter(
        (item) =>
          !Feature.some((featureItem) => featureItem.postId._id === item._id)
      );
      console.log("lenght", filteredProducts.length);
      setFilter((prevFiltered) => [...prevFiltered, ...filteredProducts]);
      setFilteredProducts((prevFiltered) => [
        ...prevFiltered,
        ...filteredProducts,
      ]);
    }
  }, [Feature, products]);
  const ChangeObject = (item) => {
    if (item.postId.productType !== "Bidding Item") {
      const inputObject = {
        _id: item._id,
        postId: {
          closeBid: item.postId.closeBid,
          StatusOfActive: item.postId.StatusOfActive,
          _id: item.postId._id,
          title: item.postId.title,
          description: item.postId.description,
          images: item.postId.images,
          productPrice: item.postId.productPrice,
          subcategoryId: item.postId.subcategoryId,
          featured: "Yes",
          userId: {
            _id: item.postId.userId._id,
            firstName: item.postId.userId.firstName,
            lastName: item.postId.userId.lastName,
            password: item.postId.userId.password,
            email: item.postId.userId.email,
            phoneNo: item.postId.userId.phoneNo,
            gender: item.postId.userId.gender,
            address: item.postId.userId.address,
            dob: item.postId.userId.dob,
            role: item.postId.userId.role,
            currentCity: item.postId.userId.currentCity,
            statusOfUser: item.postId.userId.statusOfUser,
            tryAgainToBecomeSeller: item.postId.userId.tryAgainToBecomeSeller,
            createdAt: item.postId.userId.createdAt,
            updatedAt: item.postId.userId.updatedAt,
            _v: item.postId.userId._v,
            dp: item.postId.userId.dp,
          },
          productType: item.postId.productType,
          createdAt: item.postId.createdAt,
          updatedAt: item.postId.updatedAt,
          _v: item.postId._v,
        },
        _v: item._v,
        approvedStatus: item.approvedStatus,
        createdAt: item.createdAt,
        paymentScreenShot: item.paymentScreenShot,
        updatedAt: item.updatedAt,
        approvedDate: item.approvedDate,
      };

      const outputObject = {
        _id: inputObject.postId._id,
        title: inputObject.postId.title,
        description: inputObject.postId.description,
        images: inputObject.postId.images.map((image) =>
          image.replace("\\", "/")
        ),
        productPrice: inputObject.postId.productPrice,
        subcategoryId: inputObject.postId.subcategoryId,
        userId: inputObject.postId.userId,
        featured: inputObject.postId.featured,
        productType: inputObject.postId.productType,
        closeBid: inputObject.postId.closeBid,
        StatusOfActive: inputObject.postId.StatusOfActive,
        createdAt: inputObject.postId.createdAt,
        updatedAt: inputObject.postId.updatedAt,
        _v: inputObject.postId._v,
      };
      console.log("not converted", item);
      console.log("this is converted", outputObject);
      return outputObject;
    }
    return null;
  };
  useEffect(() => {
    console.log("Hello::", JSON.stringify(filter, null, 2));
  }, [filter]);
  return (
    <SafeArea>
      <KeyboardAvoidingView style={styles.container}>
        {filter !== null ? (
          <FlatList
            numColumns={2}
            style={styles.container}
            data={filteredProducts}
            ListHeaderComponent={Header}
            renderItem={({ item }) => {
              return <Card item={item} isFeatured={true} />;
            }}
          />
        ) : (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Color.black} />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notAvailableContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FBE9E7",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  notAvailableText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#C62828",
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FixProduct;
