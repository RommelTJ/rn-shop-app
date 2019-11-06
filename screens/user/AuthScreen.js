import React, { useState, useReducer, useCallback } from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView, Button, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";


const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const inputValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const inputValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let formIsValid = true;
    for (const key in inputValidities) {
      formIsValid = formIsValid && inputValidities[key];
    }
    return { inputValues, inputValidities, formIsValid };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(
    formReducer,
    {
      inputValues: {
        email: '',
        password: ''
      },
      inputValidities: {
        email: false,
        password: false
      },
      formIsValid: false
    }
  );

  const authHandler = () => {
    let action;
    if (isSignUp) {
      action = authActions.signUp(formState.inputValues.email, formState.inputValues.password);
    } else {
      action = authActions.logIn(formState.inputValues.email, formState.inputValues.password);
    }
    dispatch(action);
  };

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    });
  }, [dispatchFormState]);

  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen}>
      <LinearGradient colors={['#FFEDFF', '#FFE3FF']} style={styles.gradient} >
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id='email'
              label='E-Mail'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorText='Please enter a valid e-mail address.'
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id='password'
              label='Password'
              keyboardType='default'
              securedTextEntry
              required
              minLength={5}
              autoCapitalize='none'
              errorText='Please enter a valid password.'
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button
                title={isSignUp ? "Sign Up" : "Login"}
                color={Colors.primary}
                onPress={authHandler}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={isSignUp ? "Switch to Log In" : "Switch to Sign Up"}
                color={Colors.accent}
                onPress={() => setIsSignUp(prevState => !prevState)} // toggles the signup
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
