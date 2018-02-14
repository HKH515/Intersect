import React from 'react';
import CSSModules from 'react-css-modules';
import { PropTypes } from 'prop-types';

class ServerList extends React.Component {
    constructor(props) {
        super(props);
        this.servers;
    }


    render() {
        return (
            <div>
                <ul>
                {React.Children.map(this.props.children, (child, i) => {return <li>child</li>;})}
                </ul>
            </div>
        );
    }
};

export default ServerList;