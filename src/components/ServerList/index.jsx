import React from 'react';
import CSSModules from 'react-css-modules';
import {PropTypes} from 'prop-types';
import FontIcon from 'material-ui/FontIcon';

// UI
import {List, ListItem} from 'material-ui/List';

class ServerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: this.props.roomName,
            registeredForRoom: this.props.registeredForRoom,
            loggedIn: this.props.loggedIn,
            servers: this.props.servers
        };
        this.loadServers = this.loadServers.bind(this);
        this.joinServer = this.joinServer.bind(this);
    }

    componentDidMount() {
        this.loadServers();
    }

    joinServer() {
        if (this.props.loggedIn) {
            console.log("trying to join room");
            this
                .socket
                .emit('joinroom', {
                    room: this.props.roomName,
                    pass: ""
                }, function (success, reason) {
                    console.log(reason);
                    if (success) {
                        this.state.registeredForRoom = true;
                        console.log("successfully joined room '" + this.props.roomName + "'");
                    } else {
                        console.log("failed to join room: " + reason);
                    }

                }.bind(this));
        }
        this.props.propagateToParent(this.state);
    }


    loadServers() {
        this
            .props
            .socket
            .emit('rooms');
        this
            .props
            .socket
            .on('roomlist', function (rooms) {
                //let servers = Object.assign([], this.state.servers);
                this.state.servers = [];
                for (var room in rooms) {
                    this
                        .state
                        .servers
                        .push(room);
                    console.log("printing name of room: " + room);
                }
                //console.log("rooms: " + servers); this.setState({servers});
            }.bind(this));
            this.props.propagateToParent(this.state);
        }
    render() {
        console.log("objects.keys(servers) : " + Object.keys(this.state.servers));
        return (
            <div>
                <List>
                    {this
                        .state
                        .servers
                        .map(item => (
                            <ListItem key={item}>{item}</ListItem>
                        ))}
                    <ListItem className="addRoom">
                        <FontIcon className="material-icons">add</FontIcon>
                    </ListItem>
                </List>
            </div>
        );
    }
};

ServerList.propTypes = {
    socket: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    roomName: PropTypes.string,
    servers: PropTypes.array,
    loadServers: PropTypes.func,
    propagateToParent: PropTypes.func
};

export default ServerList;