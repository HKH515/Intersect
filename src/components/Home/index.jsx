import React from 'react';
import {PropTypes} from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import ChatBox from '../ChatBox';
import Chat from '../Chat';
import SideNav from '../SideNav';
import LoginBox from '../LoginBox';
import HelpDialog from '../HelpDialog';
import UserNav from '../UserNav';
import AppBar from 'material-ui/AppBar';
import AccountCircle from 'material-ui-icons/AccountCircle';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Help from 'material-ui-icons/Help';

class Home extends React.Component {
    componentWillReceiveProps(newProps) {
        var {
            username,
            loggedIn,
            roomName,
            registeredForRoom,
            servers,
            messages,
            helpDialog,
            users,
            ops
        } = newProps;
        this.setState({
            username,
            loggedIn,
            roomName,
            registeredForRoom,
            servers,
            messages,
            helpDialog,
            users,
            ops
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            loggedIn: null,
            roomName: '',
            registeredForRoom: false,
            servers: [],
            messages: [],
            privmsg: [],
            helpDialog: false,
            users: [],
            ops: []
        };
    }

    componentDidMount() {
        /*this.props.socket.emit('adduser', this.props.username, function(avail) {

        });
        this.props.socket.emit('users');
        this.props.socket.on('userlist', function(userIDs) {
            for (var i in userIDs) {
                console.log("username: " + i);
            }
        });*/
    }

    render() {
        return (
            <div>
                <AppBar position="static" title="Intersect">
                </AppBar>
                <SideNav
                    username={this.state.username}
                    socket={this.props.socket}
                    loggedIn={this.state.loggedIn}
                    servers={this.state.servers}
                    propagateToParent={this.props.propagateToParent}
                    roomName={this.state.roomName}
                    registeredForRoom={this.state.registeredForRoom}
                    loadServers={this.props.loadServers}
                    joinServer={this.props.joinServer}/>
                <UserNav
                    users={this.state.users}
                    username={this.state.username}
                    socket={this.props.socket}
                    roomName={this.state.roomName}
                    users={this.state.users}
                    loadUsers={this.props.loadUsers}
                    registeredForRoom={this.state.registeredForRoom}
                    loadServers={this.props.loadServers}
                    ops={this.state.ops}/>
                <LoginBox
                    socket={this.props.socket}
                    username={this.state.username}
                    roomName={this.state.roomName}
                    loggedIn={this.state.loggedIn}
                    loginUser={this.state.loginUser}
                    propagateToParent={this.props.propagateToParent}/>
                <HelpDialog
                    helpDialog={this.props.helpDialog}
                    propagateToParent={this.props.propagateToParent}/>
                <div className="chat">
                    <Chat
                        socket={this.props.socket}
                        username={this.state.username}
                        roomName={this.state.roomName}
                        loggedIn={this.state.loggedIn}
                        registeredForRoom={this.state.registeredForRoom}
                        messages={this.state.messages}
                        privmsg={this.state.privmsg}
                        propagateToParent={this.props.propagateToParent}/>
                    <ChatBox
                        socket={this.props.socket}
                        username={this.state.username}
                        roomName={this.state.roomName}
                        loggedIn={this.state.loggedIn}
                        registeredForRoom={this.state.registeredForRoom}
                        messages={this.state.messages}
                        privmsg={this.state.privmsg}
                        propagateToParent={this.props.propagateToParent}
                        loadServers={this.props.loadServers}
                        joinServer={this.props.joinServer}
                        users={this.props.users}/>
                </div>
            </div>
        );
    }
};

Home.propTypes = {
    socket: PropTypes.object.isRequired,
    username: PropTypes.string,
    roomName: PropTypes.string,
    registeredForRoom: PropTypes.bool,
    loggedIn: PropTypes.bool,
    messages: PropTypes.array,
    privmsg: PropTypes.array,
    servers: PropTypes.array,
    propagateToParent: PropTypes.func,
    helpDialog: PropTypes.bool,
    loadUsers: PropTypes.func,
    loadServers: PropTypes.func,
    joinServer: PropTypes.func,
    ops: PropTypes.array,
    users: PropTypes.array
};

export default Home;