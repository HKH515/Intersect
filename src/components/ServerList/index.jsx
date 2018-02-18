import React from 'react';
import CSSModules from 'react-css-modules';
import {PropTypes} from 'prop-types';
import FontIcon from 'material-ui/FontIcon';

// UI
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class ServerList extends React.Component {
    componentWillReceiveProps(newProps) {
        const {roomName, registeredForRoom,loggedIn} = newProps;
        this.setState({roomName, registeredForRoom,loggedIn});
    }
    constructor(props) {
        super(props);
        this.state = {
            roomName: '',
            registeredForRoom: false,
            loggedIn: false,
            servers: []
        };
        this.loadServers = this.loadServers.bind(this);
        this.joinServer = this.joinServer.bind(this);
    }

    componentDidMount() {
        console.log("serverlist did mount");
        this.loadServers();
    }

    joinServer(item) {
        console.log("inside joinServer");
        var roomToJoin = item.target.innerHTML;
        console.log("login status: " + this.state.loggedIn);
        if (this.state.loggedIn) {
            console.log("trying to join room");
            this.props
                .socket
                .emit('joinroom', {
                    room: roomToJoin,
                }, function (success, reason) {
                    console.log(reason);
                    if (success) {
                        this.setState({registeredForRoom: true, roomName: roomToJoin});
                        this.props.propagateToParent({registeredForRoom: this.state.registeredForRoom, roomName: this.state.roomName});
                        console.log("successfully joined room '" + this.state.roomName + "'");
                    } else {
                        console.log("failed to join room: " + reason);
                    }

                }.bind(this));
        }
    }


    loadServers() {
        console.log("inside loadServers...");
        this
            .props
            .socket
            .emit('rooms');
        this
            .props
            .socket
            .on('roomlist', function (rooms) {
                //let servers = Object.assign([], this.state.servers);
                console.log("inside roomlist callback...");
                const tmpServers = [];
                for (var room in rooms) {
                    tmpServers.push(room);
                    console.log("printing name of room: " + room);
                }
                this.setState({servers: tmpServers}, () => {this.props.propagateToParent({servers: this.state.servers})});                
                //console.log("rooms: " + servers); this.setState({servers});
            }.bind(this));
            //this.props.propagateToParent({servers: this.state.servers});
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
                            <ListItem divider="true" onClick={this.joinServer} key={item} classes={this.state.roomName == item ? ["currentServer"] : []}>{item}</ListItem>
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