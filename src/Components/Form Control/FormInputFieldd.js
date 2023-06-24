import { View, Image, TextInput, StyleSheet, Text } from "react-native";

import { Controller } from "react-hook-form";

const FormInputFieldd = ({
  control,
  name,
  rule,
  placeholder,
  icon,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rule}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[styles.container, { borderColor: error ? "red" : "black" }]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              style={styles.input}
              keyboardType={keyboardType || "default"}
              autoCapitalize={"none"}
            />
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.error}>{error.message || "Error"}</Text>
            </View>
          )}
        </>
      )}
    />
  );
};

export default FormInputFieldd;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  input: {
    width: "100%",
  },
  errorContainer: {
    width: "100%",
    alignSelf: "center",
    marginBottom: -5,
    flexDirection: "row",
    paddingLeft: 10,
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
});
