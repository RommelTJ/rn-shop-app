import PRODUCTS from "../../data/dummy-data";
import {CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT} from "../actions/products";
import Product from "../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === "u1")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        'u1',
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };
    case UPDATE_PRODUCT:
      const productIdx = state.userProducts.findIndex(p => p.id === action.pid);
      const availableProductIdx = state.availableProducts.findIndex(p => p.id === action.pid);
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIdx].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIdx].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIdx] = updatedProduct;
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIdx] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(p => p.id !== action.pid),
        availableProducts: state.availableProducts.filter(p => p.id !== action.pid)
      };
    default:
      return state;
  }
}
