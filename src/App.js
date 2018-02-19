import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './css/App.css';
import socketClient from 'socket.io-client';
import {PropTypes} from 'prop-types';
import Home from './components/Home';

class App extends React.Component {

    constructor() {
        super();
        
        this.socket = socketClient('http://localhost:8080');
        this.state = {
            username: "",
            loggedIn: false,
            roomName: "",
            registeredForRoom: false,
            messages: [],
            privmsg: [],
            servers: [],
            helpDialog: false,
            users: []
        };
        this.propagateToParent = this.propagateToParent.bind(this);
        this.loadUsers = this.loadUsers.bind(this);
    }

    /*
     * This function is responsible for setting props changed by children global
     */
    propagateToParent(changedProps) {
        this.setState(changedProps);
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    /*getChildContext() {
        return {socket: socketClient('http://localhost:8080'), username: "", loggedIn: false, roomName: "lobby", registeredForRoom: false};
    }*/

    loadUsers() {
        this.socket.on('updateusers', function (room, users, ops) {
           //if (this.state.roomName === room) {
               var userArray = Object.keys(users);
               this.setState({users: userArray});
               console.log("logging users...");
               console.log(users);
           //}
        }.bind(this));
    }

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
                        messages={this.state.messages}
                        privmsg={this.state.privmsg}
                        servers={this.state.servers}
                        propagateToParent={this.propagateToParent}
                        helpDialog={this.state.helpDialog}
                        users={this.state.users}
                        loadUsers={this.loadUsers}/>
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
    privmsg: PropTypes.array,
    propagateToParent: PropTypes.func,
    servers: PropTypes.array
};

export default App;
