import React from 'react';
import CSSModules from 'react-css-modules';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: ['adsf', 'aff22']
        };
    }
    render() {
        return <div>{React.Children.map(this.state.message, (child, i) => {<li>child</li>})}</div>
    }
};

export default ChatBox;