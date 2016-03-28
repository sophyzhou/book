var prolannerRef = new Firebase('https://prolanner.firebaseio.com')

var userRef = prolannerRef.child('users')



function saveData() {
    //var nameValue = document.getElementById("first_name").value;

    console.log("nameValue: "+Math.floor(Date.now() / 1000))

    var createdAt = Math.floor(Date.now() / 1000)
    var createdBy = "github:"+window.location.hash.substring(1)
    var projectName = document.getElementById("project_name").value;

    var newProjectRef = prolannerRef.child('projects').push()
    var roomRef = prolannerRef.child('chatrooms').push();

    var metadataRef = newProjectRef.child('projectMetaData')
    
    var projectMetaData = {
        createdAt: Math.floor(Date.now() / 1000),
        createdBy: createdBy,
        projectName: projectName,
        projectMembers: [createdBy],
        projectID: newProjectRef.key(),
        relatedChatRoom: roomRef.key()
    }

    
    metadataRef.set(projectMetaData)

    console.log(newProjectRef.key())

    userRef.child(createdBy).child('projectIDs').once("value", function(snapshot) {
        var pid = snapshot.val()
        pid.push(newProjectRef.key())
        userRef.child(createdBy).child('projectIDs').set(pid)

    })

    var chatRoomName = document.getElementById("chatroom_name").value;
    
    roomRef.set({
        roomMessages: "",
        roomMetaData: {
            createdAt: Math.floor(Date.now() / 1000),
            createdBy: createdBy,
            relatedProject: newProjectRef.key(),
            roomMembers: [createdBy],
            roomName: chatRoomName
        }
    })

    var roomMessagesRef = prolannerRef.child('chatrooms').child(roomRef.key()).child('roomMessages').push();
    roomMessagesRef.set({
        content: "Welcome to chatroom " + chatRoomName + ", enjoy your talk here :)",
        name: "prolannerbot",
        timestamp: Math.floor(Date.now() / 1000),
        userID: "prolanner:0"
    })

    console.log(roomRef.key())

    //window.top.close();

}