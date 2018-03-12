import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DeleteModal extends Component {
    static propTypes = {
        deleteAction: PropTypes.func.isRequired,
        handleClose: PropTypes.func.isRequired,
        deleteId: PropTypes.string.isRequired,
        message: PropTypes.string,
    };

    static defaultProps = {
        message: 'Are you sure you want to delete this item ? It cannot be undone.',
    };

    constructor(props) {
        super(props);
        const funcsToBind = [
            'delete',
        ];
        funcsToBind.forEach((f) => {
            this[f] = this[f].bind(this);
        });
    }

    delete() {
        const { deleteAction, deleteId, handleClose, token, activeList } = this.props;
        deleteAction(deleteId, token, handleClose, activeList.id);
    }

    render() {
        const { message } = this.props;

        return (
            <div className="row">
                <div className="u-margin-bottom-small">
                    <h2 className="heading-secondary">
                        Delete
                    </h2>
                </div>
                <div>
                    <p className="paragraph">{message}</p>
                </div>
                <div className="form__actions">
                    <button className="btn btn--white" onClick={this.props.handleClose}>Cancel</button>
                    <button className="btn btn--green" onClick={this.delete}>Ok</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth, task }) {
    const { token } = auth;
    const { activeList } = task;

    return {
        token,
        activeList,
    };
}

export default connect(mapStateToProps)(DeleteModal);
