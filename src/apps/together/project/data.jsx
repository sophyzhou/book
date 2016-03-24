var chatRef = new Firebase('https://prolanner.firebaseio.com/chatrooms')
var prolannerRef = new Firebase('https://prolanner.firebaseio.com')
//var fireChat = new Firechat('https://prolanner.firebaseio.com/chat')

var actions = {}
actions.sendMessage = function(roomID, messageContent) {
    firechat.sendMessage(roomId, messageContent, messageType='default', function(){})
}


var user = JSON.parse(sessionStorage.getItem('user'))
console.log(user)

var members = {};

//fireChat.setUser(user.userID, 'peizhe', function(user) {
//    chat.resumeSession();
//});

var projectID = window.location.hash.substring(1);
var chatRoomName = "";
var roomID;
var messages={};

prolannerRef.child('projects').child(projectID).child('projectMetaData').once('value', function(snapshot){
    console.log(projectID)
    console.log(snapshot.val())
    roomID =  snapshot.val().relatedChatRoom
    chatRef.child(roomID).child('roomMetaData').once("value", function(snapshot){
        chatRoomName = snapshot.val().roomName;
        var prolannerRef = new Firebase('https://prolanner.firebaseio.com/')
        snapshot.val().roomMembers.forEach(function(userID) {
            prolannerRef.child('users').child(userID).once('value', function(snapshot){
                var user = snapshot.val();
                console.log(user.displayName)
                members[user.userID] = {}
                members[user.userID]['displayName'] = user.displayName
                members[user.userID]['status'] = user.status
                render_chatroom();
            })
        });
        console.log('get chatRoomName ' + chatRoomName);
        render_chatroom();
    });
    chatRef.child(roomID).child('roomMessages').on("value", function(snapshot){
        messages = snapshot.val();
        console.log(messages);
        render_chatroom();
    })
})

function render_chatroom() {
    ReactDOM.render(
        <MyComponents.ChatRoom
            messages={messages}
            chatRoomName = {chatRoomName}
            roomID = {roomID}
            user = {user}
            members = {members}
            actions = {actions}/>,
        $('#chat').get(0)
    );
}
