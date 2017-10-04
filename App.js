import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
//import Login from './components/login/Login';
import LoginForm from './components/login/LoginForm';
import Firebase from "./components/login/Firebase";
import * as firebase from "firebase";
class Login extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initialise();
  }



  render() {
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.title}>
                <Text>
                    (Interest APP)
                </Text>
            </View>
            <View style={styles.formContainer}>
                <LoginForm />
            </View>
        </KeyboardAvoidingView>


    );
  }
}

const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: '#3498db',
        },
        title:{
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'center'

        }
});




export default Login;



