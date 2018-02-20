import React from 'react';
import {PropTypes} from 'prop-types';

// UI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class LoginBox extends React.Component {
    componentWillReceiveProps(newProps) {
        const {username, loggedIn} = newProps;
        this.setState({username, loggedIn});
    }
    constructor(props) {
        super(props);
        this.placeholder = "Enter username...";
        this.state = {
            errorText: "",
            username: '',
            loggedIn: '',
            open: true
        };
        this.loginUser = this
            .loginUser
            .bind(this);
        this.handleChangeUsername = this
            .handleChangeUsername
            .bind(this);
        this.handleKeyDown = this
            .handleKeyDown
            .bind(this);
    }

    loginUser() {
        if (this.state.username == '') {
            this.setState({errorText: "A username is required!"});
            return;
        }
        this
            .props
            .socket
            .emit('adduser', this.state.username, (available) => {
                if (available) {
                    this.setState({
                        open: false,
                        loggedIn: true
                    }, () => {
                        this
                            .props
                            .propagateToParent({username: this.state.username, loggedIn: this.state.loggedIn});
                    });
                } else {
                    this.setState({errorText: "Username is taken!"});
                }
            });
    }

    handleChangeUsername(e) {
        this.setState({username: e.target.value});
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.loginUser();
        }
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
                actions={actions}>
                <TextField
                    style={{
                    width: 700
                }}
                    hintText={this.placeholder}
                    onChange={this.handleChangeUsername}
                    onKeyDown={this.handleKeyDown}
                    errorText={this.state.errorText}/>
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