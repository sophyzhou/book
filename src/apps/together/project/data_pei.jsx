var chatRef = new Firebase('https://prolanner.firebaseio.com/chat')
//var fireChat = new Firechat('https://prolanner.firebaseio.com/chat')

var actions = {}
actions.sendMessage = function(roomID, messageContent) {
    firechat.sendMessage(roomId, messageContent, messageType='default', function(){})
}


var user = {
    userID: 'github:11863763',
    name: 'peizhe'
}

//fireChat.setUser(user.userID, 'peizhe', function(user) {
//    chat.resumeSession();
//});

var chatRoomID = '-KCXbd_aMWUBCvc6GPQj';
var chatRoomName = "";

chatRef.child('room-metadata').child(chatRoomID).once("value", function(snapshot){
    chatRoomName = snapshot.val().name;
    console.log('get chatRoomName ' + chatRoomName);
    render_chatroom();
});
var messages={};
chatRef.child('room-messages').child(chatRoomID).on("value", function(snapshot){
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
            actions = {actions}/>,
        $('#chat').get(0)
    );
}
