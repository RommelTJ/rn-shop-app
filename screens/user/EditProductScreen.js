import React, { useEffect, useCallback, useReducer } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ScrollView, View, Text, TextInput, StyleSheet, Platform, Alert} from 'react-native';
import CustomHeaderButton from "../../components/UI/HeaderButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import * as productsActions from "../../store/actions/products";
import Input from "../../components/UI/Input";

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
        <Input
          label="Title"
          errorText="Please enter a valid title!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
        />
        <Input
          label="Image Url"
          errorText="Please enter a valid image url!"
          keyboardType="default"
          returnKeyType="next"
        />
        {editedProduct ? null : (
          <Input
            label="Price"
            errorText="Please enter a valid price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
          />
        )}
        <Input
          label="Description"
          errorText="Please enter a valid description!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
        />
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
  }
});

export default EditProductScreen;
