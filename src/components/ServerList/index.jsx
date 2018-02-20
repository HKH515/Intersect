import React from 'react';
import {PropTypes} from 'prop-types';

// UI
import {List, ListItem} from 'material-ui/List';

class ServerList extends React.Component {
    componentWillReceiveProps(newProps) {
        const {roomName, registeredForRoom, loggedIn, bannedFrom} = newProps;
        this.setState({roomName, registeredForRoom, loggedIn, bannedFrom});
    }
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            roomName: '',
            registeredForRoom: false,
            loggedIn: false,
            servers: [],
            bannedFrom: []
        };
        this.joinServer = this
            .joinServer
            .bind(this);
    }

    componentDidMount() {
        this.props.loadServers();
        this.props.checkIfBanned();
    }

    joinServer(item) {
        var roomToJoin = item.target.innerHTML;
        this.props.joinServer(roomToJoin);
    }

    serverColor(item) {
        if (this.state.roomName === item) {
            return "#80DEEA";
        }
        else if (this.state.bannedFrom.indexOf(item) > -1) {
            return "#F44336";
        }
        return "#FFF";
    }

    render() {
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
}

ServerList.propTypes = {
    socket: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    username: PropTypes.string,
    roomName: PropTypes.string,
    servers: PropTypes.array,
    loadServers: PropTypes.func,
    propagateToParent: PropTypes.func,
    registeredForRoom: PropTypes.bool,
    joinServer: PropTypes.func,
    bannedFrom: PropTypes.array,
    checkIfBanned: PropTypes.func
};

export default ServerList;