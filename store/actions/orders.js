import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

const BASE_URL = "https://rn-shop-app-c3d3c.firebaseio.com";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      const response = await fetch(`${BASE_URL}/orders/${userId}.json`);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      const loadedOrders = [];
      for (const key in responseData) {
        loadedOrders.push(
          new Order(
            key,
            responseData[key].cartItems,
            responseData[key].totalAmount,
            new Date(responseData[key].date)
          )
        );
      }
      dispatch({type: SET_ORDERS, orders: loadedOrders});
    } catch (error) {
      // Send to custom analytics server.
      throw error;
    }
  }
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const date = new Date();
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(`${BASE_URL}/orders/${userId}.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cartItems, totalAmount, date: date.toISOString()})
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();

    dispatch({ type: ADD_ORDER, orderData: { id: responseData.name, items: cartItems, amount: totalAmount, date } });
  };
};
