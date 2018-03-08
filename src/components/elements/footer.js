import React, { Component } from 'react';
import PropTypes from 'prop-types';

import dummyLogoGray from '././../../assets/img/the-web-works-gray.svg';

export class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="row">
                    <div className="col-1-of-3">
                        <div className="footer__logo-box">
                            <img src={dummyLogoGray} alt="dummy logo"/>
                        </div>
                    </div>
                    <div className="col-1-of-3 u-center-text">
                        <p className="footer__copyright">
                            Copyright &copy; 2018 <a href="#" className="footer__link">Luis Filipe</a> for <a href="#" className="footer__link">WAES</a>
                        </p>
                    </div>
                    <div className="col-1-of-3">
                        Help and show tips
                    </div>
                </div>
            </footer>
        );
    }
}