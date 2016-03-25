function timeConverter(timestamp){
    var date = (timestamp) ? new Date(timestamp) : new Date(),
        month = date.getMonth() + 1,
        day = date.getDate() ,
        year = date.getUTCFullYear(),
        hours = date.getHours() || 12,
        minutes = '' + date.getMinutes(),
        ampm = (date.getHours() >= 12) ? 'pm' : 'am';

    hours = (hours > 12) ? hours - 12 : hours;
    minutes = (minutes.length < 2) ? '0' + minutes : minutes;
    return month + '/' + day + ' ' + hours + ':' + minutes + ampm;
}


var prolannerRef = new Firebase('https://prolanner.firebaseio.com')
var messageToSend = "";

class ChatRoom extends React.Component {

    buttonclick() {
        var content = document.getElementById('message-to-send').value
        var messageRef = prolannerRef.child('chatrooms').child(this.props.roomID).child('roomMessages').push()
        if (content != "") {
            messageRef.set({
                content: content,
                name: this.props.user.displayName,
                timestamp: Firebase.ServerValue.TIMESTAMP,
                userID: this.props.user.userID
            })
        } else {
            Materialize.toast('You cannot send empty message', 3000, 'rounded')
        }
        document.getElementById('message-to-send').value = ""
    }

    render() {
        var messages = this.props.messages;
        var user = this.props.user;
        var chatRoomName = this.props.chatRoomName;
        var members = this.props.members;
        return (
        <div className="container clearfix">

            <div className="people-list" id="people-list">
                <ul className="list">
                    {
                        Object.keys(members).map(function (githubID) {
                            var displayName = members[githubID]['displayName'].split(" ")[0]
                            var status = members[githubID]['status']
                            return(
                                <li className="clearfix">
                                    <img src= {'https://avatars3.githubusercontent.com/u/' + githubID} alt="avatar" />
                                    <div className="about">
                                        <div className="name">{displayName.split(" ")[0].slice(0,14)}</div>
                                        <div className="status">
                                            <i className={"fa fa-circle "+status}></i> {status}
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>

            <div className="chat">
                <div className="chat-header clearfix">
                    <img src={"https://avatars3.githubusercontent.com/u/"+ user.userID} alt="avatar" />

                    <div className="chat-about">
                        <div className="chat-with">ChatRoom: {chatRoomName}</div>
                        <div className="chat-num-messages">already {Object.keys(messages).length} messages</div>
                    </div>
                    <i className="fa fa-star"></i>
                </div>

                <div className="chat-history" id="history">
                    <ul>
                        {
                            Object.keys(messages).map(function(messageKey) {
                                var message = messages[messageKey];
                                //console.log(message['userId'])
                                if (message['userID'] != user.userID) {
                                    return (
                                        <li>
                                            <div className="message-data">
                                                <span className="message-data-name"><i
                                                    className="fa fa-circle online"></i>{message.name}</span>
                                                <span className="message-data-time">{timeConverter(message.timestamp)}</span>
                                            </div>
                                            <div className="message other-message">
                                                {message.content}
                                            </div>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li className="clearfix">
                                            <div className="message-data align-right">
                                                <span className="message-data-time" >{timeConverter(message.timestamp)}</span> &nbsp; &nbsp;
                                                <span className="message-data-name" >{message.name}</span> <i className="fa fa-circle me"></i>

                                            </div>
                                            <div className="message my-message float-right">
                                                {message.content}
                                            </div>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>

                </div>

                <div className="chat-message clearfix">
                    <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3" ></textarea>

                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file-image-o"></i>

                    <button  onClick={() => this.buttonclick()}>Send</button>

                </div>

            </div>

        </div>
    );
    }
}

MyComponents.ChatRoom = ChatRoom
