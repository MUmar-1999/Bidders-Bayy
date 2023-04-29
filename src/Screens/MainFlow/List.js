import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PrimaryButton from '../../Components/PrimaryButton';
import BidderApi from '../../api/BidderApi';
import { useEffect } from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const List = () => {
  const [category, setCategory] = useState(null);
  const [categoryData, setCategoryData] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [subCategoryData, setSubCategoryData] = useState(null);
  const [picture, setPicture] = useState(null);
  const initial = {
    subcategoryId: '6430544a59721f736b5f6ebe',
    title: 'Ragnar',
    productType: 'Bidding Item',
    productPrice: '133',
    description: 'dawn reporter',
    product_picture: [],
  };
  useEffect(() => {
    axios.get('http://192.168.10.2:5000/category/').then(function (response) {
      // console.log(response.data.data.allCategory);
      setCategory(response.data.data.allCategory);
    });
  }, []);

  const handleSubCategory = (value) => {
    // console.log(value);
    setCategoryData(value);
    // console.log(categoryData);
    if (value != '') {
      axios
        .get(`http://192.168.10.2:5000/sub-category/${value}`)
        .then(function (response) {
          setSubCategoryData(response.data.data);
        });
    }
  };
  const NewPost = (
    title,
    description,
    productPrice,
    subcategoryId,
    ProductType,
    images
  ) => {
    let formData = new FormData(),
      key;
    const entries = Object.entries(initial);
    for (const [key, value] of entries) {
      if (key == 'xsadfdsa') {
        let images = [];
        for (let i = 0; i < value.length; i++) {
          images.push(value[i]);
          formData.append('product_picture', value);
        }
      } else {
        formData.append(key, value);
      }
    }
    for (key of entries) {
      console.log(key);
    }
    console.log('image', images);
    axios
      .post(
        'http://192.168.10.2:5000/product/',

        formData,

        {
          headers: {
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im05QGdtYWlsLmNvbSIsImlkIjoiNjQzMTdmMDgzZWEzNWQ2ZTk2YjY5ZGQ5IiwiaWF0IjoxNjgxNTkyMjE5fQ.7T_vM5zcGCzEc6ykdd-czVY9rdL8AxJZ1sD_InsawMY',
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        console.log('RES', JSON.stringify(response, null, 2));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [9, 16],
      quality: 0.5,
    });

    console.log('total ', result.assets);

    if (
      result &&
      !result.cancelled &&
      result.assets &&
      result.assets.length > 0
    ) {
      // setPicture(result.assets[0].uri);
      initial.product_picture = {
        uri: result.assets[0].uri,
        type: 'image/jpeg', // Change the type based on your image format
        name: 'image.jpg',
      };
    }
  };

  useEffect(() => {
    console.log('useEffect: ', initial.product_picture.uri);
  }, [initial.product_picture]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageUploadContainer}>
        <Text style={styles.label}>Upload Image:</Text>
        <Button title="Choose Image" onPress={chooseImage} />
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
        selectedValue={subCategory}
        onValueChange={(value) => setSubCategory(value)}
        style={styles.dropdown}
        onPress={() => console.log('hello')}
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

      <Text style={styles.label}>Type:</Text>
      <Picker
        selectedValue={type}
        onValueChange={(value) => setType(value)}
        style={styles.dropdown}
      >
        <Picker.Item label="Select type" value="" />
        <Picker.Item label="Bidding" value="Bidding Item" />
        <Picker.Item label="Used Item" value="Used Item" />
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

      <Text style={styles.label}>
        {type === 'Bidding Item' ? 'Base Price:' : 'Price:'}
      </Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />

      <PrimaryButton
        title="Post"
        onPress={() =>
          NewPost(title, description, price, subCategory, type, picture)
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dropdown: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  imageUploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default List;
