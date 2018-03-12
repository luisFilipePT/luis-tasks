import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { logoutUser } from '../../actions';

import withNavigate from '../hocs/with_navigate';

export default function (WrappedComponent) {
    class WithAuthentication extends Component {
        componentWillMount() {
            const { isAuthenticated, navigateTo } = this.props;
            if (!isAuthenticated) navigateTo('/login');
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) nextProps.navigateTo('/login');
        }

        render() {
            return <WrappedComponent {...this.props}/>;
        }
    }

    function mapStateToProps({ auth }) {
        const { isAuthenticated } = auth;

        return {
            isAuthenticated,
        };
    }

    return connect(mapStateToProps)(withNavigate(WithAuthentication));
}
