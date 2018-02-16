import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import {PropTypes} from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.placeholder = "Type a message...";
        this.state = {
            msg: ''
        };
        this.handleChange = this
            .handleChange
            .bind(this);
        this.sendMessage = this
            .sendMessage
            .bind(this);
    }

    handleChange(e) {
        // If user hit enter, does not work
        if (e.keyCode == '13') {
            this.sendMessage();
        } else {
            this.setState({msg: e.target.value});
        }
    }

    sendMessage() {
        const { socket } = this.context;
        console.log("inside sendMessage");
        if (this.context.registeredForRoom) {
            console.log("inside inner sendMessage");            
            socket
            .emit('sendmsg', {roomName: this.context.roomName, msg: this.state.msg});
            this.setState({msg: ''});
        }
    }

    render() {
        return (
            <div className="input-box">
                <TextField
                    hintText={this.placeholder}
                    onChange={this.handleChange}
                    value={this.state.msg}></TextField>
                <FlatButton onClick={this.sendMessage}>send</FlatButton>    
            </div>
        );
    }
};

ChatBox.contextTypes = {
    socket: PropTypes.object.isRequired,
    roomName: PropTypes.string,
    username: PropTypes.string,
    registeredForRoom: PropTypes.bool
};

export default ChatBox;