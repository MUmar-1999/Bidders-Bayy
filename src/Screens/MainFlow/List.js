import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import PrimaryButton from "../../Components/PrimaryButton";

const List = () => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handlePostButtonPress = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
        style={styles.dropdown}
      >
        <Picker.Item label="Select category" value="" />
        <Picker.Item label="Category 1" value="category1" />
        <Picker.Item label="Category 2" value="category2" />
      </Picker>

      <Text style={styles.label}>Sub Category:</Text>
      <Picker
        selectedValue={subCategory}
        onValueChange={(value) => setSubCategory(value)}
        style={styles.dropdown}
      >
        <Picker.Item label="Select sub category" value="" />
        <Picker.Item label="Sub Category 1" value="subCategory1" />
        <Picker.Item label="Sub Category 2" value="subCategory2" />
      </Picker>

      <Text style={styles.label}>Type:</Text>
      <Picker
        selectedValue={type}
        onValueChange={(value) => setType(value)}
        style={styles.dropdown}
      >
        <Picker.Item label="Select type" value="" />
        <Picker.Item label="Type 1" value="type1" />
        <Picker.Item label="Type 2" value="type2" />
      </Picker>

      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <Text style={styles.label}>Price:</Text>

      <TextInput
        style={styles.input}
        value={price}
        onChangeText={(text) => setPrice(text)}
      />
      <PrimaryButton title="Post" onPress={handlePostButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dropdown: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default List;
