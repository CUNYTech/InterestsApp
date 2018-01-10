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
import { StackNavigator,DrawerNavigator } from 'react-navigation';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Spinner, StyleProvider,H2, H3, List, ListItem} from 'native-base';


/******************************************************************************
    Function definitions
  ******************************************************************************/

  //@Title: UserInformation
  //@Description: Gets props from UserProfile class and returns jsx elememts that UserProfile renders

  
  

export default function UserInformation(props) {
  // class HomeScreen extends React.Component {
  //   static navigationOptions = ({ navigation }) => ({
  //     title: 'Welcome',
  //   });
  //   constructor(props){
  //     super(props);
  //   }
  // }

    return(
      
      <View>

        <CardItem cardBody>
          <Image source={{uri: 'https://images8.alphacoders.com/372/372682.jpg'}} style={{height: 200, width: null, flex: 1}}/>
        </CardItem>


        { (props.image) ? 
          (<Right>
            <Thumbnail large source={{uri: props.image}} style={{ marginTop: -140}} />
          </Right>)  :   (<Right>
            <Thumbnail large source={require('../../images/astronaut.png')} style={{ marginTop: -140}} />
          </Right>)  
        }

        <Right>
          <Text style={{ marginTop: -50, textAlign:'center', fontWeight:'bold', fontSize: 18, width: 200, backgroundColor: 'white'}}>{props.user.name} {"\n"} NYC</Text>
        </Right>


        <CardItem style={{flex:0,flexDirection: 'row'}}>
        <Right>
          <Button rounded info style={{ height:40}}>
            <Text>Friends</Text>
            <Icon name='ios-people-outline' />
          </Button>
        </Right>

          <Right>
          <Button rounded success style={{ height:40}} onPress={() => props.navigate.navigate('Chat')} >
            <Text>Connect</Text>
            <Icon name='ios-paper-plane-outline' />
          </Button>
          </Right>
        </CardItem>

        <CardItem>
          <Body>
            <H3 >About me</H3>
            <Text style={{textAlign:'justify'}}> {props.user.Bio} </Text>
          </Body>
        </CardItem>

      
        <CardItem>
          <Body>
            <H3>Best Moments</H3>
            <List style={{flex:0,flexDirection: 'row'}}>

              <ListItem>
                <Thumbnail square style={{ height: 100, width:100, flex: 0 }} source={{ uri: 'https://www.fitnessbin.com/wp-content/uploads/2015/05/zwKUy5hBmjZjw7Nw5mTs4o4x.jpeg'}} />
              </ListItem>

              <ListItem>
                <Thumbnail square style={{ height: 100, width:100, flex: 0 }} source={{ uri: 'https://secure.meetupstatic.com/photos/event/1/1/2/7/highres_441304391.jpeg'}} />
              </ListItem>

              

              <ListItem>
                <Thumbnail square style={{ height: 100, width:100, flex: 0 }} source={{ uri: 'https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Kids/best+3+soccer+formations+front.jpeg'}} />
              </ListItem>

            </List>
          </Body>
        </CardItem>


        <CardItem style={{height: 200}}>
          <Body>
            <H3>Common Activities</H3>
            <List style={{flex: 0,flexDirection: 'row', width: 100}}>
              { (props.user) ? 
                  (props.user.interest.map((interest, key) => {
                    return(
                      <ListItem key={key} automaticallyAdjustContentInsets={false}>
                        <Button rounded light style={{ width: 100, height:45}}>
                          <Text>{interest}</Text>
                        </Button>
                      </ListItem>
                    ) 
                  })) : <Text>Loading ...</Text>
                }
             </List>
          </Body>
        </CardItem>

      </View>
    )
}