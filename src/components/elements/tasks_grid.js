import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TaskCard } from './task_card';

export class TasksGrid extends Component {
    render() {
        return (
            <div className="section-tasks__tasks-container">
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
                <TaskCard/>
            </div>
        );
    }
}