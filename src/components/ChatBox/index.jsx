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

    sendMessage() {
        //const { socket } = this.context;
        this.context.socket.emit('sendmsg', {roomName : 'default', msg : this.state.msg});
        this.setState({msg: ''});
    }

    render() {
        return (
            <div className="input-box">
                <input value={this.state.msg} placeholder={this.placeholder} onInput={(e) => this.setState({ msg : e.target.value})}></input>
                
                <button type="button" className="btn pull-right" onClick={() => this.sendMessage()}>Send</button>
            </div>
        );
    }
};

ChatBox.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatBox;