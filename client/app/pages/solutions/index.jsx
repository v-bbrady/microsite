import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Solution extends React.Component {
    render() {
        return <div className={'Solution Class name'}>Solution Hello World</div>;
    }
}

export default withRouter(connect()(Solution));
