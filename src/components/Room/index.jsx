import React from 'react';
import CSSModules from 'react-css-modules';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
    }

    render() {
        return (
            <div>
                <Chat chatId={this.id} />
                <ChatBox chatId={this.id}/>
            </div>
        );
    }
};

export default ChatBox;