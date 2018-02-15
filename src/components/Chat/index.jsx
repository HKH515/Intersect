import React from 'react';
import CSSModules from 'react-css-modules';
import { PropTypes } from 'prop-types';

// UI
import {List, ListItem} from 'material-ui/List';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            joined: false
        };
    }

    componentDidMount() {
        if (!this.context.registeredForRoom) {
            this.context.socket.emit('joinroom', {room: this.context.currentRoom, pass: ""}, function(success, reason) {
                if (success) {
                    this.setState({joined: true});
                }
                else {
                    this.setState({failureReason: reason});
                }
            }.bind(this));
        }

        this.context.socket.on('updatechat', (room, msg) => {
            let messages = Object.assign({}, this.state.messages);
            messages.push(msg);
            //messages.push('${(new Date()).toLocaleTimeString()} - ${msg}');
            this.setState({messages});
            console.log("Messages: " + this.state.messages);
        });
    }

    render() {
        if (this.state.failure) {
            return <h3>{this.state.failureReason}</h3>;
        }
        return (
            <List>
                    {this.state.messages.map(item => (<ListItem key={item}>{item}</ListItem>))}
            </List>
        );
        return null;
    }
};

Chat.contextTypes = {
    socket: PropTypes.object.isRequired,
    registeredForRoom: PropTypes.bool,
    currentRoom: PropTypes.string
};

export default Chat;