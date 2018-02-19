import React from 'react';
import {PropTypes} from 'prop-types';

// UI
import TextField from 'material-ui/TextField';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';

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
            helpDialog: false,
            commands: ['/kick', '/leave', '/join', '/ban', '/msg', '/help']
        };
        this.handleChangeMessage = this
            .handleChangeMessage
            .bind(this);
        this.sendMessage = this
            .sendMessage
            .bind(this);
        this.handleCommand = this
            .handleCommand
            .bind(this);
    }

    handleChangeMessage(e) {
        this.setState({msg: e.target.value});
    }

    handleCommand(line) {
        var command = line.split(' ')[0];
        switch (command) {
            case '/kick':
                var target = line.split(' ').splice(1,line.length).join(' ');
                this.props.socket.emit('kick', {room:this.props.roomName,user:target}, (success) => {});
                break;
            case '/leave':
                this.props.socket.emit('partroom',this.props.roomName);
                this.setState({roomName: '', registeredForRoom: false}, () => {this.props.propagateToParent({roomName: this.state.roomName, registeredForRoom: this.state.registeredForRoom})});
                break;
            case '/join':
                var roomToJoin = line.split(' ').splice(1,line.length).join(' ');
                this.props.joinServer(roomToJoin);//Hackcity
                this.props.joinServer(roomToJoin);//Because servers doesnt update chat if the server doesn't exist
                break;
            case '/help':
                this.setState({helpDialog: true}, () => {this.props.propagateToParent({helpDialog: this.state.helpDialog})});
                console.log("set helpdialog to true");
                break;
            case '/ban':
                var target = line.split(' ').splice(1,line.length).join(' ');
                this.props.socket.emit('ban',{room:this.props.roomName,user:target}, (success) => {});
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
                this.setState({msg:''});
                break;
            default:
                
        }
    }

    sendMessage() {
        console.log("inside sendMessage");
        var command = this
            .state
            .msg
            .split(' ')[0];
        if (this.state.commands.indexOf(command) > -1) {
            this.handleCommand(this.state.msg);
        } else if (this.state.registeredForRoom && this.state.msg.length > 0) {
            console.log("inside inner sendMessage");
            this
                .props
                .socket
                .emit('sendmsg', {
                    roomName: this.state.roomName,
                    msg: this.state.msg
                });
            this.setState({msg: ''});
        }
    }

    render() {
        return (
            <div className="input-box">
                <TextField
                    hintText={this.placeholder}
                    onChange={this.handleChangeMessage}
                    value={this.state.msg}
                    style={{
                    width: 1200
                }}></TextField>
                <IconButton
                    onClick={this.sendMessage}
                    disabled={!this.state.registeredForRoom}
                    tooltip="Send message"><ContentSend/></IconButton>
            </div>
        );
    }
};

ChatBox.propTypes = {
    username: PropTypes.string,
    socket: PropTypes.object.isRequired,
    handleChangeMessage: PropTypes.func,
    propagateToParent: PropTypes.func,
    loadServers: PropTypes.func,
    userList: PropTypes.func,
    roomName: PropTypes.string,
    registeredForRoom: PropTypes.bool,
    helpDialog: PropTypes.bool,
    joinServer: PropTypes.func
};

export default ChatBox;