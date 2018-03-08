import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TaskCard extends Component {
    render() {
        return (
            <div className="card">
                <div className="card__heading">
                    &nbsp;
                </div>
                <h4 className="card__title">Title</h4>
                <div className="card__description paragraph">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores at commodi non omnis praesentium veniam. Aspernatur atque, commodi delectus libero maiores maxime minima natus nemo perspiciatis placeat, sunt, vitae voluptatibus.</p>
                </div>
            </div>
        );
    }
}