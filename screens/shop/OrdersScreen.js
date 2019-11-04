import React, { useEffect } from 'react';
import {FlatList, Platform, Text} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as ordersActions from "../../store/actions/orders";


const OrdersScreen = (props) => {
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordersActions.fetchOrders());
  }, [dispatch]);

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => {
        return (
          <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
          />
        );
      }}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
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

export default OrdersScreen;
