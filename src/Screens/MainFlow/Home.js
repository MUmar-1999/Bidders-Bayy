// import { View, Text, Image } from "react-native";
// import React, { useState } from "react";
// import Main from "../../Bottom/Main";
// import Search from "../../Bottom/Search";
// import List from "../../Bottom/List";
// import Favorite from "../../Bottom/Favorite";
// import Profile from "./Profile";
// import { TouchableOpacity } from "react-native-gesture-handler";
// const Home = () => {
//   const [selectedTab, setSelectedTab] = useState(0);
//   return (
//     <View style={{ flex: 1 }}>
//       {/* {selectedTab == 0 ? (
//         <Main />
//       ) : selectedTab == 1 ? (
//         <Search />
//       ) : selectedTab == 2 ? (
//         <List />
//       ) : selectedTab == 3 ? (
//         <Favorite />
//       ) : (
//         <Profile />
//       )} */}
//       <View
//         style={{
//           width: "100%",
//           height: 70,
//           backgroundColor: "lightgrey",
//           position: "absolute",
//           bottom: 0,
//           flexDirection: "row",
//           alignItems: "center",
//         }}
//       >
//         <TouchableOpacity
//           style={{
//             width: "100%",
//             height: "100%",
//             justifyContent: "center",
//             alignItems: "center",
//             padding: 23,
//           }}
//           onPress={() => {
//             setSelectedTab(0);
//           }}
//         >
//           <Image
//             source={require("../../Images/home1.png")}
//             style={{
//               width: 25,
//               height: 25,
//               tintColor: selectedTab == 0 ? "green" : "black",
//             }}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={{
//             width: "100%",
//             height: "100%",
//             justifyContent: "center",
//             alignItems: "center",
//             padding: 23,
//           }}
//           onPress={() => {
//             setSelectedTab(1);
//           }}
//         >
//           <Image
//             source={require("../../Images/search.png")}
//             style={{
//               width: 25,
//               height: 25,
//               tintColor: selectedTab == 1 ? "green" : "black",
//             }}
//           />
//         </TouchableOpacity>
//         <View
//           style={{
//             width: "20%",
//             height: "100%",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <TouchableOpacity
//             style={{
//               width: 40,
//               height: 40,
//               backgroundColor: "black",
//               borderRadius: 20,
//               justifyContent: "center",
//               padding: 7.5,
//               backgroundColor: selectedTab == 2 ? "green" : "black",
//             }}
//             onPress={() => {
//               setSelectedTab(2);
//             }}
//           >
//             <Image
//               source={require("../../Images/list.png")}
//               style={{ width: 25, height: 25, tintColor: "white" }}
//             />
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity
//           style={{
//             width: "100%",
//             height: "100%",
//             justifyContent: "center",
//             alignItems: "center",
//             padding: 23,
//           }}
//           onPress={() => {
//             setSelectedTab(3);
//           }}
//         >
//           <Image
//             source={require("../../Images/favorite.png")}
//             style={{
//               width: 25,
//               height: 25,
//               tintColor: selectedTab == 3 ? "green" : "black",
//             }}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{
//             width: "100%",
//             height: "100%",
//             justifyContent: "center",
//             alignItems: "center",
//             padding: 23,
//           }}
//           onPress={() => {
//             setSelectedTab(4);
//           }}
//         >
//           <Image
//             source={require("../../Images/name.png")}
//             style={{
//               width: 25,
//               height: 25,
//               tintColor: selectedTab == 4 ? "green" : "black",
//             }}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Home;
import { View, Text, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        source={require("../Images/Banner.png")}
        style={{
          width: "95%",
          height: 180,
          borderRadius: 10,
          alignSelf: "center",
          marginTop: 10,
        }}
      />
      <Text
        style={{
          fontSize: 24,
          marginTop: 20,
          marginLeft: 35,
          fontWeight: "bold",
        }}
      >
        Products
      </Text>
      <FlatList
        numColumns={2}
        data={products}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                padding: 12,
                paddingBottom: 18,
                backgroundColor: "white",
                width: "45%",
                margin: 8,
                borderRadius: 10,
                flexDirection: "column",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,

                elevation: 15,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  height: 180,
                  width: "100%",
                  alignSelf: "center",
                  marginTop: 10,
                  borderRadius: 10,
                }}
              />
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                {item.title}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Rs. {item.price}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Home;
