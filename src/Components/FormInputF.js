import { View, Image, TextInput, StyleSheet, Text } from "react-native";

import { Controller } from "react-hook-form";

const FormInputF = ({
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
            <Image source={icon} style={{ width: 25, height: 25 }} />
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

export default FormInputF;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
  },
  errorContainer: {
    width: "100%",
    alignSelf: "center",
    marginBottom: -20,
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
});
