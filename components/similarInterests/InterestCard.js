import React, { Component } from 'react';
import { Text, View} from 'react-native';
import ListOfSimilarUsers from './listOfSimilarUsers.js'

export default class InterestCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      interestsArray: this.props.interestArray,
      usersWithSimilarInterests: [],
      loading: true
    }
  }

  componentWillMount(){
    let iDsForUsersWithSimilarInterests = ["123", "456", "789"]
    console.log(this.state.interestArray)
    // makes api call to interests table
    setTimeout(() => {
      this.setState({
        usersWithSimilarInterests: iDsForUsersWithSimilarInterests,
        loading: false
      })
    }, 1000);
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
              <ListOfSimilarUsers interest={this.state.interestsArray[0]}/>

              <Text> Interests Two: {this.state.interestsArray[1]} </Text>
              <ListOfSimilarUsers interest={this.state.interestsArray[1]}/>

              <Text> Interest Three: {this.state.interestsArray[2]} </Text>
              <ListOfSimilarUsers interest={this.state.interestsArray[2]}/>
            </View>
          )
        }
      </View>
    )
  }
}
