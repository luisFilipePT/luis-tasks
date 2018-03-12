import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { TaskCard } from '../components/elements/task_card';

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

describe('Task Card', () => {
    it('calls the edit modal', () => {
        const props = {
            task: { title: 'Dummy', id: 1 },
            renderModal: jest.fn(),
            handleOpenModal: jest.fn(),
        };

        const wrapper = mount(<TaskCard {...props}/>);
        wrapper.find('.card__edit-action').simulate('click');
        expect(props.handleOpenModal).toHaveBeenCalled();
    });

    it('calls the delete modal', () => {
        const props = {
            task: { title: 'Dummy', id: 1 },
            renderModal: jest.fn(),
            handleOpenModal: jest.fn(),
        };

        const wrapper = mount(<TaskCard {...props}/>);
        wrapper.find('.card__trash-action').simulate('click');
        expect(props.handleOpenModal).toHaveBeenCalled();
    });

    it('calls the show modal', () => {
        const props = {
            task: { title: 'Dummy', id: 1 },
            renderModal: jest.fn(),
            handleOpenModal: jest.fn(),
        };

        const wrapper = mount(<TaskCard {...props}/>);
        wrapper.find('.card__show-action').simulate('click');
        expect(props.handleOpenModal).toHaveBeenCalled();
    });

    it('calls the toggle complete action', () => {
        const props = {
            task: { title: 'Dummy', id: 1 },
            activeList: { id: 1 },
            renderModal: jest.fn(),
            handleOpenModal: jest.fn(),
            editTask: jest.fn(),
        };

        const wrapper = mount(<TaskCard {...props}/>);
        wrapper.find('.card__done-status').simulate('click');
        expect(props.editTask).toHaveBeenCalled();
    });

    it('task card title and notes match the card and are present', () => {
        const props = {
            task: { title: 'Dummy', notes: 'foo', id: 1 },
            activeList: { id: 1 },
            renderModal: jest.fn(),
            handleOpenModal: jest.fn(),
            editTask: jest.fn(),
        };

        const wrapper = mount(<TaskCard {...props}/>);
        expect(wrapper.find('.card__title').text()).toEqual('Dummy');
        expect(wrapper.find('.card__description > p').text()).toEqual('foo');
    });
});
