import React from 'react';
import {PropTypes} from 'prop-types';

// UI
import List, {ListItem} from 'material-ui/List';
import Autoscroll from 'autoscroll-react'

class Chat extends React.Component {
    componentWillReceiveProps(newProps) {
        const {registeredForRoom, loggedIn, roomName, messages} = newProps;
        this.setState({registeredForRoom, loggedIn, roomName,messages});
    }

    constructor(props) {
        super(props);
        this.state = {
            errorOpen: false,
            messages: [],
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
                console.log("inside recv_privatemsg");
                if(this.props.username === messageObj.target) {
                    this.setState({
                        messages: messageObj
                    }, () => {
                        this.props.propagateToParent({messages: messageObj})
                    });
                }
            }.bind(this));
    }

    render() {
        //const errorDialog = this.state.loggedIn && this.state.registeredForRoom;
        console.log("inside chat/render");
        console.log("messages:");
        console.log(this.state.messages);
        if (this.state.roomName !== '') {
            return (
                <div className="chatView">
                    <List>
                        {this
                            .state
                            .messages
                            .map(item => {
                                if (item.target === undefined) {
                                    return <ListItem
                                        key={item.timestamp + item.nick}
                                        primaryText={item.message}
                                        secondaryText={item.nick + " @ " + item.timestamp}></ListItem>
                                }
                                else if (item.target !== undefined && (item.target === this.props.username || item.nick === this.props.username)) {
                                    return <ListItem style={{color:'#D50000'}}
                                        key={item.timestamp + item.nick}
                                        primaryText={item.message}
                                        secondaryText={item.nick + "  -->  " +item.target + "@" + item.timestamp }></ListItem>
                                }

                            })}
                    </List>
                </div>
            );
        } else {
            return (
                <div className="chatView">
                    <List></List>
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
    handleChangeMessage: PropTypes.func,
    propagateToParent: PropTypes.func
};

export default Autoscroll(Chat);