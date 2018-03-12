import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

class ShowTaskModal extends Component {
    static propTypes = {
        handleClose: PropTypes.func.isRequired,
        task: PropTypes.object,
    };

    static defaultProps = {
        task: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            notes: '',
            status: 'needsAction',
            due: null,
        };
    }

    componentWillMount() {
        if (this.props.task !== null) {
            const { title, notes, status, due } = this.props.task;
            this.setState({
                title,
                notes,
                status,
                due: due ? moment(due) : null,
            });
        }
    }

    render() {
        const { title, notes, status, due } = this.state;

        return (
            <div className="row">
                <div className="u-margin-bottom-small">
                    <h2 className="heading-secondary">
                        {title}
                    </h2>
                </div>
                {status === 'needsAction' &&
                <span className="card__done-status" style={{ padding: '2rem', width: '100%', cursor: 'none' }}>
                                <i className="far fa-square"/>&nbsp;&nbsp; To Do
                            </span>
                }
                {status !== 'needsAction' &&
                <span className="card__done-status" style={{ padding: '2rem', width: '100%', cursor: 'none' }}>
                                <i className="far fa-check-square"/>&nbsp;&nbsp; Completed
                            </span>
                }
                <div style={{ marginBottom: '2rem' }}>
                    <p className="paragraph">{notes}</p>
                    {due && <p>Due at: {moment(due).format('dddd, MMMM Do YYYY')}</p>}
                </div>
                <div className="form__actions">
                    <button className="btn btn--white" onClick={this.props.handleClose}>Close</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    const { token } = auth;

    return {
        token,
    };
}

export default connect(mapStateToProps)(ShowTaskModal);
