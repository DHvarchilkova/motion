import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core/';

import { fetchUserDetails } from '../../Store/Actions/UserDetailsActions';
import Post from '../../Containers/Post';
import UserDetails from '../../Containers/UserDetails';
import './index.scss';


const styles = theme => ({
    root: {
        width: '60%',
        minWidth: 360,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '10px',
    },
    inline: {
        display: 'inline',
    },
    feedList: {
        display: 'flex',
        justifyContent: 'center',
        padding: '15px',
    },
    post: {
        backgroundColor: 'yellos',
        minWidth: '360px',
        height: '80px',
        boxShadow: '5px 10px 18px #3F51B5',
        display: 'flex',
        alignItems: 'center',
        marginTop: 20
    }
});

class UserPage extends Component {
    componentDidMount() {
        const userID = this.props.match.params.id
        this.props.dispatch(fetchUserDetails(userID))
    };

    render() {
        const { classes } = this.props;
        return (
            <div className='userDetailsPage'>
                <List className={classes.custom}>
                    <UserDetails key={this.props.users._id} user={this.props.users} />
                </List>
                <List className={classes.root}>
                    {this.props.users.posts.map((post, index) => {
                        return <Post key={index} post={post} />
                    })}
                </List>
            </div>
        );
    };
};

const mapStateToProps = state => {
    if (state.userDetailsReducer.userDetails) {
        return {
            users: state.userDetailsReducer.userDetails
        };
    };
    return {
        users: { posts: [] }
    };
};

export default connect(mapStateToProps)(withStyles(styles)(UserPage));
