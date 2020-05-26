import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignInAndUp from './SignInAndUp';
import GithubAuth from './GithubAuth';
import ResetPasswordPage from './ResetPassword';
import ForgotPasswordPage from './ForgotPassword';

export default function AuthPages() {
    const isAuthneticated = false;

    if (isAuthneticated) {
        return <Redirect to='/dash' />;
    }

    return (
        <Switch>
            <Route path='/auth/signIn' component={SignInAndUp} exact />
            <Route path='/auth/signUp' component={SignInAndUp} exact />
            <Route path='/auth/github' component={GithubAuth} exact />
            <Route
                path='/auth/forgotPassword'
                component={ForgotPasswordPage}
                exact
            />
            <Route
                path='/auth/resetPassword'
                component={ResetPasswordPage}
                exact
            />
            <Route component={SignInAndUp} />
        </Switch>
    );
}
