import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChatBox from './components/ChatBox';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            
                //<ServerList/>
            
            <div className="App">
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
