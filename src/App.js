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
        this.state = {
            name: ""
        }
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    getChildContext() {
        return {socket: socketClient('http://localhost:8080'), username: "", currentRoom: "lobby", registeredForRoom: false};
    }

    render() {
        return (
            <div className="App">
                <MuiThemeProvider>
                    <Switch>
                        <Route path='/' component={Home}/>
                        <Route path='/rooms/:roomID' component={Chat}/>
                    </Switch>
                </MuiThemeProvider>
            </div>
        );
    }
}

App.childContextTypes = {
    socket: PropTypes.object.isRequired,
    username: PropTypes.string,
    currentRoom: PropTypes.string,
    registeredForRoom: PropTypes.bool
};

//ReactDOM.render(
//    <Router><App/></Router>, document.getElementById('app'));

export default App;
