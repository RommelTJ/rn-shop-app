import React from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native';
import {useSelector} from "react-redux";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(product => product.id === productId)
  );

  return (
    <ScrollView>
      <Image source={{uri: selectedProduct.imageUrl}} />
      <Button title="Add to Cart" onPress={() => {}} />
      <Text>${selectedProduct.price.toFixed(2)}</Text>
      <Text>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle")
  };
};

const styles = StyleSheet.create({
  
});

export default ProductDetailScreen;
