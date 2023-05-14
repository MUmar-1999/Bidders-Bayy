import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState, useCallback } from "react";

function SearchBar({ value, onChange }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search products..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={() => setSearchQuery("")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
