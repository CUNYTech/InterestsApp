import React, { Component } from 'react';
import { Text, View} from 'react-native';
import ListOfSimilarUsers from './listOfSimilarUsers.js'
import * as firebase from "firebase";

export default class InterestCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId: firebase.auth().currentUser,
      interestsArray: this.props.interestArray,
      usersWithSimilarInterests: [],
      loading: true
    }
  }

  componentWillMount(){

    let ref =  firebase.database().ref('Luis_Activities/' + this.state.interestsArray[0]);
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
      <View>
        {this.state.loading ?
          (
            <Text>Now we are are querying for users with Similar Interets...</Text>):
          (
            <View>
              <Text> Interests One: {this.state.interestsArray[0]} </Text>
              <ListOfSimilarUsers similarUsersIds={this.state.usersWithSimilarInterests}/>
            </View>
          )
        }
      </View>
    )
  }
}
