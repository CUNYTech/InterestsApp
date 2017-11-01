componentWillMount(){
  let userIdsForFirebaseCall = this.props.usersWithSimilarInterests
  let usersWithSimilarInterests = []

  asyncFunction = (userId, cb) => {
    firebase.database().ref('Luis_Users/' + userId).ref.on('value', (snapshot) => {
      let loadedUser = {}
      loadedUser = snapshot.val();
      loadedUser.userId = userId;
      usersWithSimilarInterests.push(loadedUser);
      cb();
    })
  }

  let obtainedAllUsers = userIdsForFirebaseCall.reduce((promiseChain, userId) => {
    return promiseChain.then(() => new Promise((resolve) => {
      asyncFunction(userId, resolve);
    }))
  }, Promise.resolve())

  obtainedAllUsers.then(() => {
    this.setState({
      usersWithSimilarInterests: usersWithSimilarInterests,
      loading: false
    })
  })
}
