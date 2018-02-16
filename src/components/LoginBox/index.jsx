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
            tmpUsername: ""
        };
    }

    // handleChange(e) {    const name = e.target.value;
    // this.props.nameHandler(name); }

    /*componentWillUpdate() {
        if (this.props.username === '') {
            this.setState({hidden : false});
        }
        else {
            this.setState({hidden : true});
        }
    }*/

    loginUser() {
        console.log("trying to login with username '" + this.state.tmpUsername + "'");
        this
            .props
            .socket
            .emit('adduser', this.state.tmpUsername, function (available) {
                console.log("inside addUser callback...");
                if (available) {
                    console.log("username is available!");
                    this.props.username = "testing";//this.state.tmpUsername;
                    this.props.loggedIn = true;                    
                    this.setState({tmpUsername: '', hidden: true});
                    //return <Redirect to='/rooms/:roomID' />
                } else {
                    console.log("username is taken!");
                }
            }.bind(this));
    }

    render() {
        if (!this.props.loggedIn) {
            return (
                <div className="login-box popup">
                    <Dialog
                        title="Select a username"
                        modal={false}
                        open={!this.props.loggedIn}>
                        <TextField hintText={this.placeholder} onChange={this.props.handleChange}></TextField>
                        <FlatButton label="Submit" onClick={this.props.loginUser} />
                    </Dialog>
                </div>
            );
        } else {
            return <div></div>;
        }

    }
};
LoginBox.propTypes = {
    socket: PropTypes.object.isRequired,
    username: PropTypes.string,
    roomName: PropTypes.string,
    loggedIn: PropTypes.bool,
    loginUser: PropTypes.func,
    handleChange: PropTypes.func
}
export default LoginBox;