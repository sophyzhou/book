var _ = require('lodash');
var casual = require('casual');
var Firebase = require('firebase');

var hungryRef = new Firebase("https://hungry-asians.firebaseio.com/")
var prolannerRef = new Firebase("https://prolanner.firebaseio.com/")
var users;
var newusers = {};
var allUserIDs;
prolannerRef.child('users').once('value', function (snapshot) {
    allUserIDs = Object.keys(snapshot.val());
    // console.log(allUserIDs)
    // console.log(selectNUsers(3))
    var randUser = allUserIDs[casual.integer(0,allUserIDs.length-1)]
    var randUser = "github:9546162"
// addProject({
//             projectMetaData: {
//                 projectName: casual.title,
//                 createdBy: randUser,
//                 createdAt: Firebase.ServerValue.TIMESTAMP,
//                 projectMembers: [randUser].concat(selectNUsers(casual.integer(0, 5))),
//                 projectID: "",
//                 relatedChatRoom: ""
//             },
//             taskIDs: [''],
//             eventIDs: ['']
//         }
//     )
});

function transfer_users(){
    hungryRef.child('users').once('value', function (snapshot) {
        users = snapshot.val();
    for (var key in users) {
        var user = users[key];
        if (!user.hasOwnProperty('displayName')) {
            user['displayName'] = user.username
        }
        newuser = {
            displayName: user.displayName,
            status: 'offline',
            userID: user.id,
            userName: user.username,
            projectIDs: [''],
        }
        // console.log(newuser)
        newusers['github:'+user.id] = newuser;
    }

    prolannerRef.child('users').set(newusers);
    });
}

function selectNUsers(n) {
    if (n >= allUserIDs.length) {return allUserIDs}
    var _users = [];
    for (var i = 0; i < n; i++) {
        var _user = casual.random_element(allUserIDs);
        while (_user in _users) {
            _user = casual.random_element(allUserIDs);
        }
        _users.push(_user)
    }
    return _users
}



function createChatRoom(userID, projectID, members) {
    var roomRef = prolannerRef.child('chatrooms').push();
    var roomName = casual.title;
    roomRef.set({
        roomMessages: "",
        roomMetaData: {
            createdAt: Firebase.ServerValue.TIMESTAMP,
            createdBy: userID,
            relatedProject: projectID,
            roomMembers: members,
            roomName: roomName
        }
    })
    var roomMessagesRef = prolannerRef.child('chatrooms').child(roomRef.key()).child('roomMessages').push();
    roomMessagesRef.set({
        content: "Welcome to chatroom" + roomName + ", enjoy your talk here :)",
        name: "prolannerbot",
        timestamp: Firebase.ServerValue.TIMESTAMP,
        userID: "prolanner:0"
    })
    return roomRef.key();
}

function addProject(projectObject){
    var newProjectRef = prolannerRef.child('projects').push()
    projectObject.projectMetaData.projectMembers.forEach(function(userID) {
        var userRef = prolannerRef.child('users').child(userID)
        userRef.child('projectIDs').once("value", function(snapshot) {
            var projectIDs = snapshot.val()
            if (projectIDs == null) {projectIDs = []}
            projectIDs.push(newProjectRef.key())
            userRef.child("projectIDs").set(projectIDs.filter(function(a){if (a!='') return a}))
        });
    })
    var roomID = createChatRoom(projectObject.projectMetaData.createdBy, newProjectRef.key(), projectObject.projectMetaData.projectMembers)
    projectObject.projectMetaData.relatedChatRoom = roomID;
    projectObject.projectMetaData.projectID = newProjectRef.key();

    newProjectRef.set(projectObject)
}


console.log('hello')
transfer_users()
console.log('end')
