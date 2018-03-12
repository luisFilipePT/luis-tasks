import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import withModal from '../hocs/with_modal';

import DeleteModal from '../modals/delete_modal';
import CreateTaskModal from '../modals/create_task_modal';
import ShowTaskModal from '../modals/show_task_modal';

import { deleteTask, editTask } from '../../actions';

// Attention: named export only for tests use the default export in the code
export class TaskCard extends Component {
    constructor(props) {
        super(props);
        const funcsToBind = [
            'toggleCompleted',
            'showTask',
            'editTask',
            'deleteTask',
        ];
        funcsToBind.forEach((f) => {
            this[f] = this[f].bind(this);
        });

        this.state = {
            activeModal: null,
        };
    }

    toggleCompleted() {
        const { task, token, activeList } = this.props;
        const nextStatus = task.status === 'needsAction' ? 'completed' : 'needsAction';
        this.props.editTask({ ...task, status: nextStatus, list: activeList.id }, activeList.id, token);
    }

    showTask() {
        const { task } = this.props;
        this.setState({
            activeModal: <ShowTaskModal
                task={task}
                handleClose={this.props.handleCloseModal}/>,
        }, () => {
            this.props.handleOpenModal();
        });
    }

    editTask() {
        const { task } = this.props;
        this.setState({
            activeModal: <CreateTaskModal
                task={task}
                handleClose={this.props.handleCloseModal}/>,
        }, () => {
            this.props.handleOpenModal();
        });
    }

    deleteTask() {
        const { id, title } = this.props.task;
        this.setState({
            activeModal: <DeleteModal
                deleteId={id}
                message={`Are you sure you want to delete the task ${title}? It cannot be undone.`}
                handleClose={this.props.handleCloseModal}
                deleteAction={this.props.deleteTask}/>,
        }, () => {
            this.props.handleOpenModal();
        });
    }

    render() {
        const { renderModal, task } = this.props;
        const { title, notes, status, due } = task;

        return (
            <div className="card">
                <div className="card__heading">
                    {status === 'needsAction' &&
                    <span className="card__done-status" onClick={this.toggleCompleted}><i className="far fa-square"/></span>}
                    {status !== 'needsAction' &&
                    <span className="card__done-status" onClick={this.toggleCompleted}><i className="far fa-check-square"/></span>}
                    <span className="card__show-action" onClick={this.showTask}><i className="fas fa-eye"/></span>
                    <span className="card__edit-action" onClick={this.editTask}><i className="fas fa-pencil-alt"/></span>
                    <span className="card__trash-action" onClick={this.deleteTask}><i className="fas fa-trash"/></span>
                </div>
                {title.length > 0 && <h4 className="card__title">{title}</h4>}
                <div className="card__description paragraph">
                    <p>{notes}</p>
                    {due && <p className="card__description--due">Due at: {moment(due).format('dddd, MMMM Do YYYY')}</p>}
                </div>
                {renderModal(this.state.activeModal)}
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

export default connect(mapStateToProps, {
    deleteTask, editTask,
})(withModal(TaskCard));
