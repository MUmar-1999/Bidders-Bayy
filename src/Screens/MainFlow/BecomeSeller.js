import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import PrimaryButton from "../../Components/PrimaryButton";
import FormInputField from "../../Components/FormInputField";

const BecomeSeller = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [cnic, setCnic] = useState("");

  const pickImage = async (side) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (side === "front") {
        setFrontImage(result.uri);
      } else {
        setBackImage(result.uri);
      }
    }
  };

  const handleCnicChange = (text) => {
    setCnic(text);
  };

  const handleVerificationSubmit = () => {
    console.log(`Front Image: ${frontImage}`);
    console.log(`Back Image: ${backImage}`);
    console.log(`CNIC: ${cnic}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Become a Seller</Text>
      <View style={styles.imageContainer}>
        {frontImage ? (
          <Image source={{ uri: frontImage }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>
              Select Front Side of CNIC
            </Text>
          </View>
        )}

        <Button
          style={{ backgroundColor: "red", color: "white" }}
          title="Select Front Side of CNIC"
          onPress={() => pickImage("front")}
        />
      </View>
      <View style={styles.imageContainer}>
        {backImage ? (
          <Image source={{ uri: backImage }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>
              Select Back Side of CNIC
            </Text>
          </View>
        )}
        <Button
          title="Select Back Side of CNIC"
          onPress={() => pickImage("back")}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Your CNIC"
        onChangeText={handleCnicChange}
        value={cnic}
      />

      <PrimaryButton
        title={"Apply for Verification"}
        onPress={handleVerificationSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 250,
    height: 150,
    resizeMode: "cover",
    marginBottom: 8,
    borderRadius: 5,
  },
  imagePlaceholder: {
    width: 250,
    height: 150,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 5,
  },
  imagePlaceholderText: {
    color: "#555",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
});

export default BecomeSeller;
