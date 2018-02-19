import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import ServerList from '../ServerList';
import {PropTypes} from 'prop-types';
import AppBar from 'material-ui/AppBar';

class SideNav extends React.Component {
    componentWillReceiveProps(newProps) {
        const { servers, roomName, registeredForRoom, username, loggedIn} = newProps;
        this.setState({servers, roomName, registeredForRoom, username, loggedIn});
    }
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            servers: [],
            roomName: '',
            registeredForRoom: false,
            username: '',
            loggedIn: false
        };
    }

    handleToggle = () => this.setState({
        open: !this.state.open
    });

    render() {
        return (
            <div>
                {this.state.loggedIn === true && <p> Welcome {this.props.username}!</p>}
                <RaisedButton label="Server list" onClick={this.handleToggle}/>
                <Drawer open={this.state.open}>
                    <AppBar title="Rooms" showMenuIconButton={false}/>
                    <ServerList
                        socket={this.props.socket}
                        loggedIn={this.state.loggedIn}
                        username={this.state.username}
                        servers={this.state.servers}
                        propagateToParent={this.props.propagateToParent}
                        roomName={this.state.roomName}
                        registeredForRoom={this.state.registeredForRoom}
                        loadServers={this.props.loadServers}/>

                </Drawer>
            </div>
        );
    }
};

SideNav.propTypes = {
    socket: PropTypes.object.isRequired,
    username: PropTypes.string,
    servers: PropTypes.array,
    propagateToParent: PropTypes.func,
    loggedIn: PropTypes.bool,
    roomName: PropTypes.string,
    registeredForRoom: PropTypes.bool,
    loadServers: PropTypes.func
};

export default SideNav;