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
    render() {
        return (
            <div>
                <SideNav/>
                < header className="App-header">
                    < h1 className="App-title">
                        Intersect
                    </h1>
                </header >
                <LoginBox/>
                <Chat/>
                <ChatBox/>
            </div>
        );
    }
};

Home.contextTypes = {
    socket: PropTypes.object.isRequired,
    roomName: PropTypes.string,
    username: PropTypes.string
};

export default Home;