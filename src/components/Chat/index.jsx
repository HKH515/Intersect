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

    componentDidMount() {
        // If we are not in a room, we join the current room selected (lobby by default)
        if (!this.context.registeredForRoom) {
            this
                .context
                .socket
                .emit('joinroom', {
                    room: this.context.currentRoom,
                    pass: ""
                }, function (success, reason) {
                    if (success) {
                        this.context.registeredForRoom = true;
                    };
                }.bind(this));
        }

        this
            .context
            .socket
            .on('updatechat', (room, msg) => {
                let messages = Object.assign({}, this.state.messages);
                messages.push(msg);
                //messages.push('${(new Date()).toLocaleTimeString()} - ${msg}');
                this.setState({messages});
                console.log("Messages: " + this.state.messages);
            });
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
    currentRoom: PropTypes.string
};

export default Chat;