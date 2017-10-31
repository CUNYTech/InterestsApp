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
import {Container, Content, Spinner, Text } from 'native-base';
import InterestCard from './InterestCard.js';
import * as firebase from "firebase";

/******************************************************************************
  SimilarInterestsLayout Class Declaration
******************************************************************************/

export default class SimilarInterestsLayout extends Component {

  /******************************************************************************
    Navigation and Constructor
  ******************************************************************************/

  //@title: renders the title for the Header Page
  static navigationOptions = ({ navigation }) => ({
    title: 'Similar Interests',
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

  //@Description: Fetches information from firebase to populate the Logged In User's interests.
  //              Information fetched from firebase is stored on responseActivity.

  //@Postcondition: Returns an array of interests that match with the Logged In User's id.
  //                Sets the state of loading to false and loggedInUsersInterests to responseActivity.

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
  //@Description: Renders a loading button while information is being fetched from db.
  //              Upon success, it passes loggedInUsersInterests as a prop to InterestCard.

  //@Postcondition: Once state.loading is false, render InterestCard.

  render(){

    return(
      <Container>
        {
          this.state.loading ? (
            <Content>
              <Spinner />
              <Text> Loading Interests of Users </Text>
            </Content>
          ) :
          (
            <Content>
              <Text>
                Interests
              </Text>
              {
                this.state.loggedInUsersInterests.map((interest, key) => {
                  return(
                    <Content key={key}>
                      <InterestCard interest={interest}/>
                    </Content>)
                })
              }
            </Content>
          )
        }
      </Container>

    )
  }
}
