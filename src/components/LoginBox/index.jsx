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
            username: props.username,
            loggedIn: props.loggedIn,
            open: true
        };
        this.loginUser = this
            .loginUser
            .bind(this);
        this.handleChangeUsername = this
            .handleChangeUsername
            .bind(this);
    }

    loginUser() {
        console.log("trying to login with username '" + this.state.username + "'");
        this
            .props
            .socket
            .emit('adduser', this.state.username, function (available) {
                console.log("inside addUser callback...");
                if (available) {
                    console.log("username is available!");
                    this.setState({open: false, loggedIn: true});
                    console.log("loggedIn : " + this.state.loggedIn);

                    this
                        .props
                        .propagateToParent({username: this.state.username, loggedIn: this.state.loggedIn});
                    //return <Redirect to='/rooms/:roomID' />
                } else {
                    console.log("username is taken!");
                }
            }.bind(this));
    }
    handleChangeUsername = (e) => {
        this.state.username = e.target.value;
    }

    render() {
        const actions = [< FlatButton label = "Submit" primary = {
                true
            }
            keyboardFocused = {
                true
            }
            onClick = {
                this.loginUser
            } />];
        return (
            <Dialog
                title="Select a username"
                modal={false}
                open={this.state.open}
                actions={actions}
                onRequestClose={this.loginUser}>
                <p>User login status: {this.state.loggedIn}</p>
                <TextField hintText={this.placeholder} onChange={this.handleChangeUsername}/>
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
    handleChangeUsername: PropTypes.func,
    propagateToParent: PropTypes.func
};

export default LoginBox;