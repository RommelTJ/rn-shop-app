export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";

const API_KEY = 'REDACTED';

export const signUp = (email, password) => {
  return async(dispatch) => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password, returnSecureToken: true})
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    dispatch({type: SIGN_UP});
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

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    dispatch({type: SIGN_IN});
  };
};
