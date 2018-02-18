import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CSSModules from 'react-css-modules';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import UserList from '../UserList';

class UserNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            position:'right'
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
                <RaisedButton label="Toggle Userdrawer" onClick={this.handleToggle.bind(this)}/>
                <Drawer open={this.state.open} position={this.state.position}>
                    <UserList />
                </Drawer>
            </div>
        );
    }
};

export default UserNav;