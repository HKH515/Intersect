import React from 'react';
import {PropTypes} from 'prop-types';

// UI
import List, {ListItem} from 'material-ui/List';
import Autoscroll from 'autoscroll-react'

class Chat extends React.Component {
    componentWillReceiveProps(newProps) {
        const {registeredForRoom, loggedIn, roomName, username} = newProps;
        this.setState({registeredForRoom, loggedIn, roomName, username});
    }

    constructor(props) {
        super(props);
        this.state = {
            errorOpen: false,
            messages: [],
            registeredForRoom: false,
            loggedIn: false,
            roomName: '',
            username: ''
        };
    }

    componentDidMount() {
            this
                .props
                .socket
                .on('updatechat', function (room, msgs) {
                    if (this.state.roomName === room) {
                        this.setState({
                            messages: msgs
                        }, () => {
                            this.props.propagateToParent({messages: msgs})
                        });
                    }
                }.bind(this));

            this.props.socket.on('recv_privatemsg', function(messageObj) {
                console.log(messageObj);
                if(this.state.username === messageObj.target) {
                    this.setState({
                        messages: messageObj
                    }, () => {
                        this.props.propagateToParent({messages: messageObj});
                    });
                }
            }.bind(this));
    }

    render() {
        if (this.state.registeredForRoom) {
            return (
                <div className="chatView">
                    <List>
                        {this
                            .state
                            .messages
                            .map(item => {
                                if (item.target === undefined) {
                                    return <ListItem
                                        key={item.timestamp + item.nick}
                                        primaryText={item.message}
                                        secondaryText={item.nick + " @ " + item.timestamp}></ListItem>
                                }
                                else if (item.target !== undefined && (item.target === this.state.username || item.nick === this.state.username)) {
                                    return <ListItem style={{color:'#F44336'}}
                                        key={item.timestamp + item.nick}
                                        primaryText={item.message}
                                        secondaryText={item.nick + "  -->  " +item.target + "@" + item.timestamp }></ListItem>
                                }
                                return null;
                            })}
                    </List>
                </div>
            );
        } else {
            return (
                <div className="chatView">
                    <h2 className="heading">Not registered for room!</h2>
                </div>
            )
        }

    }
}

Chat.propTypes = {
    socket: PropTypes.object.isRequired,
    registeredForRoom: PropTypes.bool,
    roomName: PropTypes.string,
    username: PropTypes.string,
    loggedIn: PropTypes.bool,
    messages: PropTypes.array,
    handleChangeMessage: PropTypes.func,
    propagateToParent: PropTypes.func
};

export default Autoscroll(Chat);