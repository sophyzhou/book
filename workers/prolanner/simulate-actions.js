var _ = require('lodash')
var random_name = require('node-random-name');
var Firebase = require('firebase');

var prolannerRef = new Firebase("https://prolanner.firebaseio.com/")
var allUsernames;
prolannerRef.child('users').once('value', function (snapshot) {
    allUsernames = Object.keys(snapshot.val());
});


// simualate a random person entering, staying for a duration, and leaving
function simulate(){
    // stuff we need for all simulations
    var randUser = allUsernames[Math.floor(Math.random() * allUsernames.length)];
    var duration = 1 + 3 * Math.random()

    var taskNames = ["Complete the authentication module","Create the database","Find all the user stories for the project","Write code for creating the users","Snippet to allow users to add new tasks"]
    var taskDescription = ["a","b","c","d","e"]
    var priority = ["Low", "High", "Medium"]
    var taskStatus = ["To be done", "In Progress", "Done"]
    var deadline = ["03/05/2016","05/19/2016","05/13/2016","10/13/2016","11/23/2016"]        

    // simulate this user login to do some operations
    login(randUser)

    // Random Projects
    addProject({
        projectName: "project" + Math.floor(Math.random() * 10000).toString(), 
        taskIDs: [''], 
        eventIDs: [''], 
        members: [randUser], 
        chatroomID:""})

    var projectIDs;
    prolannerRef.child('projects').once('value', function (snapshot) {
        projectIDs = Object.keys(snapshot.val());
    });

    setTimeout(function() {
        randProjectID = projectIDs[Math.floor(Math.random() * projectIDs.length)];

        editProject(randProjectID, {
        projectName: "project" + Math.floor(Math.random() * 10000).toString(), 
        taskIDs: [''], 
        eventIDs: [''], 
        members: [randUser], 
        chatroomID:""})


        setTimeout(function() {
            deleteProject(randProjectID);
        },  500);
    }, 1000)
    


    // Random Events
    addEvent({
        eventName: "event" + Math.floor(Math.random() * 10000).toString(), 
        eventDate: deadline[Math.floor(Math.random() * deadline.length)], 
        location: ''})

    var eventIDs;
    prolannerRef.child('events').once('value', function (snapshot) {
        eventIDs = Object.keys(snapshot.val());
    });

    setTimeout(function() {
        randEventID = eventIDs[Math.floor(Math.random() * eventIDs.length)]

        editEvent(randEventID, {
            eventName: "event" + Math.floor(Math.random() * 10000).toString(), 
            eventDate: deadline[Math.floor(Math.random() * deadline.length)], 
            location: ''})

        setTimeout(function() {
            deleteEvent(randEventID);
        }, 500)
    }, 1000)

    // Random tasks
    addTask({
        taskName : taskNames[Math.floor(Math.random() * taskNames.length)],
        taskDescription : taskDescription[Math.floor(Math.random() * taskDescription.length)],
        priority : priority[Math.floor(Math.random() * priority.length)],
        taskStatus : taskStatus[Math.floor(Math.random() * taskStatus.length)],
        assignedTo: allUsernames[Math.floor(Math.random() * allUsernames.length)],
        deadline : deadline[Math.floor(Math.random() * deadline.length)]
    })

    var taskIDs;
    prolannerRef.child('tasks').once('value', function (snapshot) {
        taskIDs = Object.keys(snapshot.val());
    });

    setTimeout(function() {
        randTaskID = taskIDs[Math.floor(Math.random() * taskIDs.length)]

        editTask(randTaskID, {
                taskName : taskNames[Math.floor(Math.random() * taskNames.length)],
                taskDescription : taskDescription[Math.floor(Math.random() * taskDescription.length)],
                priority : priority[Math.floor(Math.random() * priority.length)],
                taskStatus : taskStatus[Math.floor(Math.random() * taskStatus.length)],
                assignedTo: allUsernames[Math.floor(Math.random() * allUsernames.length)],
                deadline : deadline[Math.floor(Math.random() * deadline.length)]
        })

        setTimeout(function () {
            deleteTask(randTaskID);
        }, 500)
    }, 1000)


    // simulate this person leaving after 'duration' seconds
    setTimeout(function () {
        logout(randUser);
    }, duration * 1000)
}


/* Simulating User Login & Logout */
function login(username) {
    // randomly logs in users 
    prolannerRef.child('users').child(username).update({status: 'online'});
}
function logout(username) {
    // randomly logs out users 
    prolannerRef.child('users').child(username).update({status: 'offline'});
}


/* Task Operations */
// add / edit / delete

function addTask(taskObject) {
    var taskRef = prolannerRef.child('tasks').push();
    taskRef.set(taskObject)
}

function deleteTask(taskID) {
    var taskRef = prolannerRef.child('tasks').child(taskID)
    taskRef.remove();
}

function editTask(taskID, taskObject) {
    var taskRef = prolannerRef.child('tasks').child(taskID)
    taskRef.update(taskObject)
}


/* Project Operations */ 
// add / edit / delete 

function addProject(projectObject){
    var newProjectRef = prolannerRef.child('projects').push()
    var userRef = prolannerRef.child('users').child(projectObject.members[0])
    
    newProjectRef.set(projectObject)

    userRef.once("value", function(snapshot) {
      if(snapshot.child("projectIDs").exists()==false) {
        var proj = [newProjectRef.key()]
        userRef.child("projectIDs").set(proj)
        console.log(projectObject.members[0]+": (new) "+proj)
      }
      else {
        var proj = snapshot.child('projectIDs').val()
        proj.push(newProjectRef.key())
        userRef.child("projectIDs").set(proj)
        console.log("New Proj:"+typeof(proj))
      }
    });
}

function deleteProject(projectID){
    console.log("Deleted proj: "+projectID)
    var projRef = prolannerRef.child('projects').child(projectID)
    projRef.once("value", function(snapshot) {
      console.log("members:"+snapshot.child('members').val()[0])
      // d === false (because there is no "name/middle" child in the data snapshot)
      var userRef = prolannerRef.child('users').child(snapshot.child('members').val()[0])
      var projIDref = userRef.child('projectIDs')
      projIDref.once("value", function(snapshot){
        for(var i in snapshot.val()) {
            console.log("sn:"+snapshot.val()[i]+"projid:"+projectID)
            if (snapshot.val()[i] == projectID) {
                console.log("Key:"+snapshot.val()[i].key())
                //snapshot.val()[i].remove()
                projIDref.child(Object.keys(snapshot.val())[i]).remove();
            }
        }
      });
    });

    setTimeout(function () {
            prolannerRef.child('projects').child(projectID).remove();
        }, 500)
}

function editProject(projectID, projectObject){
    var ProjectRef = prolannerRef.child('projects').child(projectID)
    ProjectRef.update(projectObject)
}


/* Event Operations */
// add / edit / delete

function addEvent(eventObject) {
    var newEventRef = prolannerRef.child('events').push()
    newEventRef.set(eventObject)
    
}

function deleteEvent(eventID) {
    var eventRef = prolannerRef.child('events').child(eventID).remove();
}

function editEvent(eventID, eventObject) {
    var eventRef = prolannerRef.child('events').child(eventID)
    eventRef.update(eventObject)
}





// run each second
setTimeout(function() {setInterval(simulate, 1000)}, 2000);