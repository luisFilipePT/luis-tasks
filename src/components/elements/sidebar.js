import React, { Component } from 'react';
import { connect } from 'react-redux';

import withModal from '../hocs/with_modal';

import { createList } from '../../actions';

import ListsContainer from './lists_container';

import CreateListModal from '../modals/create_list_modal';

class SideBar extends Component {
    constructor(props) {
        super(props);
        const funcsToBind = ['createList'];
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
            <div className="sidebar">
                <div className="sidebar__btn-new-list-box">
                    <a href="#popup" className="btn btn--green" onClick={this.createList}>New List</a>
                    {renderModal(<CreateListModal handleClose={this.props.handleCloseModal} createAction={this.props.createList}/>)}
                </div>
                <nav className="sidebar__nav">
                    <ListsContainer/>
                </nav>
            </div>
        );
    }
}

function mapStateToProps({ auth, task }) {
    const { token } = auth;
    const { lists } = task;

    return {
        token,
        lists,
    };
}

export default connect(mapStateToProps, {
    createList,
})(withModal(SideBar));

