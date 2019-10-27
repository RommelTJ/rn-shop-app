import React from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';

const EditProductScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl} >
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.formControl} >
          <Text style={styles.label}>Image URL</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.formControl} >
          <Text style={styles.label}>Price</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.formControl} >
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {},
  formControl: {},
  label: {},
  input: {}
});

export default EditProductScreen;
