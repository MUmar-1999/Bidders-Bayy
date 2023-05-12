import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function ErrorMessage({ err }) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="error-outline" size={22} color="#E74C3C" />
      <Text style={styles.text}>{err || "Some Error Occured"}</Text>
    </View>
  );
}

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    overflow: "hidden",
    flexDirection: "row",
    marginTop: 10,
    padding: 10,
    maxHeight: 100,
    width: "75%",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    backgroundColor: "rgba(255,0,0,0.2)",
  },
  text: {
    flex: 1,
    fontWeight: "bold",
    color: "#E74C3C",
    fontSize: 16,
    paddingLeft: 10,
  },
});
