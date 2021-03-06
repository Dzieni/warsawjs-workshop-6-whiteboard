import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import App from '../imports/client/App.jsx';

Meteor.startup(() => {
    render(
        <Router>
            <div>
                <Route exact path="/" component={App}/>
                <Route path="/board/:id" component={App} />
            </div>
        </Router>
    , document.getElementById('render-target'));
});