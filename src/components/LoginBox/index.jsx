import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import {PropTypes} from 'prop-types';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// UI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.placeholder = "Enter username...";
        this.errorText = "A username is required";
        this.state = {
            open: true
        };
        this.handleClose = this
            .handleClose
            .bind(this)
    }

    handleClose() {
        this.setState({open: false});        
        this.props.loginUser()
    }

    // handleChange(e) {    const name = e.target.value;
    // this.props.nameHandler(name); }

    render() {
        const actions = [< FlatButton label = "Submit" primary = {
                true
            }
            keyboardFocused = {
                true
            }
            onClick = {
                this.handleClose
            } />];
        return (
            <Dialog
                title="Select a username"
                modal={false}
                open={this.state.open}
                actions={actions}
                onRequestClose={this.handleClose}>
                <p>User login status: {this.state.open}</p>
                <TextField
                    hintText={this.placeholder}
                    onChange={this.props.handleChangeUsername}
                    />
            </Dialog>
        );
    }
};

LoginBox.propTypes = {
    socket: PropTypes.object.isRequired,
    username: PropTypes.string,
    roomName: PropTypes.string,
    loggedIn: PropTypes.bool,
    loginUser: PropTypes.func,
    handleChangeUsername: PropTypes.func
}
export default LoginBox;