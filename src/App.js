import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChatBox from './components/ChatBox';
import Chat from './components/Chat';
import ServerList from './components/ServerList';
import SideNav from './components/SideNav';
import LoginBox from './components/LoginBox';
import logo from './logo.svg';
import './css/App.css';
import socketClient from 'socket.io-client';
import {PropTypes} from 'prop-types';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

class App extends Component {

    constructor() {
        super();
        this.socket = socketClient('http://localhost:8080');
        this.username = "";
        this.loggedIn = false;
        this.roomName = "lobby";
        this.registeredForRoom = false;
        this.messages = [];
        this.msg = '';
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    handleChangeUsername= (e) => {
        this.username = e.target.value;
        console.log(this.username);
    }
    
    loginUser() {
        console.log("trying to login with username '" + this.username + "'");
        this
            .socket
            .emit('adduser', this.username, function (available) {
                console.log("inside addUser callback...");
                if (available) {
                    console.log("username is available!");
                    this.loggedIn = true;
                    //return <Redirect to='/rooms/:roomID' />
                } else {
                    console.log("username is taken!");
                }
            }.bind(this));
    }

    sendMessage() {
        console.log("inside sendMessage");
        if (this.registeredForRoom) {
            console.log("inside inner sendMessage");
            this
                .socket
                .emit('sendmsg', {
                    roomName: this.roomName,
                    msg: this.msg
                });
            this.msg = '';
        }
    }

    /*getChildContext() {
        return {socket: socketClient('http://localhost:8080'), username: "", loggedIn: false, roomName: "lobby", registeredForRoom: false};
    }*/

    render() {
        return (
            <div className="App">
                <MuiThemeProvider>
                    <Home
                        socket={this.socket}
                        username={this.username}
                        roomName={this.roomName}
                        loggedIn={this.loggedIn}
                        registeredForRoom={this.registeredForRoom}
                        handleChangeUsername={this.handleChangeUsername}
                        handleChangeMessage={this.handleChangeMessage}
                        messages={this.messages}
                        sendMessage={this.sendMessage}
                        loginUser={this.loginUser}
/>
                </MuiThemeProvider>
            </div>
        );
    }
}

App.propTypes = {
    //socket: PropTypes.object.isRequired,
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

export default App;
