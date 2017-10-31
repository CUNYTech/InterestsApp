import React, { Component } from 'react';
import { Text, View, Image} from 'react-native';
import * as firebase from "firebase";

class ImageComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      userId: this.props.userId,
      image: '',
      exists: true,
      loading: true
    }
  }

  componentWillMount(){

    firebase.storage().ref()
      .child('images/'+ this.state.userId + '/profilePicture.jpg').getDownloadURL()
        .then((url) => {
          this.setState({
            image: url,
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

  render(){
    return(
      <View>
      {this.state.loading ?
        ( <View>
            <Text> Loading Users with Similar Interests...</Text>
          </View>
        ):(
            this.state.exists ? (
              <View><Image style={{width: 120, height: 120, margin: 5, flexDirection: "row"}} source={{uri: this.state.image}} /></View>
            ):(
              <View><Image style={{width: 120, height: 120, margin: 5, flexDirection: "row"}} source={require('../../images/astronaut.png')} /></View>
            )
        )
      }
      </View>
    )
  }
}


export default class ListOfSimilarUsers extends Component {
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
    let usersWithSimilarInterests = []

    this.props.similarUsersIds.forEach((userId) => {
      let objectUser = {}
      const id = userId
      firebase.database().ref('Luis_Users/' + userId).ref.on('value', (snapshot) => {
      //   // is getting every snapshot from  Luis_Users
        objectUser = snapshot.val()
        objectUser.userId = id
        usersWithSimilarInterests.push(objectUser)
      });
    })

    setTimeout(() => {
      this.setState({
        usersWithSimilarInterests: usersWithSimilarInterests,
        loading: false
      })
    }, 3000);
  }

  render(){
    return(
      <View>
        {this.state.loading ?
          ( <View>
              <Text> Loading Users with Similar Interests...</Text>
            </View>
          ):
          (
            this.state.usersWithSimilarInterests.map((item, key) => {
              return(
                <View key={key}>
                  <Text> {item.name} </Text>
                  <ImageComponent userId={item.userId}/>
                </View>)
            })
          )
        }
      </View>
    )
  }
}
