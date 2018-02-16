import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import {PropTypes} from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ChatBox from '../ChatBox';
import Chat from '../Chat';
import ServerList from '../ServerList';
import SideNav from '../SideNav';
import LoginBox from '../LoginBox';

class Home extends React.Component {
    constructor(props) {
        super(props);
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
                    username={this.props.username}
                    socket={this.props.socket}
                    loggedIn={this.props.loggedIn}/>
                <header className="App-header">
                    <h1 className="App-title">
                        Intersect
                    </h1>
                </header >
                <LoginBox
                    socket={this.props.socket}
                    username={this.props.username}
                    roomName={this.props.roomName}
                    loggedIn={this.props.loggedIn}
                    handleChangeUsername={this.props.handleChangeUsername}
                    loginUser={this.props.loginUser}/>
                <Chat
                    socket={this.props.socket}
                    username={this.props.username}
                    roomName={this.props.roomName}
                    loggedIn={this.props.loggedIn}
                    registeredForRoom={this.props.registeredForRoom}
                    messages={this.props.messages}/>
                <ChatBox
                    socket={this.props.socket}
                    username={this.props.username}
                    roomName={this.props.roomName}
                    loggedIn={this.props.loggedIn}
                    registeredForRoom={this.props.registeredForRoom}
                    messages={this.props.messages}
                    handleChangeM/>
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
    handleChangeUsername: PropTypes.func,
    handleChangeMessage: PropTypes.func,
    sendMessage: PropTypes.func,
    loginUser: PropTypes.func
};

export default Home;