import React from 'react';
import { ScrollView, StyleSheet, View, KeyboardAvoidingView, Button } from 'react-native';

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

const AuthScreen = (props) => {
  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id='email'
            label='E-Mail'
            keyboardType='email-address'
            required
            email
            autoCapitalize='none'
            errorMessage='Please enter a valid e-mail address.'
            onInputChange={() => {}}
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
            errorMessage='Please enter a valid password.'
            onInputChange={() => {}}
            initialValue=""
          />
          <Button
            title="Login"
            color={Colors.primary}
            onPress={() => {}}
          />
          <Button
            title="Switch to Sign Up"
            color={Colors.accent}
            onPress={() => {}}
          />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  }
});

export default AuthScreen;
