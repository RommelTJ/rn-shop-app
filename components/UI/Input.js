import React from 'react';
import { Text, View, TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  return (
    <View style={styles.formControl} >
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={formState.inputValues.title}
        onChangeText={(text) => textChangeHandler("title", text)}
      />
      { !formState.inputValidities.title && <Text>{props.errorText}</Text> }
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%"
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#CCC",
    borderBottomWidth: 1
  }
});

export default Input;
