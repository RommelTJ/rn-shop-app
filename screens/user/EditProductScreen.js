import React, {useState} from 'react';
import {ScrollView, View, Text, TextInput, StyleSheet, Platform} from 'react-native';
import CustomHeaderButton from "../../components/UI/HeaderButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

const EditProductScreen = (props) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl} >
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
        </View>
        <View style={styles.formControl} >
          <Text style={styles.label}>Image URL</Text>
          <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)} />
        </View>
        <View style={styles.formControl} >
          <Text style={styles.label}>Price</Text>
          <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)} />
        </View>
        <View style={styles.formControl} >
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)} />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton} title="edit-header">
        <Item
          title="Save"
          iconName={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
          onPress={() => {

          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
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

export default EditProductScreen;
