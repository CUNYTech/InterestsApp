import React, { Component } from 'react';
import { Text, View} from 'react-native';
import * as firebase from "firebase";



function UserInformation(props) {
    return(
      <View>
        <Text> {props.user.userName} </Text>
        <Text> {props.user.bio} </Text>
      </View>
    )
  }

export default class UserProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
        userId: this.props.userId,
        user: {},
        loading: true
      }
    }

    componentWillMount() {
      firebase.database().ref("users/" + this.state.userId).once('value').then((snapshot) => {
          this.setState({
            loading: false,
            user: snapshot.val()
          })
        })


    }

  render(){
    return(
      <View>
        { (this.state.loading === true) ? 
            (
              <Text> Loading from Database... </Text>
              ):(
              <UserInformation user={this.state.user}/>
            )
        }
        <UserInformation user={alfonso}/>
      </View>
    )
  }
}
