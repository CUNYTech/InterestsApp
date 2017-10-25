// import React from 'react';
// import { StyleSheet, Text, View, KeyboardAvoidingView  } from 'react-native';
// import LoginForm from './LoginForm';
// class Login extends React.Component {
//     constructor(props) {
//         super(props);
    
//         Firebase.initialise();
    
//         this.getInitialView();
    
//         this.state = {
//           userLoaded: false,
//           initialView: null
//         };
    
//         this.getInitialView = this.getInitialView.bind(this);
    
//       }
    
//       getInitialView() {
    
//         firebase.auth().onAuthStateChanged((user) => {
    
//           let initialView = user ? "Home" : "Login";
    
//           this.setState({
//             userLoaded: true,
//             initialView: initialView
//           })
//         });
    
    
//       }
    
//       static renderScene(route, navigator) {
    
//         switch (route.name) {
    
//           case "Home":
//             return (<Home navigator={navigator} />);
//             break;
    
//           case "Login":
//             return (<Login navigator={navigator} />);
//             break;
    
//         }
    
//       }
    
//       static configureScene(route) {
    
//         if (route.sceneConfig) {
//           return (route.sceneConfig);
//         } else {
//           return ({
//             ...Navigator.SceneConfigs.HorizontalSwipeJump,
//             gestures: {}
//           });
//         }
    
//       }
      
//   render() {
//     return (
//         <KeyboardAvoidingView behavior="padding" style={styles.container}>
//             <View style={styles.title}>
//                 <Text>
//                     (Interest APP)
//                 </Text>
//             </View>
//             <View style={styles.formContainer}>
//                 <LoginForm />
//             </View>
//         </KeyboardAvoidingView>


//     );
//   }
// }

// const styles = StyleSheet.create({
//     container: {
//             flex: 1,
//             backgroundColor: '#3498db',
//         },
//         title:{
//             alignItems: 'center',
//             flexGrow: 1,
//             justifyContent: 'center'

//         }
// });

// export default Login;
