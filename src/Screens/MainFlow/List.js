import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../Components/PrimaryButton";
import BidderApi from "../../api/BidderApi";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import FormControl from "../../Components/Form Control/FormControl";
import SecondaryButton from "../../Components/SecondaryButton";
import FormInputField from "../../Components/FormInputField";

const List = ({ navigation }) => {
  const {
    userInfo: { role },
  } = useSelector((state) => state.auth);
  const [category, setCategory] = useState(null);
  const [categoryData, setCategoryData] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [subCategoryData, setSubCategoryData] = useState(null);
  const [picture, setPicture] = useState(null);

  const initial = {
    subcategoryId: "",
    title: "",
    productType: "",
    productPrice: "",
    description: "",
    product_picture: [],
  };
  const { control, handleSubmit } = useForm();

  const { setPostValue, postValue, postChange } = FormControl(initial);
  useEffect(() => {
    axios.get("http://192.168.10.2:5000/category/").then(function (response) {
      // console.log(response.data.data.allCategory);
      setCategory(response.data.data.allCategory);
    });
  }, []);

  const handleSubCategory = (value) => {
    // console.log(value);
    setCategoryData(value);
    // console.log(categoryData);
    if (value != "") {
      axios
        .get(`http://192.168.10.2:5000/sub-category/${value}`)
        .then(function (response) {
          setSubCategoryData(response.data.data);
        });
    }
  };
  const NewPost = async (
    title,
    description,
    productPrice,
    subcategoryId,
    ProductType,
    images
  ) => {
    let formData = new FormData(),
      key;
    const entries = Object.entries(postValue);
    for (const [key, value] of entries) {
      if (key == "xsadfdsa") {
        let images = [];
        for (let i = 0; i < value.length; i++) {
          images.push(value[i]);
          formData.append("product_picture", value);
        }
      } else {
        formData.append(key, value);
      }
    }
    for (key of entries) {
      // console.log(key);
    }
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await BidderApi.post("/products/", formData, config);
      console.log("LIST::", JSON.stringify(res.data, null, 2));
    } catch (error) {
      console.log(error.res);
    }
  };

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [9, 16],
      quality: 0.5,
    });

    // console.log('total ', result.assets);

    if (
      result &&
      !result.canceled &&
      result.assets &&
      result.assets.length > 0
    ) {
      // setPicture(result.assets[0].uri);

      const pro = {
        uri: result.assets[0].uri,
        type: "image/jpeg", // Change the type based on your image format
        name: "image.jpg",
      };
      postChange("product_picture", pro);
    }
  };

  useEffect(() => {
    // console.log('useEffect: ', initial.product_picture.uri);
  }, [initial.product_picture]);

  if (role == "buyer") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          padding: 6,
          paddingBottom: 70,
        }}
      >
        <Text style={{ fontSize: 45, fontWeight: "bold" }}>
          Become seller to post your products
        </Text>
        <SecondaryButton
          title="Go to Profile"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingBottom: 30 }}>
        <Text style={styles.label}>Type:</Text>
        <Picker
          selectedValue={postValue.productType}
          onValueChange={(itemValue) => postChange("productType", itemValue)}
          style={styles.dropdown}
        >
          <Picker.Item label="Select type" value="" />
          <Picker.Item label="Bidding" value="Bidding Item" />
          <Picker.Item label="Used Item" value="Used Item" />
        </Picker>

        <View style={styles.imageUploadContainer}>
          <Text style={styles.label}>Upload Image:</Text>
          <Button color="black" title="Choose Image" onPress={chooseImage} />
        </View>

        <Text style={styles.label}>Category:</Text>
        <Picker
          selectedValue={categoryData}
          onValueChange={handleSubCategory}
          style={styles.dropdown}
        >
          <Picker.Item label="Select Category" value="" />
          {category != null
            ? category.map((Option) => (
                <Picker.Item
                  key={Option._id}
                  label={Option.title}
                  value={Option._id}
                />
              ))
            : null}
        </Picker>

        <Text style={styles.label}>Sub Category:</Text>
        <Picker
          name="subcategoryId"
          selectedValue={postValue.subcategoryId}
          onValueChange={(itemValue) => postChange("subcategoryId", itemValue)}
          style={styles.dropdown}
          onPress={() => console.log("hello")}
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

        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={postValue.title}
          onChangeText={(text) => postChange("title", text)}
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={postValue.description}
          onChangeText={(text) => postChange("description", text)}
        />

        <Text style={styles.label}>
          {postValue.productType === "Bidding Item" ? "Base Price:" : "Price:"}
        </Text>
        <TextInput
          style={styles.input}
          value={postValue.productPrice}
          onChangeText={(text) => postChange("productPrice", text)}
          keyboardType="numeric"
        />

        <PrimaryButton
          title="Post"
          onPress={() =>
            NewPost(title, description, price, subCategory, type, picture)
          }
        />
      </View>
    </ScrollView>
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
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  imageUploadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default List;
