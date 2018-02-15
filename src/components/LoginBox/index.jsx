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
            hidden: false,
            tmpUsername: ""
        };
        this.login = this
            .login
            .bind(this);
        this.handleChange = this
            .handleChange
            .bind(this);
    }

    // handleChange(e) {    const name = e.target.value;
    // this.props.nameHandler(name); }

    /*componentWillUpdate() {
        if (this.context.username === '') {
            this.setState({hidden : false});
        }
        else {
            this.setState({hidden : true});
        }
    }*/

    login() {
        console.log("trying to login...");
        this
            .context
            .socket
            .emit('adduser', this.state.tmpUsername, function (available) {
                console.log("inside addUser callback...");
                if (available) {
                    console.log("username is available!");
                    this.context.username = this.state.tmpUsername;
                    this.setState({tmpUsername: '', hidden: true});
                    //return <Redirect to='/rooms/:roomID' />
                } else {
                    console.log("username is taken!");
                }
            }.bind(this));
    }

    handleChange = (e) => {
        console.log(this.state.tmpUsername);
        this.setState({tmpUsername: e.target.value});
    }

    render() {
        const actions = [< FlatButton label = "Submit" primary = {
                true
            }
            keyboardFocused = {
                true
            }
            onClick = {
                this.login
            } />];
        const hidden = this.state.hidden;
        if (!hidden) {
            return (
                <div className="login-box popup">
                    <Dialog
                        title="Select a username"
                        actions={actions}
                        modal={false}
                        open={!this.hidden}>
                        <TextField hintText={this.placeholder} onChange={this.handleChange}></TextField>
                    </Dialog>
                </div>
            );
        } else {
            return <div></div>;
        }

    }
};
LoginBox.contextTypes = {
    socket: PropTypes.object.isRequired,
    username: PropTypes.string,
    currentRoom: PropTypes.string
}
export default LoginBox;