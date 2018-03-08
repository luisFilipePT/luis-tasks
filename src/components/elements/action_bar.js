import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ActionBar extends Component {
    render() {
        return (
            <div className="action-bar">
                <a href="#popup" className="btn btn--green">New Task</a>
            </div>
        );
    }
}