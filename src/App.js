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
        this.state = {
            username: "",
            loggedIn: false,
            roomName: "lobby",
            registeredForRoom: false,
            messages: [],
            servers: []
        };
        this.propagateToParent = this.propagateToParent.bind(this);
    }

    propagateToParent(changedProps) {
        this.setState(changedProps);
    }

    componentDidCatch(error, info) {
        console.log(error);
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
                        username={this.state.username}
                        roomName={this.state.roomName}
                        loggedIn={this.state.loggedIn}
                        registeredForRoom={this.state.registeredForRoom}
                        handleChangeUsername={this.handleChangeUsername}
                        handleChangeMessage={this.handleChangeMessage}
                        messages={this.state.messages}
                        sendMessage={this.sendMessage}
                        servers={this.state.servers}
                        loadServers={this.loadServers}
                        propagateToParent={this.propagateToParent}/>
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
    propagateToParent: PropTypes.func,
    servers: PropTypes.array
};

export default App;
