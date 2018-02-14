import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChatBox from './components/ChatBox';
import ServerList from './components/ServerList';
import logo from './logo.svg';
import './css/App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            name: ""
        }
    }

    nameHandler(name) {
        this.setState({name});
    }
    render() {
        return (
            <div className="App">
                <ServerList name={this.state.name}/>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Intersect</h1>
                </header>
                <p className="App-intro">
                    <ChatBox nameHandler={this.nameHandler.bind(this)}/>
                </p>
            </div>
            
        );
    }
}




export default App;
