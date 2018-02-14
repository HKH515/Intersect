import React from 'react';
import CSSModules from 'react-css-modules';
import { PropTypes } from 'prop-types';
import FontIcon from 'material-ui/FontIcon';

// UI
import {List, ListItem} from 'material-ui/List';


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
                <List>
                    {this.state.servers.map(item => (<ListItem key={item}>{item}</ListItem>))}
                    <ListItem className="addRoom"><FontIcon className="material-icons">add</FontIcon></ListItem>
                </List>
            </div>
        );
    }
};

ServerList.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ServerList;