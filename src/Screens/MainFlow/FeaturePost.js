import { React, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PrimaryButton from "../../Components/PrimaryButton";
import SafeArea from "../../Components/Shared/SafeArea";
import { Color } from "../../Components/Shared/Color";
import { useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";

const FeaturePost = ({ route, navigation }) => {
  const { featurePost } = route.params;
  console.log("Hello papa", featurePost);
  const { control, handleSubmit } = useForm();
  const [dataForm, setDataForm] = useState({
    payment_ss: [],
  });
  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [12, 12],
      quality: 0.5,
    });
    if (
      result &&
      !result.canceled &&
      result.assets &&
      result.assets.length > 0
    ) {
      const pro = {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "image.jpg",
      };
      setDataForm(() => {
        return { payment_ss: pro };
      });
      // setDataForm((preValue) => {
      //   return { ...preValue, product_picture: pro };
      // });
    }
  };
  useEffect(() => {
    console.log("this is form data", dataForm);
  }, [dataForm]);

  const ApplyFeature = async (id, ss) => {
    console.log("wawa", id);
    console.log("papa", ss);
    let formData = new FormData();
    formData.append("payment_ss", ss.payment_ss);
    formData.append("postId", id);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await BidderApi.post(
        "/payment-featured/",
        formData,
        config
      );
      if (data.success) {
        console.log("nana", data);
        // setCategoryData("");
        // setDataForm({
        //   subcategoryId: "",
        //   productType: "",
        //   product_picture: [],
        // });
        // reset();
        navigation.navigate("Bidders Bay");
      }
    } catch (error) {
      console.log("NEWPOST ERROR:::", error);
    }
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <Image source={require("../../Images/logo.png")} style={styles.logo} />
        <Text style={styles.headerText}>Feature Post</Text>
        <Text style={styles.descriptionText}>
          Pay Rs. 1500 in the following bank account to apply for a feature post
        </Text>
        <View style={styles.bankDetailsContainer}>
          <Text style={styles.bankDetailsText}>
            Account Holder: Bidders Bay
          </Text>
          <Text style={styles.bankDetailsText}>Account Number: 090078601</Text>
          <Text style={styles.bankDetailsText}>
            Bank Name: World Bank and IMF
          </Text>
        </View>
        <Text style={styles.descriptionText}>
          After transferring money to the above account, please attach the
          payment proof screenshot before applying
        </Text>
        <TouchableOpacity style={styles.uploadButton} onPress={chooseImage}>
          <AntDesign name="upload" size={24} color="white" />
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>
        <PrimaryButton
          title={"Apply"}
          onPress={() => {
            ApplyFeature(featurePost._id, dataForm);
          }}
        />
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  logo: {
    height: 125,
    width: 125,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  bankDetailsContainer: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 5,
    alignSelf: "stretch",
    marginVertical: 20,
  },
  bankDetailsText: {
    fontSize: 16,
    marginBottom: 5,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.black,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "75%",
    height: 45,
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Color.white,
    marginLeft: 10,
  },
});

export default FeaturePost;
