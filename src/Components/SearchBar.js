import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  useEffect,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Color } from "./Shared/Color";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
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
  const [{ minRange, selectedRange, maxRange }, setPriceRange] = useState({ minRange: 0, selectedRange: 50000, maxRange: 100000 });
  const [subCategoryData, setSubCategoryData] = useState(null);

  const handleButtonPress = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handlePriceRangeChange = (values) => {
    setPriceRange((prev) => ({ ...prev, selectedRange: values }));
  };

  const handlePriceRangeComplete = (values) => {
    setPriceRange((prev) => ({ ...prev, selectedRange: values }));
  };

  const [dataForm, setDataForm] = useState({
    subcategoryId: "",
    productType: "",
    product_picture: [],
  });

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
              {selectedRange} - {maxRange}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={minRange}
              maximumValue={maxRange}
              step={500}
              thumbTintColor="black"
              minimumTrackTintColor="black"
              maximumTrackTintColor="black"
              value={selectedRange}
              onValueChange={handlePriceRangeChange}
              onSlidingComplete={handlePriceRangeComplete}
            />
          </View>
          <Text style={styles.label}>Category:</Text>
          <Picker
            name="subcategoryId"
            selectedValue={dataForm.subcategoryId}
            onValueChange={(itemValue) =>
              setDataForm((preValue) => {
                return { ...preValue, subcategoryId: itemValue };
              })
            }
            style={styles.dropdown}
            onPress={() => { }
              // console.log("hello")
            }
          >
            <Picker.Item label="Select sub Category" value="" />
            {subCategoryData != null
              ? subCategoryData.map((Option) => (
                <Picker.Item
                  key={Option._id}
                  label={Option.title}
                  value={Option._id}
                />
              ))
              : null}
          </Picker>
          <Picker
            selectedValue={""}
            onValueChange={(itemValue) => { }}
            mode="dropdown"
            style={styles.dropdown}
          >
            <Picker.Item label="Select city" value="" />
            <Picker.Item label="Lahore" value="Lahore" />
            <Picker.Item label="Karachi" value="Karachi" />
            <Picker.Item label="Faisalabad" value="Faisalabad" />
            <Picker.Item label="Islamabad" value="Islamabad" />
            <Picker.Item label="Gujranwala" value="Gujranwala" />
            <Picker.Item label="Rawalpindi" value="Rawalpindi" />
            <Picker.Item label="Hyderabad" value="Hyderabad" />
            <Picker.Item label="Multan" value="Multan" />
            <Picker.Item label="Peshawar" value="Peshawar" />
            <Picker.Item label="Quetta" value="Quetta" />
          </Picker>
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
  sliderContainer: {
    width: "100%"
  },
  dropdown: {
    width: "100%"

  }
});
