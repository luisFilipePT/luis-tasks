import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { TasksGrid } from '../components/elements/tasks_grid';
import TaskCard from '../components/elements/task_card';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {
        token: null,
    },
    task: {
        lists: [],
        tasks: [],
        activeList: null,
        isFetching: false,
    },
});

// clear all mocks between tests
afterEach(() => {
    // cleaning up the mess left behind the previous test
});

describe('Tasks List', () => {
    it('renders the task container with no tasks', () => {
        const props = {
            tasks: [],
            activeList: null,
            fetchTasks: jest.fn(),
        };

        const wrapper = shallow(<TasksGrid {...props}/>);
        expect(wrapper.find(TaskCard).exists()).toEqual(false);
    });


    it('renders the task container with tasks', () => {
        const props = {
            tasks: [{ id: 1 }, { id: 2 }],
            activeList: null,
            fetchTasks: jest.fn(),
        };

        const wrapper = shallow(<TasksGrid {...props}/>);
        expect(wrapper.find(TaskCard).exists()).toEqual(true);
    });

    it('fetches task on component #componentDidMount', () => {
        const props = {
            tasks: [{ id: 1 }, { id: 2 }],
            activeList: { id: 1 },
            fetchTasks: jest.fn(),
        };

        const wrapper = shallow(<TasksGrid {...props}/>);
        expect(props.fetchTasks).toHaveBeenCalled();
    });

    it('re fetches tasks on active list change', () => {
        const props = {
            token: 'dummyToken',
            tasks: [{ id: 1 }, { id: 2 }],
            activeList: { id: 1 },
            fetchTasks: jest.fn(),
        };

        const wrapper = shallow(<TasksGrid {...props}/>);
        expect(props.fetchTasks).toHaveBeenCalledWith('dummyToken', 1);
        wrapper.setProps({ activeList: { id: 2 } });
        expect(props.fetchTasks).toHaveBeenCalledWith('dummyToken', 2);
    });

    it('updates tasks on task added', () => {
        const props = {
            token: 'dummyToken',
            tasks: [{ id: 1 }, { id: 2 }],
            activeList: { id: 1 },
            fetchTasks: jest.fn(),
        };

        const wrapper = shallow(<TasksGrid {...props}/>);
        expect(wrapper.find(TaskCard)).toHaveLength(2);
        wrapper.setProps({ activeList: { id: 2 }, tasks: [{ id: 1 }, { id: 2 }, { id: 3 }] });
        expect(wrapper.find(TaskCard)).toHaveLength(3);
    });

    it('updates tasks on task removed', () => {
        const props = {
            token: 'dummyToken',
            tasks: [{ id: 1 }, { id: 2 }, { id: 3 }],
            activeList: { id: 1 },
            fetchTasks: jest.fn(),
        };

        const wrapper = shallow(<TasksGrid {...props}/>);
        expect(wrapper.find(TaskCard)).toHaveLength(3);
        wrapper.setProps({ activeList: { id: 1 }, tasks: [{ id: 2 }, { id: 3 }] });
        expect(wrapper.find(TaskCard)).toHaveLength(2);
    });

    it('updates task on task edited', () => {
        const props = {
            token: 'dummyToken',
            tasks: [{ id: 1, title: 'foo' }],
            activeList: { id: 1 },
            fetchTasks: jest.fn(),
        };

        const wrapper = shallow(<TasksGrid {...props}/>);
        expect(wrapper.find(TaskCard).props().task).toEqual({ id: 1, title: 'foo' });
        wrapper.setProps({ tasks: [{ id: 1, title: 'bar' }] });
        expect(wrapper.find(TaskCard).props().task).toEqual({ id: 1, title: 'bar' });
    });
});

