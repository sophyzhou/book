// a single 'data' object that holds the data of your entire app, with initial values
var data = {
  projects: []
}

// a single 'handlers' object that holds all the actions of your entire app
var actions = {
  logged: 'false'
}

// the main render() function. call this function whenever the app's UI
// needs to to re-rendered
// 'data' and 'actions' are injected into the app
function render(){
  ReactDOM.render(
    <MyComponents.NavBar
        actions={actions}/>,
    $('#navbar').get(0)
  )
}

//
// DATA
//

var firebaseRef = new Firebase('https://prolanner.firebaseio.com')

// Real-time Data (load constantly on changes)
firebaseRef.once('value', function(snapshot){
  render()
})

actions.login = function(){

  console.log("Out")
  firebaseRef.authWithOAuthPopup("github", function(error, authData){

    console.log("in")
    // handle the result of the authentication
    if (error) {
      console.log("Login Failed!", error);
      actions.logged = false
    } else {
      actions.logged = true
      console.log("Authenticated successfully with payload:", authData);

      // create a user object based on authData
      var user = {
        displayName: authData.github.displayName,
        username: authData.github.username,
        id: authData.github.id,
        status: 'online'
      }

      var userRef = firebaseRef.child('users')
      var isUserPresent;

      console.log("UN:"+user.username)
      userRef.once('value', function(snapshot){
        console.log("ssdfs:"+snapshot.child(user.username).exists())
        if(snapshot.child(user.username).exists()==true) {
          isUserPresent = true
          var uref = firebaseRef.child("users").child(user.username)
          firebaseRef.child("users").child(user.username).update({status:"online"});
          uref.on('value', function(snapshot){
            data.user = snapshot.val()
            console.log("bajksd:"+snapshot.val())
            var projects = _.values(snapshot.val().projectIDs)
            data.projects=[]
            for (var i in projects) {
              var projRef = firebaseRef.child("projects").child(projects[i])
              projRef.on('value',function(snapshot){
                data.projects.push(snapshot.val())
                render()
              })
            }
            console.log("new proj:"+data.projects)
            render()
          })
        }
        else {
          isUserPresent = false
          var uref = firebaseRef.child("users").child(user.username)
          uref.on('value', function(snapshot){
            data.user = snapshot.val()
            render()
          })

          // set the user data
          uref.set(user)
        }
      })
    }
  })
}

actions.logout = function(){

  console.log("Outside logout")
  if (data.user){

    console.log("Inside logout")
    actions.logged = false
    firebaseRef.unauth()

    var userRef = firebaseRef
      .child('users')
      .child(data.user.username)

    // unsubscribe to the user data
    userRef.off()

    // set the user's status to offline
    userRef.child('status').set('offline')

    data.user = null

    render()

  }

}
