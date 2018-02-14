import React from 'react';
import CSSModules from 'react-css-modules';
import { PropTypes } from 'prop-types';

class ServerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            servers : []
        };
    }

    componentDidMount() {
        this.context.socket.emit('rooms');
        this.context.socket.on('roomlist', (rooms) => {
            //let servers = Object.assign([], this.state.servers);
            this.state.servers = [];
            for (var room in rooms) {
                this.state.servers.push(room);
                console.log("printing name of room: " + room);  
            }
            //console.log("rooms: " + servers);
            //this.setState({servers});
        });
    }



    render() {
        console.log("objects.keys(servers) : " + Object.keys(this.state.servers));
        return (
            <div>
                <ul>
                    {this.state.servers.map(item => (<li key={item}>{item}</li>))}
                </ul>
            </div>
        );
    }
};

ServerList.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ServerList;