import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
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

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.placeholder = "Enter text here...";
    }
    render() {
        return <input placeholder={this.props.placeholder}></input>;
    }
}

export default App;
