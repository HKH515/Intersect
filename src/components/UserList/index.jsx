import React from 'react';
import CSSModules from 'react-css-modules';
import {List, ListItem} from 'material-ui/List';
import {PropTypes} from 'prop-types';

class UserList extends React.Component {
    componentWillReceiveProps(newProps) {
        const {username, users} = newProps;
        console.log("users: " + newProps.users);
        this.setState({username, users});
    }

    constructor(props) {
        super(props);
        this.usercolor = this.usercolor.bind(this);
        this.state = {
            username: '',
            users: []
        };
        this.usercolor = this.usercolor.bind(this);
    }
    componentDidMount() {
        console.log("serverlist did mount");
        this.props.loadUsers();
    }

    usercolor(item) {
        if (item === this.state.username) {
            return "#80DEEA";
        }
        return "#FFF";
    }

    render() {
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
                                backgroundColor: this.usercolor(item)
                            }}>{item}</ListItem>
                        ))}
                </List>
            </div>
        );
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
    loadUsers: PropTypes.func
};

export default UserList;