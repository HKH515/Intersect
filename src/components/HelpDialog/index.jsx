import React from 'react';
import {PropTypes} from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Home extends React.Component {
    componentWillReceiveProps(newProps) {
        var {
            helpDialog
        } = newProps;
        this.setState({
            helpDialog
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            helpDialog: false
        };
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        /*this.props.socket.emit('adduser', this.props.username, function(avail) {

        });
        this.props.socket.emit('users');
        this.props.socket.on('userlist', function(userIDs) {
            for (var i in userIDs) {
                console.log("username: " + i);
            }
        });*/
    }

    handleClose() {
        this.setState({helpDialog: false}, () => {this.props.propagateToParent({helpDialog: this.state.helpDialog})})
    }

    render() {
        const actions = [< FlatButton key="handleCloseButton" label = "Close" primary = {
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
                title="Instructions"
                modal={false}
                open={this.state.helpDialog}
                actions={actions}
                onRequestClose={this.handleClose}>
                <p>To display this screen, type /help or click the help icon</p>
                <p>To send a private message, type /msg username message</p>
                <p>To join an existing room (or create one that does not exist), type /join room</p>
                <p>To leave a room, type /leave</p>
                <p>To kick a user from a room, type /kick user</p>
                <p>To ban a user from a room, type /ban user</p>
            </Dialog>
        );
    }
}

Home.propTypes = {
    username: PropTypes.string,
    roomName: PropTypes.string,
    registeredForRoom: PropTypes.bool,
    loggedIn: PropTypes.bool,
    messages: PropTypes.array,
    servers: PropTypes.array,
    propagateToParent: PropTypes.func,
    helpDialog: PropTypes.bool
};

export default Home