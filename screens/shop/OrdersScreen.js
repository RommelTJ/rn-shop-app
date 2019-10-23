import React from 'react';
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";

const OrdersScreen = (props) => {
  const orders = useSelector(state => state.orders.orders);
  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => {
        return <Text>{itemData.item.totalAmount}</Text>;
      }}
    />
  );
};

OrdersScreen.navigationOptions = {
  headerTitle: 'Your Orders'
};

export default OrdersScreen;