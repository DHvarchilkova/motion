import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';

import App from './Containers/App';

import Feed from './Routes/Feed';
import Home from './Routes/Home';
import UserDetails from './Routes/UserPage';
import Users from './Routes/Users';

import RequiredAuth from './Components/HOCProtection';
import { AUTH_USER } from './Store/Types';
import { fetchLocalUser } from './Store/Actions/UserActions';
import store from './Store';

const user = localStorage.getItem('user');
// if we have the token consider the user to be signed in

if (user) {
    store.dispatch(fetchLocalUser())
    store.dispatch({ type: AUTH_USER })
};

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <App>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/feed' component={RequiredAuth(Feed)} />
                    <Route exact path='/users' component={Users} />
                    <Route path='/users/:id' component={RequiredAuth(UserDetails)} />
                </App>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'));






