import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory, hashHistory} from 'react-router';

import './index.scss';

import {
    Main,
    Home
} from 'views';

import configureStore from 'data/store/configureStore';

let store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route component={Main}>
                <Route path="/" component={Home}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);