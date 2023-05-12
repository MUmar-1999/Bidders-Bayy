import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import PrimaryButton from '../../Components/PrimaryButton';
import FormInputField from '../../Components/FormInputField';
import BidderApi from '../../api/BidderApi';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const BecomeSeller = ({ navigation }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const { control, handleSubmit } = useForm();
  const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;

  function normalizeImage(imagePath) {
    const baseUrl = "http://192.168.10.2:5000";
    const normalizedImagePath = imagePath
      .replace(/\\/g, "/")
      .replace(/^\//, "");
    const imageUrl = `${baseUrl}/${normalizedImagePath}`;
    return imageUrl;
  }

  const pickImage = async (side) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (side === 'front') {
        console.log('IMAGHE:::', result.assets[0].uri);
        setFrontImage(result.assets[0].uri);
      } else {
        setBackImage(result.assets[0].uri);
      }
    }
  };

  async function cnicPost(cnic) {
    try {
      const result = await BidderApi.patch('/users/become-seller-cnic-number', {
        cnicNumber: cnic,
      });
      console.log('CNIC RES::', JSON.stringify(result.data, null, 2));
    } catch (err) {
      console.error(JSON.stringify(err.response.data, null, 2));
    }
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  async function frontPost() {
    const frontImageData = new FormData();
    if (frontImage) {
      frontImageData.append('CNIC_front', {
        uri: frontImage,
        type: 'image/jpeg', // Change the type based on your image format
        name: 'frontCNIC.jpg',
      });
    }
    try {
      const result = await BidderApi.patch(
        '/users/become-seller-cnic-front-pic',
        frontImageData,
        config
      );
      console.log('FrontCNIC RES::', JSON.stringify(result.data, null, 2));
    } catch (err) {
      console.error(
        'frontCNIC ERROR::',
        JSON.stringify(err.response.data, null, 2)
      );
    }
  }

  async function backPost() {
    const backImageData = new FormData();
    if (backImage) {
      backImageData.append('CNIC_back', {
        uri: backImage,
        type: 'image/jpeg', // Change the type based on your image format
        name: 'backCNIC.jpg',
      });
    }
    try {
      const result = await BidderApi.patch(
        '/users/become-seller-cnic-back-pic',
        backImageData,
        config
      );
      console.log('backCNIC RES::', JSON.stringify(result.data, null, 2));
    } catch (err) {
      console.error(
        'backCNIC ERROR::',
        JSON.stringify(err.response.data, null, 2)
      );
    }
  }

  async function handleVerificationSubmit(data) {
    cnicPost(data.cnic);
    frontPost();
    backPost();
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.heading}>Become a Seller</Text>
          <View style={styles.imageContainer}>
            {userInfo.hasOwnProperty('cnicFront') ? (
              <Image source={{ uri: frontImage }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>
                  Select Front Side of CNIC
                </Text>
              </View>
            )}

            <Button
              style={{ backgroundColor: 'red', color: 'white' }}
              title="Select Front Side of CNIC"
              onPress={() => pickImage('front')}
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
              onPress={() => pickImage('back')}
            />
          </View>

          <FormInputField
            name={'cnic'}
            control={control}
            keyboardType={'number-pad'}
            placeholder={'Enter your CNIC'}
            rule={{
              required: 'CNIC cannot be empty.',
              pattern: {
                value: cnicRegex,
                message: 'Enter correct cnic i.e XXXXX-XXXXXXX-X.',
              },
              maxLength: {
                value: 15,
                message: 'CNIC cannot be more than 13 numbers.',
              },
            }}
          />

          <PrimaryButton
            title={'Apply for Verification'}
            onPress={handleSubmit(handleVerificationSubmit)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 250,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 8,
    borderRadius: 5,
  },
  imagePlaceholder: {
    width: 250,
    height: 150,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 5,
  },
  imagePlaceholderText: {
    color: '#555',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
});

export default BecomeSeller;
