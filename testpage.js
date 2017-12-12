// NOTE: LOGIN AND LoginForm ARE NOT USE FOR THIS PROJECT
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Button, StatusBar} from 'react-native';
import { StackNavigator,DrawerNavigator } from 'react-navigation';


// IMPORT COMPONENTS
import firebase from "firebase";




export default class TestPage extends React.Component {
    static navigationOptions = {
        title: 'TestPage',
      };

      
    testFirebase(){
        let user = firebase.auth().currentUser;
        let userId = user.uid;
        let ref = firebase.database().ref('users/' + userId  ).orderByKey();
        ref.once("value")
        .then(function(childSnapshot) {
            //snapshot.forEach(function(childSnapshot) {

            childSnapshot.forEach(function(child){

            // let key = child.key;

            // console.log("childd" + key);



            // console.log("childd" + key.child("userName").val());
            //     //console.log("chidddd" + childSnapshot.key.val());
            
             //})
            //key will be "ada" the first time and "alan" the second time
            var key = child.key;
            console.log("childSnapShot" + key);
            // childData will be the actual contents of the child
            var childData = child.val();
            console.log("childData" + childData);

        });
    });
     // });
        

       //    console.log("heeeeeello " + ref.userName);
    }
  render() {
    return (
        <View>
            <Text onPress = {this.testFirebase} >Hello</Text>
            
        </View>

    )
  }
}
