import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
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

const EditPost = ({ route, navigation }) => {
  const { EditPost } = route.params;
  console.log("Edit:::", JSON.stringify(EditPost, null, 2));
  const {
    userInfo: { role },
  } = useSelector((state) => state.auth);
  const [category, setCategory] = useState(null);
  const [categoryData, setCategoryData] = useState("");
  const [subCategoryData, setSubCategoryData] = useState(null);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: EditPost.title,
      description: EditPost.description,
      productPrice: `${EditPost.productPrice}`,
    },
  });
  const { basePrice, setBasePrice } = useState(44);
  const [dataForm, setDataForm] = useState({
    subcategoryId: EditPost.subcategoryId,
    productType: EditPost.productType,
    product_picture: [],
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/category/`).then(function (response) {
      setCategory(response.data.data.allCategory);
    });
    const x = parseInt(EditPost.productPrice, 10);
    // console.log("gag", x);
    // setBasePrice(x);
  }, []);

  const handleSubCategory = (value) => {
    setCategoryData(value);
    if (value != "") {
      axios.get(`${BASE_URL}/sub-category/${value}`).then(function (response) {
        setSubCategoryData(response.data.data);
      });
    }
  };
  const NewPost = async (data) => {
    console.log("🚀 ~ file: EditPost.js:52 ~ NewPost ~ data:", data);

    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("productType", dataForm.productType);
    formData.append("subcategoryId", EditPost.subcategoryId);
    formData.append("product_picture", dataForm.product_picture);
    formData.append("description", data.description);
    formData.append("productPrice", data.productPrice);
    // console.log("FORMDATA:::", formData);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await BidderApi.post(
        `/products/${EditPost._id}`,
        formData,
        config
      );
      if (data.success) {
        setCategoryData("");
        setDataForm({
          subcategoryId: "",
          productType: "",
          product_picture: [],
        });
        navigation.popToTop();
        reset();

      }
    } catch (error) {
      // console.log("NEWPOST ERROR:::", error);
    }
  };

  return (
    <SafeArea>
      <ScrollView style={styles.container}>
        <View style={{ paddingBottom: 30 }}>
          <Text style={styles.label}>Type:</Text>
          <Picker
            selectedValue={dataForm.productType}
            onValueChange={(itemValue) =>
              setDataForm((preValue) => {
                return { ...preValue, productType: itemValue };
              })
            }
            style={styles.dropdown}
          >
            <Picker.Item label="Select type" value="" />
            <Picker.Item label="Bidding" value="Bidding Item" />
            <Picker.Item label="Used Item" value="Used Item" />
          </Picker>

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
              setDataForm((preValue) => {
                return { ...preValue, subcategoryId: itemValue };
              })
            }
            style={styles.dropdown}
            onPress={
              () => { }
              //  console.log("hello")
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

          <Text style={styles.label}>Title:</Text>
          <FormInputF
            name={"title"}
            control={control}
            rule={{
              required: "Title cannot be empty.",
            }}
          />

          <Text style={styles.label}>Description:</Text>
          <FormInputF
            name={"description"}
            control={control}
            rule={{
              required: "Description cannot be empty.",
            }}
          />

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

export default EditPost;
