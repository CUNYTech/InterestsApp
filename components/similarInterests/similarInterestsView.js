/******************************************************************************
Title           : similarInterestsView.js
Author          : Alfonso Enriquez
Description     : A layout for the similar interests view.
Exports         : SimilarInterestsLayout
Child Components: InterestCard
******************************************************************************/

/******************************************************************************
  Libraries
******************************************************************************/

import React, { Component } from 'react';
import {Container, Content, Spinner, Text, StyleProvider, H1, Header, Right, Button, Icon, Body, Title } from 'native-base';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import InterestCardList from './interestCardList.js';
import * as firebase from "firebase";
import Drawer from 'react-native-drawer';
import SideBar from '../NavigationMenu/SideBar.js';

/******************************************************************************
  SimilarInterestsLayout Class Declaration
******************************************************************************/

export default class SimilarInterestsLayout extends Component {

  /******************************************************************************
    Navigation and Constructor
  ******************************************************************************/

  //@title: renders the title for the Header Page
  static navigationOptions = ({ navigation }) => ({
    title: 'Users based by Interests',
    //header: ({ navigation }) => ({
       // right:(
       //      <Button
       //        transparent
       //        onPress={() => this.props.navigation.navigate("DrawerOpen")}>
       //        <Icon name="menu" />
       //      </Button>
       // )      
       
     //}),
  });


  //@loggedInUserId: this id represents the Logged In users' firebase id.
  //@loggedInUsersInterests: this variables stores all of the interests by a user in firebase.
  //@loading: for loading purposes while a call is being made to firebase
  constructor(props){
    super(props);
    this.state = {
      loggedInUserId: "0hSRWqDlYTepVK9idccmZq4TmD02",
      loggedInUsersInterests: [],
      loading: true
    }
  }

  /******************************************************************************
    Function definitions
  ******************************************************************************/

  //@Title: componentWillMount
  //@Description: Fetches information from firebase to populate the Logged In User's interests. Information fetched from firebase is stored on responseActivity.
  //@Postcondition: Returns an array of interests that match with the Logged In User's id.Sets the state of loading to false and loggedInUsersInterests to responseActivity.

  componentWillMount(){
    
    let responseActivity = []

    firebase.database().ref('Luis_Activities').on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        responseActivity.push(childSnapshot.key)
      })
      this.setState({
        loggedInUsersInterests: responseActivity,
        loading: false
      })
    })
  }

  /******************************************************************************
    Render
  ******************************************************************************/

  //@Title: Render
  //@Description: Renders a loading button while information is being fetched from db. Upon success, it iterates through loggedInUsersInterests and passes its element as a prop to InterestCard.
  //@Postcondition: Once state.loading is false, render InterestCard.

  render(){

    return(
      <StyleProvider style={getTheme(material)}>
      <Container>    
        
        
        {
             this.state.loading ? (
            <Content>
              <Spinner />
              <Text style={{"textAlign": "center"}}> Loading Interests of Users </Text>
            </Content>
          ) :
          (
            <Content>
              <H1 style={{"textAlign": "center"}}>
                Interests & Similar Users
              </H1>
              {
                this.state.loggedInUsersInterests.map((interest, key) => {
                  return(
                    <Content key={key}>
                      <InterestCardList interest={interest}/>
                    </Content>)
                })
              }
            </Content>
          )
        }
      
      </Container>
      </StyleProvider>
    )
  }
}







