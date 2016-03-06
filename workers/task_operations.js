var _ = require('lodash')
var random_name = require('node-random-name');
var Firebase = require('firebase');

var prolannerRef = new Firebase("https://prolanner.firebaseio.com/")
var users;
var userNames = []
prolannerRef.child('users').on('value', function (snapshot) {
    users = snapshot.val();
    //userNames.push(Object.keys(users))
    //console.log(Object.keys(users));
});


//var allUsernames = Object.keys(users)
/*prolannerRef.child('tasks')

var taskObject = {
    taskName : "a",
    taskDescription : "b",
    priority : "c",
    taskStatus : "d",
    assignedTo: "e",
    deadline : "3/16/2016"
}

prolannerRef.child('tasks').push().set(taskObject);*/

// simualate a random person entering, staying for a duration, and leaving
function simulate(){
   
   var taskNames = ["Complete the authentication module","Create the database","Find all the user stories for the project","Write code for creating the users","Snippet to allow users to add new tasks"]
    var taskDescription = ["a","b","c","d","e"]
    var priority = ["Low", "High", "Medium"]
    var taskStatus = ["To be done", "In Progress", "Done"]
    var deadline = ["03/05/2016","05/19/2016","05/13/2016","10/13/2016","11/23/2016"]
    var id = ['1','2','3','4','5']
   

   
   var allUsernames = Object.keys(users)
   var assignedTo = allUsernames[Math.floor(Math.random() * allUsernames.length)];
   var id = Math.floor(Math.random() * 100)
    var taskObject = {
        taskName : taskNames[Math.floor(Math.random() * taskNames.length)],
        id : id,
        taskDescription : taskDescription[Math.floor(Math.random() * taskDescription.length)],
        priority : priority[Math.floor(Math.random() * priority.length)],
        taskStatus : taskStatus[Math.floor(Math.random() * taskStatus.length)],
        assignedTo: assignedTo,
        deadline : deadline[Math.floor(Math.random() * deadline.length)]
    }

    console.log("at:"+ assignedTo)
    addTask(taskObject)
    
    var duration = 1 + 5 * Math.random()

    // simulate this person leaving after 'duration' seconds
    setTimeout(function () {
        delTask(taskObject);
    }, duration * 1000)
}

function addTask(taskObject) {
    // randomly logs in users
    prolannerRef.child('tasks').child(taskObject.id);

    prolannerRef.child('tasks').child(taskObject.id).set({
        taskName : taskObject.taskName,
        taskDescription : taskObject.taskDescription,
        priority : taskObject.priority,
        taskStatus : taskObject.taskStatus,
        assignedTo : taskObject.assignedTo,
        deadline : taskObject.deadline
    });
}

function delTask(taskObject) {
    // randomly logs in users 
    //prolannerRef.child('tasks').push().set(taskObject);
    var taskRef = prolannerRef.child('tasks').child(taskObject.id);
    taskRef.remove();
    console.log(taskObject)
}

/*function logout(username) {
    // randomly logs out users 
    prolannerRef.child('users').child(username).update({status: 'offline'});
}*/

// run each second
setInterval(simulate, 1000)

//setTimeout(simulate,3000)


