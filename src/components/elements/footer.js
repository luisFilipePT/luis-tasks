import React from 'react';

import dummyLogoGray from '././../../assets/img/the-web-works-gray.svg';

// Presentational "component" only displays some HTML
export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__logo-box">
                <img src={dummyLogoGray} alt="dummy logo"/>
            </div>
            <div className="footer__copyright">
                <p>
                    Copyright &copy; 2018 <a href="#" className="footer__copyright-link">Luis Filipe</a>
                </p>
            </div>
            <div className="footer__links">
                <ul className="footer__links-list">
                    <li className="footer__item"><a className="footer__links-item" href="#">Help</a></li>
                    <li className="footer__item"><a className="footer__links-item" href="#">Show tips</a></li>
                </ul>
            </div>
        </footer>
    );
};
