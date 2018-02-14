import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import { PropTypes } from 'prop-types';

<<<<<<< HEAD
class ChatBox extends Component {
    handleChange(e){
        console.log(e.keyCode);
        if(e.keyCode == "13"){
            const name = e.target.value;
            this.props.nameHandler(name);
        }
=======
class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.placeholder = "Enter text here";
        this.state = {
            msg : ''
        };
    }

    //component
    
    //handleChange(e) {
    //    const name = e.target.value;
    //    this.props.nameHandler(name);
    //}

    sendMessage() {
        //const { socket } = this.context;
        this.context.socket.emit('msg', this.state.msg);
        this.setState({msg: ''});
>>>>>>> 0997581f5dbf86577bc50e1a2d0942175dd1a9f3
    }

    render(){
        return (
<<<<<<< HEAD
    <input placeholder={"Enter Desired Username"} onKeyDown={this.handleChange.bind(this)}></input>
=======
            <div className="input-box">
                <input placeholder={this.placeholder} onInput={(e) => this.setState({ msg : e.target.value})}></input>
                
                <button type="button" className="btn pull-right" onClick={() => this.sendMessage()}>Send</button>
            </div>
>>>>>>> 0997581f5dbf86577bc50e1a2d0942175dd1a9f3
        );
    }
};

ChatBox.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatBox;