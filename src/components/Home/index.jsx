import React from 'react';
import {PropTypes} from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import ChatBox from '../ChatBox';
import Chat from '../Chat';
import SideNav from '../SideNav';
import LoginBox from '../LoginBox';
import HelpDialog from '../HelpDialog';

class Home extends React.Component {
    componentWillReceiveProps(newProps) {
        console.log("Home component is getting new props!");
        console.log("Home's new props are the following:");
        console.log(newProps);
        var {
            username,
            loggedIn,
            roomName,
            registeredForRoom,
            servers,
            messages,
            helpDialog
        } = newProps;
        this.setState({
            username,
            loggedIn,
            roomName,
            registeredForRoom,
            servers,
            messages,
            helpDialog
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
            helpDialog: false
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

                <SideNav
                    username={this.state.username}
                    socket={this.props.socket}
                    loggedIn={this.state.loggedIn}
                    servers={this.state.servers}
                    propagateToParent={this.props.propagateToParent}
                    roomName={this.state.roomName}
                    registeredForRoom={this.state.registeredForRoom}
                    loadServers={this.props.loadServers}/>
                <LoginBox
                    socket={this.props.socket}
                    username={this.state.username}
                    roomName={this.state.roomName}
                    loggedIn={this.state.loggedIn}
                    loginUser={this.state.loginUser}
                    propagateToParent={this.props.propagateToParent}/>
                    <HelpDialog helpDialog={this.props.helpDialog} propagateToParent={this.props.propagateToParent}/>
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
                    loadServers={this.props.loadServers}/>
                    </div>
                <p>username: {this.state.username}</p>
                <p>roomName: {this.state.roomName}</p>
                <p>loggedIn: {(this.state.loggedIn ? "true" : "false")}</p>
                <p>registeredForRoom: {(this.state.registeredForRoom ? "true" : "false")}</p>
                <p>messages: {this.state.messages.length}</p>
                <p>servers: {this.state.servers.length}</p>
                <p>helpDialog: {(this.state.helpDialog ? "true" : "false")}</p>
                <RaisedButton onClick={() => {this.forceUpdate();}}>Force re-render</RaisedButton>
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
    loadServers: PropTypes.func,
    helpDialog: PropTypes.bool
};

export default Home;