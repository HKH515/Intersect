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
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentDidUpdate() {
        // If we are not in a room, we join the current room selected (lobby by default)
        if (this.context.loggedIn) {
            console.log("trying to join room");
            this
                .context
                .socket
                .emit('joinroom', {
                    room: this.context.roomName,
                    pass: ""
                }, function (success, reason) {
                    console.log(reason);
                    if (success) {
                        this.context.registeredForRoom = true;
                        console.log("successfully joined room '" + this.context.roomName + "'");
                    } else {
                        console.log("failed to join room: " + reason);
                    }

                }.bind(this));
        }

        if (this.context.registeredForRoom) {
            this
                .context
                .socket
                .on('updatechat', (room, msgs) => {
                    console.log("updating chat...");
                    this.setState({messages: msgs});
                    // let messagesTmp = Object.assign({}, this.state.messages);
                    // messagesTmp.push(msg); messagesTmp.push('${(new Date()).toLocaleTimeString()}
                    // - ${msg}'); this.setState({messages: messagesTmp}); console.log("Messages: "
                    // + this.state.messagesTmp);
                });
        }

    }

    render() {
        return (
            <div>
                {this.context.registeredForRoom
                    ? <Dialog title="Not authorized" modal={false} open={!this.hidden}>
                            <TextField
                                hintText={this.placeholder}
                                errorText={this.errorText}
                                onChange={this.handleChange}></TextField>
                        </Dialog>
                    : <List>

                        {this
                            .state
                            .messages
                            .map(item => (
                                <ListItem key={item}>{item}</ListItem>
                            ))}

                    </List>
}
            </div>
        );
        return null;
    }
};

Chat.contextTypes = {
    socket: PropTypes.object.isRequired,
    registeredForRoom: PropTypes.bool,
    roomName: PropTypes.string,
    username: PropTypes.string,
    loggedIn: PropTypes.bool
};

export default Chat;