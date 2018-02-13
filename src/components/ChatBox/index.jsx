import React from 'react';
import CSSModules from 'react-css-modules';

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.placeholder = "Enter text here";
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return <input placeholder={this.placeholder}></input>
    }

    handleClick() {
        alert("afds");
    }
}

export default ChatBox;