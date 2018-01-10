/******************************************************************************
Title           : SideBar.js
Author          : Kevin Mei
Description     : A side menu with buttons to navigate to liste of interest, Bio, and Image Load page (user profile TBD)
Exports         : SideBar View
Child Components: InterestScreen, BiographyScreen, and ImageUploadScreen
******************************************************************************/

/******************************************************************************
  Libraries
******************************************************************************/
import React, { Component } from 'react';
import { AppRegistry, Image, StatusBar, StyleSheet, View } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Header,
  Left,
  Right,
  Icon, 
  Body,
  Title
} from "native-base";
import UserProfile from '../../components/userViews/profile.js';
import SimilarInterestsLayout from '../../components/similarInterests/similarInterestsView.js';
import InterestScreen from '../../components/registration/InterestsPage.js';
import BiographyScreen from '../../components/registration/Biography.js';
// import ImageUploadScreen from '../../components/registration/ImageUpload.js';
import LoggedInScreen from '../../components/loggedIn/loggedInScreen.js';

import { StackNavigator } from 'react-navigation';


/******************************************************************************
  SideBar Class Declaration
******************************************************************************/
export default class SideBar extends Component {
 static navigationOptions= ({navigation}) =>({
      title: 'Side Menu', 

  });  
  
 /******************************************************************************
    Render
  ******************************************************************************/

  //@Title: Render
  //@Description: Renders three buttons for List of Interes Screen, Biography Screen, and Upload Image Screen so far.
  //@Postcondition: Each button is onclick to navigate to the wanted Screen.
  //@Ongoing: missing User Profile Button, will implment later
  render(){

    const { navigate } = this.props.navigation;
    return(
    <View>   
      <Text style={styles.pageName}>Menu </Text>  

    

    <Button onPress={() => navigate('Interest')}
                  rounded light>
            <Text>Interest List</Text>
    </Button>
    
    <Button onPress={() => navigate('Biography')} 
                  rounded light>
            <Text>Biography</Text>
    </Button>
{/*     
    <Button onPress={() => navigate('ImageUpload')} 
                  rounded light>
            <Text>Image Upload</Text>
    </Button>
      */}
    </View>
    );
  }
}
const styles = StyleSheet.create({
  pageName:{
    margin:10,
    fontWeight:'bold',
    color:'#000',
    textAlign:'center'
  },
});
