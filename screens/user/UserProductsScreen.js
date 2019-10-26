import React from 'react';
import {FlatList, Platform} from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const UserProductsScreen = (props) => {
  const userProducts = useSelector(state => state.products.userProducts);
  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => {
        return (
          <ProductItem
            title={itemData.item.title}
            price={itemData.item.price}
            image={itemData.item.imageUrl}
            onViewDetail={() => {}}
            onAddToCart={() => {}}
          />
        );
      }}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton} title="products-header">
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserProductsScreen;
