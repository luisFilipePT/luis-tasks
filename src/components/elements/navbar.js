import React, { Component } from 'react';
import PropTypes from 'prop-types';

import dummyLogo from '././../../assets/img/the-web-works.svg';

export class NavBar extends Component {
    render() {
        return (
            <header className="header">
                <div className="header__logo-box">
                    <img src={dummyLogo} alt="dummy logo"/>
                </div>
                <div className="header__active-list">
                    <div className="u-center-text">
                        <h2 className="heading-secondary">
                            Luis`s list
                        </h2>
                    </div>
                </div>
                <div className="header__btn-add-list-box">
                    save
                </div>
            </header>
        );
    }
}