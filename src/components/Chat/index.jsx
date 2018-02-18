import React from 'react';
import CSSModules from 'react-css-modules';
import {PropTypes} from 'prop-types';

// UI
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
    }

    render() {
        //const errorDialog = this.state.loggedIn && this.state.registeredForRoom;
        console.log("inside chat/render");
        console.log("messages:");
        console.log(this.state.messages);
        return (
            <div>
                
                Number of messages: {this.state.messages.length}
                {this
                    .state
                    .messages
                    .map(item => {
                        return <p key={item.timestamp+item.nick}>{item.nick}: {item.message}</p>
                    })}
                
            </div>
        );
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

export default Chat;