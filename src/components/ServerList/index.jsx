import React from 'react';
import CSSModules from 'react-css-modules';
import {PropTypes} from 'prop-types';
import FontIcon from 'material-ui/FontIcon';

// UI
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class ServerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: this.props.roomName,
            registeredForRoom: this.props.registeredForRoom,
            servers: this.props.servers
        };
        this.loadServers = this.loadServers.bind(this);
        this.joinServer = this.joinServer.bind(this);
    }

    componentDidMount() {
        this.loadServers();
    }

    joinServer(item) {
        console.log("inside joinServer");
        var roomToJoin = item.target.innerHTML;
        console.log("login status: " + this.props.loggedIn);
        if (this.props.loggedIn) {
            console.log("trying to join room");
            this.props
                .socket
                .emit('joinroom', {
                    room: roomToJoin,
                }, function (success, reason) {
                    console.log(reason);
                    if (success) {
                        this.setState({registeredForRoom: true, roomName: item});
                        this.props.propagateToParent({registeredForRoom: this.state.registeredForRoom, roomName: this.state.roomName});
                        console.log("successfully joined room '" + this.state.roomName + "'");
                    } else {
                        console.log("failed to join room: " + reason);
                    }

                }.bind(this));
        }
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
            this.props.propagateToParent({servers: this.state.servers});
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
                            <ListItem onClick={this.joinServer} key={item}>{item}</ListItem>
                        ))}
                        <ListItem>
                    <FlatButton className="addRoom">
                        <FontIcon className="material-icons">add</FontIcon>
                    </FlatButton></ListItem>
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
    propagateToParent: PropTypes.func,
    registeredForRoom: PropTypes.bool
};

export default ServerList;