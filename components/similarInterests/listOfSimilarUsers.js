import React, { Component } from 'react';
import { Text, View} from 'react-native';

const users = {
  guitar: ["alfonso ","kevin"],
  coding: ["kevin t"," luis"],
  sports: [" greggian ", " robert " ]
}

export default class ListOfSimilarUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      interest: this.props.interest,
      usersWithSimilarInterests: [],
      loading: true
    }
  }

  componentWillMount(){

    // makes api call to interests table
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;

    setTimeout(() => {
      this.setState({
        usersWithSimilarInterests: users[this.state.interest],
        loading: false
      })
    }, rand);
  }

  render(){
    return(
      <View>
        {this.state.loading ?
          ( <View>
              <Text> Loading Users with Similar Interests for {this.state.interest}...</Text>
            </View>
          ):
          (
            <View>
              <Text> {this.state.usersWithSimilarInterests} </Text>
            </View>
          )
        }
      </View>
    )
  }
}
