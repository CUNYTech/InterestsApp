/******************************************************************************
Title           : InterestCard.js
Author          : Alfonso Enriquez
Description     : Generates a list of users with an interest provided as a prop.
Exports         : InterestCard
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

export default class InterestCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId: firebase.auth().currentUser,
      interest: this.props.interest,
      usersWithSimilarInterests: [],
      loading: true
    }
  }

  componentWillMount(){
    let ref =  firebase.database().ref('Luis_Activities/' + this.state.interest);

    let responseActivity = [];

    ref.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let childData = childSnapshot.val();
        responseActivity.push(childData)
      });

      this.setState({
        usersWithSimilarInterests: responseActivity,
        loading: false
      })
    })
  }

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
                <ListOfSimilarUsers similarUsersIds={this.state.usersWithSimilarInterests}/>
              </Card>
            </Content>
          )
        }
      </Content>
    )
  }
}
