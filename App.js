// NOTE: LOGIN AND LoginForm ARE NOT USE FOR THIS PROJECT
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Button, StatusBar} from 'react-native';
import { StackNavigator } from 'react-navigation';


// IMPORT COMPONENTS
import firebase from "firebase";
import InterestScreen from './components/registration/InterestsPage';
import BiographyScreen from './components/registration/Biography';
import ImageUploadScreen from './components/registration/ImageUpload';
import LoginFormScreen from './components/login/LoginForm';
import SimilarInterestsLayout from './components/similarInterests/similarInterestsView.js';
import LoggedInScreen from './components/loggedIn/loggedInScreen.js';


// routes takes components "acts like a navbar"
const SimpleApp = StackNavigator({
  LoginForm: { screen: LoginFormScreen },
  Interest: { screen: InterestScreen },
  Biography: { screen: BiographyScreen },
  ImageUpload: { screen: ImageUploadScreen },
  SimilarInterests: { screen: SimilarInterestsLayout },
  LoggedIn: { screen: LoggedInScreen }
});


export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}
