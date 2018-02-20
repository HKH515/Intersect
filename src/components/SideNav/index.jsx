import React from 'react';
import Drawer from 'material-ui/Drawer';
import ServerList from '../ServerList';
import {PropTypes} from 'prop-types';
import AppBar from 'material-ui/AppBar';

class SideNav extends React.Component {
    componentWillReceiveProps(newProps) {
        const { servers, roomName, registeredForRoom, username, loggedIn, bannedFrom} = newProps;
        this.setState({servers, roomName, registeredForRoom, username, loggedIn, bannedFrom});
    }
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            servers: [],
            roomName: '',
            registeredForRoom: false,
            username: '',
            loggedIn: false,
            bannedFrom: []
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {   
        this.setState({open: !this.state.open});
    }
    render() {
        return (
            <div>
                <Drawer open={true}>
                    <AppBar title="Rooms" showMenuIconButton={false}/>
                    <ServerList
                        socket={this.props.socket}
                        loggedIn={this.state.loggedIn}
                        username={this.state.username}
                        servers={this.state.servers}
                        propagateToParent={this.props.propagateToParent}
                        roomName={this.state.roomName}
                        registeredForRoom={this.state.registeredForRoom}
                        loadServers={this.props.loadServers}
                        joinServer={this.props.joinServer}
                        bannedFrom={this.state.bannedFrom}
                        checkIfBanned={this.props.checkIfBanned}/>
                </Drawer>
            </div>
        );
    }
}

SideNav.propTypes = {
    socket: PropTypes.object.isRequired,
    username: PropTypes.string,
    servers: PropTypes.array,
    propagateToParent: PropTypes.func,
    loggedIn: PropTypes.bool,
    roomName: PropTypes.string,
    registeredForRoom: PropTypes.bool,
    loadServers: PropTypes.func,
    joinServer: PropTypes.func,
    bannedFrom: PropTypes.array,
    checkIfBanned: PropTypes.func
};

export default SideNav;