
function timeConverter(timestamp){
    //var a = new Date(timestamp * 1000);
    //var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    //var year = a.getFullYear();
    //var month = months[a.getMonth()];
    //var date = a.getDate();
    //var hour = a.getHours();
    //var min = a.getMinutes();
    //var sec = a.getSeconds();
    //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    //return time;
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


console.log("TIMESTAMP\n")
console.log(Firebase.ServerValue.TIMESTAMP)
var chatRef = new Firebase('https://prolanner.firebaseio.com/chat')
chatRef.child('room-messages').child('-KCXbd_aMWUBCvc6GPQj').child('-KCXbedLWG0Fhhykf8aw').update({timestamp:Firebase.ServerValue.TIMESTAMP})
var messageToSend = "";

class ChatRoom extends React.Component {

    onChange(e) {
        messageToSend = e.target.value;
    }

    buttonclick(e) {
        console.log(messageToSend);
    }
    render() {
        var messages = this.props.messages;
        var user = this.props.user;
        var chatRoomName = this.props.chatRoomName;
        //console.log(this.props.messages)
        return (
        <div className="container clearfix">

            <div className="people-list" id="people-list">
                <div className="search">
                    <span>
                    <input type="text" placeholder="search" />
                        </span>
                </div>
                <ul className="list">
                    <li className="clearfix">
                        <img src="https://avatars3.githubusercontent.com/u/11863763" alt="avatar" />
                        <div className="about">
                            <div className="name">{user.name}</div>
                            <div className="status">
                                <i className="fa fa-circle online"></i> online
                            </div>
                        </div>
                    </li>

                    <li className="clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg" alt="avatar" />
                        <div className="about">
                            <div className="name">Aiden Chavez</div>
                            <div className="status">
                                <i className="fa fa-circle offline"></i> left 7 mins ago
                            </div>
                        </div>
                    </li>

                </ul>
            </div>

            <div className="chat">
                <div className="chat-header clearfix">
                    <img src="https://avatars3.githubusercontent.com/u/11863763" alt="avatar" />

                    <div className="chat-about">
                        <div className="chat-with">ChatRoom: {chatRoomName}</div>
                        <div className="chat-num-messages">already {Object.keys(messages).length} messages</div>
                    </div>
                    <i className="fa fa-star"></i>
                </div>

                <div className="chat-history">
                    <ul>
                        {
                            Object.keys(messages).map(function(messageKey) {
                                var message = messages[messageKey];
                                console.log(message['userId'])
                                if (message['userId'] != user.userID) {
                                    return (
                                        <li>
                                            <div className="message-data">
                                                <span className="message-data-name"><i
                                                    className="fa fa-circle online"></i>{message.name}</span>
                                                <span className="message-data-time">{timeConverter(message.timestamp)}</span>
                                            </div>
                                            <div className="message other-message">
                                                {message.message}
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
                                                {message.message}
                                            </div>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>

                </div>

                <div className="chat-message clearfix">
                    <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3" onChange={this.handleChange}></textarea>

                    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                    <i className="fa fa-file-image-o"></i>

                    <button onclick={this.buttonclick}>Send</button>

                </div>

            </div>

        </div>
    );
    }
}

MyComponents.ChatRoom = ChatRoom
