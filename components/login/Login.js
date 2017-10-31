


class LoginFormScreen extends Component {
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
        let runThis = () => navigate('Interest');
        runThis();
    } catch (error) {
        this.setState({
            response: error.toString()
        })
    } finally {
      alert(this.state.response);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
            <Button onPress={() => navigate('Interest')} title="INTEREST PAGE" />
            <TextInput style = {styles.input}
                        autoCapitalize="none"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        autoCorrect={false}
                        keyboardType='email-address'
                        returnKeyType="next"
                        placeholder='Email or Mobile Num'
                        onChangeText ={(email) => this.setState({email})}
                        placeholderTextColor='rgba(225,225,225,0.7)'/>

            <TextInput style = {styles.input}
                       returnKeyType="go" ref={(input)=> this.passwordInput = input}
                       placeholder='Password'
                       onChangeText ={(password) => this.setState({password})}
                       placeholderTextColor='rgba(225,225,225,0.7)'
                       secureTextEntry/>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.signup}>
                <Text  style={styles.buttonTextSignUp}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
                <Text  style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainerGo}  onPress={() => navigate('Interest')}>
                <Text  style={styles.buttonText}>GO TO INTEREST PAGE</Text>
            </TouchableOpacity>

{/*FOR DEVELOPMENT PURPOSES*/}

            <TouchableOpacity style={styles.buttonContainerGo}  onPress={() => navigate('similarIterests')}>
                <Text  style={styles.buttonText}>GO TO SIMILAR ITERESTS PAGE</Text>
            </TouchableOpacity>
      </View>
    );
  }
}
