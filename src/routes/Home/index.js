import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
//import { TextField, Tab, Tabs } from '@material-ui/core';
import { connect } from 'react-redux';
//import compose from 'recompose/compose';
//import SubmitButton from '../../Components/SubmitButton';
import { userLoginAction, userRegisterAction } from '../../Store/Actions/UserActions';

import './index.scss';


/*const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
}); */


class Home extends Component {
    state = {
        email: '',
        password: '',
        tabPosition: 0
    };

    handleEmail = event => {
        const email = event.currentTarget.value;
        this.setState({
            email
        });
    };

    handlePassword = event => {
        const password = event.currentTarget.value;
        this.setState({
            password
        });
    };

    clearState() {
        this.setState({
            email: '',
            password: '',
            tabPosition: 0
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const userDetails = { email: this.state.email, password: this.state.password }
        if (this.state.tabPosition === 0) {
        this.props.dispatch(userLoginAction(userDetails))
            .then(data => {
                if (data) {
                    this.clearState()
                    this.props.history.push('/feed')
                };
            });
        } else {
            this.props.dispatch(userRegisterAction(userDetails))
            .then(data => {
                if (data) {
                    this.clearState()
                };
            });
        };
    };

    tabHandler = (event, index ) => {
        this.setState({
            tabPosition: index
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div container className='homeContainer'>
                <Tabs value={this.state.tabPosition} centered textColor='primary' indicatorColor='primary' onChange={this.tabHandler}>
                    <Tab label={'Login'}>
                    </Tab>
                    <Tab label={'Register'}>
                    </Tab>
                </Tabs>
                <form className={classes.container} onSubmit={this.handleSubmit}>
                    <div>
                        <TextField
                            id="filled-email-input"
                            label="Email"
                            className={classes.textField}
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="filled"
                            value={this.state.email}
                            onChange={this.handleEmail}
                        />
                        <TextField
                            id="filled-password-input"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="filled"
                            value={this.state.password}
                            onChange={this.handlePassword}
                        />
                    </div>
                    <div>
                        <SubmitButton text={ this.state.tabPosition ? 'Register' : 'Login' }/>
                    </div>
                </form>
            </div>
        );
    };
};

const mapStateToProps = state => {
    if (state.currentUser) {
        return {
            token: state.currentUser.token
        };
    } else {
        return {
            token: ''
        };
    };
};

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps))(Home);
