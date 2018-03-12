import React, { Component } from 'react';
import { connect } from 'react-redux';

// Higher order component for use of a modal
import withModal from '../hocs/with_modal';

import { createList } from '../../actions';

// Modals
import CreateTaskModal from '../modals/create_task_modal';

class ActionBar extends Component {
    constructor(props) {
        super(props);

        // bind functions to the scope
        const funcsToBind = [
            'createList',
        ];
        funcsToBind.forEach((f) => {
            this[f] = this[f].bind(this);
        });
    }

    createList() {
        this.props.handleOpenModal();
    }

    render() {
        const { renderModal } = this.props;

        return (
            <div className="action-bar">
                <a href="#" className="btn btn--green" onClick={this.createList}>New Task</a>
                {renderModal(<CreateTaskModal handleClose={this.props.handleCloseModal}/>)}
            </div>
        );
    }
}

// map state to props :)
function mapStateToProps({ auth }) {
    const { token } = auth;
    return {
        token,
    };
}

// connect all state, props, actions and hocs
export default connect(mapStateToProps, {
    createList,
})(withModal(ActionBar));
