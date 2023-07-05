import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../Components/PrimaryButton";
import BidderApi from "../../api/BidderApi";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import SecondaryButton from "../../Components/SecondaryButton";
import SafeArea from "../../Components/Shared/SafeArea";
import { Color } from "../../Components/Shared/Color";
import { BASE_URL } from "../../api/BidderApi";
import FormInputF from "../../Components/FormInputF";
import FormInputD from "../../Components/FormInputD";

const List = ({ navigation }) => {
  const {
    userInfo: { role },
  } = useSelector((state) => state.auth);
  const [category, setCategory] = useState(null);
  const [categoryData, setCategoryData] = useState("");
  const [subCategoryData, setSubCategoryData] = useState(null);
  const { control, handleSubmit, reset } = useForm();
  const [dataForm, setDataForm] = useState({
    subcategoryId: "",
    productType: "",
    product_picture: [],
  });
  useEffect(() => {
    axios.get(`${BASE_URL}/category/`).then(function (response) {
      setCategory(response.data.data.allCategory);
    });
  }, []);

  const handleSubCategory = (value) => {
    setCategoryData(value);
    if (value !== "") {
      axios.get(`${BASE_URL}/sub-category/${value}`).then(function (response) {
        setSubCategoryData(response.data.data);
      });
    }
  };

  const NewPost = async (data) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("productType", dataForm.productType);
    formData.append("subcategoryId", dataForm.subcategoryId);
    if (dataForm.product_picture.length !== 0) {
      let images = [];
      for (let i = 0; i < dataForm.product_picture.length; i++) {
        images.push(dataForm.product_picture[i]);
        formData.append("product_picture", dataForm.product_picture[i]);
      }
    }
    formData.append("description", data.description);
    formData.append("productPrice", data.productPrice);
    // console.log("FORMDATA:::", JSON.stringify(formData, null, 2));

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await BidderApi.post("/products/", formData, config);
      if (data.success) {
        setCategoryData("");
        setDataForm({
          subcategoryId: "",
          productType: "",
          product_picture: [],
        });
        reset();
        navigation.navigate("Bidders Bay");
      }
    } catch (error) {
      // console.log("NEWPOST ERROR:::", error);
    }
  };

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: false,
      aspect: [9, 16],
      quality: 0.5,
    });

    if (!result.canceled && result.assets.length > 0) {
      const images = result.assets.map((asset) => {
        return {
          uri: asset.uri,
          type: "image/jpeg",
          name: "image.jpg",
        };
      });
      setDataForm((prevValue) => ({
        ...prevValue,
        product_picture: images,
      }));
    }
  };

  if (role === "buyer") {
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
          Become a seller to post your products
        </Text>
        <SecondaryButton
          title="Go to Profile"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    );
  }

  return (
    <SafeArea>
      <ScrollView style={styles.container}>
        <View style={{ paddingBottom: 30 }}>
          <Text style={styles.label}>Type:</Text>
          <Picker
            selectedValue={dataForm.productType}
            onValueChange={(itemValue) =>
              setDataForm((prevValue) => ({
                ...prevValue,
                productType: itemValue,
              }))
            }
            style={styles.dropdown}
          >
            <Picker.Item label="Select type" value="" />
            <Picker.Item label="Bidding" value="Bidding Item" />
            <Picker.Item label="Used Item" value="Used Item" />
          </Picker>

          <View style={styles.imageUploadContainer}>
            <Text style={styles.label}>Upload Images:</Text>
            <Button color="black" title="Choose Images" onPress={chooseImage} />
          </View>

          {dataForm.product_picture.length > 0 && (
            <View style={styles.imagePreviewContainer}>
              <Text style={styles.label}>Image Preview:</Text>
              {dataForm.product_picture.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image.uri }}
                  style={styles.imagePreview}
                />
              ))}
            </View>
          )}

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
            selectedValue={dataForm.subcategoryId}
            onValueChange={(itemValue) =>
              setDataForm((prevValue) => ({
                ...prevValue,
                subcategoryId: itemValue,
              }))
            }
            style={styles.dropdown}
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
          <FormInputF
            name={"title"}
            control={control}
            rule={{
              required: "Title cannot be empty.",
            }}
          />

          <Text style={styles.label}>Description:</Text>
          <FormInputD
            name={"description"}
            control={control}
            rule={{
              required: "Description cannot be empty.",
            }}
          />
          {/* <FormInputF
            name={"description"}
            control={control}
            rule={{
              required: "Description cannot be empty.",
            }}
          /> */}

          <Text style={styles.label}>
            {dataForm.productType === "Bidding Item" ? "Base Price:" : "Price:"}
          </Text>
          <FormInputF
            name={"productPrice"}
            keyboardType="numeric"
            control={control}
            rule={{
              required: "Price cannot be empty.",
              validate: (value) =>
                value > 0 || `Price must be greater than Rs 0`,
            }}
          />

          <PrimaryButton title="Post" onPress={handleSubmit(NewPost)} />
        </View>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.white,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 15,
  },
  dropdown: {
    marginBottom: 10,
  },
  imageUploadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  imagePreviewContainer: {
    marginBottom: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default List;
