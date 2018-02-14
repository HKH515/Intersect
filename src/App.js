import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChatBox from './components/ChatBox';
import ServerList from './components/ServerList';
import SideNav from './components/SideNav';
import logo from './logo.svg';
import './css/App.css';
import socketClient from 'socket.io-client';
import { PropTypes } from 'prop-types';

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
        return {
            socket: socketClient('http://localhost:8080')            
        };
    }

    nameHandler(name) {
        this.setState({name});
    }
    render() {
        return (
            <div className="App">
                <MuiThemeProvider>
                <SideNav />
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Intersect</h1>
                </header>
                <p className="App-intro">
                    <ChatBox nameHandler={this.nameHandler.bind(this)}/>
                </p>
                </MuiThemeProvider>
            </div>
            
        );
    }
}

App.childContextTypes = {
    socket: PropTypes.object.isRequired
};


export default App;
