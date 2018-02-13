import React from 'react';
import CSSModules from 'react-css-modules';

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.placeholder = "Enter text here";
    }

    render() {
        return <input placeholder={this.placeholder}></input>
    }
}

export default ChatBox;