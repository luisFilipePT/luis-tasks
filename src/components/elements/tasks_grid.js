import React, { Component } from 'react';
import { connect } from 'react-redux';

import TaskCard from './task_card';

import { fetchTasks } from '../../actions';

// Attention: named export only for tests use the default export in the code
export class TasksGrid extends Component {
    componentWillMount() {
        if (this.props.activeList !== null) {
            this.props.fetchTasks(this.props.token, this.props.activeList.id);
        }
    }

    componentWillReceiveProps(newProps) {
        // If list has changed then fetch the new list tasks
        if (newProps.activeList && newProps.activeList !== this.props.activeList) {
            this.props.fetchTasks(this.props.token, newProps.activeList.id);
        }
    }

    render() {
        const { tasks } = this.props;

        return (
            <div className="section-tasks__tasks-container">
                {tasks && tasks.map((task) => {
                    return (<TaskCard key={task.id} task={task}/>);
                })}
            </div>
        );
    }
}

function mapStateToProps({ auth, task }) {
    const { token } = auth;
    const { tasks, activeList } = task;

    return {
        token,
        tasks,
        activeList,
    };
}

export default connect(mapStateToProps, {
    fetchTasks,
})(TasksGrid);
