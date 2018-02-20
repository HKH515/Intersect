import React from 'react';
import {PropTypes} from 'prop-types';

// UI
import TextField from 'material-ui/TextField';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import Help from 'material-ui-icons/Help';

class ChatBox extends React.Component {
    componentWillReceiveProps(newProps) {
        const {registeredForRoom, roomName, msg, users} = newProps;
        this.setState({registeredForRoom, roomName, msg, users});
    }
    constructor(props) {
        super(props);
        this.placeholder = "Type a message...";
        this.state = {
            msg: '',
            registeredForRoom: false,
            roomName: '',
            helpDialog: false,
            commands: [
                '/kick',
                '/leave',
                '/join',
                '/ban',
                '/msg',
                '/help'
            ],
            users : []
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
        this.handleKeyDown = this
            .handleKeyDown
            .bind(this);
        this.showHelpDialog = this.showHelpDialog.bind(this);
    }

    handleChangeMessage(e) {
        this.setState({msg: e.target.value});
    }

    handleCommand(line) {
        var command = line.split(' ')[0];
        switch (command) {
            case '/kick':
                var toBeKicked = line.split(' ').splice(1,line.length).join(' ');
                this.props.socket.emit('kick', {room:this.props.roomName,user:toBeKicked}, () => {});
                break;
            case '/leave':
                this
                    .props
                    .socket
                    .emit('partroom', this.props.roomName);
                this.setState({
                    roomName: '',
                    registeredForRoom: false
                }, () => {
                    this
                        .props
                        .propagateToParent({roomName: this.state.roomName, registeredForRoom: this.state.registeredForRoom})
                });
                break;
            case '/join':
                var roomToJoin = line
                    .split(' ')
                    .splice(1, line.length)
                    .join(' ');
                this
                    .props
                    .joinServer(roomToJoin); //Hackcity
                this
                    .props
                    .joinServer(roomToJoin); //Because servers doesnt update chat if the server doesn't exist

                break;
            case '/help':
                this.showHelpDialog();
                break;
            case '/ban':
                var toBeBanned = line.split(' ').splice(1,line.length).join(' ');
                this.props.socket.emit('ban',{room:this.state.roomName,user:toBeBanned}, () => {});
                break;
            case '/msg':
                var target = this.state.msg.split(' ')[1];
                var newMessage = this.state.msg.split(' ').splice(2,this.state.msg.length).join(' ');
                if(this.state.users.indexOf(target)>-1){
                    this.props.socket.emit('privatemsg',{nick:target,message:newMessage,roomName:this.state.roomName}, () => {});
                }
                break;
            default:
                break;

        }
        this.setState({msg: ''});
    }

    sendMessage() {
        var command = this
            .state
            .msg
            .split(' ')[0];
        if (this.state.commands.indexOf(command) > -1) {
            this.handleCommand(this.state.msg);
        } else if (this.state.registeredForRoom && this.state.msg.length > 0) {
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

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.sendMessage();
            e.preventDefault();            
        }
    }

    showHelpDialog() {
                this.setState({
                    helpDialog: true
                }, () => {
                    this
                        .props
                        .propagateToParent({helpDialog: this.state.helpDialog})
                });
    }

    render() {
            return (
                <div className="input-box">
                    <TextField
                        hintText={this.placeholder}
                        onChange={this.handleChangeMessage}
                        value={this.state.msg}
                        onKeyDown={this.handleKeyDown}
                        disabled={!this.state.registeredForRoom}
                        style={{
                        width: 1100
                    }}></TextField>
                    <IconButton
                        onClick={this.sendMessage}
                        disabled={!this.state.registeredForRoom}
                        tooltip="Send message"><ContentSend/></IconButton>
                    <IconButton
                    onClick={this.showHelpDialog}
                    tooltip="Show help dialog">
                    <Help />
                    </IconButton>
                    
                </div>
            );
    }
}

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
    joinServer: PropTypes.func,
    users: PropTypes.array
};

export default ChatBox;
