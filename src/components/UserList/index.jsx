import React from 'react';
import CSSModules from 'react-css-modules';
import {List, ListItem} from 'material-ui/List';
import {PropTypes} from 'prop-types';

class UserList extends React.Component {
    componentWillReceiveProps(newProps) {
        const {username, users, ops} = newProps;
        console.log("users: " + newProps.users);
        this.setState({username, users, ops});
    }

    constructor(props) {
        super(props);
        this.bgcolor = this.bgcolor.bind(this);
        this.textcolor = this.textcolor.bind(this);
        this.state = {
            username: '',
            users: [],
            ops: []
        };
        this.bgcolor = this.bgcolor.bind(this);
    }
    componentDidMount() {
        console.log("serverlist did mount");
        this.props.loadUsers();
    }

    bgcolor(item) {
        if (item === this.state.username) {
            return "#80DEEA";
        }
        return "#FFF";
    }

    textcolor(item) {
        if (item === this.state.ops) {
            return "#F9A825";
        }
        return "#000";
    }
    

    render() {
        console.log(this.state.ops);
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
    ops: PropTypes.array
};

export default UserList;