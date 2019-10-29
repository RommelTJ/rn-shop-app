import React, { useEffect, useCallback, useReducer } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ScrollView, View, Text, TextInput, StyleSheet, Platform, Alert} from 'react-native';
import CustomHeaderButton from "../../components/UI/HeaderButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import * as productsActions from "../../store/actions/products";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const inputValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const inputValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let formIsValid = true;
    for (const key in inputValidities) {
      formIsValid = formIsValid && inputValidities[key];
    }
    return { inputValues, inputValidities, formIsValid };
  }
  return state;
};

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state => state.products.userProducts.find(p => p.id === prodId));

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(
    formReducer,
    {
      inputValues: {
        title: editedProduct ? editedProduct.title : '',
        imageUrl: editedProduct ? editedProduct.imageUrl : '',
        price: '',
        description: editedProduct ? editedProduct.description : ''
      },
      inputValidities: {
        title: !!editedProduct,
        imageUrl: !!editedProduct,
        price: !!editedProduct,
        description: !!editedProduct
      },
      formIsValid: !!editedProduct
    }
  );

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [{text: "Ok"}]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        productsActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({'submit': submitHandler})
  }, [submitHandler]);

  const textChangeHandler = (input, text) => {
    let isValid = false;
    if (text.trim().length > 0) isValid = true;
    dispatchFormState({ type: FORM_INPUT_UPDATE, value: text, isValid, input });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl} >
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={(text) => textChangeHandler("title", text)}
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onEndEditing={() => console.log("end editing")}
            onSubmitEditing={() => console.log("submit editing")}
          />
          { !formState.inputValidities.title && <Text>Please enter a valid title.</Text> }
        </View>
        <View style={styles.formControl} >
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={(text) => textChangeHandler("imageUrl", text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl} >
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={(text) => textChangeHandler("price", text)}
              keyboardType='decimal-pad'
            />
          </View>
        )}
        <View style={styles.formControl} >
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={(text) => textChangeHandler("description", text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit');

  return {
    headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton} title="edit-header">
        <Item
          title="Save"
          iconName={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
          onPress={submitFn}
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
