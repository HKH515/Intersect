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
            users: [],
            ops: [],
            bannedFrom: []
        };
        this.propagateToParent = this.propagateToParent.bind(this);
        this.loadUsers = this.loadUsers.bind(this);
        this.loadServers = this.loadServers.bind(this);
        this.joinServer = this.joinServer.bind(this);
        this.checkIfBanned = this.checkIfBanned.bind(this);
    }

    /*
     * This function is responsible for setting props changed by children global
     */
    propagateToParent(changedProps) {
        this.setState(changedProps);
    }

    checkIfBanned() {
        this.socket.on('banned', () => {
            var tmpBanned = this.state.bannedFrom;
            tmpBanned.push(this.state.roomName);
            this.setState({bannedFrom: tmpBanned});
        });
    }

    loadServers() {
        this
            .socket
            .emit('rooms');
        this
            .socket
            .on('roomlist', function(rooms) {
                const tmpServers = [];
                for (var room in rooms) {
                    tmpServers.push(room);
                }
                this.setState({servers: tmpServers});
            }.bind(this));
    }
        joinServer(roomToJoin) {
            this
                .socket
                .emit('joinroom', {
                    room: roomToJoin
                }, function (success) {
                    if (success) {
                        this.setState({registeredForRoom: true, roomName: roomToJoin});
                        this.loadUsers();
                    }

                }.bind(this));
            this.loadServers();
        }


    /*getChildContext() {
        return {socket: socketClient('http://localhost:8080'), username: "", loggedIn: false, roomName: "lobby", registeredForRoom: false};
    }*/

    loadUsers() {
        this.socket.on('updateusers', function (room, users) {
           if (this.state.roomName === room) {
               var userArray = Object.keys(users);
               var opsArray = Object.keys(users);
               this.setState({users: userArray});
               this.setState({ops: opsArray})
               // If the room we are in updated the userlist is without us, we are either kicked or banned
               if (userArray.indexOf(this.state.username) === -1) {
                   this.setState({registeredForRoom: false, roomName: ''});
               }
           }
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
                        loadUsers={this.loadUsers}
                        loadServers={this.loadServers}
                        joinServer={this.joinServer}
                        bannedFrom={this.state.bannedFrom}
                        checkIfBanned={this.checkIfBanned}
                        ops ={this.state.ops}/>
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
    servers: PropTypes.array,
    loadServers: PropTypes.func,
    ops: PropTypes.array,
    checkIfBanned: PropTypes.func
};

export default App;
