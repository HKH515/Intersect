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
                    loggedIn={this.props.loggedIn}
                    servers={this.props.servers}
                    propagateToParent={this.props.propagateToParent}
                    roomName={this.props.roomName}
                    registeredForRoom={this.props.registeredForRoom}/>
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
                    loginUser={this.props.loginUser}
                    propagateToParent={this.props.propagateToParent}/>
                <Chat
                    socket={this.props.socket}
                    username={this.props.username}
                    roomName={this.props.roomName}
                    loggedIn={this.props.loggedIn}
                    registeredForRoom={this.props.registeredForRoom}
                    messages={this.props.messages}
                    propagateToParent={this.props.propagateToParent}/>
                <ChatBox
                    socket={this.props.socket}
                    username={this.props.username}
                    roomName={this.props.roomName}
                    loggedIn={this.props.loggedIn}
                    registeredForRoom={this.props.registeredForRoom}
                    messages={this.props.messages}
                    propagateToParent={this.props.propagateToParent}/>
                                       <p>username: {this.props.username}</p> 
                       <p>roomName: {this.props.roomName}</p> 
                       <p>loggedIn: {this.props.loggedIn}</p> 
                       <p>registeredForRoom: {this.props.registeredForRoom}</p> 
                       <p>messages: {this.props.messages}</p> 
                       <p>servers: {this.props.servers}</p>
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
    servers: PropTypes.array,
    propagateToParent: PropTypes.func
};

export default Home;