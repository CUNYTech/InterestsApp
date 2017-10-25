import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Firebase from "../login/Firebase";
import * as firebase from "firebase";

class UselessTextInput extends Component {
   constructor(props) {
    super(props);
    this.state = {
        bio: '',
        userName: ''
    };
  }

  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props & passed to it up
        editable = {true}
        maxLength = {250}
      />
    );
  }
}
 
export default class BiographyScreen extends Component {
  
  static navigationOptions = {
    title: 'Biography',
  };

  constructor(props) {
    super(props);
    this.state = {
        bio: '',
        userName: ''
    };

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    const { navigate } = this.props.navigation;
    let user = firebase.auth().currentUser;
    // console.log('currentUser all info:', user)
    
    if (user != null){
      var uid = user.uid;
    }
    console.log('uid is currentUser in Biography*****:', uid)

    let ref = firebase.database().ref(uid);
    
    //writes data to Firebase
    // ref.set({
    //   bio: this.state.text
    // });
    // firebase.database().ref('users/' + uid).set({
    //   bio: this.state.text,
    // });
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var newPostKey = firebase.database().ref().child('users').push().key;
    var updates = {};
    //updates['/users/' + newPostKey] = postData;
    updates['/users/' + uid + '/bio'] = this.state.bio;
    updates['/users/' + uid + '/userName'] = this.state.userName;
    firebase.database().ref().update(updates);
    let runThis = () => navigate('ImageUpload');
        runThis();   
  }


  _onSelect = ( item ) => {
      console.log(item);
  };



    render() {
      const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>

          <Text style={styles.title}>Name:</Text>

            <View style={{
               backgroundColor: '#ccf0f9',
               borderColor: '#000000',
               borderWidth: 1,
               height: 30,
               borderBottomWidth: 1 }}
             >
               <UselessTextInput
                 multiline = {true}
                 numberOfLines = {4}
                 placeholder="anonymous potatoe "
                 onChangeText={(userName) => this.setState({userName})}
                 value={this.state.userName}
               />
            </View>

            <Text style={styles.title}>Tell us about yourself</Text>

            <View style={{
               backgroundColor: '#ccf0f9',
               borderColor: '#000000',
               borderWidth: 1,
               height: 80,
               borderBottomWidth: 1 }}
             >
               <UselessTextInput
                 multiline = {true}
                 numberOfLines = {4}
                 placeholder="I love hiking!"
                 onChangeText={(bio) => this.setState({bio})}
                 value={this.state.text}
               />
            </View>

            

            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.handlePress()} >
                <Text  style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>

          </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
     padding: 20,
     marginBottom: 10,
    },
    title:{
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15,
        marginBottom: 5,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        // fontWeight: '700',
        paddingBottom:10
    },
});



