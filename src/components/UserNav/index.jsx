import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CSSModules from 'react-css-modules';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import UserList from '../UserList';
import AppBar from 'material-ui/AppBar';
import {PropTypes} from 'prop-types';

class UserNav extends React.Component {
    componentWillReceiveProps(newProps) {
        const {users, username, roomName} = newProps;
        this.setState({users, username, roomName});
    }
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            position:'right',
            users: [],
            username: '',
            roomName: ''
        };
    }

    handleToggle() {
        this.setState({
            position : "right",
            open: !this.state.open  });
        console.log(this.state.position);
    }

    render() {
        return (
            <div>
                <RaisedButton label="Users" onClick={this.handleToggle.bind(this)}/>
                <Drawer openSecondary={true} open={this.state.open} position={this.state.position}>
                    <AppBar title={this.state.roomName} showMenuIconButton={false}/>
                    <UserList socket={this.props.socket} username={this.state.username} roomName={this.state.roomName} users={this.state.users} loadUsers={this.props.loadUsers}/>
                </Drawer>
            </div>
        );
    }
};

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
    loadUsers: PropTypes.func
};

export default UserNav;