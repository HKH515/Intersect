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
            roomName: '',
            commands: ['/kick','/leave','/join','/ban','/msg']
        };
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleCommand = this.handleCommand.bind(this);
    }

    handleChangeMessage(e) {
        this.setState({msg: e.target.value});
    }

    handleCommand(command) {
        switch(command){
            case '/kick':
                break;
            case '/leave':
                break;
            case '/join':
                break;
            case '/ban':
                break;
            case '/msg':
                var target = this.state.msg.split(' ')[1];
                var message = this.state.msg.split(' ').splice(2,this.state.msg.length).join(' ');
                this.props.socket.emit('users');
                this.props.socket.on('userlist', (users) => {
                    if(users.indexOf(target)>-1){
                        this.props.socket.emit('privatemsg',{nick:target,message:message});
                    }
                });
                /*var msg = this.state.msg.split(' ').splice(2,this.state.msg.length).join(' ');
                this.props.socket.emit('privatemsg',{nick:target,message:msg});*/
                this.state.msg = '';
                break;
        }
    }
    
    sendMessage() {
        console.log("inside sendMessage");
        var command = this.state.msg.split(' ')[0];
        if (this.state.commands.indexOf(command)>-1) {
            this.handleCommand(command);
        }
        else if (this.state.registeredForRoom) {
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
                <p>registeredForRoom: {this.state.registeredForRoom}</p>
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