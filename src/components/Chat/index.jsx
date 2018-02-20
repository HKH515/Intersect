import React from 'react';
import {PropTypes} from 'prop-types';

// UI
import List, {ListItem} from 'material-ui/List';
import Autoscroll from 'autoscroll-react'

class Chat extends React.Component {
    componentWillReceiveProps(newProps) {
        const {registeredForRoom, loggedIn, roomName} = newProps;
        this.setState({registeredForRoom, loggedIn, roomName});
    }

    constructor(props) {
        super(props);
        this.state = {
            errorOpen: false,
            messages: [],
            privmsg: [],
            registeredForRoom: false,
            loggedIn: false,
            roomName: ''
        };
    }

    componentDidMount() {
            this
                .props
                .socket
                .on('updatechat', function (room, msgs) {
                    console.log("updating chat...");
                    console.log(msgs);
                    console.log("room:");
                    console.log(room);
                    console.log("this.state.roomName:");
                    console.log(this.state.roomName);
                    if (this.state.roomName == room) {
                        this.setState({
                            messages: msgs
                        }, () => {
                            this.props.propagateToParent({messages: msgs})
                        });
                    }
                    // this.setState({messages: msgs}); let messagesTmp = Object.assign({},
                    // this.state.messages); messagesTmp.push(msg); messagesTmp.push('${(new
                    // Date()).toLocaleTimeString()}
                    // - ${msg}'); this.setState({messages: messagesTmp}); console.log("Messages: "
                    // + this.state.messagesTmp);
                }.bind(this));

            this.props.socket.on('recv_privatemsg', function(messageObj) {
                if(this.state.username === messageObj.nick) {
                    this.setState({
                        privmsg: messageObj
                    }, () => {
                        this.props.propagateToParent({privmsg: messageObj})
                    });
                }
            }.bind(this));
    }

    render() {
        //const errorDialog = this.state.loggedIn && this.state.registeredForRoom;
        console.log("inside chat/render");
        console.log("messages:");
        console.log(this.state.messages);
        if (this.state.registeredForRoom) {
            return (
                <div className="chatView">
                    <List>
                        {this
                            .state
                            .messages
                            .map(item => {
                                return <ListItem
                                    key={item.timestamp + item.nick}
                                    primaryText={item.message}
                                    secondaryText={item.nick + " @ " + item.timestamp}></ListItem>
                            })}
                    </List>
                </div>
            );
        } else {
            return (
                <div className="chatView">
                    <h2 className="heading">Not registered for room!</h2>
                </div>
            )
        }

    }
};

Chat.propTypes = {
    socket: PropTypes.object.isRequired,
    registeredForRoom: PropTypes.bool,
    roomName: PropTypes.string,
    username: PropTypes.string,
    loggedIn: PropTypes.bool,
    messages: PropTypes.array,
    privmsg: PropTypes.array,
    handleChangeMessage: PropTypes.func,
    propagateToParent: PropTypes.func
};

export default Autoscroll(Chat);