import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Color } from "./Shared/Color";
import Slider from "@react-native-community/slider";
function SearchBar({ onChange }) {
  const [search, setSearch] = useState("");

  const handleEndEditing = () => {
    onChange(search);
    setSearch("");
  };
  const handleClear = () => {
    onChange("");
  };
  const [showPopup, setShowPopup] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  const handleButtonPress = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
  };

  const handlePriceRangeComplete = (values) => {
    setPriceRange(values);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        onEndEditing={handleEndEditing}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleClear} style={styles.button}>
        <Text style={styles.buttonText}>X</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <AntDesign name="filter" size={21} color="white" />
      </TouchableOpacity>

      <Modal visible={showPopup} animationType="slide">
        <View style={styles.popup}>
          <Text style={styles.title}>Filter</Text>

          <Text style={styles.label}>Price Range:</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValue}>
              {priceRange[0]} - {priceRange[1]}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10000000}
              step={1}
              thumbTintColor="black"
              minimumTrackTintColor="black"
              maximumTrackTintColor="black"
              value={priceRange[1]}
              onValueChange={handlePriceRangeChange}
              onSlidingComplete={handlePriceRangeComplete}
            />
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClosePopup}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: Color.grey,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  popup: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  closeButton: {
    backgroundColor: Color.black,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: Color.white,
    fontWeight: "bold",
  },
});
