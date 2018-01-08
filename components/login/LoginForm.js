import React, { Component } from 'react';

import { KeyboardAvoidingView, Alert, StatusBar} from 'react-native';
import { Container, StyleProvider, Header, Content, Text, Form, Item, Input, Label, Button, Drawer} from 'native-base';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import firebase from "firebase";

export default class LoginFormScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'LoginForm',
  });

  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: "",
        response: ""
    };

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }


  async signup() {
    try {
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
        //send userId to the user table to create a new node within the user table, the new node will hold the userid ex: id: 234 everytime to fill this
        this.setState({
            response: "Account Created"
        });

    } catch (error) {
        this.setState({
            response: error.toString()
        })
    } finally {
      alert(this.state.response);
    }
  }

  async login() {
    const { navigate } = this.props.navigation;

    try {
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
        this.setState({
            response: "Logged In!"
        });
        // console.log(this.state.response)
        let runThis = () => navigate('SimilarInterests');
        runThis();
    } catch (error) {
        this.setState({
            response: error.toString()
        })
    } finally {
      //alert(this.state.response);
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
    <StyleProvider style={getTheme(material)}>
      <Container>

        <Form>

          <Item floatingLabel style={{"marginBottom":"2%"}}>
            <Label>Username</Label>
            <Input  autoCapitalize="none"
                    onChangeText ={(email) => this.setState({email})} />
          </Item>
        
          <Item floatingLabel last style={{"marginBottom":"2%"}}>
            <Label>Password</Label>
            <Input  autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText ={(password) => this.setState({password})}/>
          </Item>

          <Button onPress={this.signup}
                  block primary style={{"marginTop":"2%", "marginBottom":"2%"}}>
            <Text>Signup</Text>
          </Button>

          <Button onPress={this.login}
                  bordered block primary style={{"padding":"2%", "marginBottom":"10%"}}>
            <Text>Login</Text>
          </Button>

        </Form>

        <Container style={{  "flexDirection": "row",
                        "justifyContent": "center",
                        "alignItems": 'center'}}>
          <Button onPress={() => navigate('SimilarInterests')}
                  rounded light>
            <Text>Skip Login</Text>
          </Button>
        </Container>


        <Container style={{  "flexDirection": "row",
                        "justifyContent": "center",
                        "alignItems": 'center'}}>
          <Button nPress={() => navigate("DrawerOpen")}
                  rounded light>
            <Text>Skip x</Text>
          </Button>
        {/* TODO: 32/40 */}
          <Button onPress={() => navigate('Setting')}
                  rounded light>
            <Text>Settings</Text>
          </Button>

          <Button onPress={() => navigate('Chat')}
                  rounded light>
            <Text>Chat</Text>
          </Button>

          <Button onPress={() => navigate('Chat')}
                  rounded light>
            <Text>Chat</Text>
          </Button>

          <Button onPress={() => navigate('TestPage')}
                  rounded light>
            <Text>Test</Text>
          </Button>

        </Container>

      </Container>
    </StyleProvider>
    );
  }
}