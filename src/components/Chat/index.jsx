import React from 'react';
import CSSModules from 'react-css-modules';
import { PropTypes } from 'prop-types';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentDidMount() {

        const { socket } = this.context;
        socket.emit('adduser', 'defaultUser', function(available){
            console.log('username status: ' + available);
        });
        socket.on('updatechat', (room, msg) => {
            let messages = Object.assign({}, this.state.messages);
            messages.push('${(new Date()).toLocaleTimeString()} - ${msg}');
            this.setState({messages});
        });
    }

    render() {
        return <div>{React.Children.map(this.state.messages, (child, i) => {<li>child</li>})}</div>
    }
};

Chat.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default Chat;