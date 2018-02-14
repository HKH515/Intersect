import React, {Component} from 'react';
import CSSModules from 'react-css-modules';

class ChatBox extends Component {
    handleChange(e){
        console.log(e.keyCode);
        if(e.keyCode == "13"){
            const name = e.target.value;
            this.props.nameHandler(name);
        }
    }

    render(){
        return (
    <input placeholder={"Enter Desired Username"} onKeyDown={this.handleChange.bind(this)}></input>
        );
    }

}


export default ChatBox;