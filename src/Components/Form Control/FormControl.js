import { View, Text } from "react-native";
import React, { useState } from "react";

const FormControl = (initial) => {
  const [postValue, setPostValue] = useState(initial);
  const postChange = (name, value) => {
    setPostValue({
      ...postValue,
      [name]: value,
    });
  };
  return { setPostValue, postValue, postChange };
};

export default FormControl;
