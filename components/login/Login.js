import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView  } from 'react-native';
import LoginForm from './LoginForm';
class Login extends React.Component {
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
