import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  StyleSheet
} from "react-native";
import { StackNavigator } from "react-navigation";
import Firebase from "../../utils/firebase.js";
import CheckboxFormX from "react-native-checkbox-form";
import * as firebase from "firebase";

const mockData = [
  {
    label: "Sports",
    value: 1
  },
  {
    label: "Politics",
    value: 2
  },
  {
    label: "Finance",
    value: 3
  },
  {
    label: "Health",
    value: 4
  },
  {
    label: "Tech",
    value: 5
  }
];

class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      userName: ""
    };
  }

  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props & passed to it up
        editable={true}
        maxLength={250}
      />
    );
  }
}

export default class SettingScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Setting"
  });

  constructor(props) {
    super(props);

    this.state = {
      bio: "",
      userName: "",
      loading: false
    };
  }

  componentWillMount() {
    var userId = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref("/users/" + userId)
      .on("value", snapshot => {
        this.setState({
          userName: snapshot.val().userName,
          bio: snapshot.val().bio
        });
      });
  }

  handlePress() {
    const { navigate } = this.props.navigation;
    let user = firebase.auth().currentUser;
    // console.log('currentUser all info:', user)

    if (user != null) {
      var uid = user.uid;
    }
    console.log("uid is currentUser in Biography*****:", uid);

    let ref = firebase.database().ref(uid);

    //writes data to Firebase
    // ref.set({
    //   bio: this.state.text
    // });
    // firebase.database().ref('users/' + uid).set({
    //   bio: this.state.text,
    // });
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var newPostKey = firebase
      .database()
      .ref()
      .child("users")
      .push().key;
    var updates = {};
    //updates['/users/' + newPostKey] = postData;
    updates["/users/" + uid + "/bio"] = this.state.bio;
    updates["/users/" + uid + "/userName"] = this.state.userName;
    firebase
      .database()
      .ref()
      .update(updates);

    var query = firebase
      .database()
      .ref("Interests/Politics/")
      .orderByKey();
    console.log(query);

    //     query.once("value").then(function(snapshot){
    //         console.log("yaaaa"+snapshot.val());
    //         debugger;
    //         snapshot.forEach(function(childSnapshot){
    //             console.log("childSnapshot" + childSnapshot.val());
    //     })
    // })
    // query.once('value', function(snapshot){
    //     snapshot.forEach(function(childSnapshot) {
    //         console.log("HHHHH" + childSnapshot.val());
    //     })
    // })

    firebase
      .database()
      .ref("Interests/Politics/")
      .orderByKey()
      .on("value", snapshot => {
        console.log(snapshot.val());
        snapshot.forEach(function(child) {
          let value = child.val();

          if (value.userId === user.uid) {
            console.log("it matches");
            firebase
              .database()
              .ref("Interests/Politics/")
              .child(child.key)
              .remove();
          }
        });
      });

      firebase
      .database()
      .ref("Interests/Sports/")
      .orderByKey()
      .on("value", snapshot => {
        console.log(snapshot.val());
        snapshot.forEach(function(child) {
          let value = child.val();

          if (value.userId === user.uid) {
            console.log("it matches");
            firebase
              .database()
              .ref("Interests/Politics/")
              .child(child.key)
              .remove();
          }
        });
      });

      firebase
      .database()
      .ref("Interests/Finance/")
      .orderByKey()
      .on("value", snapshot => {
        console.log(snapshot.val());
        snapshot.forEach(function(child) {
          let value = child.val();

          if (value.userId === user.uid) {
            console.log("it matches");
            firebase
              .database()
              .ref("Interests/Politics/")
              .child(child.key)
              .remove();
          }
        });
      });

      firebase
      .database()
      .ref("Interests/Health/")
      .orderByKey()
      .on("value", snapshot => {
        console.log(snapshot.val());
        snapshot.forEach(function(child) {
          let value = child.val();

          if (value.userId === user.uid) {
            console.log("it matches");
            firebase
              .database()
              .ref("Interests/Politics/")
              .child(child.key)
              .remove();
          }
        });
      });

      firebase
      .database()
      .ref("Interests/Tech/")
      .orderByKey()
      .on("value", snapshot => {
        console.log(snapshot.val());
        snapshot.forEach(function(child) {
          let value = child.val();

          if (value.userId === user.uid) {
            console.log("it matches");
            firebase
              .database()
              .ref("Interests/Politics/")
              .child(child.key)
              .remove();
          }
        });
      });

    // firebase.database().ref().child("Interests/Sports").equalTo(uid).on('value',function(snapshot){
    //     snapshot.ref.remove();
    // })

    let runThis = () => navigate("ImageUpload");
    runThis();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Edit Name:</Text>

        <View
          style={{
            //backgroundColor: (this.state.loading ? ("Name") : (this.state.userName)),
            borderColor: "#000000",
            borderWidth: 1,
            height: 30,
            borderBottomWidth: 1
          }}
        >
          <UselessTextInput
            multiline={true}
            numberOfLines={4}
            placeholder={this.state.userName}
            onChangeText={userName => this.setState({ userName })}
            value={this.state.userName}
          />
        </View>

        <Text style={styles.title}>Edit Bio</Text>

        <View
          style={{
            //backgroundColor: (this.state.loading ? ("bio") : (this.state.bio)),
            borderColor: "#000000",
            borderWidth: 1,
            height: 80,
            borderBottomWidth: 1
          }}
        >
          <UselessTextInput
            multiline={true}
            numberOfLines={4}
            placeholder="I love hiking!"
            onChangeText={bio => this.setState({ bio })}
            value={this.state.bio}
          />
        </View>

        <Text style={styles.title}>INTEREST</Text>
        <Text style={styles.title}>Change your interests:</Text>
        <View style={styles.CheckboxFormX}>
          <CheckboxFormX
            style={{ width: 350 - 30 }}
            dataSource={mockData}
            itemShowKey="label"
            itemCheckedKey="RNchecked"
            iconSize={16}
            iconColor="red"
            formHorizontal={true}
            labelHorizontal={false}
            onChecked={item => this.onSelect(item)}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.handlePress()}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 10
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15,
    marginBottom: 5
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    // fontWeight: '700',
    paddingBottom: 10
  }
});
