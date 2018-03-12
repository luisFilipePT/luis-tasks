import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Higher order component for use of a modal
import withModal from '../hocs/with_modal';
// actions
import { deleteList, fetchTaskLists, updateList, changeList } from '../../actions';
// modals
import DeleteModal from '../modals/delete_modal';
import RenameListModal from '../modals/rename_list_modal';

// Attention: named export only for tests use the default export in the code
export class ListsContainer extends Component {
    constructor(props) {
        super(props);
        const funcsToBind = [
            'deleteList',
            'renameList',
            'selectList',
            'getList',
        ];
        funcsToBind.forEach((f) => {
            this[f] = this[f].bind(this);
        });

        this.state = {
            activeModal: null,
        };
    }

    componentDidMount() {
        this.props.fetchTaskLists(this.props.token);
    }

    // returns the HTML element for each list
    getList(list) {
        const { title, id } = list;
        return (
            <li key={id} className="sidebar__item">
                <span className="sidebar__icon"><i className="fas fa-bars"/></span>
                <div className="sidebar__dropdown">
                    <a href="#" onClick={() => this.renameList(list)}>Rename List</a>
                    <a href="#" onClick={() => this.deleteList(id)}>Delete List</a>
                </div>
                <a href="#" className="sidebar__link" onClick={() => this.selectList(list)}>{title}</a>
            </li>
        );
    }

    deleteList(id) {
        this.setState({
            activeModal: <DeleteModal deleteId={id} handleClose={this.props.handleCloseModal} deleteAction={this.props.deleteList}/>,
        }, () => {
            this.props.handleOpenModal();
        });
    }

    renameList(list) {
        this.setState({
            activeModal: <RenameListModal list={list} handleClose={this.props.handleCloseModal} updateAction={this.props.updateList}/>,
        }, () => {
            this.props.handleOpenModal();
        });
    }

    selectList(list) {
        this.props.changeList(list);
    }

    render() {
        const { lists, renderModal } = this.props;

        return (
            <Fragment>
                <ul className="sidebar__list">
                    {lists.map(list => this.getList(list))}
                </ul>
                {renderModal(this.state.activeModal)}
            </Fragment>
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
    fetchTaskLists, deleteList, updateList, changeList,
})(withModal(ListsContainer));
