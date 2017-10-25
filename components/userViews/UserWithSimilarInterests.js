import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
import CheckboxFormX from 'react-native-checkbox-form';
import { StackNavigator } from 'react-navigation';

const mockData = [
    {
        label: 'Sports',
        value: 'two'
    },
    {
        label: 'Politics',
        value: 'three'
    },
    {
        label: 'Finance',
        value: 'one'
    },
    {
        label: 'Health',
        value: 'two'
    },
    {
        label: 'Tech',
        value: 'one'
    },
    //repeat
    {
        label: 'Sports',
        value: 'two'
    },
    {
        label: 'Politics',
        value: 'three'
    },
    {
        label: 'Finance',
        value: 'one'
    },
    {
        label: 'Health',
        value: 'two'
    },
    {
        label: 'Tech',
        value: 'one'
    },
    {
        label: 'Educat',
        value: 'three'
    },

    
    
];
 
export default class UserWithSimilarInterestsScreen extends Component {
  static navigationOptions = {
    title: 'similarIterests',
  };

  _onSelect = ( item ) => {
      //console.log("item CHECK:", item);
      console.log("this.mockData.value.RNchecked:", item.RNchecked);
      // Interest1: this.mockData.value.RNchecked;
    };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      response: ""
    };

    // this.signup = this.signup.bind(this);
  }

  handlePress() {
    const { navigate } = this.props.navigation;
    let user = firebase.auth().currentUser;
    if (user != null){
      var uid = user.uid;
    } 

    let ref = firebase.database().ref(uid);
    ref.set({
      Interest: this.mockData.value,
    });   

    let runThis = () => navigate('Biography');
    runThis(); 
  }

  render() {
    const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>
        
          <Text style={styles.title}>Based on your intersts here are some users</Text>
          <View style={styles.CheckboxFormX} >
            <CheckboxFormX
                style={{ width: 350 - 30 }}
                dataSource={mockData}
                itemShowKey="label"
                itemCheckedKey="RNchecked"
                iconSize={120}
                iconColor='red'
                formHorizontal={true}
                labelHorizontal={false}
                onChecked={(item) => this._onSelect(item)}
            />
          </View>

          {/*<TouchableOpacity style={styles.buttonContainer} onPress={() => navigate('Biography')}>
              <Text  style={styles.buttonText}>
              TEST</Text>
          </TouchableOpacity>*/}
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
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,

    },
    CheckboxFormX:{
        height: 480,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,

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
    buttonTextSignUp:{
        color: 'orange',
        textAlign: 'center',
        // fontWeight: '700',
        paddingBottom:10
    },

    loginButton:{
      backgroundColor:  '#2980b6',
       color: '#fff'
    }

});



