import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

const BASE_URL = "https://rn-shop-app-c3d3c.firebaseio.com";

export const fetchProducts = () => {
  return async (dispatch) => {
    // any async code you want!
    try {
      const response = await fetch(`${BASE_URL}/products.json`);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      const products = [];
      for (const key in responseData) {
        products.push(
          new Product(
            key,
            'u1',
            responseData[key].title,
            responseData[key].imageUrl,
            responseData[key].description,
            responseData[key].price
          )
        );
      }
      dispatch({ type: SET_PRODUCTS, products });
    } catch (error) {
      // Send to custom analytics server.
      throw error;
    }
  }
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`${BASE_URL}/products/${productId}.json?auth=${token}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    const response = await fetch(`${BASE_URL}/products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, description, imageUrl, price})
    });

    const responseData = await response.json();

    dispatch({ type: CREATE_PRODUCT, productData: {id: responseData.name, title, description, imageUrl, price} });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(`${BASE_URL}/products/${id}.json?auth=${token}`, {
      method: 'PATCH', // PUT overrides the data, PATCH updates what you tell it
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, description, imageUrl})
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({ type: UPDATE_PRODUCT, pid: id, productData: {title, description, imageUrl} });
  };
};
