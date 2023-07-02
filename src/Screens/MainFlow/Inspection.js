import React from "react";
import { View, Text, StyleSheet, Linking, ScrollView } from "react-native";
import SafeArea from "../../Components/Shared/SafeArea";

const Inspection = () => {
  const openLocationLink = (link) => {
    Linking.openURL(link);
  };

  return (
    <SafeArea>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Inspection</Text>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Currency:</Text>
          <View style={styles.itemContainer}>
            <Text
              style={styles.item}
              onPress={() =>
                openLocationLink("https://goo.gl/maps/rVj88YS2Jmq7D1G78")
              }
            >
              1- HBL PIA Road Lahore
            </Text>
            <Text
              style={styles.item}
              onPress={() =>
                openLocationLink("https://goo.gl/maps/neZjKUKWj9E9Mz5i9")
              }
            >
              2- Meezan Bank - Military Accounts Lahore
            </Text>
            <Text
              style={styles.item}
              onPress={() =>
                openLocationLink("https://goo.gl/maps/q5W7kH6f4CsbXT1J6")
              }
            >
              3- Askari Bank Ghazi Chowk Lahore
            </Text>
          </View>
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Art Work</Text>
          <View style={styles.itemContainer}>
            <Text
              style={styles.item}
              onPress={() =>
                openLocationLink("https://maps.app.goo.gl/qsBVVM6t9fmGsV37A")
              }
            >
              1- PNCA Islamabad
            </Text>
            <Text
              style={styles.item}
              onPress={() =>
                openLocationLink("https://maps.app.goo.gl/pKgghZ9hKGM1DtcM8")
              }
            >
              2- Oyester Art Gallery Lahore
            </Text>
            <Text
              style={styles.item}
              onPress={() =>
                openLocationLink("https://maps.app.goo.gl/Kyef4NJ5x2DpTsBAA")
              }
            >
              3- State Bank Museum and Art Galery Karachi
            </Text>
          </View>
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Cars:</Text>
          <View style={styles.itemContainer}>
            <Text
              style={styles.item}
              onPress={() => openLocationLink("https://www.pakwheels.com/")}
            >
              1- Pak Wheels
            </Text>
            <Text
              style={styles.item}
              onPress={() => openLocationLink("http://www.cartest.pk/")}
            >
              2- Cartest.pk
            </Text>
            <Text
              style={styles.item}
              onPress={() =>
                openLocationLink("https://www.gari.pk/products/car-inspection/")
              }
            >
              3- Gari.pk
            </Text>
          </View>
        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Cars:</Text>
          <View style={styles.itemContainer}>
            <Text
              style={styles.item}
              onPress={() => openLocationLink("https://www.pakwheels.com/")}
            >
              1- Pak Wheels
            </Text>
            <Text
              style={styles.item}
              onPress={() => openLocationLink("http://www.cartest.pk/")}
            >
              2- Cartest.pk
            </Text>
            <Text
              style={styles.item}
              onPress={() =>
                openLocationLink("https://www.gari.pk/products/car-inspection/")
              }
            >
              3- Gari.pk
            </Text>
          </View>
        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Cars:</Text>
          <View style={styles.itemContainer}>
            <Text
              style={styles.item}
              onPress={() => openLocationLink("https://www.pakwheels.com/")}
            >
              1- Pak Wheels
            </Text>
            <Text
              style={styles.item}
              onPress={() => openLocationLink("http://www.cartest.pk/")}
            >
              2- Cartest.pk
            </Text>
            <Text
              style={styles.item}
              onPress={() =>
                openLocationLink("https://www.gari.pk/products/car-inspection/")
              }
            >
              3- Gari.pk
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333333",
  },
  categoryContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#666666",
  },
  itemContainer: {
    marginLeft: 20,
  },
  item: {
    fontSize: 16,
    marginBottom: 6,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Inspection;
