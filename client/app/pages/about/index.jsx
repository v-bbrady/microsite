import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setThemeBlue } from '../../action-creators/theme';
// import { setUhfThemeDark } from '../../action-creators/uhfTheme';
import Article from '../article';

class About extends React.Component {
    componentDidMount() {
        this.props.dispatch(setThemeBlue());
        // this.props.dispatch(setUhfThemeDark());
    }

    render() {
        return <Article articleId={'24dbcef7-dc4c-4379-8dc2-b62c49f63ca3'} />;
    }
}

export default withRouter(connect()(About));
