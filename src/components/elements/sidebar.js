import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SideBar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar__btn-new-list-box">
                    <a href="#popup" className="btn btn--green">New List</a>
                </div>
                <nav className="sidebar__nav">
                    <ul className="sidebar__list">
                        <li className="sidebar__item">
                            <span className="sidebar__icon"><i className="fas fa-bars"/></span>
                            <div className="sidebar__dropdown">
                                <a href="#">Rename List</a>
                                <a href="#">Delete List</a>
                            </div>
                            <a href="#" className="sidebar__link">My list</a>
                        </li>
                        <li className="sidebar__item"><span className="sidebar__icon"><i className="fas fa-bars"/></span><a href="#" className="sidebar__link">Children stuff</a></li>
                        <li className="sidebar__item"><span className="sidebar__icon"><i className="fas fa-bars"/></span><a href="#" className="sidebar__link">Sport</a></li>
                        <li className="sidebar__item"><span className="sidebar__icon"><i className="fas fa-bars"/></span><a href="#" className="sidebar__link">Groceries list</a></li>
                        <li className="sidebar__item"><span className="sidebar__icon"><i className="fas fa-bars"/></span><a href="#" className="sidebar__link">Another list</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}