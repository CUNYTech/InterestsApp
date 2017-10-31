componentDidMount() {
// holds user info: uid & email
  let user = firebase.auth().currentUser;

  // access database very especific: Luis_Users node
  let ref =  firebase.database().ref('Luis_Users');


  // to get every user/item we need to loop through childSnapshot and get the values we need to display in our frontend,
  // Important Note: the order of the code is not in order of execution "cause is async"
  // when u use the arrow function it preserves the 'this' that refers to the lexico scoping, it scopes as it reads/as u expecting reading the code

  let responseArray = [];
  ref.on('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
    let childData = childSnapshot.val();
    responseArray.push(childData)

    console.log('childData Value:', responseArray)
    // console.log('childData Bio:', childData.Bio)
    // console.log('* * responseArray * * :', responseArray)

    });
    this.setState({response: responseArray})
  });

  var storage    = firebase.storage();
  var storageRef = storage.ref();

  // var spaceRef = storageRef.child('images/lime.JPG');

  var test;
  storageRef.child('images/lime.JPG').getDownloadURL()
  .then((url) => {
    test = url;
    //this is the image
     console.log('inside test:', test)
     this.setState({images: test})
  })


  console.log('test:', test)



  // this.setState({response:childData})

 // fetch(API_URL).then((res) => res.json()).then((res) => this.setState({ job: res.job }));
}
