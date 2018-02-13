import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChatBox from './components/ChatBox';
import ServerList from './components/ServerList';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            
            
            <div className="App">
                <ServerList/>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    <ChatBox/>
                </p>
            </div>
            
        );
    }
}




export default App;
