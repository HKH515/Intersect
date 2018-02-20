import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {PropTypes} from 'prop-types';

class UserList extends React.Component {
    componentWillReceiveProps(newProps) {
        const {username, users, ops, registeredForRoom} = newProps;
        this.setState({username, users, ops, registeredForRoom});
    }

    constructor(props) {
        super(props);
        this.bgcolor = this
            .bgcolor
            .bind(this);
        this.textcolor = this
            .textcolor
            .bind(this);
        this.state = {
            username: '',
            users: [],
            ops: [],
            registeredForRoom: false
        };
        this.bgcolor = this
            .bgcolor
            .bind(this);
    }
    componentDidMount() {
        this
            .props
            .loadUsers();
    }

    bgcolor(item) {
        if (item === this.state.username) {
            return "#80DEEA";
        }
        return "#FFF";
    }

    textcolor(item) {
        if (this.state.ops.indexOf(item.nick)> -1) {
            return "#F9A825";
        }
        return "#000";
    }

    render() {
        if (this.state.registeredForRoom) {
            return (
                <div>
                    <List>
                        {this
                            .props
                            .users
                            .map(item => (
                                <ListItem
                                    divider="true"
                                    key={item}
                                    style={{
                                    backgroundColor: this.bgcolor(item),
                                    textColor: this.textcolor(item)
                                }}>{item}</ListItem>
                            ))}
                    </List>
                </div>
            );
        } else {
            return null;
        }
    }
}

UserList.propTypes = {
    socket: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool,
    username: PropTypes.string,
    roomName: PropTypes.string,
    servers: PropTypes.array,
    loadServers: PropTypes.func,
    propagateToParent: PropTypes.func,
    registeredForRoom: PropTypes.bool,
    users: PropTypes.array,
    loadUsers: PropTypes.func,
    ops: PropTypes.array,
};

export default UserList;