import * as firebase from "firebase";

class Firebase {

    /**
     * Initialises Firebase
     */
    static initialise() {
        firebase.initializeApp({
            apiKey: "AIzaSyCY8jEbXh9Lkj7yfvxz-e0-7XbZ3iSiTg8",
            authDomain: "interestesapp.firebaseapp.com",
            databaseURL: "https://interestesapp.firebaseio.com",
            storageBucket: "interestesapp.appspot.com"
        });

        
    }

}

export default Firebase;
