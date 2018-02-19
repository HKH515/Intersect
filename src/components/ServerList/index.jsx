import React from 'react';
import {PropTypes} from 'prop-types';
import FontIcon from 'material-ui/FontIcon';

// UI
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

class ServerList extends React.Component {
    componentWillReceiveProps(newProps) {
        const {roomName, registeredForRoom, loggedIn} = newProps;
        this.setState({roomName, registeredForRoom, loggedIn});
    }
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            roomName: '',
            registeredForRoom: false,
            loggedIn: false,
            servers: []
        };
        this.joinServer = this
            .joinServer
            .bind(this);
    }

    componentDidMount() {
        console.log("serverlist did mount");
        this.props.loadServers();
    }

    joinServer(item) {
        console.log("inside joinServer");
        var roomToJoin = item.target.innerHTML;
        console.log("login status: " + this.state.loggedIn);
        if (this.state.loggedIn) {
            // If we are already joined, we want to leave
            if (this.state.roomName === roomToJoin) {
                console.log("we want to leave this!");
                this.props.socket.emit('partroom', roomToJoin);
                this.setState({roomName: '', registeredForRoom: false}, () => {this.props.propagateToParent({roomName: this.state.roomName, registeredForRoom: this.state.registeredForRoom})});
            }
            // Otherwise, we join the server)
            else {
                console.log("trying to join room");
                this
                    .props
                    .socket
                    .emit('joinroom', {
                        room: roomToJoin
                    }, function (success, reason) {
                        console.log(reason);
                        if (success) {
                            this.setState({registeredForRoom: true, roomName: roomToJoin});
                            this
                                .props
                                .propagateToParent({registeredForRoom: this.state.registeredForRoom, roomName: this.state.roomName});
                            console.log("successfully joined room '" + this.state.roomName + "'");
                        } else {
                            console.log("failed to join room: " + reason);
                        }

                    }.bind(this));
            }
        }
    }

    serverColor(item) {
        if (this.state.roomName === item) {
            return "#80DEEA";
        }
        return "#FFF";
    }

    render() {
        console.log("objects.keys(servers) : " + Object.keys(this.state.servers));
        return (
            <div>
                <List>
                    {this
                        .props
                        .servers
                        .map(item => (
                            <ListItem
                                divider="true"
                                onClick={this.joinServer}
                                key={item}
                                style={{
                                backgroundColor: this.serverColor(item)
                            }}>{item}</ListItem>
                        ))}
                </List>
            </div>
        );
    }
};

ServerList.propTypes = {
    socket: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    username: PropTypes.string,
    roomName: PropTypes.string,
    servers: PropTypes.array,
    loadServers: PropTypes.func,
    propagateToParent: PropTypes.func,
    registeredForRoom: PropTypes.bool
};

export default ServerList;