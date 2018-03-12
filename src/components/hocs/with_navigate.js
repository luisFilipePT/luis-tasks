import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function (WrappedComponent) {
    class WithNavigate extends Component {
        static propTypes = {
            match: PropTypes.object.isRequired,
            location: PropTypes.object.isRequired,
            history: PropTypes.object.isRequired,
        };

        constructor(props) {
            super(props);
            this.navigateTo = this.navigateTo.bind(this);
            this.routeLocation = this.routeLocation.bind(this);
            this.routeParams = this.routeParams.bind(this);
        }

        navigateTo(screen, params = {}) {
            this.props.history.push(screen, params);
        }

        routeLocation() {
            return this.props.location.pathname;
        }

        routeParams() {
            return this.props.match.params;
        }

        render() {
            return (
                <WrappedComponent
                    routeParams={this.routeParams}
                    routeLocation={this.routeLocation}
                    navigateTo={this.navigateTo}
                    {...this.props}/>
            );
        }
    }

    return withRouter(WithNavigate);
}
