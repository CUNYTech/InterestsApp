import React, { Component } from 'react';
import { Text, View} from 'react-native';
import InterestCard from './InterestCard.js';


export default class SimilarInterestsLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId: this.props.userId,
      interestArray: [],
      loading: true
    }
  }

  componentWillMount(){
    let interests = ["guitar", "coding", "sports"]

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
