// a single 'data' object that holds the data of your entire app, with initial values
var data = {
  projects: [],
}

// a single 'handlers' object that holds all the actions of your entire app
var actions;
if (localStorage.getItem('prolanner::user') != null) {
  //console.log(localStorage.getItem('prolanner::user') )
  actions = {
    logged: true
  };
  data.user = JSON.parse(localStorage.getItem('prolanner::user'))
  //console.log(data.user)
} else {
  actions = {
    logged: false
  }
}

// the main render() function. call this function whenever the app's UI
// needs to to re-rendered
// 'data' and 'actions' are injected into the app
function render(){
  ReactDOM.render(
    <MyComponents.App
        data={data}
        actions={actions}/>,
    $('#app-container').get(0)
  )
}

//
// DATA
//

var firebaseRef = new Firebase('https://prolanner.firebaseio.com')

// Real-time Data (load constantly on changes)
firebaseRef.on('value', function(snapshot){
   
    if(actions.logged) {
      var projects = data.user.projectIDs
      data.projects=[]
      console.log("Projects inside actions.looged: ")
      console.log(projects)
      for (var i in projects) {
        if(projects[i] && projects[i]!="undefined"){
          console.log("not null")
          var projRef = firebaseRef.child("projects").child(projects[i])
          projRef.on('value',function(snapshot){
            data.projects.push(snapshot.val())
            render()
          })
        }
        else {
          console.log("Project is null")
        }
      }
    }

    else {
      data.projects= _.values(snapshot.val().projects)
      render()
    }
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
        userName: authData.github.username,
        userID: authData.github.id,
        status: 'online'
      }

      var userRef = firebaseRef.child('users')
      var isUserPresent;
      var gid = "github:"+authData.github.id

      userRef.on('value', function(snapshot){
        console.log("exists:"+snapshot.child(gid).exists())
        if(snapshot.child(gid).exists()==true) {
          isUserPresent = true
          var uref = firebaseRef.child("users").child(gid)
          firebaseRef.child("users").child(gid).update({status:"online"});
          uref.on('value', function(snapshot){
            data.user = snapshot.val()
            localStorage.setItem('prolanner::user', JSON.stringify(data.user))
            var projects = _.values(snapshot.val().projectIDs)
            console.log("Projects: ")
            console.log(projects)
            data.projects=[]
            for (var i in projects) {
              if(projects[i] && projects[i]!="undefined") {
                var projRef = firebaseRef.child("projects").child(projects[i])
                projRef.on('value',function(snapshot){
                  data.projects.push(snapshot.val())
                  render()
                })
              }
            }
          })
        }
        else {
          isUserPresent = false
          data.projects=[]
          var uref = firebaseRef.child("users").child(gid)
          uref.set(user)
          uref.on('value', function(snapshot){
            data.user = snapshot.val()
            render()
          })

          // set the user data
          //uref.set(user)
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

    var gid = "github:"+data.user.userID
    var userRef = firebaseRef
      .child('users')
      .child(gid)

    // unsubscribe to the user data
    userRef.off()

    // set the user's status to offline
    userRef.child('status').set('offline')
    localStorage.removeItem('prolanner::user')
    console.log('delete prolanner')

    data.user = null

    render()

  }

}
