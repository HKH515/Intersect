import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import {PropTypes} from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class ChatBox extends React.Component {
    componentWillReceiveProps(newProps) {
        const {registeredForRoom, roomName} = newProps;
        this.setState({registeredForRoom, roomName});
    }
    constructor(props) {
        super(props);
        this.placeholder = "Type a message...";
        this.state = {
            msg: '',
            registeredForRoom: false,
            roomName: ''
        };
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    handleChangeMessage(e) {
        this.setState({msg: e.target.value});
    }
    
    sendMessage() {
        console.log("inside sendMessage");
        if (this.state.registeredForRoom && this.state.msg.length > 0) {
            console.log("inside inner sendMessage");
            this.props
                .socket
                .emit('sendmsg', {
                    roomName: this.state.roomName,
                    msg: this.state.msg
                });
            this.state.msg = '';
        }
    }
    
    render() {
        return (
            <div className="input-box">
                <TextField
                    hintText={this.placeholder}
                    onChange={this.handleChangeMessage}
                    value={this.state.msg}></TextField>
                <RaisedButton onClick={this.sendMessage} disabled={!this.state.registeredForRoom}>send</RaisedButton>
            </div>
        );
    }
};

ChatBox.propTypes = {
    socket: PropTypes.object.isRequired,
    handleChangeMessage: PropTypes.func,
    propagateToParent: PropTypes.func,
    roomName: PropTypes.string,
    registeredForRoom: PropTypes.bool
};

export default ChatBox;