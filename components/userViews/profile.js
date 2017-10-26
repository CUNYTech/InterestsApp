import React, { Component } from 'react';
import { Text, View} from 'react-native';
import Firebase from "../login/Firebase";
import * as firebase from "firebase";

alfonso = {
  userName: "Alfonso",
  bio: "i like components",
  interests: ['coding', 'lounging']
}

kevUserId = "jtnAkFHYrieKZ93N7Kf8OJdEx4Y2"

function UserInformation(props) {
    return(
      <View>
        <Text> {props.user.userName} </Text>
      </View>
    )
  }

export default class UserProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
        user: {},
        loading: true
      }
    }

    componentWillMount() {
      let userArray = []
      let dbUser = {}

      firebase.database().ref("users/" + kevUserId).once('value').then((snapshot) => {
          dbUser = snapshot.val()
          console.log(dbUser)

          this.setState({
            loading: false,
            user: dbUser
          })
        })


    }

  render(){
    return(
      <View>
        {this.state.loading === true ? <Text> Loading from Database... </Text> : (<UserInformation user={this.state.user}/>)}
        <UserInformation user={alfonso}/>
      </View>
    )
  }
}
