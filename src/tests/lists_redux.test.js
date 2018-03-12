import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter as Router } from 'react-router-dom';
// import mockAxios from 'jest-mock-axios';
import axios from 'axios';

import { ListsContainer } from '../components/elements/lists_container';

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

const updatedStore = mockStore({
    auth: {
        token: null,
    },
    task: {
        lists: [{ title: 'xpto', id: 1 }],
        tasks: [],
        activeList: null,
        isFetching: false,
    },
});

// clear all mocks between tests
afterEach(() => {
    // cleaning up the mess left behind the previous test
});

const nextTick = async () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 0);
    });
};

const dummyList = [{
    id: 1,
    title: 'Dummy List',
}];

jest.mock('axios', () => {
    const exampleArticles = {
        data: {
            items: [{
                id: 1,
                title: 'Dummy List',
            }],
        },
    };

    return {
        get: jest.fn(() => Promise.resolve(exampleArticles)),
    };
});

describe('List tasks', () => {
    // it('fetch lists on #componentDidMount', () => {
    //     const app = mount(<ListsContainer store={store}/>);
    //     app.instance().componentDidMount();
    //     console.log('app.state', app.state());
    //     expect(axios.get).toHaveBeenCalled();
    // });


    it('renders the list container with no tasks lists', () => {
        const props = {
            lists: [],
            renderModal: jest.fn(),
            fetchTaskLists: jest.fn(),
        };

        const wrapper = shallow(<ListsContainer {...props}/>);
        expect(wrapper.find('.sidebar__list').exists()).toEqual(true);
    });

    it('renders the list container with one tasks list', () => {
        const props = {
            lists: [{ title: 'Dummy', id: 1 }],
            renderModal: jest.fn(),
            fetchTaskLists: jest.fn(),
        };

        const wrapper = shallow(<ListsContainer {...props}/>);
        expect(wrapper.find('.sidebar__item').exists()).toEqual(true);
    });


    describe('List Item actions', () => {

        it('renders the list item context actions (rename and delete)', () => {
            const props = {
                lists: [{ title: 'Dummy', id: 1 }],
                renderModal: jest.fn(),
                fetchTaskLists: jest.fn(),
                handleOpenModal: jest.fn(),
            };

            const wrapper = mount(<ListsContainer {...props}/>);
            const item = wrapper.find('.sidebar__dropdown');
            expect(item.exists()).toEqual(true);
        });

        it('calls the modal to rename the list', () => {
            const props = {
                lists: [{ title: 'Dummy', id: 1 }],
                renderModal: jest.fn(),
                fetchTaskLists: jest.fn(),
                handleOpenModal: jest.fn(),
            };

            const wrapper = mount(<ListsContainer {...props}/>);
            const item = wrapper.find('.sidebar__dropdown > a').at(0);
            expect(item.text()).toEqual('Rename List');
            item.simulate('click');
            expect(props.handleOpenModal).toHaveBeenCalled();
        });

        it('calls the modal to delete the list', () => {
            const props = {
                lists: [{ title: 'Dummy', id: 1 }],
                renderModal: jest.fn(),
                fetchTaskLists: jest.fn(),
                handleOpenModal: jest.fn(),
            };

            const wrapper = mount(<ListsContainer {...props}/>);
            const item = wrapper.find('.sidebar__dropdown > a').at(1);
            expect(item.text()).toEqual('Delete List');
            item.simulate('click');
            expect(props.handleOpenModal).toHaveBeenCalled();
        });

        it('dispatches "change list" on click with the target list', () => {
            const props = {
                lists: [{ title: 'Dummy', id: 1 }],
                renderModal: jest.fn(),
                fetchTaskLists: jest.fn(),
                handleOpenModal: jest.fn(),
                changeList: jest.fn(),
            };

            const wrapper = mount(<ListsContainer {...props}/>);
            const item = wrapper.find('.sidebar__item > .sidebar__link');
            expect(item.text()).toEqual('Dummy');
            item.simulate('click');
            expect(props.changeList).toHaveBeenCalledWith({ title: 'Dummy', id: 1 });
        });
    });
});

