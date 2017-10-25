// import React, { Component } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar} from 'react-native';
// import * as firebase from "firebase";
// import { StackNavigator } from 'react-navigation';



// // IMPORT COMPONENTS
// // import InterestsPage from '../registration/InterestsPage';



// const onButtonPress = () => {
//   Alert.alert('Link to Auth');
// };


// class LoginForm extends Component {
//     static navigationOptions = ({ navigation }) => ({
//     title: 'Interest',
//     //title: `Interest ${navigation.state.params.user}`,
//   });
//     constructor(props) {
//         super(props);

//         this.state = {
//             email: "",
//             password: "",
//             response: ""
//         };

//         this.signup = this.signup.bind(this);
//         this.login = this.login.bind(this);
//     }

//     async signup() {
//         try {
//             await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

//             this.setState({
//                 response: "Account Created"
//             });
//             alert(this.state.response);
//         } catch (error) {
//             this.setState({
//                 response: error.toString()
//             })
//         }

//     }

//     async login() {
//         try {
//             await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
//             console.log('HERE')

//             this.setState({
//                 response: "Logged In!"
//             })
//             .then(
//                 () => navigate('Interest')
//                 )
//             //alert(this.state.response)
//         } catch (error) {
//             this.setState({
//                 response: error.toString()
//             })
//         }

//     }

//     render() {
//         const { navigate } = this.props.navigation;
//         return (
//             <View style={styles.container}>
//             <Button onPress={() => navigate('Interest')} title="INTEREST PAGE" />
//                 <StatusBar barStyle="light-content"/>
//                 <TextInput style = {styles.input}
//                             autoCapitalize="none"
//                             onSubmitEditing={() => this.passwordInput.focus()}
//                             autoCorrect={false}
//                             keyboardType='email-address'
//                             returnKeyType="next"
//                             placeholder='Email or Mobile Num'
//                             onChangeText ={(email) => this.setState({email})}
//                             placeholderTextColor='rgba(225,225,225,0.7)'/>

//                 <TextInput style = {styles.input}
//                            returnKeyType="go" ref={(input)=> this.passwordInput = input}
//                            placeholder='Password'
//                            onChangeText ={(password) => this.setState({password})}
//                            placeholderTextColor='rgba(225,225,225,0.7)'
//                            secureTextEntry/>
//                  {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}
//               <TouchableOpacity style={styles.buttonContainer} onPress={this.signup}>
//                     <Text  style={styles.buttonTextSignUp}>Signup</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
//                     <Text  style={styles.buttonText}>Login</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }


// const styles = StyleSheet.create({
//     container: {
//      padding: 20,
//      marginBottom: 10,

//     },
//     input:{
//         height: 40,
//         backgroundColor: 'rgba(225,225,225,0.2)',
//         marginBottom: 10,
//         padding: 10,
//         color: '#fff'
//     },
//     buttonContainer:{
//         backgroundColor: '#2980b6',
//         paddingVertical: 15,
//         marginBottom: 5,
//     },
//     buttonText:{
//         color: '#fff',
//         textAlign: 'center',
//         fontWeight: '700',
//         paddingBottom:10
//     },
//     buttonTextSignUp:{
//         color: 'orange',
//         textAlign: 'center',
//         fontWeight: '700',
//         paddingBottom:10
//     },

//     loginButton:{
//       backgroundColor:  '#2980b6',
//        color: '#fff'
//     }

// });

// export default LoginForm;
