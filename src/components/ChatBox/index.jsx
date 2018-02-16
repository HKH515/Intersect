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
    }

    render() {
        return (
            <div className="input-box">
                <TextField
                    hintText={this.placeholder}
                    onChange={this.props.handleChange}
                    value={this.props.msg}></TextField>
                <FlatButton onClick={this.props.sendMessage}>send</FlatButton>
            </div>
        );
    }
};

ChatBox.propTypes = {
    socket: PropTypes.object.isRequired,
    roomName: PropTypes.string,
    username: PropTypes.string,
    registeredForRoom: PropTypes.bool,
    msg: PropTypes.string,
    sendMessage: PropTypes.func,
    handleChange: PropTypes.func 
};

export default ChatBox;