import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

const API_KEY = 'REDACTED';

export const authenticate = (userId, token) => {
  return {type: AUTHENTICATE, userId, token};
};

export const signUp = (email, password) => {
  return async(dispatch) => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password, returnSecureToken: true})
    });

    if (!response.ok) await errorHandler(response);

    const resData = await response.json();
    dispatch(authenticate(resData.localId, resData.idToken));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logIn = (email, password) => {
  return async(dispatch) => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password, returnSecureToken: true})
    });

    if (!response.ok) await errorHandler(response);

    const resData = await response.json();
    dispatch(authenticate(resData.localId, resData.idToken));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logOut = () => {
  return { type: LOGOUT };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({token, userId, expiryDate: expirationDate.toISOString() } )
  );
};

const errorHandler = async (response) => {
  const errorResponse = await response.json();
  const errorId = errorResponse.error.message;
  let message = "Something went wrong!";
  if (errorId === "EMAIL_NOT_FOUND") {
    message = "This email could not be found!";
  } else if (errorId === "INVALID_PASSWORD") {
    message = "This password is not valid!";
  } else if (message === "EMAIL_EXISTS") {
    message = "This email exists already!";
  }
  throw new Error(message);
};
