import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { template } from 'lodash';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import Shell from './pages/shell';

import store from './store';

const FWDefaultBlue = require(`../../.tmp/css/fw-microsoft-design-west-european-default-blue-18102.css`);
const documentTemplate = require('./index.ejs');

const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: 'a9685ca1-f279-485f-992b-650ae822dda0',
        enableAutoRouteTracking: true
    }
});
appInsights.loadAppInsights();
appInsights.trackPageView(null, null, { urlReferrer: document.referrer });

/**
 * Primary render function for app. Called on store updates
 */
const render = () => {
    if (typeof document !== 'undefined') {
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter basename="/">
                    <Route component={Shell} />
                </BrowserRouter>
            </Provider>,
            document.getElementById('root')
        );
    }
};

store.subscribe(render);

render();
