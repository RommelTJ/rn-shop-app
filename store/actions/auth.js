import { AsyncStorage } from 'react-native';
import ENV from "../../env";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({type: AUTHENTICATE, userId, token});
  }
};

export const signUp = (email, password) => {
  return async(dispatch) => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ENV().firebaseApiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password, returnSecureToken: true})
    });

    if (!response.ok) await errorHandler(response);

    const resData = await response.json();
    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logIn = (email, password) => {
  return async(dispatch) => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ENV().firebaseApiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password, returnSecureToken: true})
    });

    if (!response.ok) await errorHandler(response);

    const resData = await response.json();
    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logOut = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logOut());
    }, expirationTime);
  };
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
