import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCY8jEbXh9Lkj7yfvxz-e0-7XbZ3iSiTg8",
  authDomain: "interestesapp.firebaseapp.com",
  databaseURL: "https://interestesapp.firebaseio.com",
  projectId: "interestesapp",
  storageBucket: "interestesapp.appspot.com",
  messagingSenderId: "505255925049"
};

const fire = firebase.initializeApp(config);

export default fire

//
// var user = firebase.auth().currentUser;
// if (user != null) {
// var uid = user.uid;
// console.log('current user ID: ', uid);
// }
