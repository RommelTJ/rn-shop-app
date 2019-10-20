import {ADD_TO_CART} from "../actions/cart";
import CartItem from "../../models/cartItem";

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      if (state.items[addedProduct.id]) {
        // We already have the item in the cart.
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + productPrice
        };
      } else {
        // Adding a brand new item.
        const newCartItem = new CartItem(1, productPrice, productTitle, productPrice);
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + productPrice
        };
      }
    default:
      return state;
  }
};
