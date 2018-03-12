import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { createTask, editTask } from '../../actions';

class CreateTaskModal extends Component {
    static propTypes = {
        handleClose: PropTypes.func.isRequired,
        task: PropTypes.object,
    };

    static defaultProps = {
        task: null,
    };

    constructor(props) {
        super(props);
        const funcsToBind = [
            'handleSave',
            'handleChange',
            'handleChangeSelect',
            'handleChangeStatus',
            'handleChangeDueDateChange',
            'getListSelect',
        ];
        funcsToBind.forEach((f) => {
            this[f] = this[f].bind(this);
        });

        this.state = {
            title: '',
            notes: '',
            list: this.props.activeList.id,
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

    getListSelect() {
        const { lists } = this.props;

        return lists.map(({ id, title }) => {
            return <option key={id} value={id}>{title}</option>;
        });
    }

    handleChange({ target }) {
        const { name, value } = target;
        this.setState({
            [name]: value,
        });
    }

    handleChangeSelect(event) {
        const index = event.nativeEvent.target.selectedIndex;

        this.setState({
            list: event.nativeEvent.target[index].value,
        });
    }

    handleChangeStatus() {
        const nextStatusState = this.state.status === 'needsAction' ? 'completed' : 'needsAction';

        this.setState({
            status: nextStatusState,
        });
    }

    handleChangeDueDateChange(data) {
        this.setState({
            due: data,
        });
    }

    handleSave() {
        const { handleClose, token, activeList, task } = this.props;
        if (task) {
            this.props.editTask({ ...task, ...this.state }, activeList.id, token, handleClose);
        } else {
            this.props.createTask(this.state, activeList.id, token, handleClose);
        }
    }

    render() {
        const { title, notes, list, status, due } = this.state;

        return (
            <div className="row">
                <div className="u-margin-bottom-small">
                    <h2 className="heading-secondary">
                        { this.props.task !== null ? 'Edit Task' : 'Create Task'}
                    </h2>
                </div>
                <form action="#" className="form">
                    <div className="form__group">
                        <div style={{ display: 'inline-block', margin: '1rem' }}>
                            {status === 'needsAction' &&
                            <span className="card__done-status" style={{ padding: '2rem', width: '100%' }} onClick={this.handleChangeStatus}>
                                <i className="far fa-square"/>&nbsp;&nbsp; To Do
                            </span>
                            }
                            {status !== 'needsAction' &&
                            <span className="card__done-status" style={{ padding: '2rem', width: '100%' }} onClick={this.handleChangeStatus}>
                                <i className="far fa-check-square"/>&nbsp;&nbsp; Completed
                            </span>
                            }
                        </div>
                        <div className="form__date-picker">
                            <DatePicker
                                selected={due}
                                name="due"
                                className="form__input"
                                placeholderText="Due date"
                                onChange={this.handleChangeDueDateChange}
                            />
                        </div>
                    </div>
                    <div className="form__group">
                        <input
                            required
                            id="title"
                            className="form__input"
                            name="title"
                            value={title}
                            placeholder="Title"
                            type="text"
                            onChange={this.handleChange}/>
                        <label htmlFor="title" className="form__label">Title</label>
                    </div>
                    <div className="form__group">
                        <textarea
                            id="notes"
                            className="form__input"
                            name="notes"
                            value={notes}
                            placeholder="Notes"
                            rows="10"
                            onChange={this.handleChange}/>
                        <label htmlFor="name" className="form__label">Notes</label>
                    </div>
                </form>
                <div className="form__group form__select">
                    <label htmlFor="list">Move to list: </label>
                    <select id="list" name="list" onChange={this.handleChangeSelect} value={list}>
                        {this.getListSelect()}
                    </select>
                </div>
                <div className="form__actions">
                    <button className="btn btn--green" onClick={this.handleSave}>Save</button>
                    <button className="btn btn--white" onClick={this.props.handleClose}>Cancel</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth, task }) {
    const { token } = auth;
    const { lists, activeList } = task;

    return {
        token,
        lists,
        activeList,
    };
}

export default connect(mapStateToProps, {
    createTask, editTask,
})(CreateTaskModal);
