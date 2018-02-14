import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import { PropTypes } from 'prop-types';

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.placeholder = "Enter text here";
        this.state = {
            msg : ''
        };
    }

    
    
    //handleChange(e) {
    //    const name = e.target.value;
    //    this.props.nameHandler(name);
    //}

    sendMessage(e) {
        if(e.keyCode == "13"){
            var message = e.target.value;
            //const { socket } = this.context;
            console.log(message);
            this.context.socket.emit('msg', message);
            this.setState({msg: ''});
        }
    }

    render() {
        return (
            <div className="input-box">
                <input placeholder={this.placeholder} onKeyDown={this.sendMessage.bind(this)}></input>
                
            </div>
        );
    }
};

ChatBox.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatBox;