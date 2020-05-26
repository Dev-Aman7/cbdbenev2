/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
import { Provider } from 'react-redux';

import './index.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import * as serviceWorker from './serviceWorker';

import HomePage from './pages/Home';
import AuthPages from './pages/Auth';
import FirstLoginPages from './pages/FirstLogin';
import DashboardPages from './pages/Dashboard';
import ErrorPages from './pages/Error';

import Banners from './components/Banners';
import customTheme from './styles/customTheme';

import { store, persistor } from './store';

ReactDOM.render(
    <ThemeProvider theme={customTheme}>
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <Banners />
                    <Switch>
                        <Route path='/' exact component={HomePage} />
                        <Route path='/auth' component={AuthPages} />
                        <Route path='/firstLogin' component={FirstLoginPages} />
                        <Route path='/dash' component={DashboardPages} />
                        <Route component={ErrorPages} />
                    </Switch>
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
