import React from 'react';
import Drawer from 'material-ui/Drawer';
import UserList from '../UserList';
import AppBar from 'material-ui/AppBar';
import {PropTypes} from 'prop-types';

class UserNav extends React.Component {
    componentWillReceiveProps(newProps) {
        const {users, username, roomName, ops, registeredForRoom} = newProps;
        this.setState({users, username, roomName, ops, registeredForRoom});
    }
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            position: 'right',
            users: [],
            username: '',
            roomName: '',
            ops: [],
            registeredForRoom: false
        };
    }

    handleToggle() {
        this.setState({
            position: "right",
            open: !this.state.open
        });
    }

    render() {
        return (
            <div>
                <Drawer openSecondary={true} open={true} position={this.state.position}>
                    <AppBar title={this.state.roomName} showMenuIconButton={false}/>
                    <UserList
                        socket={this.props.socket}
                        username={this.state.username}
                        roomName={this.state.roomName}
                        users={this.state.users}
                        loadUsers={this.props.loadUsers}
                        ops={this.state.ops}
                        registeredForRoom={this.state.registeredForRoom}/>

                </Drawer>
            </div>
        );
    }
}

UserNav.propTypes = {
    socket: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    username: PropTypes.string,
    roomName: PropTypes.string,
    servers: PropTypes.array,
    loadServers: PropTypes.func,
    propagateToParent: PropTypes.func,
    registeredForRoom: PropTypes.bool,
    users: PropTypes.array,
    loadUsers: PropTypes.func,
    ops: PropTypes.array,
};

export default UserNav;