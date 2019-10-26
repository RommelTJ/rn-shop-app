import React from 'react';
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

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

export default UserProductsScreen;
