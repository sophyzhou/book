var _ = require('lodash');
var casual = require('casual');
var Firebase = require('firebase');
var localStorage = require('localStorage')

var prolannerRef = new Firebase("https://prolanner.firebaseio.com/")
var allUserIDs;
prolannerRef.child('users').once('value', function (snapshot) {
    allUserIDs = Object.keys(snapshot.val());
});


// simualate a random person entering, staying for a duration, and leaving
function simulate(){
    // stuff we need for all simulations
    var randUser = allUserIDs[casual.integer(0,allUserIDs.length-1)]
    var duration = casual.integer(10, 20)

    // simulate this user login to do some operations
    login(randUser)

    // Random Projects
    if (casual.integer(0, 15) > -1) {
    addProject({
            projectMetaData: {
                projectName: casual.title,
                createdBy: randUser,
                createdAt: Firebase.ServerValue.TIMESTAMP,
                projectMembers: [randUser].concat(selectNUsers(casual.integer(0, 5))),
                projectID: "",
                relatedChatRoom: ""
            },
    })}

    var randProjectID;
    prolannerRef.child('projects').once('value', function (snapshot) {
        var projectIDs = Object.keys(snapshot.val());
        randProjectID = projectIDs[Math.floor(Math.random() * projectIDs.length)];

        if (casual.integer(0, 15) > -1) {
            addEvent(randProjectID, {
                eventName: casual.title,
                eventDate: casual.date(format = "MM/DD/YYYY"),
                location: ''
            })
        }

        if (casual.integer(0, 15) > -1) {
            addTask(randProjectID, {
                taskName: casual.title,
                taskDescription: casual.short_description,
                priority: casual.integer(0, 2),
                taskStatus: casual.integer(0, 2),
                assignedTo: allUserIDs[Math.floor(Math.random() * allUserIDs.length)],
                deadline: casual.date(format = "MM/DD/YYYY")
            })
        }


        setTimeout(function() {
            editProject(randProjectID, {
                    projectMetaData: {
                        projectName: casual.title
                    },
                }
            )
        }, 1000)

        if (casual.integer(0,100) > -1)
        {
            var roomID;
            prolannerRef.child('projects').child(randProjectID).child('projectMetaData').once('value', function(snapshot) {
                roomID = snapshot.val().relatedChatRoom
                sendMessage(roomID, randUser)
            })
        }

        var eventIDs;
        prolannerRef.child('events').child(randProjectID).once('value', function (snapshot) {
            eventIDs = Object.keys(snapshot.val());
            setTimeout(function() {
                randEventID = eventIDs[Math.floor(Math.random() * eventIDs.length)]

                editEvent(randProjectID, randEventID, {
                    eventName: "event" + Math.floor(Math.random() * 10000).toString(),
                    eventDate: casual.date(format="MM/DD/YYYY"),
                    location: ''})

                setTimeout(function() {
                    if (casual.integer(0, 15) > 15) {
                        deleteEvent(randProjectID, randEventID);
                    }
                }, 6000)

            }, 1000)
        });

        var taskIDs;
        prolannerRef.child('tasks').child(randProjectID).once('value', function (snapshot) {
            taskIDs = Object.keys(snapshot.val());
            setTimeout(function() {
                randTaskID = taskIDs[Math.floor(Math.random() * taskIDs.length)]

                editTask(randProjectID, randTaskID, {
                    taskName : casual.title,
                    taskDescription : casual.short_description,
                    priority : casual.integer(0,2),
                    taskStatus : casual.integer(0,2),
                    assignedTo: allUserIDs[Math.floor(Math.random() * allUserIDs.length)],
                    deadline : casual.date(format="MM/DD/YYYY")
                })

                setTimeout(function () {
                    if (casual.integer(0, 15) > 15) {
                        deleteTask(randProjectID, randTaskID);
                    }
                }, 5000)

            }, 1000)
        });

    });

    setTimeout(function() {
        if (casual.integer(0, 15) > 15) {
            deleteProject(randProjectID);
        }
    },  8000);

    // simulate this person leaving after 'duration' seconds
    setTimeout(function () {
        logout(randUser);
    }, duration * 1000)
}


/* Simulating User Login & Logout */
function login(userID) {
    // randomly logs in users 
    prolannerRef.child('users').child(userID).update({status: 'online'});
    localStorage.setItem('userID', userID)
}

function logout(userID) {
    // randomly logs out users 
    prolannerRef.child('users').child(userID).update({status: 'offline'});
}


/* Task Operations */
// add / edit / delete

function addTask(projectID, taskObject) {
    console.log('Add a task in project ' + projectID)
    var taskRef = prolannerRef.child('tasks').child(projectID).push();
    taskRef.set(taskObject)
}

function deleteTask(projectID, taskID) {
    console.log('Delete task ' + taskID + ' in project ' + projectID);
    var taskRef = prolannerRef.child('tasks').child(projectID).child(taskID)
    taskRef.remove();
}

function editTask(projectID, taskID, taskObject) {
    console.log('Edit task ' + taskID + ' in project ' + projectID);
    var taskRef = prolannerRef.child('tasks').child(projectID).child(taskID)
    taskRef.update(taskObject)
}


/* Project Operations */ 
// add / edit / delete 

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
    console.log('Add project ' + newProjectRef.key())
}

function deleteProject(projectID){
    console.log("Delete project " + projectID)
    var roomID = "";
    var projRef = prolannerRef.child('projects').child(projectID)
    projRef.child('projectMetaData').once("value", function(snapshot) {
      //console.log("members:"+snapshot.child('members').val()[0])
      // d === false (because there is no "name/middle" child in the data snapshot)
        if (snapshot.val() == null) {return false}
        roomID = snapshot.val().relatedChatRoom;
        var projectMembers = snapshot.val().projectMembers;
        projectMembers.forEach(function (userID) {
            var userRef = prolannerRef.child('users').child(userID)
            userRef.child('projectIDs').once("value", function(snapshot) {
                var projectIDs = snapshot.val();
                userRef.child("projectIDs").set(projectIDs.filter(function(a){if (a!=projectID) {return a}}))
            });
        })
    });

    setTimeout(function () {
        if (roomID != "") {
            prolannerRef.child('projects').child(projectID).remove();
            prolannerRef.child('tasks').child(projectID).remove();
            prolannerRef.child('events').child(projectID).remove();
            prolannerRef.child('chatrooms').child(roomID).remove();}
        }, 500)
}

function editProject(projectID, projectObject){
    console.log('Eidt project ' + projectID)
    var ProjectRef = prolannerRef.child('projects').child(projectID)
    ProjectRef.child('projectMetaData').update(projectObject.projectMetaData)
}


/* Event Operations */
// add / edit / delete

function addEvent(projectID, eventObject) {
    console.log('Add an event to project ' + projectID )
    var newEventRef = prolannerRef.child('events').child(projectID).push()
    newEventRef.set(eventObject)
    
}

function deleteEvent(projectID, eventID) {
    console.log('Delete event ' + eventID + ' in project ' + projectID);
    var eventRef = prolannerRef.child('events').child(projectID).child(eventID);
    eventRef.remove();
}

function editEvent(projectID, eventID, eventObject) {
    console.log('Edit event ' + eventID + 'in project ' + projectID);
    var eventRef = prolannerRef.child('events').child(projectID).child(eventID)
    eventRef.update(eventObject)
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
        content: "Welcome to chatroom " + roomName + ", enjoy your talk here :)",
        name: "prolannerbot",
        timestamp: Firebase.ServerValue.TIMESTAMP,
        userID: "prolanner:0"
    })
    return roomRef.key();
}

function sendMessage(roomID, userID) {
    var message = casual.sentence
    console.log('send message ' + message + ' to ' + roomID + ' by ' + userID)
    newMessageRef = prolannerRef.child('chatrooms').child(roomID).child('roomMessages').push();
    prolannerRef.child('users').child(userID).once('value', function(snapshot){
        var displayName = snapshot.val().displayName;
        newMessageRef.set({
            content: message,
            name: displayName,
            timestamp: Firebase.ServerValue.TIMESTAMP,
            userID: userID
        })
    });

}
setTimeout(function() {setInterval(simulate, 10000)}, 2000);
