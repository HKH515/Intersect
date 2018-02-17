import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CSSModules from 'react-css-modules';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import ServerList from '../ServerList';
import {PropTypes} from 'prop-types';

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleToggle = () => this.setState({
        open: !this.state.open
    });

    render() {
        return (
            <div>
                <p>Welcome {this.props.username}!</p>
                {this.props.loggedIn == true && < p > You appear to be logged in !</p>
}
                <RaisedButton label="Server list" onClick={this.handleToggle}/>
                <Drawer open={this.state.open}>
                    <ServerList
                        socket={this.props.socket}
                        servers={this.props.servers}
                        propagateToParent={this.props.propagateToParent}
                        roomName={this.props.roomName}
                        registeredForRoom={this.props.registeredForRoom}/>
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
    registeredForRoom: PropTypes.bool
};

export default SideNav;