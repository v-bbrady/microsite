import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SkipToMain from '@ms-fw/fw-react/components/skip-to-main/react';

import UniversalHeader from './UniversalHeader';

import Home from '../home';
import About from '../about';
import Articles from '../articles';
import Article from '../article';
import Careers from '../careers';
import CultureArticles from '../cultureArticles';
import Events from '../events';
import GSL from '../gsl';
import People from '../people';
import Profile from '../profile';
import Publications from '../publications';
import Publication from '../publication';
import Projects from '../projects';
import Project from '../project';

/**
 * Shell. All views are contained within this view.
 */
class Shell extends React.Component {
    /**
     * Generate UI for MSA auth testing
     * @param {boolean} hideUI
     * @return {JSX.Element}
     */
    generateMSAAuthTestUI(hideUI) {
        if (hideUI) {
            return;
        }

        return (
            <div>
                <button id="callGraphButton" type="button" onClick={callGraphApi}>
                    Call Microsoft Graph API
                </button>
                <div id="errorMessage" class="text-danger" />
                <div class="hidden">
                    <h3>Graph API Call Response</h3>
                    <pre class="well" id="graphResponse" />
                </div>
                <div class="hidden">
                    <h3>Access Token</h3>
                    <pre class="well" id="accessToken" />
                </div>
                <div class="hidden">
                    <h3>ID Token Claims</h3>
                    <pre class="well" id="userInfo" />
                </div>
                <button
                    id="signOutButton"
                    type="button"
                    class="btn btn-primary hidden"
                    onClick={signOut}>
                    Sign out
                </button>
            </div>
        );
    }

    generateRoutes() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/articles" component={Articles} />
                <Route path="/articles/:id" component={Article} />
                <Route exact path="/labs/gsl" component={GSL} />
                <Route exact path="/careers" component={Careers} />
                <Route exact path="/careers/culture" component={CultureArticles} />
                <Route exact path="/events" component={Events} />
                <Route exact path="/people" component={People} />
                <Route path="/profile/:id" component={Profile} />
                <Route exact path="/projects" component={Projects} />
                <Route path="/projects/:id" component={Project} />
                <Route exact path="/publications" component={Publications} />
                <Route path="/publications/:id" component={Publication} />
            </Switch>
        );
    }

    /**
     * React render method
     * @return {JSX.Element}
     */
    render() {
        return (
            <div>
                {/* <SkipToMain tabIndex="0" href={'#mainContent'} text={'Skip to main content'} /> */}
                <UniversalHeader />
                {this.generateRoutes()}
                {this.generateMSAAuthTestUI(true)}
            </div>
        );
    }
}

export default withRouter(connect()(Shell));
