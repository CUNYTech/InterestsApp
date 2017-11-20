
import React, { Component } from 'react';
import { AppRegistry, Image, StatusBar, StyleSheet, View } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Header,
  Left,
  Right,
  Icon, 
  Body,
  Title
} from "native-base";
import UserProfile from '../../components/userViews/profile.js';
import SimilarInterestsLayout from '../../components/similarInterests/similarInterestsView.js';
import InterestScreen from '../../components/registration/InterestsPage.js';
import BiographyScreen from '../../components/registration/Biography.js';
import ImageUploadScreen from '../../components/registration/ImageUpload.js';
import LoggedInScreen from '../../components/loggedIn/loggedInScreen.js';

import { StackNavigator } from 'react-navigation';





export default class SideBar extends Component {
 static navigationOptions= ({navigation}) =>({
      title: 'Side Menu', 
      // title: 'Biography',
  });  
  
 //pass down props and set up states
 constructor(props) {
    super(props);
    this.state = {
        bio: '',
    };

    this.handlePress = this.handlePress.bind(this);
  } 

 //define handler 
  handlePress() {
    const { navigate } = this.props.navigation;
    let runThis = () => navigate('BiographyScreen');
        runThis();
  }

  
  render(){
    const { navigate } = this.props.navigation;
    return(
    <View>   
      <Text style={styles.pageName}>Menu </Text>
    <Button onPress={() => navigate('SimilarInterests')}
                  rounded light>
            <Text>Similar Interests</Text>
    </Button>
    
    <Button onPress={() => navigate('BiographyScreen')} 
                  rounded light>
            <Text>Biography</Text>
    </Button>
    
    <Button onPress={() => this.handlePress('ImageUploadScreen')} //edited
                  rounded light>
            <Text>Image Upload</Text>
    </Button>
     
     <Button onPress={() => navigate('LoggedInScreen')}
                  rounded light>
            <Text>LoggedIn</Text>
    </Button>

    <Button onPress={() => navigate('SimilarInterestsLayout')}
                  rounded light>
            <Text>SimilarInterestsLayout</Text>
    </Button>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  pageName:{
    margin:10,
    fontWeight:'bold',
    color:'#000',
    textAlign:'center'
  },
});
