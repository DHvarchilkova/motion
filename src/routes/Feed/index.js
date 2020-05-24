import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

import Post from '../../Containers/Post';
import NewPostForm from '../../Containers/NewPostForm';
import { fetchFeed } from '../../Store/Actions/FeedActions';


const styles = theme => ({
    root: {
        width: '60%',
        minWidth: 360,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '50px',
    },
    feedList: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '15px',
    },

});

class Feed extends Component {
    componentDidMount() {
        this.props.dispatch(fetchFeed())
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={ classes.feedList }>
                <List className={classes.root}>
                    <NewPostForm />
                    {this.props.feed.map((post, index) => {
                        return <Post key={index} post={post}/>
                    })}
                </List>
            </div>
        );
    };
};

const mapStateToProps = state => {
    if (state.feedReducer.feed) {
        const followedUsers = state.userReducer.currentUser.follows // array of user id's
        const feed = state.feedReducer.feed // array of objects with ._user._id property
        const filteredPosts = feed.filter(post => followedUsers.includes(post._user._id))
        return {
            feed: filteredPosts
        };
    } else {
        return {
            feed: []
        };
    };
};

export default withStyles(styles)(connect(mapStateToProps)(withRouter(Feed)))
