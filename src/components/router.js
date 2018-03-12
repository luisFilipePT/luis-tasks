import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomeScreen from './screens/home_screen';
import LoginScreen from './screens/login_screen';
import NotFoundScreen from './screens/404_screen';

import { LOGIN_ROUTE } from '../constants';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomeScreen}/>
                    <Route path={LOGIN_ROUTE} component={LoginScreen}/>
                    <Route component={NotFoundScreen}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
