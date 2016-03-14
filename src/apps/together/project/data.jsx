var chatRef = new Firebase('https://prolanner.firebaseio.com/chatrooms')
//var fireChat = new Firechat('https://prolanner.firebaseio.com/chat')

var actions = {}
actions.sendMessage = function(roomID, messageContent) {
    firechat.sendMessage(roomId, messageContent, messageType='default', function(){})
}


var user = {
    userID: 'github:11863763',
    name: 'peizhe'
}

var members = {};

//fireChat.setUser(user.userID, 'peizhe', function(user) {
//    chat.resumeSession();
//});

var roomID = window.location.hash.substring(1);
var chatRoomName = "";

chatRef.child(roomID).child('roomMetaData').once("value", function(snapshot){
    chatRoomName = snapshot.val().roomName;
    var prolannerRef = new Firebase('https://prolanner.firebaseio.com/')
    snapshot.val().roomMembers.forEach(function(userID) {
        var userRef = prolannerRef.child('users').child(userID).once('value', function(snapshot){
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
var messages={};
chatRef.child(roomID).child('roomMessages').on("value", function(snapshot){
    messages = snapshot.val();
    console.log(messages);
    render_chatroom();
})

function render_chatroom() {
    ReactDOM.render(
        <MyComponents.ChatRoom
            messages={messages}
            chatRoomName = {chatRoomName}
            user = {user}
            members = {members}
            actions = {actions}/>,
        $('#chat').get(0)
    );
}
