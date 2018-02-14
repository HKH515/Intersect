import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CSSModules from 'react-css-modules';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import ServerList from '../ServerList';


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
                <RaisedButton label="Toggle Drawer" onClick={this.handleToggle}/>
                <Drawer open={this.state.open}>
                    <ServerList />
                </Drawer>
            </div>
        );
    }
};

export default SideNav;