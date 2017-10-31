import React, { Component } from 'react';
import { Text, View} from 'react-native';
import InterestCard from './InterestCard.js';
import * as firebase from "firebase";

export default class SimilarInterestsLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId: firebase.auth().currentUser,
      interestArray: [],
      loading: true
    }
  }

  componentWillMount(){
    // holds user info: uid & email
    const interests = ["Sports"]
  // access database very especific: Luis_Users node
    let ref =  firebase.database().ref('Luis_Users');

    var rand = Math.round(Math.random() * (1000 - 500)) + 500;

    // makes api call to interests table
    setTimeout(() => {
      this.setState({
        interestArray: interests,
        loading: false
      })
    }, rand);
  }


  render(){

    return(
      <View>
        {
          this.state.loading ? (<Text> Loading Interests of Users </Text>) :
          (
            <View>
              <Text> Success we found your {this.state.interestArray.length} interests: </Text>
              <InterestCard interestArray={this.state.interestArray} />
            </View>
          )
        }
      </View>

    )
  }
}
