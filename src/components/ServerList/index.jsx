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
        var roomToJoin = item.target.innerHTML;
        this.props.joinServer(roomToJoin);
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
    registeredForRoom: PropTypes.bool,
    joinServer: PropTypes.func
};

export default ServerList;