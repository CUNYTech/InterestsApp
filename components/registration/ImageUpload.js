import React, { Component } from 'react';
import { 
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert, 
  Button,
  Image 
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Firebase from "../login/Firebase";
import * as firebase from "firebase";
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker'


export default class ImageUploadScreen extends Component {
  
  static navigationOptions = {
    title: 'ImageUpload',
  };

  constructor(props) {
   super(props)
   this.state = {
     loading: false,
     dp: null
    }
  }

  openPicker(){
    let user = firebase.auth().currentUser;
    console.log('uid is currentUser in ImageUploadScreen*****:', user)
    console.log('uid is currentUser in ImageUploadScreen*****:', user.uid)

    // let ref = firebase.database().ref(uid);

    this.setState({ loading: true })
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
    
    // const uid = "12345"
    const uid = user.uid;
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo'
    }).then(image => {

      const imagePath = image.path

      let uploadBlob = null

      const imageRef = firebase.storage().ref(uid).child("dp.jpg")
      let mime = 'image/jpg'
      fs.readFile(imagePath, 'base64')
        .then((data) => {
          //console.log(data);
          return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {

          let userData = {}
          //userData[dpNo] = url
          //firebase.database().ref('users').child(uid).update({ ...userData})

          let obj = {}
          obj["loading"] = false
          obj["dp"] = url
          this.setState(obj)

        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    const dpr = this.state.dp ? (<View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('similarIterests')}><Image
         style={{width: 200, height: 200, margin: 5}}
         source={{uri: this.state.dp}}/></TouchableOpacity><Button
      onPress={ () => navigate('similarIterests')}
      title={ "Next" }/></View>) : (<View style={styles.container}>
      <TouchableOpacity onPress={ () => this.openPicker() }><Image style={{width: 200, height: 200, margin: 5, flexDirection: "row"}} source={require('../../images/astronaut.png')} /></TouchableOpacity><Button
      onPress={ () => this.openPicker() }
      title={ "Upload an Image" }/></View>)



    const dps = this.state.loading ? <ActivityIndicator animating={this.state.loading} /> : (<View style={styles.container}>
      <View style={styles.container}>
        { dpr }
      </View>
    </View>)

    return (
      <View style={styles.container}>
        { dps }
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


