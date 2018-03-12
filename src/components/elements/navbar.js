import React, { Component } from 'react';
import PropTypes from 'prop-types';

import dummyLogo from '././../../assets/img/the-web-works.svg';

export class NavBar extends Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
        loading: PropTypes.bool.isRequired,
    };

    render() {
        const { content, loading } = this.props;

        return (
            <header className="header">
                <div className="header__logo-box">
                    <img src={dummyLogo} alt="dummy logo"/>
                </div>
                <div className="header__active-list">
                    <div className="u-center-text">
                        <h2 className="heading-secondary">
                            {content}
                        </h2>
                    </div>
                </div>
                <div className="header__status-box">
                    <span>{loading ? 'Loading...' : 'All saved'}</span>
                </div>
            </header>
        );
    }
}
