import React, { Component } from 'react';
import { Image} from 'react-native';
import { Content, Card, CardItem, Spinner, Text, Right, Left, Icon} from 'native-base';
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
      <Content>
      {this.state.loading ?
        (
          <Content>
            <Spinner/>
          </Content>
        ):(
            this.state.exists ? (
              <Content><Image style={{width: 40, height: 40}} source={{uri: this.state.image}} /></Content>
            ):(
              <Content><Image style={{width: 40, height: 40}} source={require('../../images/astronaut.png')} /></Content>
            )
        )
      }
      </Content>
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
                    <Text style={{"flexGrow":2}}> {item.name} </Text>
                    <Right>
                      <Icon name='add-circle' />
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
