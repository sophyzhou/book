var _ = require('lodash')
var random_name = require('node-random-name');
var Firebase = require('firebase');

var prolannerRef = new Firebase("https://prolanner.firebaseio.com/")
var users;
prolannerRef.child('users').once('value', function (snapshot) {
    users = snapshot.val();
});

// simualate a random person entering, staying for a duration, and leaving
function simulate(){
   
   var allUsernames = Object.keys(users)
   var randUser = allUsernames[Math.floor(Math.random() * allUsernames.length)];

    login(randUser)
    
    var duration = 1 + 5 * Math.random()

    // simulate this person leaving after 'duration' seconds
    setTimeout(function () {
        logout(randUser);
    }, duration * 1000)
}

function login(username) {
    // randomly logs in users 
    prolannerRef.child('users').child(username).update({status: 'online'});
}

function logout(username) {
    // randomly logs out users 
    prolannerRef.child('users').child(username).update({status: 'offline'});
}

// run each second
setInterval(simulate, 1000)
