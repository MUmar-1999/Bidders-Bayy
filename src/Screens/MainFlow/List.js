import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import FormInputField from "../../Components/FormInputField";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../Components/PrimaryButton";
import { SelectList } from "react-native-dropdown-select-list";

const List = () => {
  const { control, handleSubmit } = useForm();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const categories = [
    { key: "EL", value: "Electronics" },
    { key: "VE", value: "Vehicles" },
    { key: "CU", value: "Currency" },
  ];
  const subcategories = {
    EL: [
      { key: "1", value: "Mobile" },
      { key: "2", value: "Laptops" },
      { key: "3", value: "Computer" },
    ],
    VE: [
      { key: "4", value: "Motor Bike" },
      { key: "5", value: "Scooter" },
      { key: "6", value: "Car" },
    ],
    CU: [
      { key: "7", value: "Dollar" },
      { key: "8", value: "Pound" },
      { key: "9", value: "Euro" },
    ],
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        source={require("../../Images/logo.png")}
        style={{
          height: 75,
          width: 75,
          alignSelf: "center",
          marginTop: 20,
        }}
      />
      <View
        style={{
          width: "75%",
          height: 40,
          alignSelf: "center",
        }}
      >
        <SelectList
          setSelected={setCategory}
          data={categories}
          placeholder="Select Category"
          defaultOption={{ key: "EL", value: "Electronics" }}
        />
      </View>
      <View
        style={{
          width: "75%",
          height: 40,
          alignSelf: "center",
          marginTop: 25,
        }}
      >
        <SelectList
          setSelected={setSubCategory}
          data={subcategories[category]}
          placeholder="Select Sub Category"
          defaultOption={subcategories[category][0]}
        />
      </View>
      <FormInputField
        name={"Title"}
        control={control}
        placeholder={"Product Title"}
        icon={require("../../Images/email.png")}
        rule={{
          required: "Title cannot be empty.",
        }}
      />
      <FormInputField
        name={"Description"}
        control={control}
        placeholder={"Description"}
        icon={require("../../Images/email.png")}
        rule={{
          required: "Description cannot be empty.",
        }}
      />
      <FormInputField
        name={"Price"}
        keyboardType={"number-pad"}
        control={control}
        placeholder={"Price"}
        icon={require("../../Images/email.png")}
        rule={{
          required: "Price cannot be empty.",
        }}
      />
      <PrimaryButton title={"Post"} />
    </View>
  );
};

export default List;
