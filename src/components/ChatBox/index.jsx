import React, {Component} from 'react';
import CSSModules from 'react-css-modules';

class ChatBox extends Component {
    handleChange(e){
        const name = e.target.value;
        this.props.nameHandler(name);
    }

    render(){
        return (
    <input placeholder={"Enter Desired Username"} onChange={this.handleChange.bind(this)}></input>
        );
    }

}


export default ChatBox;