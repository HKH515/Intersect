import React from 'react';
import CSSModules from 'react-css-modules';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.chatbox = ChatBox();
    }

    render() {
        return <input placeholder={this.placeholder}></input>
    }

    handleClick() {
        alert("afds");
    }
}

export default ChatBox;