/******************************************************************************
Title           : interestCardList.js
Author          : Alfonso Enriquez
Description     : Generates a list of users with an interest provided as a prop.
Exports         : InterestCardList
Child Components: ListOfSimilarUsers
******************************************************************************/

/******************************************************************************
  Libraries
******************************************************************************/

import React, { Component } from 'react';
import ListOfSimilarUsers from './listOfSimilarUsers.js'
import { Content, Card, CardItem, Spinner, Text, Right } from 'native-base';
import * as firebase from "firebase";

/******************************************************************************
  SimilarInterestsLayout Class Declaration
******************************************************************************/

export default class InterestCardList extends Component {

  /******************************************************************************
    Navigation and Constructor
  ******************************************************************************/
  //@interest: inherited as a prop
  //@usersIdsWithSimilarInterests: this variables stores all of the userIds with similar interest.
  //@loading: for loading purposes while a call is being made to firebase

  constructor(props){
    super(props);
    this.state = {
      interest: this.props.interest,
      usersIdsWithSimilarInterests: [],
      loading: true
    }
  }

  /******************************************************************************
    Function definitions
  ******************************************************************************/

  //@Title: componentWillMount
  //@Description: Fetches information from firebase to populate an array with users with the same interest. Pushes each "childSnapshot" unto responseActivity.
  //@Postcondition: Returns an array of users ids stored on usersIdsWithSimilarInterests that match with the Logged In User's id.

  componentWillMount(){
    let ref =  firebase.database().ref('Luis_Activities/' + this.state.interest);
    let responseActivity = [];

    ref.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let childData = childSnapshot.val();
        responseActivity.push(childData)
      });

      this.setState({
        usersIdsWithSimilarInterests: responseActivity,
        loading: false
      })
    })
  }

  /******************************************************************************
    Render
  ******************************************************************************/

  //@Title: Render
  //@Description: Renders a loading button while information is being fetched from db. Upon success, it passes usersIdsWithSimilarInterests as a prop to ListOfSimilarUsers
  //@Postcondition: Once state.loading is false, render ListOfSimilarUsers.

  render(){
    return(
      <Content>
        {this.state.loading ?
          (
            <Content>
              <Card>
                <Spinner />
                <Text>Loading users interested in {this.state.interest}...</Text>
              </Card>
            </Content>
          ):(
            <Content>
              <Card>
                <CardItem header>
                  <Text>{this.state.interest} </Text>
                </CardItem>
                <ListOfSimilarUsers usersWithSimilarInterests={this.state.usersIdsWithSimilarInterests}/>
              </Card>
            </Content>
          )
        }
      </Content>
    )
  }
}
