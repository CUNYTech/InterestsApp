/******************************************************************************
Title           : profile.js
Author          : Luis Carbajal
Description     : A layout for the user Profile view.
******************************************************************************/

/******************************************************************************
  Libraries
******************************************************************************/
import React, { Component } from 'react';
import { View, Image, StyleSheet} from 'react-native';
import * as firebase from "firebase";
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Spinner, StyleProvider,H2, H3, List, ListItem} from 'native-base';
UserInformation
UserInformation
import UserInformation from './UserInformation';

/******************************************************************************
  ImageComponent Class Declaration
  @USE-CASE: passing a user-id obtain that users image. If id is not in store, return 'astronaut.png'.
******************************************************************************/
export default class UserProfile extends Component{

  /******************************************************************************
  Constructor
  ******************************************************************************/
  //@objectUserId: object that returns from the ListOfSimilarUsers props 
  //@user: will hold user information
  //@image: will hold user information
  //@imageUrl: url for an
  //@exists: in case image doesn't exist in firebase storage
  //@loading: for loading purposes while a call is being made to firebase
  constructor(props){
    super(props);
    this.state = {
        objectUserId: this.props.navigation.state.params,
        user: {},
        image:'',
        exists: true,
        loading: true
      }
    }

     /******************************************************************************
    Function definitions
  ******************************************************************************/

  //@Title: componentWillMount
  //@Description: Fetches data and image from firebase by looking with user id, if non-existent, setState.exists to false
  //@Postcondition: imageUrl is updated with downloadUrl
    componentWillMount() {
      let currentUser = this.state.objectUserId;
      let currentUserUserId = currentUser['userId']

      firebase.storage().ref()
        .child('images/' + currentUserUserId + '/profilePicture.jpg').getDownloadURL()
          .then((url) => {
            this.setState({
              image: url,
              loading: false
            })
          })
          .catch((e) =>{
          this.setState({
            exists: false,
            loading: false
          })
        })
      

      firebase.database().ref("users/" + currentUserUserId).once('value').then((snapshot) => {
          this.setState({
            loading: false,
            user: snapshot.val()
          })
        })
        .catch((e) =>{
          this.setState({
            exists: false,
            loading: false
          })
        })

    }

  /******************************************************************************
      Render
    ******************************************************************************/
    //@Title: Render
    //@Description: Renders UserInformation
  render(){
    return(
      <View>
        {this.state.loading ? 
            (
              <Content>
                <Spinner/>
              </Content>
            ):(
                <UserInformation user={this.state.user} image={this.state.image} />
              )
        }
      </View>
    )
  }

}


