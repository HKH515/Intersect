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
        if (this.props.loggedIn) {
            console.log("trying to join room");
            this
                .props
                .socket
                .emit('joinroom', {
                    room: this.props.roomName,
                    pass: ""
                }, function (success, reason) {
                    console.log(reason);
                    if (success) {
                        this.props.registeredForRoom = true;
                        console.log("successfully joined room '" + this.props.roomName + "'");
                    } else {
                        console.log("failed to join room: " + reason);
                    }

                }.bind(this));
        }

        if (this.props.registeredForRoom) {
            this
                .props
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
                {this.props.registeredForRoom
                    ? <Dialog title="Not authorized" modal={false}>
                        </Dialog>
                    : <List>
                        {this
                            .props
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

Chat.propTypes = {
    socket: PropTypes.object.isRequired,
    registeredForRoom: PropTypes.bool,
    roomName: PropTypes.string,
    username: PropTypes.string,
    loggedIn: PropTypes.bool,
    messages: PropTypes.array,
    handleChangeMessage: PropTypes.func
};

export default Chat;