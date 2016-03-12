var chatRef = new Firebase('https://prolanner.firebaseio.com/chat')
var user = {
    userID: 'github:11863763'
}
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
            user = {user}/>,
        $('#chat').get(0)
    );
}
