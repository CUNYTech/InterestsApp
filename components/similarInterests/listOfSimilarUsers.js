/******************************************************************************
Title           : listOfSimilarUsers.js
Author          : Alfonso Enriquez
Description     : Generates a list of users with an interest provided as a prop.
Exports         : ListOfSimilarUsers
Child Components: ImageComponent
******************************************************************************/

/******************************************************************************
  Libraries
******************************************************************************/

import React, { Component } from 'react';
import { Image} from 'react-native';
import { Content, Card, CardItem, Spinner, Text, Right, Left, Icon} from 'native-base';
import * as firebase from "firebase";
import { withNavigation, StackNavigator } from 'react-navigation';


/******************************************************************************
  ImageComponent Class Declaration
  @USE-CASE: passing a user-id obtain that users image. If id is not in store, return 'astronaut.png'.
******************************************************************************/

class ImageComponent extends Component{

  /******************************************************************************
  Navigation and Constructor
  ******************************************************************************/
  //@userId: inherited as a prop, searches image for that userId
  //@imageUrl: url for an
  //@exists: in case image doesn't exist in firebase storage
  //@loading: for loading purposes while a call is being made to firebase

  constructor(props){
    super(props);
    this.state = {
      userId: this.props.userId,
      imageUrl: '',
      exists: true,
      loading: true
    }
  }
  /******************************************************************************
    Function definitions
  ******************************************************************************/

  //@Title: componentWillMount
  //@Description: Fetches image from firebase storage by looking with user id, if non-existent, setState.exists to false
  //@Postcondition: imageUrl is updated with downloadUrl

  componentWillMount(){
    firebase.storage().ref()
      .child('images/'+ this.state.userId + '/profilePicture.jpg').getDownloadURL()
        .then((url) => {
          this.setState({
            imageUrl: url,
            loading: false,
            exists: true
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
    //@Description: Renders a loading button during componentWillMount. Render an image.
    //@Postcondition: Image is either's users or if in inexistent astronaunt.png

  render(){
    return(
      <Content>
      {this.state.loading ?
        (
          <Content>
            <Spinner/>
          </Content>
        ):(
            this.state.exists ? (
              <Content><Image style={{width: 40, height: 40}} source={{uri: this.state.imageUrl}} /></Content>
            ):(
              <Content><Image style={{width: 40, height: 40}} source={require('../../images/astronaut.png')} /></Content>
            )
        )
      }
      </Content>
    )
  }
}

/******************************************************************************
  ListOfSimilarUsers Class Declaration
  @USE-CASE: renders a list of users based on their used id.
******************************************************************************/

 class ListOfSimilarUsers extends Component {

  /******************************************************************************
  Navigation and Constructor
  ******************************************************************************/
  //@interest: to fetch all users with that same interest
  //@usersWithSimilarInterests: to store users with that same interest
  //@loading: for loading purposes while a call is being made to firebase
  constructor(props){
    super(props);
    this.state = {
      interest: this.props.interest,
      usersWithSimilarInterests: [],
      loading: true
    }
  }

  /******************************************************************************
    Function definitions
  ******************************************************************************/

  //@Title: componentWillMount
  //@Description: Iterate through an of usersWithSimilarInterests to make api calls to Firebase and get their information. Promises are used to store all ids and then update state.
  //@Postcondition: Stores user OBJECTS from information and change the state of usersWithSimilarInterests.
  componentWillMount(){
    let usersWithSimilarInterests = []
    let objectUser = {}

    let requests = this.props.usersWithSimilarInterests.map((userId) => {
      return new Promise((resolve) => {
        firebase.database().ref('Luis_Users/' + userId).ref.on('value', (snapshot) => {
          objectUser = snapshot.val()
          objectUser.userId = userId
          usersWithSimilarInterests.push(objectUser)
          resolve()
        });
      })
    })

    Promise.all(requests).then(() =>
      this.setState({
        usersWithSimilarInterests: usersWithSimilarInterests,
        loading: false
      })
    );
  }

  //@Title: onPress
  //@Description: Passes props through navigate to UserProfile
  onPress(user) {
    const { navigate } = this.props.navigation;
    let runThis = () => navigate('UserProfile', {userId: user});
    runThis();
  }

  //@Title: Render
  //@Description: Renders a list of users with image and name.
  //@Postcondition: Renders a loading button while information is being fetched from db. Upon success, it iterates through loggedInUsersInterests and passes its element as a prop to InterestCard.
  //@withNavigation: is a Higher Order Component which passes the navigation prop into a wrapped Component that is globally available.
 

  // OPTIMIZATION
  // @Issue: static cards
  // @Solution: a card should lead you that user's profile
  render(){
    return(
      <Content>
        {this.state.loading ?
          (
            <Content>
              <Card>
                <Text> Loading Users...</Text>
              </Card>
            </Content>
          ):
          (
            this.state.usersWithSimilarInterests.map((item, key) => {
              return(
                 <CardItem key={key}>
                    <ImageComponent userId={item.userId}/>
                    <Text style={{"flexGrow":2}} onPress={()=>this.onPress(item.userId)}> {item.name} </Text>
                    <Right>
                      <Icon name='add-circle' onPress={()=>this.onPress(item.userId)}/>
                    </Right>
                </CardItem>
              )
            })
          )
        }
      </Content>
    )
  }
}

export default withNavigation(ListOfSimilarUsers);
